from typing import Optional
from fastapi import FastAPI
from dbaccess import database

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

## Incident Functions

def insert_incident(incident: IncidentInfo):  # Assuming input is in the right format
    database["Incidents"].insert_one(incident)

def delete_incident(incident: IncidentInfo):
    database["Incidents"].delete_one({"_id": incident["_id"]})

def set_update_incident(query: IncidentInfo) -> None:
    update_doc = {k: v for k, v in query.dict().items() if v is not None}
    database["Incident"].update_one({"_id": query.id}, update_doc)

def append_incident_msgs(query: IncidentInfo) -> None:
    # assume there is a singleton msg
    database["Incident"].update_one({"_id": query.id}, {
        '$push': query.msgs[0].dict()
    }) 

def append_incident_notes(query: IncidentInfo) -> None:
    database["Incident"].update_one({"_id": query.id}, {
        '$push': query.notes[0].dict()
    })


## Responder Functions

def insert_responder(responder: ResponderInfo):
    database["Responder"].insert_one(responder)

def update_responder(responder: ResponderInfo):
    if responder.name:
        database["Responder"].update_one({"_id": responder["_id"]}, {"$set": {"name": responder.name}})
    if responder.category:
        database["Responder"].update_one({"_id": responder["_id"]}, {"$set": {"category": responder.category}})

def delete_responder(responder_id: str):
    database["Responder"].delete_one({"_id": responder_id})
    _ = database["Incidents"].update_many({"resp_id": responder_id, "resolved": False}, {"$set": {"resp_id": None, "assigned": False}})


## Category Functions

def insert_category(cat: str):
    database["Category"].update_one({}, {"$push": {"categories": cat}})

def update_category(old_cat: str, new_cat: str):
    database["Category"].update_one({}, {"$pull": {"categories": old_cat}})
    database["Category"].update_one({}, {"$push": {"categories": new_cat}})
    _ = database["Responder"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["Incidents"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["weekly_schedule"].update_one({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["specific_schedule"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})

def delete_category(cat: str):
    database["Category"].update_one({}, {"$pull": {"categories": cat}})


## On-Call-Schedule Functions

def record_weekly_on_call_schedule(schedule: OnCallWeekly):
    if schedule.cat is None:
        return
    update = {k:v for k, v in schedule.dict().items() if v is not None}
    database["weekly_schedule"].update_one({"cat": schedule.cat}, update, upsert=True)

def record_specific_on_call_schedule(schedule: OnCallSpecific):
    
    pass
