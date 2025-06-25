'use client';
import { initUser,User } from "@/models/User";
import {createContext,Dispatch} from "react";

export const UserContext = createContext<User>(initUser);
export const UserDispatchContext = createContext<Dispatch<{
    type:string,
    user:User
}>|null>(null);