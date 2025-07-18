'use client';
import type { Points } from "./useContextMenu";
import { useExpenseDispatch, useBillDispatcher, useExpenseContext,useBillContext } from "../ReducerContext/expenditureReducer";
import { initBill } from "@/models/Bill";
import { initExpenditure } from "@/models/Expenditure";
const ItemList = [
    {
        id:1,
        name:'Add Bill',
    },
    {
        id:2,
        name:'Add Category',
    },
    {
        id:3,
        name:'Delete',
    }
];

export const ContextMenu=(prop:{
    coord:Points,
})=>{
    
    const dispatchExpense = useExpenseDispatch();
    const dispatchBill= useBillDispatcher();
    const expense = useExpenseContext();
    const bills = useBillContext();
    const onClick=(name:string)=>{
        switch (name){
            case 'Add Bill':{
                dispatchBill({
                    type:'bill/new',
                    bill:{
                        ...initBill,
                        parentId:prop.coord.id,
                    }
                });
                dispatchExpense({
                    type:'expense/update',
                    expenditure:{
                        ...expense[prop.coord.id-1],
                        bill:[...expense[prop.coord.id-1].bill,bills.length],
                    }
                });
                return;
            }
            case 'Add Category':{
                console.log('adding category');
                dispatchExpense({
                    type:'expense/new',
                    expenditure:{
                       ...initExpenditure,
                    }
                });
                return;
            }
        }
    };
    return(
        <div className={`bg-gray-800 opacity-85 fixed p-1 
         z-3 flex flex-col justify-start items-center rounded-md`}
         style={{top:prop.coord.y,
            left:prop.coord.x,
         }}>
            <ul>
                {
                    ItemList.map((data)=>{
                        return (
                            <li key ={data.id} onClick={()=>{onClick(data.name)}}
                            className="text-white text-sm p-[0.5px]  
                            hover:transition-opacity hover:duration-150 
                            hover:opacity-80 hover:bg-gray-600 active:opacity-30 
                            transition-opacity duration-150 cursor-pointer">
                                {data.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};