from bson import ObjectId
from typing import List, Optional

from pymongo import MongoClient

client = MongoClient()

database = client['HCMS_db']

def get_student_info(std_id):
    collection = database['Student_Info']
    info =  collection.find({"_id" : std_id})
    for inf in info:
        return inf

def all_admins():
    cursor = database["Admins"].find()
    return [admin["email"] for admin in cursor]

def stripNone(data):
    if isinstance(data, dict):
        return {k:stripNone(v) for k, v in data.items() if k is not None and v is not None}
    elif isinstance(data, list):
        return [stripNone(item) for item in data if item is not None]
    elif isinstance(data, tuple):
        return tuple(stripNone(item) for item in data if item is not None)
    elif isinstance(data, set):
        return {stripNone(item) for item in data if item is not None}
    else:
        return data

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
