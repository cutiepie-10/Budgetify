'use client';
import {useState,SetStateAction,Dispatch} from 'react';
import type {Points} from '@/Components/ContextMenu/useContextMenu';
import {MouseEvent } from 'react';
import { ChangeEvent } from 'react';
import { useExpenseContext, useExpenseDispatch } from '../ReducerContext/expenditureReducer';
interface ExpenditureListProps{
    setCoord:Dispatch<SetStateAction<Points>>,
    setVisible:Dispatch<SetStateAction<boolean>>,
}
export const ExpenditureList= ({setCoord,setVisible}:ExpenditureListProps)=>{
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
    function onContextMenu(e:MouseEvent,id:number){
        e.preventDefault();
        const X = e.clientX;
        const Y = e.clientY;
        console.log(X,Y);
        setVisible(true);
        setCoord({
            x:e.clientX,
            y:e.clientY,
            id:id,
        });
    }
    function onChange(e:ChangeEvent,id:number){
        lists[id].type = e.target.value;
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
                       className="border-b-[0.5px] border-black" onContextMenu={(e)=>{onContextMenu(e,listItems.id)}}>
                           <td className="pr-2 p-2 text-right">
                               {listItems.id}.
                           </td>
                           <td className="pl-2" onDoubleClick={()=>{onDoubleClick(listItems.id)}}>
                            {
                                edit[listItems.id-1]?
                                <input value={listItems.type} onChange={(e)=>{onChange(e,listItems.id-1)}} 
                                onBlur={()=>{onBlur(listItems.id-1)}} autoFocus/>
                                :<p>{listItems.type}</p>
                            }
                           </td>
                           <td className="pr-2 text-center">
                               {listItems.alloted}
                           </td>
                           <td className="pr-2 text-center">
                               {listItems.spent}
                           </td>
                       </tr>);
                    })
                    }
                </tbody>
                );
            };


