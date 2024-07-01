import { TProduct } from "./product"

export type TOrderItems = {
    id:number,
    userId: number,
    itemsList: TProduct[],
    subtotal: number,
    orderDate?: string,
}