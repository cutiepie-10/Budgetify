'use client';
import {useForm, SubmitHandler} from 'react-hook-form';
interface registerFormInputs{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}
const RegistrationForm= ()=>{
    const {register,handleSubmit,formState:{errors}} = useForm<registerFormInputs>()
    const onSubmit:SubmitHandler<registerFormInputs>= (data)=>{console.log(data);};
    return(
        <form className="flex flex-5 flex-col gap-5 justify-center p-10 bg-white 
            shadow-lg rounded-2xl items-end"
            onSubmit = {handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-0.5 items-end">
                    <div className="flex flex-row gap-3 justify-end
                 items-center">
                        <label>
                            First Name:
                        </label>
                        <input {...register("firstName",{required:true})}
                        type="text" className="border-1 pl-2"/>
                    </div>
                    {errors?.firstName&&<span className="text-red-500 text-sm">*First Name is required</span>}
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <div className="flex flex-row gap-3 justify-end
                 items-center">
                        <label>
                            Last Name:
                        </label>
                        <input {...register("lastName")}
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
export default RegistrationForm;