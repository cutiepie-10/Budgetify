import { BiLogIn } from "react-icons/bi";
import Searchbar from "./Searchbar";
import Link from "next/link";
const Topbar =()=>{
    return(
        <div className="flex flex-row w-full h-10 justify-between items-center p-4">
            <Searchbar/>
            <div className="flex-1 flex flex-row justify-end-safe items-center">
                <Link href="/login" className="flex flex-row gap-1 text-sm items-center">
                        <BiLogIn className="size-3"/>
                        <p>Login</p>
                </Link>
                
            </div>
        </div>
    );
}
export default Topbar;