from fastapi import FastAPI
from pymongo import MongoClient

from Models import IncidentInfo, ResponderInfo, OnCallWeekly, OnCallSpecific

client = MongoClient()
database = client["HCMS_db"]

app = FastAPI()

class Record:

    def insertIncident(incident: IncidentInfo):  # Assuming input is in the right format
        database["Incidents"].insert_one(incident)

    def updateIncident(incident: IncidentInfo):
        database["Incidents"].replace_one({"_id": incident["_id"]}, incident)

    def deleteIncident(incident_id: str):
        database["Incidents"].delete_one({"_id": incident_id})


    def insertResponder(responder: ResponderInfo):
        database["Responder"].insert_one(responder)

    def updateResponder(responder: ResponderInfo):
        database["Responder"].replace_one({"_id": responder["_id"]}, responder)

    def deleteResponder(responder_id: str):
        database["Responder"].delete_one({"_id": responder_id})


    def insertCategory(cat: str):
        database["Category"].find()[0]["categories"].append(cat)

    def updateCategory(old_cat: str, new_cat: str):
        cats = database["Category"].find()[0]["categories"]
        cats.remove(old_cat)
        cats.append(new_cat)
        _ = database["Responder"].update_many({"cat": old_cat}, {"$set": {"cat": new_cat}})
        ## Update On-call schedule

    def deleteCategory(cat: str):
        database["Category"].find()[0]["categories"].remove(cat)


    def recordOnCallSchedule(self, schedule):  # What format will input be in?
        if isinstance(schedule, OnCallWeekly):
            self.recordWeeklyOnCallSchedule(schedule)
        else:
            self.recordSpecificOnCallSchedule(schedule)

    def recordWeeklyOnCallSchedule(schedule: OnCallWeekly):
        # How does this work
        pass

    def recordSpecificOnCallSchedule(schedule: OnCallSpecific):
        # How does this work
        pass
