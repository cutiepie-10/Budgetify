import type {Expenditure} from '@/models/Expenditure';
export const ExpenditureReducer= (expenditure:Expenditure[],action:{
    type:string,
    expenditure:Expenditure,
})=>
    {
        switch (action.type){
            case 'expense/new':
            {
                const oldExpen = expenditure;
                oldExpen[expenditure.length] = {...action.expenditure};
                return [
                    ...oldExpen
                ];
            }
            case 'expense/update':
                {
                    const oldExpen = expenditure;
                    oldExpen[action.expenditure.id-1] = {...action.expenditure};
                    return [
                        ...oldExpen
                    ];
                }
            default:{
                console.error("this type is not allowed");
                return [
                    ...expenditure
                ];
            }
        }
};