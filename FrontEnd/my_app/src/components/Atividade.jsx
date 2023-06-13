import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import RequestHTTP from "../libraries/RequestHTTP";
import { useCookies } from "react-cookie";

export default function Atividade({id,id_completa,titulo,descricao,data_limite}){
    const [cookies, setCookie] = useCookies(["user"]);
    const [tempo,setTempo] = useState({
        segundo:0,
        minuto:0,
        hora:0,
        dia:0
      })
    
    useEffect(()=>{
        
        let intervalo = setInterval(()=>{
            let data_atual = new Date()
            let data_limitecerto = new Date(data_limite)

            let diff = data_limitecerto-data_atual
            diff/=1000

            let dia = Math.floor(diff/86400)
            diff = diff%86400
            let hora = Math.floor(diff/3600)
            diff = diff%3600
            let minuto = Math.floor(diff/60)
            diff = diff%60
            let segundo = Math.floor(diff)
            setTempo({
                segundo:segundo,
                minuto:minuto,
                hora:hora,
                dia:dia
              })
        }, 1000)
        return ()=>{clearInterval(intervalo)}
    },[])

    async function completa_atividade(e){
        let options = [
            "POST",
            "http://localhost:9001/completa_atividade",
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
                id_completa:id_completa
            })
        ];
        let atividade_completada = await RequestHTTP(...options);

        
        console.log(atividade_completada);
        if (atividade_completada.status == 200) {
            console.log("completou");
            window.location.reload(false)
        }else{
            console.log("cadastro incorreto")
            alert(JSON.parse(atividade_completada.responseText).error)
        }
    }

    async function desiste_atividade(e){
        let options = [
            "POST",
            "http://localhost:9001/desiste_atividade",
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
                id_completa:id_completa
            })
        ];
        let atividade_completada = await RequestHTTP(...options);

        
        console.log(atividade_completada);
        if (atividade_completada.status == 200) {
            console.log("completou");
            window.location.reload(false)
        }else{
            console.log("cadastro incorreto")
            alert(JSON.parse(atividade_completada.responseText).error)
        }
    }

    return (
        <div style={{backgroundColor: "yellow"}}>
            <Link to={"/editar_atividade/"+id}><h2>{titulo}</h2></Link>
            <p>{descricao}</p>
            <p>tempo restante {tempo.dia}:{tempo.hora}:{tempo.minuto}:{tempo.segundo}</p>
            <p>até {data_limite.toString()}</p>
            <button onClick={completa_atividade}>Concluir atividade</button>
            <button onClick={desiste_atividade}>Desistir da atividade</button>
        </div>
    )
}