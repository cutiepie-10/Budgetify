'use client';
import {ExpenditureList} from '@/Components/Budget/ExpenditureList';
import {ExpenditureProvider} from '@/Components/ReducerContext/expenditureReducer';
import {useContextMenu} from '@/Components/ContextMenu/useContextMenu'
import {ContextMenu} from '@/Components/ContextMenu/ContextMenu'

export const ExpenditureTable = ()=>{
    const {visible,setVisible,coord,setCoord} = useContextMenu();
    return(
        <ExpenditureProvider>
        <div className="min-w-100 max-h-70 overflow-y-auto rounded-lg border-2 border-green-750 p-5 ">
            {
                visible&& <ContextMenu coord={coord}/>
            }
            <table className="h-1 overflow-y-auto w-[100%] border-2 rounded-md ">
                <thead>
                    <tr className="bg-green-500 text-white border-white sticky -top-2">
                        <th className="border-r-1 p-3 w-10">
                            S.No.
                        </th>
                        <th className="border-r-1 p-3">
                            Category
                        </th>
                        <th className="border-r-1 p-3">
                            Alloted Budget
                        </th>
                        <th className="border-r-1 p-3">
                            Amount spent
                        </th>
                    </tr>
                </thead>
                <ExpenditureList setCoord={setCoord} setVisible={setVisible}/>
            </table>
        </div>     
        </ExpenditureProvider>       
    );
};