import { createBrowserRouter } from "react-router-dom"
import LandingPage from "./Components/LandingPage";

const router = createBrowserRouter([
    {
        path:"/",
        Component: LandingPage
    }
]);
export default router;
