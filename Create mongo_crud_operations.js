//InsertOne()
db.createCollection('books')
db.books.insertOne({
  title: "Deep Dive into React Hooks",
  ISBN: "000000000",
  thumbnailUrl: "",
  publicationDate: ISODate("2019-01-01T00:00:00.000Z"),
  authors: ["Ada Lovelace"],
});
/* {
  acknowledged: true,
  insertedId: ObjectId('65c3ae39b0031456d834f883')
} */

//replaceOne()
db.books.replaceOne(
  {_id: ObjectId("65c292b7dd77e720d30e243e")},
  {
    _id: ObjectId("65c292b7dd77e720d30e243e"),
    title: "Deep Dive into React Hooks",
    ISBN: "0-3182-1299-4",
    thumbnailUrl: "http://via.placeholder.com/640x360",
    publicationDate: ISODate("2022-07-28T02:20:21.000Z"),
    authors: ["Ada Lovelace"],
  }
);

db.books.replaceOne(
  {_id: ObjectId("65c292b7dd77e720d30e243e")},
  {
    title: "Deep Dive into React Hooks",
    ISBN: "0-3182-1299-6",
    thumbnailUrl: "http://via.placeholder.com/640x360",
    publicationDate: ISODate("2022-07-28T02:20:21.000Z"),
    authors: ["Ada Lovelace"],
  }
);
/* {
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
*/

//findOne()
db.books.findOne({_id: ObjectId("65c3ae39b0031456d834f883")});
/*{
  _id: ObjectId('65c3ae39b0031456d834f883'),
  title: 'Deep Dive into React Hooks',
  ISBN: '000000000',
  thumbnailUrl: '',
  publicationDate: 2019-01-01T00:00:00.000Z,
  authors: [
    'Ada Lovelace'
  ]
}
*/

//UPDATE OPERATORS
1. $set
//insertOne()- podcasts
db.podcasts.insertOne({
  _id: ObjectId("6261a92dfee1ff300dc80bf1"),
  title: "The MongoDB Podcast",
  platforms: ["Apple Podcasts", "Spotify"],
  year: 2022,
  hosts: [],
  premium_subs: 4152,
  downloads: 2,
  podcast_type: "audio",
});
/* {
  acknowledged: true,
  insertedId: ObjectId('6261a92dfee1ff300dc80bf1')
}
*/

//to find
db.podcasts.findOne({title: "The MongoDB Podcast"});
db.podcasts.findOne({_id: ObjectId("6261a92dfee1ff300dc80bf1")});
/* {
  _id: ObjectId('6261a92dfee1ff300dc80bf1'),
  title: 'The MongoDB Podcast',
  platforms: [
    'Apple Podcasts',
    'Spotify'
  ],
  year: 2022,
  hosts: [],
  premium_subs: 4152,
  downloads: 2,
  podcast_type: 'audio'
} */

//update()
db.podcasts.updateOne(
  {title: "The Developer Hub"},
  {$set: {topics: ["databases", "MongoDB"]}}
);
/*{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}*/

//to confirm 
db.podcasts.findOne({title: "The Developer Hub"});
>>> null

//$push
db.podcasts.updateOne(
  {_id: ObjectId("6261a92dfee1ff300dc80bf1")},
  {$push: {hosts: "Nic Raboy"}}
);
/*{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}*/

//confirm
db.podcasts.findOne({title: "The Developer Hub"});
>>>null

//Upsert
db.podcasts.updateOne(
  {title: "The Developer Hub"},
  {$set: {topics: ["databases", "MongoDB"]}},
  {upsert:true}
);
/* {
  acknowledged: true,
  insertedId: ObjectId('65c3b605893bf657c4621ab0'),
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 1
} */

//forFind&Modify
db.podcasts.insertOne({
  title: "The Atlas Podcast",
  platforms: ["Apple Podcasts", "Spotify"],
  downloads: 6012,
});
/* {
  acknowledged: true,
  insertedId: ObjectId('65c3b6bdb0031456d834f884')
} */

