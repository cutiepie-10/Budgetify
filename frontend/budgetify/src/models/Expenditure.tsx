export const initExpenditure:Expenditure = {
    type:"",
    alloted:0.0,
    spent:0.0,
    id:0,
}
export interface Expenditure{
    id:number,
    type:string,
    alloted:number,
    spent:number,
}