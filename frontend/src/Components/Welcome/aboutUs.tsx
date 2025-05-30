export default function AboutsUs({project_name}:{project_name:string}){
    return (
        <div className="text-black  font-normal flex flex-col md:ml-10 gap-2">
            <h2 className="font-semibold text-2xl">
                About us
            </h2>
            <p className=" opacity-85">
                I am Jay Arora along with Abhinav Choudhary are presenting <span>{project_name}</span> 
                <p>which is a tool for making household budgets easily and efficiently.</p>
            </p>
        </div>
        
    );
}