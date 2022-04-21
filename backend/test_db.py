from pymongo import MongoClient
client = MongoClient()

database = client['HCMS_db']
#collection = database.list_collection_names(include_system_collections=False)
collection = database['Category']
cat_info = collection.find()
print(cat_info)
for cat in cat_info:
    print(cat['categories'])
