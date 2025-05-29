import {CgProfile} from 'react-icons/cg';
import {Link} from 'react-router-dom';
export default function NavBar(){
    return (
        <div className=" flex flex-row absolute w-full justify-between 
        items-center mt-2.5 bg-transparent z-100 top-2.5">
            
                <Link to="/">
                <div className="text-2xl font-semibold text-white ml-5 cursor-pointer">
                    Budgify
                </div>
                </Link>
                

            <div className='flex flex-row justify-evenly items-center gap-3 group-hover:blue-800'>
                <h6 className='cursor-pointer hover:text-blue-200'>
                    Why?
                </h6>
                <h6 className='cursor-pointer hover:text-blue-200'>
                    About us
                </h6>
                <h6 className='cursor-pointer hover:text-blue-200'>
                    Contact us
                </h6>
                <div className="size-9 mr-1.5 cursor-pointer ">
                    <CgProfile size={30}/>
                </div>
            </div>
            
            
        </div>
    );
}