from bson import ObjectId
from typing import List, Optional
import Models

from pymongo import MongoClient

from backend.Models import IncidentInfo, OnCallSpecific, OnCallWeekly, ResponderModel
client = MongoClient()

db = client['HCMS_db']

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

#Search
def search_incidents(query: IncidentInfo) -> List[IncidentInfo]:
    pass

def search_responders(query: ResponderModel) -> List[ResponderModel]:
    pass

def search_specific_oncall_schedule(query: OnCallSpecific) -> List[OnCallSpecific]:
    pass

def search_weekly_oncall_schedule(query: OnCallWeekly) -> List[OnCallWeekly]:
    pass

#Record Incident
def insert_incident(query: IncidentInfo) -> IncidentInfo:
    pass

def set_update_incident(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass

def append_incident_msgs(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass

def append_incident_notes(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass

#Record Schedule
def set_specific_oncall_schedule(query: OnCallSpecific) -> OnCallSpecific:
    pass

def set_weekly_oncall_schedule(query: OnCallWeekly) -> OnCallWeekly:
    pass

# Record Responder
def upsert_responder(query: ResponderModel) -> ResponderModel:
    pass

def delete_responder(query: ResponderModel) -> Optional[ResponderModel]:
    pass

def upsert_category(query: CategoryModel) -> CategoryModel:
    pass