from dataclasses import dataclass
import datetime
from sqlalchemy import select, and_, or_, ForeignKey, UniqueConstraint
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from flask import Flask, jsonify,  request, render_template,session,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5432/postgres'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://usuario:password@localhost:5432/proyecto'

app.config['SQLALCHEMY<@_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@dataclass
class PERSONA(db.Model):
    __tablename__ = 'PERSONA'
    id: int
    correo:str
    username: str
    password: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    correo = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return f'<PERSONA {self.username}>'
    
    def check_password(self, password):
        return self.password == password

@dataclass
class USUARIO(db.Model):
    __tablename__ = 'USUARIO'

    usuario_id: int

    usuario_id = db.Column(db.Integer,db.ForeignKey('PERSONA.id'), primary_key=True)
    
    persona = relationship("PERSONA", backref="USUARIO")

    def __repr__(self):
        return f'<USUARIO {self.usuario_id}>'

@dataclass
class CREADOR(db.Model):
    __tablename__ = 'CREADOR'

    seguidores: int

    seguidores = db.Column(db.Integer, default=0)

    creador_id = db.Column(db.Integer,db.ForeignKey('PERSONA.id'), primary_key=True)
    
    # CREADORusername = db.Column(db.String, db.ForeignKey('PERSONA.username'))
    # rusername_persona = relationship("PERSONA", backref="CREADOR")

    persona = relationship("PERSONA", backref="CREADOR")

    def __repr__(self):
        return f'<CREADOR {self.creador_id}>'

@dataclass
class STICKER(db.Model):
    __tablename__ = 'STICKER'

    idsticker: int
    nombre:str
    descripcion:str
    categoria:str
    likes: int
    Foto:str
    FechaSubida:str
    S_CREADOR_id: int
    

    idsticker = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, nullable=False)
    Foto = db.Column(db.String(100), nullable=False)
    FechaSubida = db.Column(db.String(100), nullable=False)

    S_CREADOR_id = db.Column(db.Integer, db.ForeignKey('CREADOR.creador_id'))
    r_CREADOR_CARRITO = relationship("CREADOR", backref="STICKER")
    
    def __repr__(self):
        return f'<STICKER {self.idsticker}>'

@dataclass
class CARRITO(db.Model):
    __tablename__ = 'CARRITO'

    idcarrito:int

    idcarrito = db.Column(db.Integer, primary_key=True, autoincrement=True)

    CAR_USUARIO_id = db.Column(db.Integer, db.ForeignKey('USUARIO.usuario_id'), primary_key=True)
    rcarritoo_usuario = relationship("USUARIO", backref="CARRITO")

    def __repr__(self):
        return f'<CARRITO {self.idcarrito}>'

@dataclass
class COMENTARIO(db.Model):
    __tablename__ = 'COMENTARIO'

    idcomentario: int
    COM_STICKER_id: int
    texto: str

    idcomentario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    texto = db.Column(db.String(100), nullable=False)

    COM_STICKER_id = db.Column(db.Integer, db.ForeignKey('STICKER.idsticker'), primary_key=True)
    r_sticker_carrito = relationship("STICKER", backref="COMENTARIO")

    def __repr__(self):
        return f'<COMENTARIO {self.idcomentario}>'

@dataclass
class PUBLICA(db.Model):
    __tablename__ = 'PUBLICA'

    FechaPublicacion: datetime

    FechaPublicacion = db.Column(db.DateTime, nullable=False)
    
    P_COMENTARIO_id = db.Column(db.Integer, primary_key=True)
    P_STICKER_id = db.Column(db.Integer, primary_key=True)
    P_PERSONA_id = db.Column(db.Integer, db.ForeignKey('PERSONA.id'),primary_key=True)

    __table_args__ = (
        db.ForeignKeyConstraint(['P_COMENTARIO_id', 'P_STICKER_id'], ['COMENTARIO.idcomentario', 'COMENTARIO.COM_STICKER_id']),
    )

    r_sticker_publica= relationship("COMENTARIO", backref="PUBLICA")
    r_persona_publica = relationship("PERSONA", backref="PUBLICA")


