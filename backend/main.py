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