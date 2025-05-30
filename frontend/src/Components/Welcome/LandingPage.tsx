import Header from "./header.tsx";
import AboutUs from './aboutUs.tsx'
import Why from './why.tsx';
import ContactUs from "./contactUs.tsx";


export default function LandingPage({project_name}:{project_name:string}){
    return (
        <div className="gap-10 flex flex-col justify-center">
            <Header/>
            <AboutUs project_name={project_name}/>
            <Why />
            <ContactUs />
        </div>
    )
}