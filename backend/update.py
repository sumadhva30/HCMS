from datetime import datetime
from fastapi import HTTPException
from Models import IncidentInfo
import dbaccess
from backend.Models import OnCallSpecific, OnCallWeekly, WeeklySlot 


def check_weekly_oncall_schedule(incident: IncidentInfo) -> str:
    oncall_weekly_query = OnCallWeekly(cat = incident.cat)
    schedule = dbaccess.search_weekly_oncall_schedule(oncall_weekly_query)
    WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    day = WEEKDAYS[datetime.now().weekday()]

    assert len(schedule) <= 1
    if len(schedule) == 0:
        raise HTTPException(status_code=404, detail='weekly schedule not found')
    
    weekly_slot : WeeklySlot = getattr(schedule, day)
    
    if datetime.now().hour <= 15:
        responder = weekly_slot.Fn_id
    else:
        responder = weekly_slot.An_id
    
    return responder

def update_incident(incident: IncidentInfo) -> IncidentInfo:
    if incident.msgs != None:
        return dbaccess.append_incident_msgs(incident)
    elif incident.notes != None:
        return dbaccess.append_incident_notes(incident)
    else:
        return dbaccess.set_update_incident(incident)

def update_specific_oncall_schedule(oncall_specific: OnCallSpecific) -> OnCallSpecific:
    return dbaccess.set_specific_oncall_schedule(oncall_specific)

def update_weekly_oncall_schedule(oncall_weekly: OnCallWeekly) -> OnCallWeekly:
    return dbaccess.set_weekly_oncall_schedule(oncall_weekly)