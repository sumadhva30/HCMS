from bson import ObjectId
from typing import List, Optional
import Models

from pymongo import MongoClient

from backend.Models import IncidentInfo, OnCallSpecific, OnCallWeekly, ResponderModel, ResponderSummaryModel
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
    eq_searchable = ['_id', 'cat', 'assigned', 'resolved', 'severity', 'resp_id', 'std_id']
    # only sub is text searchable

    query_doc = {}
    for k, v in query.dict(by_alias=True).items():
        if v is not None and k in eq_searchable:
            query_doc[k] = v
        if v is not None and k == 'sub':
            query_doc['$text'] = {'$search':v}
    
    return list(db.incidents.find(query_doc)[:100]) # todo paging

def search_responders(query: ResponderModel) -> List[ResponderSummaryModel]:
    # all fields eq searchable
    query_doc = {k: v for k, v in query.dict(by_alias=True).items() if v is not None}
    responders = list(db.responders.find(query_doc)[:100]) # todo paging
    responders_dict = {r['_id']: ResponderSummaryModel(r) for r in responders}

    agg_incidents = db.incidents.aggregate([{
        '$group': {
            '_id': '$resp_id',
            'open': {'$sum': {'$cond': ['$resolved', 0, 1]}},
            'resolved': {'$sum': {'$cond': ['$resolved', 1, 0]}}
        }
    }])
    # dirty join
    for rec in agg_incidents:
        rid = rec['_id']
        responders_dict[rid].num_open_incidents = rec['open']
        responders_dict[rid].num_resolved_incidents = rec['resolved']
    
    return list(responders_dict.values())


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

def upsert_category(query: str) -> str:
    pass