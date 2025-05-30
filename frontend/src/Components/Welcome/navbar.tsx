import {CgProfile} from 'react-icons/cg';
import {Link} from 'react-router-dom';
export default function NavBar({scrolled}:{scrolled:boolean}){
    const NavLink=[
        {
            id:1,
            name:"Why?",
            link:"/#why"
        },
        {
            id:2,
            name:"About Us",
            link:"/#about-us"
        },
        {
            id:3,
            name:"Contact Us",
            link:"/#contact-us"
        },
    ];
    return (
        
        <div className={`flex flex-row sticky w-full justify-between items-center mt-2.5 
        ${scrolled?`bg-white shadow-xl border-b-2 text-shadow-black`:`text-white bg-transparent`} z-100 top-2.5`}>
            
                <Link to="/">
                <div className="text-2xl font-semibold  ml-5 cursor-pointer">
                    Budgify
                </div>
                </Link>
                

            <div className='flex flex-row justify-evenly items-center gap-3 group-hover:blue-800'>
                <ul className='flex flex-row gap-3'>
                    {
                     NavLink.map((value)=>{
                        return(
                            <li key={value.id}>
                                <a href={value.link}className='cursor-pointer hover:text-blue-200'>
                                     {value.name}
                                 </a>
                             </li> 
                        );
                    })
                    }
                   
                </ul>
                <div className="size-9 mr-1.5 cursor-pointer ">
                    <CgProfile size={30} color={'white'}/>
                </div>
            </div>
            
            
        </div>
    );
}