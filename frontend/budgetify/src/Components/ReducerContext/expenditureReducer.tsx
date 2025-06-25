'use client';
import {ExpenditureContext,ExpenditureDispatcher} from '@/Context/expenditureContext';
import {ExpenditureReducer} from '@/Reducer/expenditureReducer';
import {useReducer,useContext} from 'react';
import type {Expenditure} from "@/models/Expenditure";

const list:Expenditure[]=[
    {
        id:1,
        type:"Health and medical",
        alloted:0.0,
        spent:0.0,
    },
    {
        id:2,
        type:"Education",
        alloted:100090.509,
        spent:0.0,
    },
    {
        id:3,
        type:"Household",
        alloted:0.0,
        spent:0.0,
    },
    {
        id:4,
        type:"Entertainment",
        alloted:0.0,
        spent:0.0,
    },
];

export function ExpenditureProvider({children}:{children:React.ReactNode})
{
    const [expenditure,dispatch]= useReducer(ExpenditureReducer,list);
    return(<ExpenditureContext.Provider value={expenditure}>
        <ExpenditureDispatcher.Provider value={dispatch}>
            {children}
        </ExpenditureDispatcher.Provider>
    </ExpenditureContext.Provider>);
}
export function useExpenseDispatch(){
    return useContext(ExpenditureDispatcher);
}
export function useExpenseContext(){
    return useContext(ExpenditureContext);
}
