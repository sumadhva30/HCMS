from fastapi import FastAPI
from pymongo import MongoClient

client = MongoClient()
database = client["HCMS_db"]

app = FastAPI()

class Search:

    def searchIncidents(query: dict):  # what format will the query be in? I assume we have to do some processing here
        result = database["Incidents"].find(query)
        return result

    def searchResponders(query: dict):  # what format will the query be in? I assume we have to do some processing here
        result = database["Responder"].find(query)
        return result

    def searchOnCallSchedule(query: dict):
        # How does this work lol
        pass

