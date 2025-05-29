export default function AboutsUs({project_name}:{project_name:string}){
    return (
        <div className="text-black dark:text-white font-normal ">
            <h2 className="font-semibold">
                About us
            </h2>
            <p className=" opacity-50 ">
                I am Jay Arora along with Abhinav Choudhary are presenting <span>{project_name}</span> which is a tool for making household budgets easily and efficiently.
            </p>
        </div>
        
    );
}