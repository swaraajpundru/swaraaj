//MongoDbOperators

//LogicalOperators
//and
db.airbnb.find({$and: [{amenities: "Wifi"}, {amenities: "TV"}]});

//and or 
db.air.find(
$and: [
{$or: [amenities: "Wifi"3, {amenities: "TV"3]},
{$or: [amenities: "Kitchen"}, {amenities: "Heating"}]},
] ,
) ;

//Grades Collection
use local
db.createCollection("grades");
//insertOne
db.grades.insertOne({
  student_id: 654321,
  products: [
    {
      type: "exam",
      score: 90,
    },
    {
      type: "homework",
      score: 59,
    },
    {
      type: "quiz",
      score: 75,
    },
    {
      type: "homework",
      score: 88,
    },
  ],
  class_id: 550,
})
//insertMany
db.grades.insertMany([
  {
    student_id: 546789,
    products: [
      {
        type: "quiz",
        score: 50,
      },
      {
        type: "homework",
        score: 70,
      },
      {
        type: "quiz",
        score: 66,
      },
      {
        type: "exam",
        score: 70,
      },
    ],
    class_id: 551,
  },
  {
    student_id: 777777,
    products: [
      {
        type: "exam",
        score: 83,
      },
      {
        type: "quiz",
        score: 59,
      },
      {
        type: "quiz",
        score: 72,
      },
      {
        type: "quiz",
        score: 67,
      },
    ],
    class_id: 550,
  },
  {
    student_id: 223344,
    products: [
      {
        type: "exam",
        score: 45,
      },
      {
        type: "homework",
        score: 39,
      },
      {
        type: "quiz",
        score: 40,
      },
      {
        type: "homework",
        score: 88,
      },
    ],
    class_id: 551,
  },
])

//greaterThan
db.grades.find({ grade: { $gt:59  } })
//lessThan
db.grades.find({ "products.score": { $lt: 59  } })

//or operation
db.listingsAndReviews.find({$or: [{amenities: "Wifi"}, {amenities: "TV"}]});

//mongoPythonConnection
import mongopy
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://swaraajreddy:304044Sw6@cluster0.pugwlss.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    '''for db_name in client.list_database_names():
        print(db_name)*/''' #once sucessfully established connection
except Exception as e:
    print(e
