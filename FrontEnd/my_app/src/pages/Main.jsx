import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Atividade from "../components/Atividade";
import RequestHTTP from "../libraries/RequestHTTP";
import { useCookies } from "react-cookie";

export default function Main() {
    const [cookies, setCookie] = useCookies(["user"]);
    const [atividades,setAtividade] = useState([])

    useEffect(()=>{
        async function PegaDados(){
            let options = [
                "GET",
                "http://localhost:9001/atividades_completacao_top4",
                [
                    {
                        header: "authorization",
                        value: "Bearer "+cookies.token,
                    }
                ]
              ];
              let atividadesHTTP = await RequestHTTP(...options)
              console.log("atividades")
              console.log(atividadesHTTP)
              console.log(atividadesHTTP.responseText)
              console.log(atividades)
              setAtividade(JSON.parse(atividadesHTTP.responseText));
              
        }
        PegaDados()
        
    },[])


    return (
        <div>
            <h1>Atividades mais urgentes</h1>
            <div className="content-div">
            {atividades!=undefined && atividades.length>0?
                atividades.map((atividade)=>{
                    return (<Atividade key={atividade.id} id={atividade.id} id_completa = {atividade.id_completa} titulo={atividade.titulo} descricao={atividade.descricao} data_limite={atividade.data_limite}/>)
                }):"Não existem atividades pendentes"
            }
            </div>

        </div>
    );
}
