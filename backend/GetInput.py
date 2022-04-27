import copy
from datetime import datetime
import os
# from lib2to3.pgen2.token import OP
from pydoc import resolve
from typing import Optional
from email.iterators import body_line_iterator
from fastapi import FastAPI
from typing import List, Optional
from pydantic import BaseModel
from pymongo import MongoClient
from starlette import SessionMiddleware
from Models import *

secret_key = os.environ['SESSION_SECRET']

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=secret_key)

def raiseTicket(TktInfo : TicketInfo):
    '''Function to raise a ticket after taking required student info.
       Return value is nothing but 'Incident Info'
    '''
    newIncident = IncidentInfo(sub=TktInfo.desc, cat=TktInfo.cat, std_id=TktInfo.id)
    #asssignIncident(newIncident)


@app.put("/student/raiseticket") 
def putTicketInfo(tkt : TicketInfo):
    raiseTicket(tkt)


##------------Admin put funcs------------##

@app.put("/updateincident") #Todo --URL changes
def putUpdateIncident(updatedIncident : IncidentInfo):
    pass
    #Make sure user is admin.
    #Appropriate priveleges
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
       
    #Calls updateIncident. Update those fields which are not None.

@app.put("/admin/updateOncallWeekly") 
def putOncallWeekly(updatedOncallW : OnCallWeekly):
    pass
    #Calls updateOncallWeekly. Update those fields which are not None.

@app.put("/admin/updateOncallSpecific") 
def putOncallSpecific(updatedOncallS : OnCallSpecific):
    pass
    #Calls updateOncallSpecific. Update those fields which are not None.

@app.put("/admin/updateResponderInfo") 
def updateResponderInfo(updateResp : ResponderInfo):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls updateResponderInfo. Update those fields which are not None.

@app.post("/admin/insertResponderInfo") 
def insertResponderInfo(newResp : ResponderInfo):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls insertResponderInfo. Update those fields which are not None.

@app.delete("/admin/delResponderInfo") 
def delResponderInfo(respId: str):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls insertResponderInfo. Update those fields which are not None.

@app.put("/admin/updateCategoryInfo") 
def updateCategoryInfo(oldCatName : str, newCatName):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls updateCategoryInfo. Update those fields which are not None.

@app.post("/admin/insertCategoryInfo") 
def insertCategoryInfo(newCat : str):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls updateCategoryInfo. Update those fields which are not None.

@app.delete("/admin/updateCategoryInfo") 
def updateCategoryInfo(updateCat : str):
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    pass
    #Calls updateCategoryInfo. Update those fields which are not None.



@app.get("/admin/incidentQuery") 
def getIncident(incidentQuery : IncidentInfo):
    pass
    #Calls IncidentQuery.
    #Make sure user is admin.
    # if not is_admin(get_curr_user()):
    #     raise HTTPException(status_code=404, detail="You do not have permission") --raise exception
    #     return error to UI
    #return Incident(s) as an array of IncidentInfo's

@app.get("/admin/OnCallWeeklyQuery") 
def getOnCallWeekly(respId: str, catName: str):
    pass
    #Calls OnCallWeekly


@app.get("/admin/OnCallSpecificQuery") 
def getOncallSpecific(respId: str, catName: str):
    pass
    #Calls IncidentQuery. Update those fields which are not None.
    #return Incident(s) as an array of IncidentInfo's

@app.get("/student/incidentQuery") 
def getIncident(incidentQuery : IncidentInfo):
    pass
    #Calls IncidentQuery. Update those fields which are not None.
    #return Incident(s) as an array of IncidentInfo's

@app.get("/responder/incidentQuery") 
def getIncident(incidentQuery : IncidentInfo):
    pass
    #Calls IncidentQuery. Update those fields which are not None.
    #return Incident(s) as an array of IncidentInfo's