//find&Modify
db.podcasts.findAndModify({
  query: {_id: ObjectId("65c2a217dd77e720d30e243f")},
  update: {$inc: {downloads: 1}},
  new: true,
});
>>> null

//updateMany()
db.books.updateMany(
  {publishedDate: {$lt: ISODate("2017-04-27T08:00:00.000+00:00")}},
  {$set: {status: "NEW"}}
);
/*{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
} */

//insertForUpdateMany()
db.books.insertMany([
  {
    _id: 17,
    title: "MongoDB in Action",
    isbn: "1935182870",
    pageCount: 0,
    publishedDate: ISODate("2011-12-12T08:00:00.000Z"),
    thumbnailUrl:
      "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/banker.jpg",
    shortDescription: "MongoDB In Action is a comprehensive guide to MongoDB",
    longDescription:
      "MongoDB is a document-oriented database that's highly scalable and delivers very high-performance",
    status: "LEGACY",
    authors: ["Kyle Banker"],
    categories: ["Next Generation Databases"],
    instock: false,
  },
  {
    _id: 18,
    title: "Node.js in Action",
    isbn: "1617292575",
    pageCount: 0,
    publishedDate: ISODate("2013-10-15T08:00:00.000Z"),
    thumbnailUrl: "https://example.com/nodejs.jpg",
    shortDescription: "Node.js in Action is a comprehensive guide to Node.js",
    longDescription:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    status: "LEGACY",
    authors: [
      "Mike Cantelon",
      "Marc Harter",
      "TJ Holowaychuk",
      "Nathan Rajlich",
    ],
    categories: ["Web Development", "Node.js"],
    instock: false,
  },
  {
    _id: 19,
    title: "Learning React",
    isbn: "1491954620",
    pageCount: 0,
    publishedDate: ISODate("2017-04-27T08:00:00.000Z"),
    thumbnailUrl: "https://example.com/react.jpg",
    shortDescription: "Learning React is a comprehensive guide to React",
    longDescription:
      "React is a JavaScript library for building user interfaces.",
    status: "LEGACY",
    authors: ["Alex Banks", "Eve Porcello"],
    categories: ["Web Development", "React"],
    instock: false,
  },
]);
/* {
  acknowledged: true,
  insertedIds: {
    '0': 17,
    '1': 18,
    '2': 19
  }
} */

//deleteOne()
db.birds.deleteOne({_id: ObjectId("65c3ba34b0031456d834f885")});
/* {
  acknowledged: true,
  deletedCount: 1
} */

//for finding many birds
db.birds.find({conservationStatus:"Least Concern"})

//deleting many
db.birds.deleteMany({conservationStatus:"Least Concern"})
/* {
  acknowledged: true,
  deletedCount: 2
} */

//cursorSort()
----ascending order-----
db.listingsAndReviews.find({bed_type: "Real Bed"}).sort({name: 1});
----descending order----
db.listingsAndReviews.find({bed_type: "Real Bed"}).sort({name: -1});

----to simplify for understanding, we can use projections----
db.listingsAndReviews.find({bed_type: "Real Bed"}, {name: 1}).sort({name: 1});
db.listingsAndReviews.find({bed_type: "Real Bed"}, {name: -1}).sort({name: -1});

----limiting results to n-----
db.listingsAndReviews
  .find({bed_type: "Real Bed"}, {property_type: "Apartment"})
  .sort({name: -1})
  .limit(3);

//projection
-----to find restaurants-----
db.restaurants.findOne({borough: "Brooklyn"});
>>> null
-----to project-------
db.restaurants.findOne({borough: "Brooklyn"}, {cuisine: 1, zipcode: 1});
>>> null
-----for neglecting id - exclusion-----
db.restaurants.findOne({borough: "Brooklyn"}, {cuisine: 0, zipcode: 0, _id: 0});
>>> null
-----exclusion------
db.restaurants.findOne({borough: "Brooklyn"}, {cuisine: 1, zipcode: 1, _id: 0});
>>> null

-----switch to training_sample db to run these-----
db.inspections.find(
    { sector: "Restaurant - 818" },
    { business_name: 1, result: 1, _id: 0 }
  )

