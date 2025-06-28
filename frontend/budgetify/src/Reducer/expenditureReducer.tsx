import type {Expenditure} from '@/models/Expenditure';
import type {Bill} from '@/models/Bill';
export const ExpenditureReducer= (expenditure:Expenditure[],action:{
    type:string,
    expenditure:Expenditure,
})=>
    {
        switch (action.type){
            case 'expense/add':
            {
                const oldExpen = expenditure;
                oldExpen[expenditure.length] = {...action.expenditure,
                    id:expenditure.length+1,};
                sessionStorage.setItem('expense',JSON.stringify(oldExpen));
                return [
                    ...oldExpen
                ];
            }
            case 'expense/update':
                {
                    const oldExpen = expenditure;
                    oldExpen[action.expenditure.id-1] = {...action.expenditure};
                    sessionStorage.setItem('expense',JSON.stringify(oldExpen));
                    return [
                        ...oldExpen
                    ];
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
    bill:Bill,
})=>{
    switch (action.type){
        case 'bill/new':
            {
                const oldBill = bill;
                action.bill.id = oldBill.length+1;
                const newBill = [...oldBill,{...action.bill}]
                sessionStorage.setItem('bills',JSON.stringify(newBill));
                return[
                    ...newBill,
                ]
            }
        case 'bill/update':
            {
                const newBill = bill.map((data)=>{
                    if(data.id===action.bill.id){
                        return{
                            ...action.bill,
                        };
                    }
                    return{
                        ...data
                    };
                })
                sessionStorage.setItem('bills',JSON.stringify(newBill));
                return[
                    ...newBill,
                ];
            } 
        case 'bill/delete':
            {
                const newbill = bill.filter(b=>b.id!==action.bill.id);
                return [
                    ...newbill,
                ];
            }
            default:
                throw new Error('this action is not allowed');
    }
}