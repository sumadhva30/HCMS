from bson import ObjectId
from typing import List, Optional

from pymongo import MongoClient

client = MongoClient()

database = client['HCMS_db']

def get_student_info(std_id):
    collection = database['Student_Info']
    info =  collection.find_one({"_id" : std_id})
    return info

def all_admins():
    cursor = database["Admins"].find()
    return [admin["email"] for admin in cursor]

def get_student_id(incident):
    print(vars(incident))
    inc = database["Incidents"].find_one({"_id": incident.id})
    return inc["std_info"]["id"]

def get_responder_id(incident):
    inc = database["Incidents"].find_one({"_id": incident.id})
    return inc["resp_id"]

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
