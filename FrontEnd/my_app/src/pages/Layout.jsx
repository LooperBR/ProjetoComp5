import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/NavBar";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import RequestHTTP from "../libraries/RequestHTTP";

export default function Layout() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(()=>{
    async function checalogin(){
      let options = [
        "POST",
        "http://localhost:9001/checa_sessao",
        [
          {
              header: "authorization",
              value: "Bearer "+cookies.token,
          }
        ]
      ];
      let login = await RequestHTTP(...options);
      console.log(login)
      if (!login) {
          console.log("nao tem cookie")
          navigate("/");
      }else{
          console.log("tem cookie")
          console.log(cookies)
      }
    }
    checalogin()
    
      
  },[]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};