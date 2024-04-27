from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def getUserId(username, db):
    id = None
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "SELECT person_id FROM " + db + " WHERE username = %s"

        cursor.execute(query, (username,))
        valid = cursor.fetchall()

        id = valid[0][0]

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return id

def createUser(username, password, db):
    msg = "User already exists."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "SELECT person_id from " + db + " WHERE username = %s "

        cursor.execute(query, (username,))
        valid = cursor.fetchall()

        if not valid:
            print("Valid")
            insertLogin = "INSERT INTO " + db + "(username, password) VALUES (%s, %s);"

            cursor.execute(insertLogin, (username, password))
            msg = "Created account."
        else:
            print("User already exists.")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

        
    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def checkUser(username, password, db):
    msg = "Incorrect username/password."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "SELECT person_id FROM " + db + " WHERE username = %s AND password = %s"

        cursor.execute(query, (username, password))
        valid = cursor.fetchall()

        if valid:
            print("Valid password")
            msg = "Login successful."
        else:
            print("Wrong password")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

@app.route('/Patient-login', methods=['POST'])
def patient_login():
    data = request.json 
    username = data.get('username')
    password = data.get('password')

    msg = checkUser(username, password, "patient_login")

    id = None
    if msg == "Login successful.":
        id = getUserId(username, "patient_login")

    response = {'message': msg, 'username': username, 'password': password, 'id': id}
    return jsonify(response), 200

@app.route('/Patient-signup', methods=['POST'])
def patient_signup():
    data = request.json  
    username = data.get('username')
    password = data.get('password')

    msg = createUser(username, password, "patient_login")

    id = None
    if msg == "Created account.":
        id = getUserId(username, "patient_login")

    response = {'message': msg, 'username': username, 'password': password, 'id': id}
    return jsonify(response), 200

@app.route('/Doctor-login', methods=['POST'])
def doctor_login():
    data = request.json 
    username = data.get('username')
    password = data.get('password')

    msg = checkUser(username, password, "doctor_login")

    id = None
    if msg == "Login successful.":
        id = getUserId(username, "doctor_login")

    response = {'message': msg, 'username': username, 'password': password, 'id': id}
    return jsonify(response), 200

@app.route('/Doctor-signup', methods=['POST'])
def doctor_signup():
    data = request.json  
    username = data.get('username')
    password = data.get('password')

    msg = createUser(username, password, "doctor_login")

    id = None
    if msg == "Created account.":
        id = getUserId(username, "doctor_login")

    response = {'message': msg, 'username': username, 'password': password, 'id': id}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)