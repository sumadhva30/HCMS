from fastapi import FastAPI
from pymongo import MongoClient

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

client = MongoClient()
database = client["HCMS_db"]

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
    return database["Category"].find_one()["categories"].append(cat)

def update_category(old_cat: str, new_cat: str):
    cats = database["Category"].find_one()["categories"]
    cats.remove(old_cat)
    cats.append(new_cat)
    _ = database["Responder"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["Incidents"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["weekly_schedule"].update_one({"cat": old_cat}, {"$set": {"cat": new_cat}})
    _ = database["specific_schedule"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})

def delete_category(cat: str):
    database["Category"].find_one()["categories"].remove(cat)


def record_weekly_on_call_schedule(schedule: OnCallWeekly):
    if schedule.cat is None:
        return
    cat_schedule = database["weekly_schedule"].find_one({"cat": schedule.cat})
    for day, slot in vars(schedule):
        if day == "cat":
            continue
        if slot.Fn_id:
            cat_schedule[day]["Fn"] = slot.Fn_id
        if slot.An_id:
            cat_schedule[day]["An"] = slot.An_id

def recordSpecificOnCallSchedule(schedule: OnCallSpecific):
    
    pass
