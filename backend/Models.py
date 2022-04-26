from datetime import datetime
from socket import SOL_NETROM
from token import OP
from typing import List, Optional
from unicodedata import category
from bson import ObjectId
from pydantic import BaseModel, Field
from dbaccess import PyObjectId

#Ticket info provided by student while raising ticket(apart from student info)
class TicketInfo(BaseModel):
    id: str    # Student roll number
    cat: str   #Problem_category
    desc: str  #Problem_desc


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


class IncidentInfo(BaseModel):
    id: Optional[ObjectId] = Field(..., alias='_id')
    sub: Optional[str] = None #Subject
    cat: Optional[str] = None #incident categoty
    assigned: Optional[bool] = None
    resolved: Optional[bool] = None
    severity: Optional[int] = None
    resp_id: Optional[str] = None
    std_id: Optional[str] = None
    notes: Optional[List[IncidentNotes]] = None
    msgs: Optional[List[IncidentMsgs]] = None
    feedback: Optional[IncidentFeedback] = None

class WeeklySlot(BaseModel):
    Fn_id: Optional[str] = None #Responder id for forenoon/afternoon slots
    An_id: Optional[str] = None

class SpecificSlot(BaseModel):
    Date: datetime  
    Slot: str   #"An"/"Fn"

class OnCallWeekly(BaseModel):
    id: Optional[ObjectId] = Field(..., alias='_id')
    cat: Optional[str] = None
    monday: Optional[WeeklySlot] = None
    tuesday: Optional[WeeklySlot] = None
    wednesday: Optional[WeeklySlot] = None
    thursday: Optional[WeeklySlot] = None
    friday: Optional[WeeklySlot] = None
    saturday: Optional[WeeklySlot] = None
    sunday: Optional[WeeklySlot] = None

class OnCallSpecific(BaseModel):
    id: Optional[ObjectId] = Field(..., alias='_id')
    slot: Optional[SpecificSlot] = None
    cat: Optional[str] = None
    resp_id: Optional[str] = None

class ResponderInfo(BaseModel):
    id: Optional[str] = Field(..., alias='_id')
    name: Optional[str] = None
    category: Optional[List[str]] = None

class ResponderSummaryModel(ResponderInfo):
    num_open_incidents: int
    num_resolved_incidents: int
