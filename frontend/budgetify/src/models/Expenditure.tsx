export const initExpenditure:Expenditure = {
    type:" ",
    alloted:0.0,
    spent:0.0,
    id:"0",
    bill:[],
}
export interface Expenditure{
    id:string,
    type?:string,
    alloted:number,
    spent:number,
    bill:string[],
    createdAt?:number,
    updatedAt?:number,
}