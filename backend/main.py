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
            
            if db  == "patient_login":
                insertStats = """
                    INSERT INTO patient_info(person_id) 
                    SELECT person_id FROM patient_login WHERE username = %s AND password = %s;
                """
                cursor.execute(insertStats, (username, password))
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

def updateStats(id, firstName, lastName, height, weight, gender, dob):
    msg = "Error updating stats."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "UPDATE patient_info SET firstName = %s, lastName = %s, height = %s, weight = %s, gender = %s, dob = %s WHERE person_id = %s;"

        cursor.execute(query, (firstName, lastName, height, weight, gender, dob, id))

        msg = "Updated stats."

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def getStats(id):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "SELECT * FROM patient_info WHERE person_id = %s"

        cursor.execute(query, (id,))
        
        rows = cursor.fetchall()

        # Get column names
        columns = [col[0] for col in cursor.description]

        # Format rows into dictionary
        stats_json = []
        for row in rows:
            stats_json.append(dict(zip(columns, row)))

        return stats_json

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

def addMedicalRecord(id, notes):
    msg = "Error adding medical record."

    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "INSERT INTO medical_records (person_id, record) VALUES (%s, %s)"

        cursor.execute(query, (id, notes))
        msg = "Added medical record."


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def getMedicalRecords(id):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = "SELECT record FROM medical_records WHERE person_id = %s"

        cursor.execute(query, (id,))

        rows = cursor.fetchall()

        records = [row[0] for row in rows]
        print(records)

        return records

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")
    

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

@app.route('/Patient-profile', methods=['POST'])
def patient_profile():
    data = request.json  
    id = data.get('id')
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    height = data.get('height')
    weight = data.get('weight')
    gender = data.get('gender')
    dob = data.get('dob')

    msg = updateStats(id, firstName, lastName, height, weight, gender, dob)

    response = {'message': msg, 'id': id}
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

@app.route('/Doctor-get-stats', methods=['GET'])
def get_stats():
    id = request.args.get('id', type=int)
    response = getStats(id)
    return jsonify(response), 200

@app.route('/Doctor-add-record', methods=['POST'])
def add_record():
    data = request.json  
    print(data)
    id = data.get('patientId')
    notes = data.get('notes')
    msg = addMedicalRecord(id, notes)
    response = {'message': msg, 'patient_id': id, 'notes': notes}
    return jsonify(response), 200

@app.route('/Doctor-get-records', methods=['GET'])
def get_record():
    id = request.args.get('id', type=int)
    print(id)
    response = getMedicalRecords(id)
    return jsonify(response), 200


if __name__ == '__main__':
    app.run(debug=True)