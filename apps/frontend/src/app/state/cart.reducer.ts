import { createReducer, on } from "@ngrx/store";
import { Product } from "../services/shop";
import * as cartActions from '../state/cart.actions'

export interface CartItem{
    product:Product
    quantity:number
}

export interface cartState{
    items:CartItem[]
}

export const initialState:cartState={
    items:[]
}

export const CartReducer=createReducer(
    initialState,
    on(cartActions.addTocart,(state,{product})=>{
        const existingIndex=state.items.findIndex(item=>item.product._id===product._id)
        if(existingIndex!==-1){
            const updatedItems=[...state.items]
            updatedItems[existingIndex]={...updatedItems[existingIndex],quantity:updatedItems[existingIndex].quantity+1}
            return {...state,items:updatedItems}
        }else{
            return {...state,items:[...state.items,{product,quantity:1}]}
        }
    }),
    on(cartActions.increaseQty,(state,{productId})=>{
        const updatedItems=state.items.map(item=>item.product._id===productId?{...item,quantity:item.quantity+1}:item)
    return {...state,items:updatedItems}
    }),
    on(cartActions.decreaseQty,(state,{productId})=>{
        const updatedItems=state.items.map(item=>item.product._id===productId?{...item,quantity:item.quantity-1}:item)
        .filter(item=>item.quantity>0)
    return {...state,items:updatedItems}
    }),
    on(cartActions.deleteFromcart,(state,{productId})=>{
        const filteredItems=state.items.filter(item=>item.product._id!==productId)
        return {...state,items:filteredItems}
    }),
    on(cartActions.clearcart,state=>({...state,items:[]}))
)