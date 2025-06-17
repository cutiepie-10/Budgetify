import { BiSolidHome,BiSolidWalletAlt } from "react-icons/bi";
const Sidebar= ()=>{
    const sideBarItems = [
        {
            id:1,
            title:"Home",
            imageComponent:<BiSolidHome className="flex-[0.3]"/>,
        },
        {
            id:2,
            title:"Expenditures",
            imageComponent:<BiSolidWalletAlt className="flex-[0.3]"/>
        }
    ];
    return(
        <div className="flex flex-1 z-100 flex-col min-h-[100vh]
         bg-black opacity-85 w-[200px] p-[10px] 
        ">
            <div className=" flex-1 w-full text-green-600 justify-center">
                <h1 className="border-b-2 font-semibold text-2xl text-center ">
                    Budgetify
                </h1>
            </div>
            
            <ul className="flex flex-3 text-white flex-col justify-items-start gap-3 p-2 w-full">
                {sideBarItems.map((items)=>{
                   return( <li key={items.id} className="flex hover:text-green-400 
                   transition hover:transition active:bg-green-700 
                   flex-row gap-1 items-center">
                    {items.imageComponent}
                    <a className="flex-1">{items.title}</a>
                   </li>);
                })}
            </ul>
        </div>
    );
}
export default Sidebar;