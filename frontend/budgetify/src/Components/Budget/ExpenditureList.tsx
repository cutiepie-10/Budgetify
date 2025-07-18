'use client';
import {useState,SetStateAction,Dispatch,useEffect,Fragment} from 'react';
import type {Points} from '@/Components/ContextMenu/useContextMenu';
import {MouseEvent } from 'react';
import { ChangeEvent } from 'react';
import { useBillContext, useBillDispatcher, useExpenseContext, useExpenseDispatch } from '../ReducerContext/expenditureReducer';
import {Editor} from './Editor';

interface ExpenditureListProps{
    setCoord:Dispatch<SetStateAction<Points>>,
    setVisible:Dispatch<SetStateAction<boolean>>,
}
export const ExpenditureList= ({setCoord,setVisible}:ExpenditureListProps)=>{
    const e:boolean[] = [];
    const lists= useExpenseContext();
    const dispatch = useExpenseDispatch();
    const billDispatcher = useBillDispatcher();
    const bills = useBillContext();
    for(let i = 0;i<lists.length;i++){
        e[i]= false;
    }
    const [toggle,setToggle]= useState<boolean[]>(e);
    useEffect(()=>{
        if(toggle.length<lists.length){
            setToggle([...toggle,false]);
        }
    },[lists,toggle]);
    useEffect(()=>{
        const newToggle= toggle;
        const toggleUp = ()=>{
            for(let i =0;i<newToggle.length;i++)
                    newToggle[i]= false;
                setToggle([...newToggle]);
        };
        const toggleUpKey = (e:KeyboardEvent)=>{
            if(e.key==='Escape'){
                for(let i =0;i<newToggle.length;i++)
                    newToggle[i]= false;
                setToggle([...newToggle]);
            }
        }
        window.addEventListener('keydown',toggleUpKey);
        window.addEventListener('click',toggleUp);
        return ()=>{
            window.removeEventListener('click',toggleUp);
            window.removeEventListener('keydown',toggleUpKey);
        }
        },[toggle])
    function onDoubleClick(setEdit:(a:boolean)=>void){
        setEdit(true);
    }
    function onBlur(setEdit:(a:boolean)=>void){
        setEdit(false);
    }
    function onContextMenu(e:MouseEvent,id:string){
        e.preventDefault();
        setVisible(true);
        setCoord({
            x:e.clientX,
            y:e.clientY,
            id:id,
        });
    }
    function onClick(e:MouseEvent,id:number){
        if(lists[id].bill?.length===0)
            return;
        const newToggle= toggle;
        e.stopPropagation();
        for(let i =0;i<newToggle.length;i++)
            newToggle[i]= false;
        newToggle[id-1]= true;
        setToggle([...newToggle]);
    }
    function onChange(e:ChangeEvent,id:number|string){
        console.log(e.currentTarget.type,id);
        if(typeof(id)==='number')
        {
            if(e.currentTarget.type==='text'){
                lists[id].type = e.target.value;
            }
            else if(e.currentTarget.type==='number'){
                lists[id].alloted = Number(e.target.value);
            }
            dispatch({
                type:'expense/update',
                expenditure:{
                    ...lists[id]
                }
            });
        }
        else{
            const bill = bills.filter((b)=>{
                    if(b.id===id)
                        return b;
                });
            if(e.currentTarget.type==='text'){
                bill[0].name = e.target.value;
            }
            else if(e.currentTarget.type==='number'){
                bill[0].amount = Number(e.target.value);
            }
            billDispatcher({
                type:'bill/update',
                bill:{
                    ...bill[0],
                }
            });
        }
    }
    return ( 
        <tbody >
        {
           lists.map((listItems,key)=>{
               return(
                <Fragment key={key}>
                 <tr className="border-b-[0.5px] border-black" onContextMenu={(e)=>{onContextMenu(e,listItems.id)}}
                       onClick={(e)=>{onClick(e,key)}}>
                           <td className="pr-2 p-2 text-right">
                               {key+1}.
                           </td>
                           <td className="pl-2">
                            <Editor val={listItems.type} onBlur={onBlur} 
                            onChange={(e:ChangeEvent)=>{onChange(e,key)}} 
                            onDoubleClick={onDoubleClick} type="text"/>
                           </td>
                           <td className="pr-2 text-center">
                               <Editor val={listItems.alloted} onBlur={onBlur}
                               onDoubleClick={onDoubleClick} type="number"
                               onChange={(e)=>onChange(e,key)}/>
                           </td>
                           <td className="pr-2 text-center">
                               {listItems.spent}
                           </td>
                       </tr>
                       {toggle[key]&&
                            listItems.bill.map((billId,key)=>{
                                return(
                                    <tr key={key} className='bg-gray-50' onClickCapture={(e)=>{
                                        e.stopPropagation();
                                    }}>
                                        <td className='text-right p-2'>
                                            {key+1}.
                                        </td>
                                        <td colSpan={2} className='pl-2'>
                                            <Editor type="text" val={bills[key].name}
                                             onDoubleClick={onDoubleClick} onBlur={onBlur}
                                             onChange={(e:ChangeEvent)=>{onChange(e,key)}}/>
                                        </td>
                                        <td  className='text-center'>
                                            <Editor type="number" val={bills[key].amount}
                                             onDoubleClick={onDoubleClick} onBlur={onBlur}
                                             onChange={(e:ChangeEvent)=>{onChange(e,key)}}/>
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                </Fragment>
                      );
                    })
                    }
                </tbody>
                );
            };


