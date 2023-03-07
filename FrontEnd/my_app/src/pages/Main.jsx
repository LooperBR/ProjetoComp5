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
            <div style={{backgroundColor: "yellow"}}>
                <h2>Atividade 1</h2>
                <p>descrição da atividade</p>
                <p>tempo restante 12:00:00</p>
                <button>Concluir atividades</button>
            </div>
            <div style={{backgroundColor: "yellow"}}>
                <h2>Atividade 2</h2>
                <p>descrição da atividade</p>
                <p>tempo restante 1:08:23:00</p>
                <button>Concluir atividades</button>
            </div>
        </div>
    );
}
