from datetime import datetime
from pymongo import MongoClient
client = MongoClient()
from typing import List, Optional
from unicodedata import category
from bson import ObjectId
from pydantic import BaseModel, Field
from dbaccess import *


database = client['HCMS_db']
#collection = database.list_collection_names(include_system_collections=False)
collection = database['Category']
cat_info = collection.find()
print(cat_info)
for cat in cat_info:
    print(cat['categories'])

class IncidentNotes(BaseModel):
    sender_id: str
    note: str
    timeStamp: datetime

#Msgs, btw student and responder
class IncidentMsgs(BaseModel):
    sender_id: str
    msg: str
    timeStamp: datetime

#Feedback provided by student
class IncidentFeedback(BaseModel):
    resolved: bool
    act_rating: int        #Action rating (1-5)
    respTime_rating: int   #Response_time rating (1-5)
    comments: str
    
class IncidentInfo(BaseModel, allow_population_by_field_name=True):
    id: Optional[PyObjectId] = Field(alias='_id')
    sub: Optional[str] = None #Subject
    cat: Optional[str] = None #incident categoty
    assigned: Optional[bool] = None
    resolved: Optional[bool] = None #student
    severity: Optional[int] = None
    resp_id: Optional[str] = None
    std_id: Optional[str] = None
    notes: Optional[List[IncidentNotes]] = None
    msgs: Optional[List[IncidentMsgs]] = None #student
    feedback: Optional[IncidentFeedback] = None #student


incident = IncidentInfo(cat = "sfsfsafs")
print(incident.cat)

StdInfo = get_student_info("ES18BTECH11013")
print(StdInfo)

class StudentInfo(BaseModel):
    id: Optional[str] = Field(alias='_id')
    name: Optional[str] = None
    room_no: Optional[str] = None
    ph_no: Optional[str] = None


Stdinfo = StudentInfo(id = 'es18btech11013@iith.ac.in')

print(Stdinfo)