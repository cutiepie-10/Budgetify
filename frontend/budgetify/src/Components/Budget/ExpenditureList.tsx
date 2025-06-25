'use client';
import {useState} from 'react';

import { ChangeEvent } from 'react';
import { useExpenseContext, useExpenseDispatch } from '../ReducerContext/expenditureReducer';

export const ExpenditureList= ()=>{
    const e:boolean[] = [];
    const lists= useExpenseContext();
    const dispatch = useExpenseDispatch();
    for(let i = 0;i<lists.length;i++){
        e[i]= false;
    }
    const [edit,setEdit] = useState<boolean[]>(e);

    function onDoubleClick(id:number){
        const currentEdit= [...edit];
        currentEdit[id-1]= !currentEdit[id-1];
        setEdit([...currentEdit]);
    }
    function onBlur(id:number){
        const currentEdit= edit;
        currentEdit[id]= false;
        setEdit([...currentEdit]);
    }
    function onChange(e:ChangeEvent,id:number){
        lists[id].type =e.target.value;
        dispatch({
            type:'expense/update',
            expenditure:{
                ...lists[id]
            }
        });
    }
    return ( 
        <tbody >
        {
           lists.map((listItems)=>{
               return(
                   
                       <tr key={listItems.id}
                       className="m-2 border-b-[0.5px] border-black">
                           <td className="pr-2 text-right">
                               {listItems.id}.
                           </td>
                           <td className="p-3 pl-2" onDoubleClick={()=>{onDoubleClick(listItems.id)}}>
                            {
                                edit[listItems.id-1]?
                                <input value={listItems.type} onChange={(e)=>{onChange(e,listItems.id-1)}} 
                                onBlur={()=>{onBlur(listItems.id-1)}} autoFocus/>
                                :<p>{listItems.type}</p>
                            }
     
                           </td>
                           <td className="pr-2 text-right">
                               {listItems.alloted}
                           </td>
                           <td className="pr-2 text-right">
                               {listItems.spent}
                           </td>
                       </tr>);
                    })
                    }
                </tbody>
                );
            };


