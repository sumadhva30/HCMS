from bson import ObjectId
from typing import List, Optional
import Models

from pymongo import MongoClient

from backend.Models import IncidentInfo, OnCallSpecific, OnCallWeekly, ResponderModel, ResponderSummaryModel
client = MongoClient()

database = client['HCMS_db']

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
