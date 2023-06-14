from dataclasses import dataclass
from sqlalchemy import create_engine, ForeignKey, UniqueConstraint
from sqlalchemy.orm import sessionmaker, relationship
from flask import Flask, jsonify,  request, render_template
from flask_sqlalchemy import SQLAlchemy
import json
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@dataclass
class PERSONA(db.Model):
    __tablename__ = 'PERSONA'
    id: int
    correo:str
    username: str
    password: str

    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return f'<PERSONA {self.username}>'
    
    def check_password(self, password):
        return self.password == password

#------------------------------------------------------------------------------

@dataclass
class USUARIO(db.Model):
    __tablename__ = 'USUARIO'

    usuario_id=db.Column(db.Integer,db.ForeignKey('PERSONA.id'), primary_key=True)
    
    persona = relationship("PERSONA", backref="USUARIO")

    def __repr__(self):
        return f'<USUARIO {self.usuario_id}>'

@dataclass
class CREADOR(db.Model):
    __tablename__ = 'CREADOR'
    seguidores: int
    seguidores= db.Column(db.Integer, nullable=False)

    creador_id=db.Column(db.Integer,db.ForeignKey('PERSONA.id'), primary_key=True)
    
    persona = relationship("PERSONA", backref="CREADOR")


    def __repr__(self):
        return f'<CREADOR {self.creador_id}>'


@dataclass
class CARRITO(db.Model):
    __tablename__ = 'CARRITO'
    idcarrito:int
    idcarrito = db.Column(db.Integer, primary_key=True)

    CAR_USUARIO_id = db.Column(db.Integer, db.ForeignKey('USUARIO.usuario_id'), primary_key=True)
    rcarritoo_usuario = relationship("USUARIO", backref="CARRITO")

    def __repr__(self):
        return f'<CARRITO {self.idcarrito}>'

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

    idsticker = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, nullable=False)
    Foto = db.Column(db.String(100), nullable=False)
    FechaSubida = db.Column(db.String(100), nullable=False)

    CREADOR_id = db.Column(db.Integer, db.ForeignKey('CREADOR.creador_id'))
    r_CREADOR_CARRITO = relationship("CREADOR", backref="STICKER")
    
    def __repr__(self):
        return f'<STICKER {self.idsticker}>'

@dataclass
class COMENTARIO(db.Model):
    __tablename__ = 'COMENTARIO'

    idcomentario: int
    STICKER_id: int
    texto: str

    idcomentario = db.Column(db.Integer, primary_key=True)

    STICKER_id = db.Column(db.Integer, db.ForeignKey('STICKER.idsticker'), primary_key=True)
    r_sticker_carrito = relationship("STICKER", backref="COMENTARIO")

    texto = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<COMENTARIO {self.idcomentario}>'

# @dataclass
# class PUBLICA(db.Model):
#     __tablename__ = 'PUBLICA'
#     FechaPublicacion:str

#     FechaPublicacion = db.Column(db.String(100), nullable=False)

#     COMENTARIO_id = db.Column(db.Integer, db.ForeignKey('COMENTARIO.idcomentario'),primary_key=True)
#     r_comentario_publica = relationship("COMENTARIO", backref="PUBLICA")

#     P_STICKER_id = db.Column(db.Integer, db.ForeignKey('COMENTARIO.STICKER_id'),primary_key=True)
#     r_sticker_publica= relationship("COMENTARIO", backref="PUBLICA")

#     PERSONA_id = db.Column(db.Integer, db.ForeignKey('PERSONA.id'),primary_key=True)
#     r_persona_publica = relationship("PERSONA", backref="PUBLICA")

@dataclass
class PERTENECE(db.Model):
    __tablename__='PERTENECE'
    
    STICKER_id = db.Column(db.Integer, db.ForeignKey('STICKER.idsticker'),primary_key=True)
    r_sticker_pertenece = relationship("STICKER", backref="PERTENECE")

    CARRITO_id = db.Column(db.Integer, primary_key=True)
    CARRITO_user = db.Column(db.Integer, primary_key=True)

    carrito = db.relationship("CARRITO", backref="PERTENECE",
                            primaryjoin="and_(PERTENECE.CARRITO.id == CARRITO.idcarrito, "
                                        "PERTENECE.CARRITO_user == CARRITO.CAR_USUARIO_id)")


with app.app_context():
        db.create_all()

if __name__ == '__main__':
    #app.run(debug=True, port=5000, host='192.168.18.14')
    app.run()

@app.route('/personas')
def route_personas():
    return 'hola'
