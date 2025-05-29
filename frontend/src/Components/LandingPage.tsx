import Header from "./header.tsx";
import AboutUs from './aboutUs.tsx'
import Why from './why.tsx';
export default function LandingPage({project_name}:{project_name:string}){
    return (
        <div className=" overflow-auto gap-20 flex flex-col">
            <Header/>
            <AboutUs project_name={project_name}/>
            <Why />
        </div>
    )
}