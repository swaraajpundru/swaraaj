#insetone
  from pymongo import MongoClient
from pymongo.server_api import ServerApi
import datetime
import pprint

# MongoDB connection URI
uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Check if the server is available
    client.admin.command('ping')
    
    # Connect to the database and collections
    db = client.blog
    articles_collection = db.articles
    comments_collection = db.comments
    
    # Function to create a new article
    def create_article(title, content, author):
        new_article = {
            "title": title,
            "content": content,
            "author": author,
            "created_at": datetime.datetime.utcnow(),
            "comments": []
        }
        result = articles_collection.insert_one(new_article)
        return result.inserted_id
    
    # Function to read all articles
    def read_all_articles():
        return articles_collection.find()
    
    # Function to update an article by ID
    def update_article(article_id, new_content):
        articles_collection.update_one({"_id": article_id}, {"$set": {"content": new_content}})
    
    # Function to delete an article by ID
    def delete_article(article_id):
        articles_collection.delete_one({"_id": article_id})
    
    # Function to add a comment to an article
    def add_comment(article_id, commenter, text):
        new_comment = {
            "commenter": commenter,
            "text": text,
            "created_at": datetime.datetime.utcnow()
        }
        articles_collection.update_one({"_id": article_id}, {"$push": {"comments": new_comment}})
    
    # Create a new article
    article_id = create_article("Introduction to MongoDB", "MongoDB is a NoSQL database.", "Alice")
    print(f"Created article with ID: {article_id}")
    
    # Read all articles
    print("\nAll articles:")
    for article in read_all_articles():
        pprint.pprint(article)
    
    # Update an article
    update_article(article_id, "MongoDB is a powerful and scalable NoSQL database.")
    print("\nUpdated article content.")
    
    # Add a comment to an article
    add_comment(article_id, "Bob", "Great introduction to MongoDB!")
    print("\nAdded comment to the article.")
    
    # Read the updated article
    updated_article = articles_collection.find_one({"_id": article_id})
    pprint.pprint(updated_article)
    
    # Delete the article
    delete_article(article_id)
    print("\nDeleted article.")
    
except Exception as e:
    print("An error occurred:", e)
finally:
    # Close the MongoDB connection
    client.close()

2)insertmany
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import datetime
import pprint

# MongoDB connection URI
uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to the 'blog' database
    db = client.blog

    # Get reference to the 'articles' collection
    articles_collection = db.articles

    # Function to create a new article
    def create_article(title, content, author):
        new_article = {
            "title": title,
            "content": content,
            "author": author,
            "created_at": datetime.datetime.utcnow(),
            "comments": []
        }
        result = articles_collection.insert_one(new_article)
        return result.inserted_id

    # Function to read all articles
    def read_all_articles():
        return articles_collection.find()

    # Function to read an article by ID
    def read_article(article_id):
        return articles_collection.find_one({"_id": article_id})

    # Function to update an article's content by ID
    def update_article(article_id, new_content):
        articles_collection.update_one({"_id": article_id}, {"$set": {"content": new_content}})

    # Function to delete an article by ID
    def delete_article(article_id):
        articles_collection.delete_one({"_id": article_id})

    # Function to add a comment to an article
    def add_comment(article_id, commenter, text):
        new_comment = {
            "commenter": commenter,
            "text": text,
            "created_at": datetime.datetime.utcnow()
        }
        articles_collection.update_one({"_id": article_id}, {"$push": {"comments": new_comment}})

    # Create a new article
    article_id = create_article("Introduction to MongoDB", "MongoDB is a NoSQL database.", "Alice")
    print(f"Created article with ID: {article_id}")

    # Read all articles
    print("\nAll articles:")
    for article in read_all_articles():
        pprint.pprint(article)

    # Update an article
    update_article(article_id, "MongoDB is a powerful and scalable NoSQL database.")
    print("\nUpdated article content.")

    # Read the updated article
    updated_article = read_article(article_id)
    pprint.pprint(updated_article)
    add_comment(article_id, "Bob", "Great introduction to MongoDB!")
    print("\nAdded comment to the article.")
    article_with_comments = read_article(article_id)
    pprint.pprint(article_with_comments)
    delete_article(article_id)
    print("\nDeleted article.")

except Exception as e:
    print("An error occurred:", e)
finally:

    client.close()
3)read
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import datetime
import pprint

