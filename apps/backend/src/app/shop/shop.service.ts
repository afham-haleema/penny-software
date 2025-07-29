import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Shop, ShopDocument } from "./shop.schema";
import { Model } from "mongoose";

@Injectable()
export class ShopService {

    constructor(@InjectModel(Shop.name) private shopModel:Model<ShopDocument>){}

    async getAllProducts():Promise<Shop[]>{
        return this.shopModel.find().exec()
    }
}