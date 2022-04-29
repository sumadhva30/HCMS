import copy
from datetime import datetime
from http import HTTPStatus
import os
import json
from bson import json_util
# from lib2to3.pgen2.token import OP
from pydoc import resolve
from typing import Optional
from email.iterators import body_line_iterator
from urllib.request import Request
from fastapi import FastAPI, Form
from typing import List, Optional
from pydantic import BaseModel
from pymongo import MongoClient
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from requests import get
from Models import *
from search import *
from record import *
from update import *
from dbaccess import get_categories, get_student_info
from auth import *

secret_key = os.environ['SESSION_SECRET']
origins = ['http://localhost', 'http://localhost:3000', 'http://localhost:8000']

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=secret_key)
app.add_middleware(CORSMiddleware, allow_origins=origins,
    allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

def raiseTicket(TktInfo : TicketInfo):
    '''Function to raise a ticket after taking required student info.
       Return value is nothing but 'Incident Info'
    '''
    StdInfo = get_student_info(TktInfo.id)
    StdInfObj = StudentInfo(**StdInfo, by_alias = True)
    print(StdInfObj)
    initial_desc = IncidentMsgs(sender_id=TktInfo.id, msg=TktInfo.desc, timeStamp=datetime.now())
    newIncident = IncidentInfo(sub=TktInfo.sub, cat=TktInfo.cat, std_info=StdInfObj, msgs=[initial_desc])
    assign_incident(newIncident)


###--------API Endpints--------###

@app.post("/student/raiseticket") 
async def putTicketInfo(tkt : TicketInfo):
    raiseTicket(tkt)

@app.put("/updateincident") #Todo --URL changes
async def putUpdateIncident(updatedIncident : IncidentInfo, request: Request):
    #Make sure user is admin.
    #Appropriate priveleges
    # student_cant_access = ["sub", "cat", "assigned", "severity", "resp_id", "std_info", "notes"]
    # responder_cant_access = ["sub", "cat", "assigned", "resp_id", "std_id", "notes"]

    # if any([getattr(updatedIncident, k) is not None for k in student_cant_access]):
    #     atleast_responder()
    # if any([getattr(updatedIncident, k) is not None for k in responder_cant_access]):
    #     only_admin()
    
    # if is_student(request) and my_email(request) != updatedIncident.std_info.id or \
    #     is_responder(request) and my_email(request) != updatedIncident.resp_id:
    #         raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="You do not have permission")

    update_incident(updatedIncident)


@app.put("/admin/updateOncallWeekly") 
async def putOncallWeekly(updatedOncallW : OnCallWeekly):
    update_weekly_oncall_schedule(updatedOncallW)
    #Calls updateOncallWeekly. Update those fields which are not None.

@app.put("/admin/updateOncallSpecific") 
async def putOncallSpecific(updatedOncallS : OnCallSpecific):
    update_specific_oncall_schedule(updatedOncallS)
    #Calls updateOncallSpecific. Update those fields which are not None.

@app.post("/admin/insertResponderInfo") 
async def insertResponderInfo(newResp : ResponderInfo):
    insert_responder(newResp)

@app.put("/admin/updateResponderInfo") 
async def updateResponderInfo(updateResp : ResponderInfo):
    update_responder(updateResp)

@app.delete("/admin/delResponderInfo") 
async def delResponderInfo(respId: str):
    delete_responder(respId)

@app.get("/viewCategories")
async def viewCategories():
    return json.loads(json_util.dumps(get_categories()))

@app.put("/admin/updateCategoryInfo") 
async def updateCategoryInfo(oldCatName : str, newCatName : str):
    update_category(oldCatName, newCatName)

@app.post("/admin/insertCategoryInfo") 
async def insertCategoryInfo(newCat : str):
    insert_category(newCat)

@app.delete("/admin/delCategoryInfo") 
async def delCategoryInfo(delCat : str):
    delete_category(delCat)

@app.post("/IncidentQuery")   #Cmon to all users
async def getIncident(incidentQuery : IncidentInfo, request: Request):

    # student_cant_access = ["notes"]
    # if any([getattr(incidentQuery, k) is not None for k in student_cant_access]):
    #     atleast_responder()
    # if is_student(request) and my_email(request) != incidentQuery.std_info.id or \
    #     is_responder(request) and my_email(request) != incidentQuery.resp_id:
    #         raise HTTPException(status_code=HTTPStatus.FORBIDDEN, detail="You do not have permission")
    
    incidents = search_incidents(incidentQuery)
    return json.loads(json_util.dumps(incidents))

@app.post("/admin/OnCallWeeklyQuery") 
async def getOnCallWeekly(weeklySchedQuery: OnCallWeekly):
    onCallList = search_weekly_oncall_schedule(weeklySchedQuery)
    return json.loads(json_util.dumps(onCallList))
    #Calls OnCallWeekly


@app.post("/admin/OnCallSpecificQuery") 
async def getOncallSpecific(specificSchedQuery: OnCallSpecific):
    onCallList = search_specific_oncall_schedule(specificSchedQuery)
    return json.loads(json_util.dumps(onCallList))


@app.post("/gsignin")
async def sign_in(request: Request, credential: str = Form(...)):
    return google_landing(credential, request)

@app.get("/signout")
async def sign_out(request: Request):
    return google_logout(request)

@app.get("/user_type")
async def user_type(request: Request):#, response_model=UserTypeResponseModel):
    STUDENT = 0
    RESPONDER = 1
    ADMIN = 2
    LOGGEDOUT = 3
    try:
        res = UserTypeResponseModel(email=my_email(request), user_type=STUDENT)
        if is_admin(request):
            res.user_type = ADMIN
        elif is_responder(request):
            res.user_type = RESPONDER
        return res
    except HTTPException as e:
        if e.status_code == HTTPStatus.UNAUTHORIZED:
            return UserTypeResponseModel(email='', user_type=LOGGEDOUT)
        raise