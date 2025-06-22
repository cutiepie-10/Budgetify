'use client';
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import {UserContext} from "@/Context/userContext";
import { CgProfile } from "react-icons/cg";
import {useContext} from 'react';
const LogInButton = ()=>{
    const user = useContext(UserContext);
    console.log(user);
    return(
        <div>
            {(user.first_name===null)?
            <Link href="/user/login" className="flex flex-row gap-1 text-sm 
                cursor-pointer user-select:none items-center hover:text-green-600 active:opacity-50">
                        <BiLogIn className="size-3"/>
                        <p>Login</p>
            </Link>:
            <Link href="/user/profile/" className="flex flex-row gap-1 text-sm 
                cursor-pointer user-select:none items-center hover:text-green-600 active:opacity-50">
                <CgProfile className="size-5"/>
                <p>
                    {user.first_name}
                </p>
            </Link>}
        </div>
        
    );
}
export default LogInButton;