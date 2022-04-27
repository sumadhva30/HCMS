from typing import List
from fastapi import FastAPI
from Models import IncidentInfo, OnCallSpecific, OnCallWeekly, ResponderInfo, ResponderSummaryModel
from dbaccess import database

app = FastAPI()

def search_incidents(query: IncidentInfo) -> List[IncidentInfo]:
    eq_searchable = ['_id', 'cat', 'assigned', 'resolved', 'severity', 'resp_id', 'std_id']
    # only sub is text searchable

    query_doc = {}
    for k, v in query.dict(by_alias=True).items():
        if v is not None and k in eq_searchable:
            query_doc[k] = v
        if v is not None and k == 'sub':
            query_doc['$text'] = {'$search':v}
    
    return list(database["Incidents"].find(query_doc)[:100]) # todo paging

def search_responders(query: ResponderInfo) -> List[ResponderSummaryModel]:
    # all fields eq searchable
    query_doc = {k: v for k, v in query.dict(by_alias=True).items() if v is not None}
    responders = list(database["Responders"].find(query_doc)[:100]) # todo paging
    responders_dict = {r['_id']: ResponderSummaryModel(r) for r in responders}

    agg_incidents = database["Incidents"].aggregate([{
        '$group': {
            '_id': '$resp_id',
            'open': {'$sum': {'$cond': ['$resolved', 0, 1]}},
            'resolved': {'$sum': {'$cond': ['$resolved', 1, 0]}}
        }
    }])
    # dirty join
    for rec in agg_incidents:
        rid = rec['_id']
        responders_dict[rid].num_open_incidents = rec['open']
        responders_dict[rid].num_resolved_incidents = rec['resolved']
    
    return list(responders_dict.values())

def search_specific_oncall_schedule(query: OnCallSpecific) -> List[OnCallSpecific]:
    search_options = {k: v for k, v in query.dict(by_alias=True).items() if v is not None}
    return list(database["specific_schedule"].find(search_options)[:100])

def search_weekly_oncall_schedule(query: OnCallWeekly) -> List[OnCallWeekly]:
    print(query)
    return list(database["weekly_schedule"].find({"cat": query.cat})[:100])

