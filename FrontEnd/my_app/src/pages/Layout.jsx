import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/NavBar";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(()=>{
      if (!cookies.username) {
          console.log("nao tem cookie")
          navigate("/");
      }else{
          console.log("tem cookie")
          console.log(cookies)
      }
  },[]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};