from flask_smorest import Blueprint, abort
from flask.views import MethodView
from schemas import PlainItemSchema, ItemSchema
from models import ItemModel
from db import db
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

blp = Blueprint("items", __name__, description="Operations on items")


@blp.route("/item")
class Item(MethodView):
    @blp.response(200, ItemSchema(many=True))
    def get(self):
        return ItemModel.query.all()

    @blp.arguments(PlainItemSchema)
    @blp.response(201, PlainItemSchema)
    def post(self, item_data):
        item = ItemModel(**item_data)
        try:
            db.session.add(item)
            db.session.commit()
            return item
        except IntegrityError as err:
            print(err)
            return abort(400, message="An item with that name already exists.")
        except SQLAlchemyError:
            return abort(500, message="An error occurred creating the item.")
