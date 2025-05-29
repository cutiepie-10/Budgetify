import './App.css'
import LandingPage from './Components/LandingPage.tsx';
function App({project_name}:{project_name:string}) {

  return (
    <>
      <LandingPage project_name={project_name} />
    </>
  )
}

export default App;