# MongoDB connection URI
uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to the 'blog' database
    db = client.blog

    # Get reference to the 'articles' collection
    articles_collection = db.articles

    # Function to create a new article
    def create_article(title, content, author):
        new_article = {
            "title": title,
            "content": content,
            "author": author,
            "created_at": datetime.datetime.utcnow(),
            "comments": []
        }
        result = articles_collection.insert_one(new_article)
        return result.inserted_id

    # Function to read all articles
    def read_all_articles():
        return articles_collection.find()

    # Function to read an article by ID
    def read_article(article_id):
        return articles_collection.find_one({"_id": article_id})

    # Function to update an article's content by ID
    def update_article(article_id, new_content):
        articles_collection.update_one({"_id": article_id}, {"$set": {"content": new_content}})

    # Function to delete an article by ID
    def delete_article(article_id):
        articles_collection.delete_one({"_id": article_id})

    # Function to add a comment to an article
    def add_comment(article_id, commenter, text):
        new_comment = {
            "commenter": commenter,
            "text": text,
            "created_at": datetime.datetime.utcnow()
        }
        articles_collection.update_one({"_id": article_id}, {"$push": {"comments": new_comment}})

    # Create a new article
    article_id = create_article("Introduction to MongoDB", "MongoDB is a NoSQL database.", "Alice")
    print(f"Created article with ID: {article_id}")

    # Read all articles
    print("\nAll articles:")
    for article in read_all_articles():
        pprint.pprint(article)

    # Update an article
    update_article(article_id, "MongoDB is a powerful and scalable NoSQL database.")
    print("\nUpdated article content.")

    # Read the updated article
    updated_article = read_article(article_id)
    pprint.pprint(updated_article)
    add_comment(article_id, "Bob", "Great introduction to MongoDB!")
    print("\nAdded comment to the article.")
    article_with_comments = read_article(article_id)
    pprint.pprint(article_with_comments)
    delete_article(article_id)
    print("\nDeleted article.")

except Exception as e:
    print("An error occurred:", e)
finally:

    client.close()
  4)readone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint

uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # Define the query
    query = {"balance": {"$gt": 4700}}

    # Write an expression that selects the documents matching the query constraint in the 'accounts' collection.
    cursor = accounts_collection.find(query)

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
  5)updateone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pprint

uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to the 'animal' database
    db = client.animal

    # Get reference to the 'animals' collection
    animals_collection = db.animals

    # Define the filter to find animals with age greater than 3
    filter_query = {"age": {"$gt": 3}}

    # Write an expression that selects the documents matching the query constraint in the 'animals' collection
    cursor = animals_collection.find(filter_query)

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
6)updatemany
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint
uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # Filter
    select_accounts = {"account_type": "savings"}

    # Print original document
    set_field = {"$set": {"minimum_balance": 100}}

    # Write an expression that adds to the target account balance by the specified amount.
    result = accounts_collection.update_many(select_accounts, set_field)

    # Print updated document
    print("Documents matched: " + str(result.matched_count))
    print("Documents updated: " + str(result.modified_count))
    pprint.pprint(accounts_collection.find_one(select_accounts))

except Exception as e:
    print(e)
finally:
    client.close()
  7)deleteone
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint

uri ="mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # Filter by ObjectId
    document_to_delete = {"_id": ObjectId("65ba81420301495a736c2193")}

    # Search for document before delete
    print("Searching for target document before delete: ")
    pprint.pprint(accounts_collection.find_one(document_to_delete))

    # Write an expression that deletes the target account.
    result = accounts_collection.delete_one(document_to_delete)

    # Search for document after delete
    print("Searching for target document after delete: ")
    pprint.pprint(accounts_collection.find_one(document_to_delete))

    print("Documents deleted: " + str(result.deleted_count))


except Exception as e:
    print(e)
finally:
    client.close()
  8)deleteall
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import pprint

uri = "mongodb+srv://SwaraajReddy:304044Sw@cluster0.xzcuxb8.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')

    # Get reference to 'bank' database
    db = client.bank

    # Get reference to 'accounts' collection
    accounts_collection = db.accounts

    # Filter by ObjectId
    documents_to_delete = {"balance": {"$lt": 2000}}

    # Search for sample document before delete
    print("Searching for sample target document before delete: ")
    pprint.pprint(accounts_collection.find_one(documents_to_delete))

    # Write an expression that deletes the target accounts.
    result = accounts_collection.delete_many(documents_to_delete)

    # Search for sample document after delete
    print("Searching for sample target document after delete: ")
    pprint.pprint(accounts_collection.find_one(documents_to_delete))

    print("Documents deleted: " + str(result.deleted_count))


except Exception as e:
    print(e)
finally:
    client.close()
