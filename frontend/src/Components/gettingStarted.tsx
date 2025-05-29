import { IoIosArrowForward } from "react-icons/io";
import Lottie from "lottie-react";
import animateJson from "../assets/Animation - 1748513548213.json"

export default function GettingStarted(){
    return(
        <div className="size-full border-b-0.5 border-black mt-20 flex 
        flex-row  gap-15 items-center justify-between min-h-[600px] min-w-[500px] w-full">
            <div className="ml-50 min-w-md">
                <div className="text-xl/normal">
                     <h1>Change the way</h1><h1> You grow</h1><h1>Your Money</h1>
                 </div> 
                 <button className="rounded-md mt-15 p-5 hover:border-2
                  hover:border-sky-800 dark:bg-black flex item-center gap-5 transition duration-150 group ">
                     <h3 className="group-hover:text-sky-800">Get Started</h3>
                     <IoIosArrowForward color="white" size={20} className="group-hover:translate-x-1"/>
                 </button>
            </div>
            <div className="w-300 min-w-100">
                <Lottie 
                animationData={animateJson}
                loop={false}
                speed={0.5}/>
            </div>
            
        </div>
    )
}