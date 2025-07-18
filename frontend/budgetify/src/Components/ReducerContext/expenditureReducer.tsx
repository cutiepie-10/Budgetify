'use client';
import {ExpenditureContext,ExpenditureDispatcher,BillContext,BillDispatcher} from '@/Context/expenditureContext';
import {ExpenditureReducer,BillReducer} from '@/Reducer/expenditureReducer';
import { getExpenditures } from '@/utils/Fetcher/fetchExpenditure';
import {useReducer,useContext,useEffect,use} from 'react';
import type { Expenditure } from '@/models/Expenditure';

export function ExpenditureProvider({children}:{children:React.ReactNode})
{
    const [expenditure,dispatch]= useReducer(ExpenditureReducer,[]);
    const [bill,billDispatcher]= useReducer(BillReducer,[]);
    useEffect(()=>{
        const expense = sessionStorage.getItem('expense');
        const bills = sessionStorage.getItem('bills');
        if(expense===null||expense===undefined){
            const expense:Expenditure[]= use(getExpenditures());
            sessionStorage.setItem('expense',JSON.stringify(expense));
        }
        else
        dispatch({
            type:'expense/refresh',
            payload:JSON.parse(expense),
        });
        if(bills!==null){
            billDispatcher({
                type:'bill/refresh',
                payload:JSON.parse(bills),
            });
        }
    },[dispatch,billDispatcher]);
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
