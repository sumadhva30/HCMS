import Models

from pymongo import MongoClient

from backend.Models import IncidentInfo, OnCallWeekly
client = MongoClient()

db = client['HCMS_db']

def search_weekly_oncall_schedule(query: OnCallWeekly):
    pass

def set_update_incident(query: IncidentInfo):
    pass

def append_incident_msgs(query: IncidentInfo):
    pass

def append_incident_notes(query: IncidentInfo):
    pass
