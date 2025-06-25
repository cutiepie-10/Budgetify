'use client';
import {useForm, SubmitHandler} from 'react-hook-form';
import { useUserDispatch } from '../ReducerContext/userReducer';
import Link from 'next/link';
interface LogInFormInputs{
    email:string,
    password:string,
}
const LogInForm= ()=>{
    const {register, handleSubmit,formState:{errors}} = useForm<LogInFormInputs>();
    const userDispatcher = useUserDispatch();
    const onSubmit:SubmitHandler<LogInFormInputs> = (data)=>{
        const opts:RequestInit ={
            body:JSON.stringify(data),
            method:"POST",
            cache:"default",
            headers:{
                'Content-Type':'application/json',
            }
        };
        fetch("http://localhost:8080/user/login/",opts)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Response is not okay:${response}`);
            }
            return response.json();
        })
        .then((respo)=>{
            userDispatcher({
                type:"user/update",
                user:{
                    first_name:respo?.first_name,
                    last_name:respo?.last_name,
                    email:data.email,
                }
            });
            console.log(`${respo.first_name} is successfully logged in`);
        })
        .catch(err=>{
            console.error(`error occured while logging in ${err}`);
        })
    }
    return(
        <form className="flex flex-5  flex-col gap-5 justify-center p-10 bg-white 
            shadow-lg rounded-2xl items-end"
            onSubmit = {handleSubmit(onSubmit)}
            autoComplete="on">
                <div className="flex flex-col gap-2 items-end">
                    <div className="flex flex-row gap-3 justify-end
                 items-center">
                    <label className="justify-end-safe">Email:</label>
                    <input type="email" className="border-1  pl-2"
                        {...register("email",{required: true})}>
                    </input>
                    
                </div>
                    {errors?.email&&<span className="text-red-500 text-sm">*Email is required</span>}
                </div>
                
                
                <div className="flex flex-row gap-3 justify-end items-center">
                    
                    <label>Password:</label>
                    <input type="password" className="border-1 pl-2"
                    {...register("password",{required:true})}/>
                    
                </div>
                <button className="bg-green-600 text-white p-1.5 font-semibold rounded-xl
                     hover:opacity-75 user-select:none cursor-pointer">
                        Submit
                </button>
            </form>
    );
}
export default LogInForm;
