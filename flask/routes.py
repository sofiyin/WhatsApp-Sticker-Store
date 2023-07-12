from init import *
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
        persona = PERSONA(username=data["username"], correo=data["correo"], password=data["password"])
        db.session.add(persona)
        db.session.commit()
        return 'SUCCESS'
    
@app.route('/personas/<personas_id>', methods=['GET', 'PUT', 'DELETE'])
def route_personas_id(personas_id):
    if request.method == 'GET':
        personas = PERSONA.query.filter_by(id=personas_id).first()
        return jsonify(personas)
    
    elif request.method == 'PUT':
        persona=request.get_json()
        new_id=persona.get('id')
        new_correo=persona.get('correo')
        new_username=persona.get('username')
        new_password=persona.get('password')
        
        persona_pre=PERSONA.query.get(personas_id)
        if not persona_pre:
            return f'La persona con el ID {personas_id} no existe'
        
        persona_pre.id=new_id
        persona_pre.correo=new_correo
        persona_pre.username=new_username
        persona_pre.password=new_password
        db.session.commit()
        return 'SUCCESS'
    
    elif request.method == 'DELETE':
        persona=PERSONA.query.get_or_404(personas_id)
        db.session.delete(persona)
        db.session.commit()
        return 'SUCCESS'

@app.route('/usuarios', methods = ['GET', 'POST'])
def route_usuarios():

    if request.method == 'GET':
        usuarios = USUARIO.query.all()
        return jsonify(usuarios)
    
    if request.method == 'POST':
        data = request.get_json()
        usuario = USUARIO(username=data["username"], correo = data["correo"],password=data["password"])
        db.session.add(usuario)
        db.session.commit()
        return 'SUCCESS'


@app.route('/carritos/<carritos_id>', methods=['GET'])
def route_carritos_id(carritos_id):
    if request.method == 'GET':
        carritos = CARRITO.query.filter_by(idcarrito=carritos_id).first()
        return jsonify(carritos)
"""

@app.route('/pertenece',methods=['GET','POST'])
def route_pertenece():
    if request.method=='GET':
        pertenece = PERTENECE.query.all()
        return jsonify(pertenece)
    
    elif request.method == 'POST':
        data = request.get_json()
        nuevo = PERTENECE(PE_STICKER_id=data["PE_STICKER_id"], PE_CARRITO_id=data["PE_CARRITO_id"], PE_CARRITO_user=data["PE_CARRITO_user"])
        db.session.add(nuevo)
        db.session.commit()
        return 'SUCCESS' 

@app.route('/pertenece/<PE_STICKER_id>', methods=['DELETE'])
def route_pertenece_id(PE_STICKER_id):
    if request.method == 'DELETE':
        stickers=PERTENECE.query.get_or_404(PE_STICKER_id)
        db.session.delete(stickers)
        db.session.commit()
        return 'SUCCESS'          

"""



#STICKER
@app.route('/stickers', methods = ['GET', 'DELETE'])
def route_stickers():
    if request.method=='GET':
        stickers = STICKER.query.all()
        return jsonify(stickers)
    
    elif request.method == 'DELETE':
        stickers = STICKER.query.all()
        for sticker in stickers:
            db.session.delete(sticker)
        db.session.commit()
        return 'SUCCESS'

@app.route('/stickers/<idsticker>', methods=['GET'])
def route_stickers_id(idsticker):
    if request.method == 'GET':
        stickersid = STICKER.query.filter_by(idsticker=idsticker).first()
        return jsonify(stickersid)

@app.route('/stickers-creador/<creador_id>', methods = ['GET', 'POST', 'DELETE'])
def route_stickers_creador_id(creador_id):
    if request.method=='GET':
        key = 'getStickers'
        if key not in cache.keys():
            dbResponse = STICKER.query.filter_by(S_CREADOR_id=creador_id).all()
            cache[key] = dbResponse;
            print("From DB")
        else:
            print("From Cache")
    
        stickers = cache[key];
        response = ""
        for sticker in stickers:
            response += sticker.nombre+";"+sticker.descripcion+";"+sticker.categoria+";"+sticker.likes+";"+sticker.Foto+";"+sticker.FechaSubida
        return jsonify(response)

    elif request.method == 'POST':
        data = request.get_json()
        sticker = STICKER(nombre=data["nombre"],descripcion=data["descripcion"], categoria=data["categoria"], likes = 0, Foto=data["Foto"], FechaSubida=func.now(), S_CREADOR_id = creador_id)
        db.session.add(sticker)
        db.session.commit()
        return 'SUCCESS'
    elif request.method == 'DELETE':
        filas = STICKER.query.filter_by(S_CREADOR_id=creador_id).all()
        for fila in filas:
            db.session.delete(fila)
        db.commit()
        return 'SUCCESS'

@app.route('/register-user', methods=['GET', 'POST'])
def registeruser():
    if request.method == 'POST':
        data=request.get_json()
        correo = data['correo']
        username = data['username']
        password = data['password']
        try:
            new_persona = PERSONA(correo=correo,username=username, password=password)
            db.session.add(new_persona)
            db.session.commit()
            new_usuario = USUARIO(usuario_id = new_persona.id)
            db.session.add(new_usuario)
            db.session.commit()
            return jsonify(new_persona)
        except:
            return 'Ya existe este nombre de usuario.'

@app.route('/register-creador', methods=['GET', 'POST'])
def registercreador():
    if request.method == 'POST':
        data=request.get_json()
        correo = data['correo']
        username = data['username']
        password = data['password']
        try:
            new_persona = PERSONA(correo=correo,username=username, password=password)
            db.session.add(new_persona)
            db.session.commit()
            new_usuario = CREADOR(creador_id = new_persona.id)
            db.session.add(new_usuario)
            db.session.commit()
            return jsonify(new_persona)
        except:
            error_message = 'Ya existe este nombre de usuario.'
            return error_message


@app.route('/login', methods=['GET'])
def login():
    if request.method == 'GET':
        data = request.get_json()
        username = data['username']
        password = data['password']
        persona = PERSONA.query.filter_by(username=username).first()
        if persona is None:
            return 'No existe este nombre de usuario.'
        else:
            if persona.password == password:
                return jsonify(persona)
            else:
                return 'Contraseña incorrecta.'
        

#@app.route('/stickers/<sticker_id>', methods = ['GET', 'PUT', 'DELETE'])

#@app.route('/stickers/comentario/<sticker_id>', methods = ['GET', 'DElETE', 'POST'])

#@app.route('/comentario/<sticker_id>', methods = ['PUT', 'DELETE'])

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
    # app.run()