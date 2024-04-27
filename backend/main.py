from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def getStats():
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        selectStats = """
            SELECT * FROM users_stats WHERE id = 3;
        """

        cursor.execute(selectStats)
        
        rows = cursor.fetchall()

        for row in rows:
            print(row)

        print("hello world")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

@app.route('/stats-form', methods=['POST'])
def generate_form():
    print("Generating stats")
    data = request.json
    id = data.get('id')
    response = {'message': "This worked", 'id': id}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)