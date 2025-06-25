import SidebarItemList from "./SidebarItemList";

const Sidebar= ()=>{
    
    
    return(
        <div className="flex flex-1 z-100 flex-col min-h-[100vh]
         transparent opacity-75 shadow-lg w-[200px] p-[10px] 
        ">
            <div className=" flex-1 w-full text-green-600 justify-center">
                <h1 className="border-b-2 font-semibold text-2xl text-center ">
                    Budgetify
                </h1>
            </div>
            <SidebarItemList/>
            
        </div>
    );
}
export default Sidebar;