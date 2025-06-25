import {createContext,Dispatch} from 'react';
import { Expenditure } from '@/models/Expenditure';


export const ExpenditureContext= createContext<Expenditure[]>([]);
export const ExpenditureDispatcher = createContext<Dispatch<{
    type:string,
    expenditure:Expenditure,
}>|null>(null);
