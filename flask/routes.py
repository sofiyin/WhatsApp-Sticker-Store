from index import *
from flask import Flask, request
from flask_cors import CORS 

CORS(app)

@app.route('/personas',methods=['GET', 'POST'])
def route_personas():
    if request.method=='GET':
        personas = PERSONA.query.all()
        return jsonify(personas)
    
    elif request.method == 'POST':
        data = request.get_json()
        persona = PERSONA(id=data["id"], correo=data["correo"],username=data["username"], password=data["password"])
        db.session.add(persona)
        db.session.commit()
        return 'SUCCESS'

if __name__ == '__main__':
    #app.run(debug=True, port=5000, host='192.168.18.14')
    app.run()