from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

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
    Fn_id: str  #Responder id for forenoon/afternoon slots
    An_id: str

class SpecificSlot(BaseModel):
    Date: str  
    Time: str   #"An"/"Fn"

class OnCallWeekly(BaseModel):
    cat: Optional[str] = None
    schedule: Optional[List[WeeklySlot]] = None

class OnCallSpecific(BaseModel):
    slot: Optional[SpecificSlot] = None
    cat: Optional[str] = None
    resp_id: Optional[str] = None

