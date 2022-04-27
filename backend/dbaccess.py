from bson import ObjectId
from typing import List, Optional

from pymongo import MongoClient

client = MongoClient()

database = client['HCMS_db']

def get_student_info(std_id):
    collection = database['Student_info']
    info =  collection.find({"_id" : std_id})
    for inf in info:
        return inf

def all_admins():
    cursor = database["Admins"].find()
    return [admin["email"] for admin in cursor]


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
