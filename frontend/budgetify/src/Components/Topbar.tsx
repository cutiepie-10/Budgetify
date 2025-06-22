import LogInButton from "./LoginButton";
import Searchbar from "./Searchbar";

const Topbar =()=>{
    return(
        <div className="flex flex-row w-full h-10 justify-between items-center p-4">
            <Searchbar/>
            <div className="flex-1 flex flex-row justify-end-safe items-center">
                <LogInButton/>
            </div>
        </div>
    );
}
export default Topbar;