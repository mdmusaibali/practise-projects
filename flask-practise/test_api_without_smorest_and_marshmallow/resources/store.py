from flask.views import MethodView
from flask import request, jsonify
from models import StoreModel
from sqlalchemy.exc import SQLAlchemyError
from db import db


class Store(MethodView):
    def get(self):
        stores = StoreModel.query.all()
        store_list = [store.serialize() for store in stores]
        return jsonify(store_list)

    def post(self):
        store_data = request.get_json()
        store = StoreModel(**store_data)
        try:
            db.session.add(store)
            db.session.commit()
            return jsonify(store.serialize()), 201
        except SQLAlchemyError:
            return "A store with that name already exists.", 400
