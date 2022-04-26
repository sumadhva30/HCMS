import Models

from pymongo import MongoClient

from backend.Models import OnCallWeekly
client = MongoClient()

db = client['HCMS_db']

def search_weekly_oncall_schedule(query: OnCallWeekly):
    pass
