import GettingStarted from "./gettingStarted";
import NavBar from "./navbar"


export default function Header(){
    return(
        <div className="text-white flex flex-col min-w-[600px] 
        justify-evenly items-center size-full shadow-2xl
        min-lg bg-gradient-to-br bg-[linear-gradient(135deg,_#030e1a,#06182b,#195fa8)] overflow-clip">
            <NavBar/>
            <GettingStarted />
        </div>
    );
}