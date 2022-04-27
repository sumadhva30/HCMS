from datetime import datetime, date
from tokenize import Name
from typing import List, Optional
from unicodedata import category
from bson import ObjectId
from pydantic import BaseModel, Field
from dbaccess import PyObjectId

#Ticket info provided by student while raising ticket(apart from student info)
class TicketInfo(BaseModel):
    id: str    # Student roll number
    cat: str   #Problem_category
    sub: str   #Problem_title
    desc: str  #Problem_desc


class StudentInfo(BaseModel):
    id: Optional[str] = Field(alias='_id')
    name: Optional[str] = None
    room_no: Optional[str] = None
    ph_no: Optional[str] = None
    
#Notes, posted by admin/responder
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
    severity: Optional[int] = 1
    resp_id: Optional[str] = None
    std_info: Optional[StudentInfo] = None
    notes: Optional[List[IncidentNotes]] = None
    msgs: Optional[List[IncidentMsgs]] = None #student
    feedback: Optional[IncidentFeedback] = None #student

class WeeklySlot(BaseModel):
    Fn_id: Optional[str] = None #Responder id for forenoon/afternoon slots
    An_id: Optional[str] = None

class SpecificSlot(BaseModel):
    Date: datetime
    Time: str   #"An"/"Fn"

class OnCallWeekly(BaseModel, allow_population_by_field_name=True):
    id: Optional[PyObjectId] = Field(alias='_id')
    cat: Optional[str] = None
    monday: Optional[WeeklySlot] = None
    tuesday: Optional[WeeklySlot] = None
    wednesday: Optional[WeeklySlot] = None
    thursday: Optional[WeeklySlot] = None
    friday: Optional[WeeklySlot] = None
    saturday: Optional[WeeklySlot] = None
    sunday: Optional[WeeklySlot] = None

class OnCallWeeklyQuery(BaseModel):
    resp_id: Optional[str] = None
    cat: Optional[str] = None
    date: Optional[datetime] = None

class OnCallSpecific(BaseModel, allow_population_by_field_name=True):
    id: Optional[PyObjectId] = Field(alias='_id')
    slot: Optional[SpecificSlot] = None
    cat: Optional[str] = None
    resp_id: Optional[str] = None

class ResponderInfo(BaseModel, allow_population_by_field_name=True):
    id: Optional[str] = Field(alias='_id')
    name: Optional[str] = None
    category: Optional[List[str]] = None

class ResponderSummaryModel(ResponderInfo):
    num_open_incidents: int
    num_resolved_incidents: int

class GoogleCredentialResponse(BaseModel):
    credential: str # only this is required
