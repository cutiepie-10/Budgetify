import { IoIosArrowForward } from "react-icons/io";
import Lottie from "lottie-react";
import animateJson from "../../assets/Animation - 1748513548213.json"
import {Link} from 'react-router-dom';
export default function GettingStarted(){
    return(
        <div className="h-[600px] border-b-0.5 border-black mt-20 flex 
        flex-row  gap-15 items-center justify-between w-full overflow-clip">
            <div className="ml-50 min-w-sm">
                <div className="text-xl/normal">
                     <h1>Change the way</h1><h1> You grow</h1><h1>Your Money</h1>
                 </div> 
                 <Link to="/login">
                 <button className="rounded-md mt-15 p-5 hover:border-2
                  hover:border-sky-800 dark:bg-black flex item-center gap-5 transition duration-150 group ">
                     <h3 className="group-hover:text-sky-800">Get Started</h3>
                     <IoIosArrowForward color="white" size={20} className="group-hover:translate-x-1"/>
                 </button>
                 </Link>
                 
            </div>
            <div className="w-200 min-w-80">
                <Lottie 
                animationData={animateJson}
                loop={false}
                speed={0.5}/>
            </div>
            
        </div>
    )
}