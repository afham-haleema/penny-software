import { createAction, props } from "@ngrx/store";
import { Product } from "../services/shop";

export const addTocart=createAction('[Cart] Add',props<{product:Product}>())
export const deleteFromcart = createAction('[Cart] Delete', props<{ productId: string }>())
export const increaseQty=createAction('[Cart] Increase Qty',props<{productId:string}>())
export const decreaseQty=createAction('[Cart] Decrease Qty',props<{productId:string}>())
export const clearcart=createAction('[Cart] C;lear cart')