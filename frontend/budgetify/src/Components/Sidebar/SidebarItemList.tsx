'use client';
import {BiSolidDashboard } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import Link from 'next/link';
import { usePathname } from "next/navigation";
const sideBarItems = [
        {
            id:1,
            title:"Dashboard",
            imageComponent:<BiSolidDashboard className={`flex-5 text-blue-600  group-hover:text-green-400`}/>,
            link:"/",
        },
        {
            id:2,
            title:"Budget",
            imageComponent:<BsCashCoin className="flex-5 text-green-800 group-hover:text-green-400 "/>,
            link:"/budget",
        }
    ];
const SidebarItemList = ()=>{
    const path = usePathname();
    return (
        <ul className="flex flex-3 text-black flex-col justify-items-start gap-4 p-2 w-full">
                {sideBarItems.map((items)=>{
                   return( 
                   <li key={items.id} >
                    <Link href={items.link}
                         className={`flex hover:text-green-400 
                        transition hover:transition active:bg-green-700 
                        flex-col gap-1 items-center cursor-pointer group ${path===items.link?`bg-green-200 rounded-sm p-2`:``}`}>
                             {items.imageComponent}
                             <p className={`${path===items.link?`text-green-600`:``}flex-1 text-sm group-active:text-green-400 group-hover:text-green-400`}>
                                {items.title}
                             </p>
                     </Link>
                    </li>);
                })}
            </ul>
    );
}
export default SidebarItemList;