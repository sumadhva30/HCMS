from operator import ne
from fastapi import FastAPI
from pymongo import MongoClient

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

client = MongoClient()
database = client["HCMS_db"]

app = FastAPI()

class Record:

    def insertIncident(incident: IncidentInfo):  # Assuming input is in the right format
        return database["Incidents"].insert_one(incident)

    def updateIncident(incident: IncidentInfo):
        database["Incidents"].replace_one({"_id": incident["_id"]}, incident)

    def deleteIncident(incident: IncidentInfo):
        database["Incidents"].delete_one({"_id": incident["_id"]})


    def insertResponder(responder: ResponderInfo):
        return database["Responder"].insert_one(responder)

    def updateResponder(responder: ResponderInfo):
        database["Responder"].replace_one({"_id": responder["_id"]}, responder)

    def deleteResponder(responder_id: str):
        database["Responder"].delete_one({"_id": responder_id})
        _ = database["Incidents"].update_many({"resp_id": responder_id, "resolved": False}, {"$set": {"resp_id": None, "assigned": False}})


    def insertCategory(cat: str):
        database["Category"].find()[0]["categories"].append(cat)

    def updateCategory(old_cat: str, new_cat: str):
        cats = database["Category"].find()[0]["categories"]
        cats.remove(old_cat)
        cats.append(new_cat)
        _ = database["Responder"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
        _ = database["Incidents"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
        _ = database["weekly_schedule"].update_one({"cat": old_cat}, {"$set": {"cat": new_cat}})
        _ = database["specific_schedule"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})

    def deleteCategory(cat: str):
        database["Category"].find()[0]["categories"].remove(cat)


    def recordWeeklyOnCallSchedule(schedule: OnCallWeekly):
        if schedule.cat is None:
            return
        cat_schedule = database["weekly_schedule"].find({"cat": schedule.cat})[0]
        for day, slot in vars(schedule):
            if day == "cat":
                continue
            if slot.Fn_id:
                cat_schedule[day]["Fn"] = slot.Fn_id
            if slot.An_id:
                cat_schedule[day]["An"] = slot.An_id

    def recordSpecificOnCallSchedule(schedule: OnCallSpecific):
        
        pass
