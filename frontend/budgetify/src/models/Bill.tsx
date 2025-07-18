export interface Bill{
    parentId:string,
    id:string,
    amount:number,
    name:string,
    in?:boolean,
    createdAt?:number,
    updatedAt?:number,
}
export const initBill:Bill={
    parentId:"0",
    id:"0",
    amount:0.0,
    name:' ',
    in:false,
};