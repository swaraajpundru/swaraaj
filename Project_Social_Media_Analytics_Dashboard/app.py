import matplotlib
matplotlib.use('Agg')  # Set Matplotlib's backend to Agg

from flask import Flask, render_template, render_template_string, request, redirect, url_for, flash
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import matplotlib.pyplot as plt
from textblob import TextBlob  # for sentiment analysis
from bson import ObjectId

app = Flask(__name__)

# MongoDB Atlas connection URI
uri = "mongodb+srv://jitun2891:Wkqci0XwghJnTX47@cluster0.sh6y18h.mongodb.net/social_media_db?retryWrites=true&w=majority&appName=Cluster0"

try:
    # Create a new client and connect to the MongoDB Atlas cluster
    client = MongoClient(uri)
    # Ping MongoDB to confirm a successful connection
    client.admin.command('ping')
    print("Connected to MongoDB Atlas!")
except ConnectionFailure as e:
    print("Failed to connect to MongoDB Atlas:", e)

# Access MongoDB database and collection
db = client['social_media_db']
tweets_collection = db['tweets']  # Assuming you have a collection named 'tweets'

# Flask route for dashboard
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_text = request.form['user_text']
        
        # Perform sentiment analysis on user input
        blob = TextBlob(user_text)
        sentiment_score = blob.sentiment.polarity
        
        # Insert user input into MongoDB collection
        tweet_data = {'text': user_text}
        tweets_collection.insert_one(tweet_data)
        
        # Query MongoDB for data to visualize trends and user engagement metrics
        tweets = tweets_collection.find()
        user_engagement_metrics = {
            'total_tweets': tweets_collection.count_documents({}),
            'total_likes': sum(tweet.get('likes', 0) for tweet in tweets),
            'total_retweets': sum(tweet.get('retweets', 0) for tweet in tweets)
        }
        
        # Plot sentiment distribution
        plt.hist(sentiment_score, bins=5)
        plt.title('Sentiment Analysis')
        plt.xlabel('Sentiment Score')
        plt.ylabel('Frequency')
        sentiment_plot_path = 'sentiment_plot.png'
        plt.savefig('static/' + sentiment_plot_path)
        
        # HTML content
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Social Media Analytics Dashboard</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                h2 {
                    margin-top: 30px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                img {
                    display: block;
                    margin: 20px auto;
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                }
                a {
                    display: block;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Social Media Analytics Dashboard</h1>
                
                <form method="post">
                    <label for="user_text">Enter Text:</label><br>
                    <textarea id="user_text" name="user_text" rows="4" cols="50"></textarea><br>
                    <input type="submit" value="Analyze">
                </form>
                
                <a href="/tweets">View Tweets</a>
                
                {% if user_text %}
                <h2>User Input:</h2>
                <p>{{ user_text }}</p>
                <h2>Sentiment Analysis:</h2>
                <img src="{{ url_for('static', filename=sentiment_plot_path) }}" alt="Sentiment Analysis Plot">
                <h2>User Engagement Metrics:</h2>
                <ul>
                    <li>Total Tweets: {{ user_engagement_metrics.total_tweets }}</li>
                    <li>Total Likes: {{ user_engagement_metrics.total_likes }}</li>
                    <li>Total Retweets: {{ user_engagement_metrics.total_retweets }}</li>
                </ul>
                {% endif %}
            </div>
        </body>
        </html>
        """

        return render_template_string(html_content, user_text=user_text, sentiment_plot_path=sentiment_plot_path, user_engagement_metrics=user_engagement_metrics)
    else:
        # Render the initial form
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Social Media Analytics Dashboard</title>
            <style>
                body {
                    font-family: Arial, sans   -serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                h2 {
                    margin-top: 30px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                img {
                    display: block;
                    margin: 20px auto;
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                }
                a {
                    display: block;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
    <div class="container">
        <h1>Social Media Analytics Dashboard</h1>
        
        <form method="post">
            <label for="user_text">Enter Text:</label><br>
            <textarea id="user_text" name="user_text" rows="4" cols="50"></textarea><br>
            <input type="submit" value="Analyze">
        </form> 
        
        <form action="/delete_tweets" method="post">
            <label for="tweet_id">Enter Tweet ID to Delete:</label><br>
            <input type="text" id="tweet_id" name="tweet_id" required><br>
            <input type="submit" value="Delete Tweet">
        </form>
    </div>
</body>
</html>
        """
        return render_template_string(html_content)

# Define routes for CRUD operations

@app.route('/tweets', methods=['GET', 'POST'])
def tweets():
    if request.method == 'POST':
        # Create Operation: Add a new tweet
        text = request.form['text']
        tweets_collection.insert_one({'text': text})
        return redirect(url_for('tweets'))
    else:
        # Read Operation: Display existing tweets
        tweets = list(tweets_collection.find())
        
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Media Analytics Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        h2 {
            margin-top: 30px;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        img {
            display: block;
            margin: 20px auto;
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        a {
            display: block;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Social Media Analytics Dashboard</h1>
    
    <form method="post">
        <label for="user_text">Enter Text:</label><br>
        <textarea id="user_text" name="user_text" rows="4" cols="50"></textarea><br>
        <input type="submit" value="Analyze">
    </form> 
    
    <a href="/tweets">View Tweets</a>
    
    <h2>View Tweets:</h2>
    <ul>
        {% for tweet in tweets %}
            <li>{{ tweet.text }}</li>
        {% endfor %}
    </ul>
</div>
</body>
</html>
"""
    return render_template_string(html_content, tweets=tweets)

@app.route('/delete_tweets', methods=['POST'])
def delete_tweets():
    try:
        tweet_id = request.form['tweet_id']
        tweets_collection.delete_one({'_id': ObjectId(tweet_id)})
        flash('Tweet deleted successfully', 'success')  # Flash success message
    except Exception as e:
        flash(f'Error deleting tweet: {str(e)}', 'error')  # Flash error message
    return redirect(url_for('tweets'))

if __name__ == '__main__':
    app.run(debug=True)
