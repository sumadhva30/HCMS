from datetime import datetime
from datetime import date
from Models import *
from fastapi import HTTPException
from record import *
from search import *
from dbaccess import all_admins
from notify import notify_user

def assign_incident(incident: IncidentInfo):
    responder = check_specific_oncall_schedule(incident)
    if responder is None:
        responder = check_weekly_oncall_schedule(incident)
    incident.resp_id = responder
    incident.assigned = False if responder is None else True
    incident.resolved = False
    insert_incident(incident)
    if responder:
        notif_receivers = [incident.std_info.id, responder]
        notify_user(notif_receivers, f"New incident created and assigned: {incident.sub}", incident.msgs[0])

    
def check_weekly_oncall_schedule(incident: IncidentInfo) -> str:
    '''_summary_

    :param incident: contains category
    :type incident: IncidentInfo
    :raises HTTPException: 404 if weekly schedule not found
    :return: responder id
    :rtype: str
    '''
    oncall_weekly_query = OnCallWeekly(cat = incident.cat)
    schedule = search_weekly_oncall_schedule(oncall_weekly_query)
    WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    day = WEEKDAYS[datetime.now().weekday()]

    assert len(schedule) <= 1
    if len(schedule) == 0:
        return None
    #     raise HTTPException(status_code=404, detail='weekly schedule not found')
    
    weekly_slot : WeeklySlot = getattr(schedule[0], day)
    
    if datetime.now().hour <= 15:
        responder = weekly_slot.Fn_id
    else:
        responder = weekly_slot.An_id
    
    return responder

def check_specific_oncall_schedule(incident: IncidentInfo):

    if datetime.now().hour <= 15:
        slot = "Fn"
    else:
        slot = "An"
    # specific_slot = SpecificSlot({'Date' : date.today(), 'Time': time})
    specific_slot = SpecificSlot(Date = datetime.combine(date.today(), datetime.min.time()),Time= slot)
    # oncall_specific_query = OnCallSpecific({'cat' : incident.cat,'slot': specific_slot})
    oncall_specific_query = OnCallSpecific(cat = incident.cat,slot = specific_slot)
    schedule = search_specific_oncall_schedule(oncall_specific_query)
    assert len(schedule) <= 1
    # if len(schedule) == 0:
    #     raise HTTPException(status_code=404, detail='specific schedule not found')
    
    if len(schedule) < 1:
        return None
    else:
        return schedule[0]['resp_id']

def update_incident(incident: IncidentInfo) -> None:
    '''_summary_

    :param incident: contains id and values to update (or append in case of messages, notes)
    :type incident: IncidentInfo
    :return: updated incident
    :rtype: IncidentInfo
    '''
    ##TODO: if feedback says not resolved, reopen issue
    if incident.msgs != None:
        append_incident_msgs(incident)
        notif_receivers = [incident.resp_id, incident.std_info.id]
        notify_user(notif_receivers, f"New Incident Message: {incident.sub}", incident.msgs[0])
    elif incident.notes != None:
        append_incident_notes(incident)
        notif_receivers = all_admins() + [incident.resp_id]
        notify_user(notif_receivers, f"New Incident Note: {incident.sub}", incident.notes[0])
    else:
        if incident.cat:
            new_responder = check_specific_oncall_schedule(incident)
            if new_responder is None:
                new_responder = check_weekly_oncall_schedule(incident)
            incident.resp_id = new_responder
        set_update_incident(incident)
        notif_receivers = all_admins() + incident.std_info.id
        if not incident.feedback:
            notif_receivers.append(incident.resp_id)
        notify_user(notif_receivers, f"Incident Update: {incident.sub}", "Please open the HCMS portal to view update")


def update_specific_oncall_schedule(oncall_specific: OnCallSpecific) -> None:
    return record_specific_on_call_schedule(oncall_specific)

def update_weekly_oncall_schedule(oncall_weekly: OnCallWeekly) -> None:
    return record_weekly_on_call_schedule(oncall_weekly)