db.inspections.find(
    { result: { $in: ["Pass", "Warning"] } },
    { date: 0, "address.zip": 0 }
)

//count()
db.trips.countDocuments();
>>> 10000
//for counting trip duration more than 12o and subsriber
db.trips.countDocuments({tripduration: {$gt: 120}, usertype: "Subscriber"});
>>> 7847

//insertOneUsingCRUD.py
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime
import pprint

uri = "mongodb+srv://swaraajreddy:304044swcluster0.pugwlss.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # inserting one account
    new_account = {
        "account_holder": "Linus Torvalds",
        "account_id": "MDB829001337",
        "account_type": "checking",
        "balance": 50352434,
        "last_updated": datetime.datetime.utcnow(),
    }

    # Write an expression that inserts the 'new_account' document into the 'accounts' collection.
    result = accounts_collection.insert_one(new_account)

    document_id = result.inserted_id
    pprint(f"_id of inserted document: {document_id}")


except Exception as e:
    print(e)
finally:
    client.close()

Output: # of documents inserted: 2
_ids of inserted documents: [ObjectId('65c3ca08a67a27d5f4f20046'), ObjectId('65c3ca08a67a27d5f4f20047')]

//insertManyUsingCRUD.py
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime

uri = "mongodb+srv//swaraajreddy:304044sw@cluster0.pugwlss.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # inserting many accounts
    new_accounts = [
        {
            "account_id": "MDB011235813",
            "account_holder": "Ada Lovelace",
            "account_type": "checking",
            "balance": 60218,
        },
        {
            "account_id": "MDB829000001",
            "account_holder": "Muhammad ibn Musa al-Khwarizmi",
            "account_type": "savings",
            "balance": 267914296,
        },
    ]

    # Write an expression that inserts the 'new_account' document into the 'accounts' collection.
    result = accounts_collection.insert_many(new_accounts)

    document_ids = result.inserted_ids
    print("# of documents inserted: " + str(len(document_ids)))
    print(f"_ids of inserted documents: {document_ids}")


except Exception as e:
    print(e)
finally:
    client.close()

-----------
//findManyCRUD.py
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint
uri = "mongodb+srv://swaraajreddy:304044sw@cluster0.pugwlss.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # inserting one account
    documents_to_find = {"balance": {"$gt": 4700}}

    # Write an expression that selects the documents matching the query constraint in the 'accounts' collection.
    cursor = accounts_collection.find(documents_to_find)

    num_docs = 0
    for document in cursor:
        num_docs += 1
        pprint.pprint(document)
        print()
    print("# of documents found: " + str(num_docs))


except Exception as e:
    print(e)
finally:
    client.close()

	OUTPUT:

/* {'_id': ObjectId('65c3ca08a67a27d5f4f20046'),
 'account_holder': 'Ada Lovelace',
 'account_id': 'MDB011235813',
 'account_type': 'checking',
 'balance': 60218}

{'_id': ObjectId('65c3ca08a67a27d5f4f20047'),
 'account_holder': 'Muhammad ibn Musa al-Khwarizmi',
 'account_id': 'MDB829000001',
 'account_type': 'savings',
 'balance': 267914296}

{'_id': ObjectId('65c3cc67b197046571db80dd'),
 'account_holder': 'Linus Torvalds',
 'account_id': 'MDB829001337',
 'account_type': 'checking',
 'balance': 50352434,
 'last_updated': datetime.datetime(2024, 2, 7, 18, 31, 3, 265000)}

# of documents found: 3 */


----------------
//findOneCRUD.py
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint
uri = "mongodb+srv://swaraajreddy:304044sw.pugwlss.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # inserting one account
    doccument_to_find = {
        "_id": ObjectId("65c2caeaae6140696995984e")
    }

    # Write an expression that inserts the 'new_account' document into the 'accounts' collection.
    result = accounts_collection.insert_one(doccument_to_find)

    pprint.pprint(result)


except Exception as e:
    print(e)
finally:
    client.close()

/*
InsertOneResult(ObjectId('65c2caeaae6140696995984e'), acknowledged=True) 
*/
