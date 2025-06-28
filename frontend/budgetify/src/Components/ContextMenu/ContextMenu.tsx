'use client';
import type { Points } from "./useContextMenu";
import { useExpenseDispatch, useBillDispatcher, useExpenseContext,useBillContext } from "../ReducerContext/expenditureReducer";
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
    function onClick(name:string){
        switch (name){
            case 'Add Bill':{
                dispatchBill({
                    type:'bill/new',
                    bill:{
                        id:0,
                        parentId:prop.coord.id,
                        name:'',
                        in:false,
                        amount:0.0,
                    }
                });
                dispatchExpense({
                    type:'expense/update',
                    expenditure:{
                        ...expense[prop.coord.id],
                        bill:[...expense[prop.coord.id].bill,bills.length],
                    }
                });
            }
            case 'Add Category':{
                dispatchExpense({
                    type:'expense/add',
                    expenditure:{
                        id:0,
                        bill:[],
                        alloted:0.0,
                        spent:0.0,
                        type:'',
                    }
                })
            }
        }
    }
    console.log(prop.coord.x,prop.coord.y);
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
                            transition-opacity duration-150">
                                {data.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};