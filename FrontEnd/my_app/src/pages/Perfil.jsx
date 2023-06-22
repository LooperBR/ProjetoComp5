import { useEffect, useState } from "react";
import RequestHTTP from "../libraries/RequestHTTP";
import { useCookies } from "react-cookie";

export default function Perfil(){
    const [cookies, setCookie] = useCookies(["user"]);
    const [usuario,setUsuario] = useState({
        "nome":"",
        "nivel":"1",
        "xp":"0",
    })
    useEffect(()=>{
        async function PegaDados(){
            let options = [
                "GET",
                "http://localhost:9001/usuario",
                [
                    {
                        header: "authorization",
                        value: "Bearer "+cookies.token,
                    }
                ]
              ];
              let usuarioHTTP = await RequestHTTP(...options)
              console.log("usuariohttp")
              console.log(usuarioHTTP.responseText)
              let usuariojson = await JSON.parse(usuarioHTTP.responseText)
              setUsuario(usuariojson);
              console.log("usuario")
              console.log(usuario)
              
        }
        PegaDados()
        
    },[])
    
    async function handleSubmit(e){
        e.preventDefault()
        if(!(e.target.senha_nova.value == e.target.senha_repetida.value)){
            alert("as senhas não coincidem")
            return
        }
        let options = [
            "POST",
            "http://localhost:9001/altera_senha",
            [
                {
                header: "Content-Type",
                value: "application/json",
                },
                {
                    header: "authorization",
                    value: "Bearer "+cookies.token,
                }
            ],
            JSON.stringify({
                senha_nova:e.target.senha_nova.value,
                senha_antiga:e.target.senha_antiga.value,
            })
        ];
        let atividade_inserida = await RequestHTTP(...options);
        if (atividade_inserida.status == 200) {
            console.log("criou");
            //navigate("/tipo_atividade");
            window.location.reload(false)
        }else{
            console.log("deu ruim")
            alert(JSON.parse(atividade_inserida.responseText).error)
        }

    }

    return(
        <div className="profile">
            <h1>Perfil</h1>
            <img src={require("../public/basico.png")} alt="avatar" />
            <p>Nome: {usuario.nome}</p>
            <p>Nivel: {usuario.nivel}</p>
            <p>XP: {usuario.xp}/100</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="senha_antiga">senha antiga</label>
                <input type="password" name="senha_antiga" id="senha_antiga" />
                <br />
                <label htmlFor="senha_nova">senha nova</label>
                <input type="password" name="senha_nova" id="senha_nova" />
                <br />
                <label htmlFor="senha_repetida">repita a senha</label>
                <input type="password" name="senha_repetida" id="senha_repetida" />
                
                <br />
                <button>Trocar Senha</button>
            </form>
        </div>
    )
}