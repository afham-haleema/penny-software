import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument=Shop & Document;

@Schema()
export class Shop{
    @Prop({required:true})
    image:string
    @Prop({required:true})
    name:string
    @Prop({required:true})
    price:number
}

export const shopSchema=SchemaFactory.createForClass(Shop)