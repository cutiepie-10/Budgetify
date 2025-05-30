import { createBrowserRouter } from "react-router-dom"
import LandingPage from "./Components/Welcome/LandingPage";
import AboutsUs from "./Components/Welcome/aboutUs";
import Why from "./Components/Welcome/why";
import ContactUs from "./Components/Welcome/contactUs";
import LogInPage from "./Components/Login/loginPage";
const router = createBrowserRouter([
    {
        path:"/",
        Component: LandingPage,
        children:[
            {
                path:"#about-us",
                Component:AboutsUs
            },
            {
                path:"#why",
                Component:Why
            },
            {
                path:"#contact-us",
                Component:ContactUs
            }
        ],
    },
    {
        path:"/login",
        Component:LogInPage,
    }
]);
export default router;
