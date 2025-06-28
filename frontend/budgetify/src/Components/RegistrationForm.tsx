'use client';
import {useForm, SubmitHandler} from 'react-hook-form';
import { useUserDispatch } from './ReducerContext/userReducer';
interface registerFormInputs{
    first_name:string,
    last_name:string,
    email:string,
    password:string,
}
//fetch function creation
const RegistrationForm= ()=>{
    const {register,handleSubmit,formState:{errors}} = useForm<registerFormInputs>()
    const userDispatcher= useUserDispatch();
    const onSubmit:SubmitHandler<registerFormInputs>= async (data)=>{
        const opts:RequestInit = {
            body:JSON.stringify(data),
            method:"POST",
            mode:"cors",
            cache:"default",
            headers:{
                'Content-Type':'application/json',
            }
        };
        console.log(userDispatcher);
        userDispatcher({
            type:"user/loggedin",
            user:{
                first_name:data.first_name,
                last_name:data.last_name,
                email:data.email,
            }
        }
        )
        fetch("http://localhost:8080/user/register/",opts)
        .then(response=>{
            console.log(response.status);
            if(!response.ok){
                throw new Error(`Could not post the request properly:${response}`)
            }
            return response.json();
        })
        .then(respo=>{
            console.log(respo);
            saveCredentials(respo.token,respo.refresh_token);
        })
        .catch(err=>{
            console.error(`Error while registering ${err}`);
        });
    };
    return(
        <form className="flex flex-5 flex-col gap-5 justify-center p-10 bg-white 
            shadow-lg rounded-2xl items-end"
            onSubmit = {handleSubmit(onSubmit)}
            action= "/">
                <div className="flex flex-col gap-0.5 items-end">
                    <div className="flex flex-row gap-3 justify-end
                 items-center">
                        <label>
                            First Name:
                        </label>
                        <input {...register("first_name",{required:true})}
                        type="text" className="border-1 pl-2"/>
                    </div>
                    {errors?.first_name&&<span className="text-red-500 text-sm">*First Name is required</span>}
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <div className="flex flex-row gap-3 justify-end
                 items-center">
                        <label>
                            Last Name:
                        </label>
                        <input {...register("last_name")}
                        type="text"
                        className="border-1 pl-2"/>
                    </div>
                </div>
            <div className="flex flex-col gap-0.5  items-end">
                <div className="flex flex-row gap-3 justify-end
                 items-center">
                    <label>
                        Email:
                    </label>
                    <input {...register("email",{required:true})}
                    type="email"
                    className="border-1 pl-2"/>
                </div>
                {errors?.email&&<span className="text-red-500 text-sm">*Email is required</span>}
            </div>
            <div className="flex flex-col gap-2 items-end">
                <div className="flex flex-row gap-3 justify-end
                 items-center">
                    <label>
                        Password:
                    </label>
                    <input {...register("password",{required:true})}
                    type="password"
                    className="border-1 pl-2"/>
                </div>
            </div>
            <button className="bg-green-600 text-white p-1.5 font-semibold rounded-xl
                     hover:opacity-75 user-select:none cursor-pointer">
                Submit
            </button>
        </form>
    );
};
function saveCredentials(token:string, refresh_token:string){
    localStorage.setItem("token",token);
    localStorage.setItem("refresh_token",refresh_token);
}
export default RegistrationForm;