from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def createUser(username, password):
    msg = "User already exists."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        validCheck = """
            SELECT person_id from users_login WHERE username = %s
        """

        cursor.execute(validCheck, (username,))
        valid = cursor.fetchall()

        if not valid:
            print("Valid")
            insertLogin = """
                INSERT INTO users_login(username, password) VALUES (%s, %s);
            """

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

def checkUser(username, password):
    msg = "Incorrect username/password."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        passCheck = """
            SELECT person_id FROM users_login WHERE username = %s AND password = %s
        """

        cursor.execute(passCheck, (username, password))
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

@app.route('/login-form', methods=['POST'])
def login_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')

    msg = checkUser(username, password)

    response = {'message': msg, 'username': username, 'password': password}
    return jsonify(response), 200

@app.route('/signup-form', methods=['POST'])
def signup_form():
    data = request.json  
    username = data.get('username')
    password = data.get('password')
    
    msg = createUser(username, password)
    response = {'message': msg, 'username': username, 'password': password}

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)