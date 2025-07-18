import {initExpenditure, type Expenditure} from '@/models/Expenditure';
import type {Bill} from '@/models/Bill';
import {initBill} from '@/models/Bill';
import { postExpenditure, updateExpenditure } from '@/utils/Fetcher/fetchExpenditure';
import{postBill, updateBill} from '@/utils/Fetcher/fetchBills';
import {use} from'react';
export const ExpenditureReducer= (expenditure:Expenditure[],action:{
    type:string,
    expenditure?:Expenditure,
    payload?:Expenditure[]
})=>
    {
        console.log('expenditure reducer');
        switch (action.type){
            case 'expense/new':
            {
                console.log('expense/new');
                if(action.expenditure!==undefined)
                action.expenditure.id =use(postExpenditure(action?.expenditure??initExpenditure));
                const newExpen = [...expenditure,{...action.expenditure}];
                console.log(newExpen);
                sessionStorage.setItem('expense',JSON.stringify(newExpen));
                return [
                    ...newExpen
                ];
            }
            case'expense/refresh':{
                console.log('expense/refresh');
                if(action.payload!==undefined)
                return [
                    ...action?.payload??initExpenditure, 
                ];
            }
            case 'expense/update':
                {
                    console.log('expense/update');
                    const oldExpen = expenditure.filter((expen)=>{
                        if(expen.id !== action?.expenditure?.id)
                            return expen;
                    });
                    if(action.expenditure!==undefined)
                    updateExpenditure(action.expenditure);
                    const newExpen = [...oldExpen,{...action?.expenditure}];
                    console.log(newExpen);
                    sessionStorage.setItem('expense',JSON.stringify(newExpen));
                    return [
                        ...newExpen
                    ];
                }
            case 'expense/delete':
                {
                    console.log('expense/delete');
                    const newExpense = expenditure.filter((expen)=>{
                        if(expen.id !==action.expenditure?.id)
                            return {
                        ...expen
                    };
                    });
                    sessionStorage.setItem('expense',JSON.stringify(newExpense));
                    return[
                        ...newExpense,
                    ]
                }
            default:{
                console.error("this type of action is not allowed");
                return [
                    ...expenditure
                ];
            }
        }
};
export const BillReducer = (bill:Bill[],action:{
    type:string,
    bill?:Bill,
    payload?:Bill[],
})=>{
    console.log('billreducer')
    switch (action.type){
        case 'bill/new':
            {
                console.log('bill/new')
                const id:string= use(postBill(action?.bill??initBill));
                const oldBill = bill;
                const newBill = [...oldBill,{...action.bill,id:id}]
                sessionStorage.setItem('bills',JSON.stringify(newBill));
                return[
                    ...newBill,
                ];
            }
        case 'bill/update':
            {
                console.log('bill/update');
                updateBill(action?.bill??initBill);
                const newBill = bill.map((data)=>{
                    if(data.id===action?.bill?.id){
                        return{
                            ...action.bill,
                        };
                    }
                    return{
                        ...data
                    };
                });
                sessionStorage.setItem('bills',JSON.stringify(newBill));
                return[
                    ...newBill,
                ];
            } 
        case 'bill/refresh':{
            console.log('bill/refresh');
            return[
                (...action?.payload)??{initBill},
            ]
        }
        case 'bill/delete':
            {
                const newbill = bill.filter(b=>b.id!==action?.bill?.id);
                return [
                    ...newbill,
                ];
            }
            default:
                throw new Error('this action is not allowed');
    }
}