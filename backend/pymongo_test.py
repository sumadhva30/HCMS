import pymongo
from pymongo import MongoClient

client = MongoClient()

client = MongoClient('localhost', 27017)

db = client.HCMS_db

res = {"Responder_id": 2345, "Responder_name": "Govind B", "Category": "Green_office"}

db.Responder.insert_one(res)