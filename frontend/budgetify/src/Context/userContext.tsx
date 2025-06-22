'use client';
import { initUser } from "@/models/User";
import {createContext,Dispatch} from "react";
import type {User} from '@/models/User';
export const UserContext = createContext<User>(initUser);
export const UserDispatchContext = createContext<Dispatch<{
    type:string,
    user:User|null
}>|null>(null);