import RegistrationForm from "@/Components/RegistrationForm";
const RegistrationPage=()=>{
    return(
        <div className="flex flex-col items-center gap-10 p-5 pl-10">
            <h1 className="text-2xl flex-3 p-1">
                Register
            </h1>
            <RegistrationForm/>
        </div>
    )
}
export default RegistrationPage;