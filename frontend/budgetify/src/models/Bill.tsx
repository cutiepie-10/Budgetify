export interface Bill{
    parentId:number,
    id:number,
    amount:number,
    name:string,
    in?:boolean,
}
export const initBill:Bill={
    parentId:0,
    id:0,
    amount:0.0,
    name:'',
    in:false,
};