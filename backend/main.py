from email.iterators import body_line_iterator
from typing import Optional
from fastapi import FastAPI
from pymongo import MongoClient


app = FastAPI()
client = MongoClient()

database = client['HCMS_db']
#collection = database.list_collection_names(include_system_collections=False)
collection = database['Category']

@app.get("/")
async def read_root():
    cat_info = collection.find()
    for cat in cat_info:
        return {"Categories": cat['categories']}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

is_admin
is_responder
is_student
get_email()

@app.get("/incidents/search")
def input_search_incidents():
    ...
    if(not is_admin()) {
        return some error
    }
    query = read request body
    ret = search_incidents(query)
    return processed ret