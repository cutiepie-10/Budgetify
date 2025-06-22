import LogInForm from "@/Components/LogIn/LogInForm";

const LogInPage = ()=>{
    return (
        <div className="flex flex-col items-center gap-10 p-5 pl-10">
            <h1 className="text-2xl flex-3 p-1">
                Login!
            </h1>
            <LogInForm/>
        </div>
    );
}
export default LogInPage;