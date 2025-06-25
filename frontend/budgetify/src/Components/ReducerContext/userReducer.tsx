'use client';
import {UserContext,UserDispatchContext} from "@/Context/userContext";
import {useReducer,useContext,useEffect} from "react"
import { UserReducer } from "@/Reducer/userReducer";
import { initUser } from "@/models/User";

export function UserProvider({children}:{children:React.ReactNode}){
    const [user,dispatch] = useReducer(UserReducer,initUser);
    useEffect(
        ()=>{
            try{
            const User = sessionStorage.getItem("user");
            if(User)
            dispatch({type:"user/refresh",user:JSON.parse(User)});
            }
            catch(err){
                console.error(err);
            }
        },[dispatch]
    );
    return( 
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}
export function useUserContext(){
    return useContext(UserContext);
}
export function useUserDispatch(){
    return useContext(UserDispatchContext);
}