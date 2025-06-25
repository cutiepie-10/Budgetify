import {ExpenditureList} from '@/Components/Budget/ExpenditureList';
import {ExpenditureProvider} from '@/Components/ReducerContext/expenditureReducer';
const BudgetPage =()=>{
    return(
        <div className="flex flex-col gap-10">
            <table className="h-1 overflow-y-auto">
                <thead>
                    <tr className="bg-green-500 text-white border-white sticky ">
                        <th className="border-r-1 p-3 w-10">
                            S.No.
                        </th>
                        <th className="border-r-1 p-3">
                            Category
                        </th>
                        <th className="border-r-1">
                            Alloted Budget
                        </th>
                        <th className="border-r-1">
                            Amount spent
                        </th>
                    </tr>
                </thead>
                <ExpenditureProvider>
                    <ExpenditureList/>
                </ExpenditureProvider>
                
            </table>
        </div>
    );
};
export default BudgetPage;