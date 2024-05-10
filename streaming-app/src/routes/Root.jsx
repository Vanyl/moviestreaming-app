import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../views/Home";

const Root = () => {

    return (
        <>
        <Navbar/>
            <Home/>
            <Outlet /> 
        </>
    );
  }

  export default Root