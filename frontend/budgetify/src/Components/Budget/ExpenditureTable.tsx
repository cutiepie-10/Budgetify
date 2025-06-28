'use client';
import {ExpenditureList} from '@/Components/Budget/ExpenditureList';
import {ExpenditureProvider} from '@/Components/ReducerContext/expenditureReducer';
import {useContextMenu} from '@/Components/ContextMenu/useContextMenu'
import {ContextMenu} from '@/Components/ContextMenu/ContextMenu'
export const ExpenditureTable = ()=>{
    const {visible,setVisible,coord,setCoord} = useContextMenu();
    return(
        <ExpenditureProvider>
        <div className="relative">
            {
                visible&& <ContextMenu coord={coord}/>
            }
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
                
                    <ExpenditureList setCoord={setCoord} setVisible={setVisible}/>
                
                
            </table>
            
        </div>     
        </ExpenditureProvider>       
    );
};