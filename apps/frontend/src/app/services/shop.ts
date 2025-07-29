import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
}

@Injectable({providedIn:'root'})
export class ShopService{
    private url='http://localhost:3000/api/shop'

    constructor(private http:HttpClient){}

    getAllProducts():Observable<Product[]>{
        return this.http.get<Product[]>(this.url)
    }
}