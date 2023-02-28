import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Main() {
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
        <div>
            <h1>Main testando</h1>
        </div>
    );
}
