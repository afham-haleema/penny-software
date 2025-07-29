import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartState } from "./cart.reducer";

export const selectcart=createFeatureSelector<cartState>('cart')

export const selectCartItems=createSelector(selectcart,(state)=>state.items)

export const cartItemsCount=createSelector(selectcart,(state)=>state.items.reduce((count,item)=>count+item.quantity,0))

export const cartItemsPrice=createSelector(selectcart,(state)=>state.items.reduce((total,item)=>total+item.product.price*item.quantity,0))