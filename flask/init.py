from dataclasses import dataclass
import datetime
from sqlalchemy import select, and_, or_, ForeignKey, UniqueConstraint
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from flask import Flask, jsonify,  request, render_template,session,redirect
from flask_sqlalchemy import SQLAlchemy
import json
app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Micontra123@localhost:5432/postgres'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://usuario:password@localhost:5432/proyecto'

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

if __name__ == '__main__':
    #app.run(debug=True, port=5000, host='192.168.18.14')
    app.run()