@dataclass
class PERTENECE(db.Model):
    __tablename__='PERTENECE'

    PE_STICKER_id = db.Column(db.Integer, db.ForeignKey('STICKER.idsticker'), primary_key=True)
    PE_CARRITO_id = db.Column(db.Integer, primary_key=True)
    PE_CARRITO_user = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        db.ForeignKeyConstraint(['PE_CARRITO_id', 'PE_CARRITO_user'], ['CARRITO.idcarrito', 'CARRITO.CAR_USUARIO_id']),
    )

    r_sticker_pertenece = relationship("STICKER", backref="PERTENECE")
    r_carrito_pertenece = relationship("CARRITO", backref="PERTENECE")


def insert_usuario(data):
    usuario = USUARIO(username=data["username"], password=data["password"])
    db.session.add(usuario)
    db.session.commit()
    return "SUCCESS"

def insert_creador(data):
    creador = USUARIO(username=data["username"], password=data["password"])
    db.session.add(creador)
    db.session.commit()
    return "SUCCESS"

with app.app_context():
    db.create_all()


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
        return jsonify(persona)
    
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

@app.route('/stickers/<idsticker>', methods=['GET', 'DELETE'])
def route_stickers_id(idsticker):
    if request.method == 'GET':
        stickersid = STICKER.query.filter_by(idsticker=idsticker).first()
        return jsonify(stickersid)
    
    elif request.method == 'DELETE':
        stickersid = STICKER.query.get_or_404(idsticker)
        db.session.delete(stickersid)
        db.session.commit()
        return 'SUCCESS'

@app.route('/stickers-creador/<creador_id>', methods = ['GET', 'POST', 'DELETE'])
def route_stickers_creador_id(creador_id):
    if request.method == 'GET':
        stickers = STICKER.query.filter_by(S_CREADOR_id=creador_id).all()
        return jsonify(stickers)

    elif request.method == 'POST':
        data = request.get_json()
        sticker = STICKER(
            nombre=data["nombre"],
            descripcion=data["descripcion"], 
            categoria=data["categoria"], 
            likes = 0, 
            Foto = data["Foto"], 
            FechaSubida=func.now(), 
            S_CREADOR_id = creador_id
        )
        db.session.add(sticker)
        db.session.commit()
        return jsonify(sticker)



# def route_stickers_creador_id(creador_id):
#     cache = {}

#     if request.method=='GET':
#         key = 'getStickers'
#         if key not in cache.keys():
#             dbResponse = STICKER.query.filter_by(S_CREADOR_id=creador_id).all()
#             cache[key] = dbResponse;
#             print("From DB")
#         else:
#             print("From Cache")
    
#         stickers = cache[key];
#         response = ""
#         for sticker in stickers:
#             response += sticker.nombre+";"+sticker.descripcion+";"+sticker.categoria+";"+sticker.likes+";"+sticker.Foto+";"+sticker.FechaSubida
#         return jsonify(response)

#     elif request.method == 'POST':
#         data = request.get_json()
#         sticker = STICKER(nombre=data["nombre"],descripcion=data["descripcion"], categoria=data["categoria"], likes = 0, Foto=data["Foto"], FechaSubida=func.now(), S_CREADOR_id = creador_id)
#         db.session.add(sticker)
#         db.session.commit()
#         return 'SUCCESS'
#     elif request.method == 'DELETE':
#         filas = STICKER.query.filter_by(S_CREADOR_id=creador_id).all()
#         for fila in filas:
#             db.session.delete(fila)
#         db.commit()
#         return 'SUCCESS'

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
            new_creador = CREADOR(creador_id = new_persona.id)
            db.session.add(new_creador)
            db.session.commit()
            return jsonify(new_persona)
        except:
            error_message = 'Ya existe este nombre de usuario.'
            return error_message

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


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
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
        

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')