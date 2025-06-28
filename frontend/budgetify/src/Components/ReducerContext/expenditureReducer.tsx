'use client';
import {ExpenditureContext,ExpenditureDispatcher,BillContext,BillDispatcher} from '@/Context/expenditureContext';
import {ExpenditureReducer,BillReducer} from '@/Reducer/expenditureReducer';
import {useReducer,useContext} from 'react';
import type {Expenditure} from "@/models/Expenditure";

const list:Expenditure[]=[
    {
        id:1,
        type:"Health and medical",
        alloted:0.0,
        spent:0.0,
        bill:[],
    },
    {
        id:2,
        type:"Education",
        alloted:0.0,
        spent:0.0,
        bill:[],
    },
    {
        id:3,
        type:"Household",
        alloted:0.0,
        spent:0.0,
        bill:[]
    },
    {
        id:4,
        type:"Entertainment",
        alloted:0.0,
        spent:0.0,
        bill:[],
    },
];

export function ExpenditureProvider({children}:{children:React.ReactNode})
{
    const [expenditure,dispatch]= useReducer(ExpenditureReducer,list);
    const [bill,billDispatcher]= useReducer(BillReducer,[]);
    return(
    <ExpenditureContext.Provider value={expenditure}>
        <ExpenditureDispatcher.Provider value={dispatch}>
            <BillContext.Provider value = {bill}>
                <BillDispatcher.Provider value = {billDispatcher}>
                    {children}
                </BillDispatcher.Provider>
            </BillContext.Provider>
        </ExpenditureDispatcher.Provider>
    </ExpenditureContext.Provider>
    );
}
export function useExpenseDispatch(){
    return useContext(ExpenditureDispatcher);
}
export function useExpenseContext(){
    return useContext(ExpenditureContext);
}
export function useBillContext(){
    return useContext(BillContext);
}
export function useBillDispatcher(){
    return useContext(BillDispatcher);
}
