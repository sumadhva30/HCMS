import copy
from datetime import datetime
# from lib2to3.pgen2.token import OP
from pydoc import resolve
from typing import Optional
from email.iterators import body_line_iterator
from fastapi import FastAPI
from typing import List, Optional
from pydantic import BaseModel
from pymongo import MongoClient

client = MongoClient()
database = client['HCMS_db']

app = FastAPI()


#Ticket info provided by student while raising ticket(apart from student info)
class TicketInfo(BaseModel):
    id: str    # Student roll number
    cat: str   #Problem_category
    desc: str  #Problem_desc

#This is not required..? We're storing only Student-id in incident.
class StudentInfo(BaseModel):
    pass

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




def getStudentInfo(id: str):
    collection = database['Student_Info']
    info = collection.find({"_id":id}) #search on roll no:
    return info

def raiseTicket(TktInfo : TicketInfo):
    '''Function to raise a ticket after taking required student info.
       Return value is nothing but 'Incident Info'
    '''
    #call asssign Incident
    #return incident

@app.put("/raiseticket") ##wtf is URL supposed to be brah
def getTicketInfo(tkt : TicketInfo):
    pass
    #Just call raiseTicket with tkt?



