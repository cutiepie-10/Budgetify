'use client';
import {UserContext,UserDispatchContext} from "@/Context/userContext";
import {useReducer,useContext} from "react"
import { UserReducer } from "@/Reducer/userReducer";
import { initUser } from "@/models/User";

export function UserProvider({children}:{children:React.ReactNode}){
    const [user,dispatch] = useReducer(UserReducer,initUser);
    return( 
        <UserContext value={user}>
            <UserDispatchContext value={dispatch}>
                {children}
            </UserDispatchContext>
        </UserContext>
    );
}
export function useUserContext(){
    return useContext(UserContext);
}
export function useUserDispatch(){
    return useContext(UserDispatchContext)
}