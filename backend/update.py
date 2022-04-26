from datetime import datetime
from Models import IncidentInfo
import dbaccess
from backend.Models import OnCallWeekly, WeeklySlot 


def check_weekly_oncall_schedule(incident: IncidentInfo):
    oncall_weekly_query = OnCallWeekly(cat = incident.cat)
    schedule = dbaccess.search_weekly_oncall_schedule(oncall_weekly_query)
    WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    day = WEEKDAYS[datetime.now().weekday()]

    assert len(schedule) <= 1
    if len(schedule) == 0:
        raise FileNotFoundError('weekly schedule not found')
    
    weekly_slot : WeeklySlot = getattr(schedule, day)
    
    if datetime.now().hour <= 15:
        responder = weekly_slot.Fn_id
    else
        responder = weekly_slot.An_id
    
    return responder

    