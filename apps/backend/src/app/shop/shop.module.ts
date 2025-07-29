import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shop,shopSchema } from "./shop.schema";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Shop.name,schema:shopSchema}])
    ],
    providers:[ShopService],
    controllers:[ShopController]
})

export class ShopModule {}