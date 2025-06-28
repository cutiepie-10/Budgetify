import {createContext,Dispatch} from 'react';
import { Expenditure } from '@/models/Expenditure';
import {Bill} from '@/models/Bill';

export const ExpenditureContext= createContext<Expenditure[]>([]);
export const ExpenditureDispatcher = createContext<Dispatch<{
    type:string,
    expenditure:Expenditure,
}>|null>(null);
export const BillContext = createContext<Bill[]>([]);
export const BillDispatcher = createContext<Dispatch<
{
    type:string,
    bill:Bill,
}>|null>(null);