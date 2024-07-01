export type TProduct = {
    id?: number;
    title: string;
    price: number;
    newPrice?: number;
    cat_prefix?: string;
    img?: string;
    description?:string;
    quantity?:number;
    max?:number
}