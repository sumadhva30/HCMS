from typing import Optional
from fastapi import FastAPI
from dbaccess import database

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

app = FastAPI()


def insert_incident(incident: IncidentInfo):  # Assuming input is in the right format
    return database["Incidents"].insert_one(incident)

def update_incident(incident: IncidentInfo):
    return database["Incidents"].replace_one({"_id": incident["_id"]}, incident)

def delete_incident(incident: IncidentInfo):
    database["Incidents"].delete_one({"_id": incident["_id"]})


def insert_responder(responder: ResponderInfo):
    return database["Responder"].insert_one(responder)

def update_responder(responder: ResponderInfo):
    if responder.name:
        database["Responder"].update_one({"_id": responder["_id"]}, {"$set": {"name": responder.name}})
    if responder.category:
        database["Responder"].update_one({"_id": responder["_id"]}, {"$set": {"category": responder.category}})
    return responder["_id"]

def delete_responder(responder_id: str):
    database["Responder"].delete_one({"_id": responder_id})
    _ = database["Incidents"].update_many({"resp_id": responder_id, "resolved": False}, {"$set": {"resp_id": None, "assigned": False}})


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


def record_weekly_on_call_schedule(schedule: OnCallWeekly):
    if schedule.cat is None:
        return
    cat_schedule = database["weekly_schedule"].find_one({"cat": schedule.cat})
    for day, slot in vars(schedule):
        if day in ("id", "cat"):
            continue
        if slot.Fn_id:
            cat_schedule[day]["Fn"] = slot.Fn_id
        if slot.An_id:
            cat_schedule[day]["An"] = slot.An_id
    

def record_specific_on_call_schedule(schedule: OnCallSpecific):
    
    pass



def set_update_incident(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass

def append_incident_msgs(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass

def append_incident_notes(query: IncidentInfo) -> Optional[IncidentInfo]:
    pass
