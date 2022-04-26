from sqlite3 import dbapi2
from Models import IncidentInfo
from backend.Models import OnCallWeekly 


def check_weekly_oncall_schedule(incident: IncidentInfo):
    oncall_weekly_query = OnCallWeekly(cat = incident.cat)
    dbaccess.