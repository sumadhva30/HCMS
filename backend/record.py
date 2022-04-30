from dbaccess import database, stripNone
from flatten_dict import flatten

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

## Incident Functions

def insert_incident(incident: IncidentInfo):  # Assuming input is in the right format
    incident.severity = 1
    database["Incidents"].insert_one(incident.dict(by_alias=True, exclude={'id'}))

def set_update_incident(query: IncidentInfo) -> None:
    update_doc = flatten(stripNone(query.dict(by_alias=True)), reducer='dot')
    database["Incidents"].update_one({"_id": query.id}, {"$set": update_doc})

def append_incident_msgs(query: IncidentInfo) -> None:
    # assume there is a singleton msg
    database["Incidents"].update_one({"_id": query.id}, {'$push': {"msgs": query.msgs[0].dict(by_alias=True)}}) 

def append_incident_notes(query: IncidentInfo) -> None:
    database["Incidents"].update_one({"_id": query.id}, {'$push': {"notes": query.notes[0].dict(by_alias=True)}})


## Responder Functions

def insert_responder(responder: ResponderInfo):
    database["Responder"].insert_one(responder.dict(by_alias=True))

def update_responder(responder: ResponderInfo):
    if responder.name:
        database["Responder"].update_one({"_id": responder.id}, {"$set": {"name": responder.name}})
    if not (len(responder.category) == 1 and responder.category[0] == ""):
        database["Responder"].update_one({"_id": responder.id}, {"$set": {"category": responder.category}})

def delete_responder(responder: ResponderInfo):
    database["Responder"].delete_one({"_id": responder.id})
    database["Incidents"].update_many({"resp_id": responder.id, "resolved": False}, {"$set": {"resp_id": None, "assigned": False}})


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
    update = flatten(stripNone(schedule.dict(by_alias=True)), reducer='dot')
    database["weekly_schedule"].update_one({"cat": schedule.cat}, {"$set": update}, upsert=True)

def record_specific_on_call_schedule(schedule: OnCallSpecific):
    if schedule.cat is None:
        return
    schedule.slot.Date = str(schedule.slot.Date)
    database["specific_schedule"].update_one({"slot": schedule.slot.dict(), "cat": schedule.cat}, 
    {"$set": {"resp_id": schedule.resp_id}}, upsert=True)
