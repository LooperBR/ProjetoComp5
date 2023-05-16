import { useEffect, useState } from "react";
import Atividade from "../components/Atividade";
import RequestHTTP from "../libraries/RequestHTTP";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Perfil(){
    const [cookies, setCookie] = useCookies(["user"]);
    const [tiposAtividades,setTiposAtividades] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        async function PegaDados(){
            let options = [
                "GET",
                "http://localhost:9001/tiposAtividade",
                [
                    {
                        header: "authorization",
                        value: "Bearer "+cookies.token,
                    }
                ]
              ];
              let tiposAtividadesHTTP = await RequestHTTP(...options)
              setTiposAtividades(JSON.parse(tiposAtividadesHTTP.responseText));
              console.log(tiposAtividades)
              
        }
        PegaDados()
        
    },[])

    async function handleSubmit(e){
        e.preventDefault()
        let options
        if(e.target.id.value>0){
            options = [
                "POST",
                "http://localhost:9001/altera_tipo_atividade",
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
                    nome:e.target.nome.value,
                    id:e.target.id.value
                })
            ];
        }else{
            options = [
                "POST",
                "http://localhost:9001/novo_tipo_atividade",
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
                    nome:e.target.nome.value
                })
            ];
        }
        
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

    function altera(id){
        let formID = document.getElementById("id")
        let formNome = document.getElementById("nome")
        let tipo = tiposAtividades.find((elemento)=>{
            return elemento.id == id
        })
        formID.value = tipo.id
        formNome.value = tipo.nome
    }

    function zera(){
        let formID = document.getElementById("id")
        let formNome = document.getElementById("nome")
        formID.value = 0
        formNome.value = ""
    }

    async function deleta(id){
        let options = [
            "POST",
            "http://localhost:9001/deleta_tipo_atividade",
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
                id:id
            })
        ];
        let atividade_inserida = await RequestHTTP(...options);
        if (atividade_inserida.status == 200) {
            console.log("deletou");
            //navigate("/tipo_atividade");
            window.location.reload(false)
        }else{
            console.log("deu ruim")
            alert(JSON.parse(atividade_inserida.responseText).error)
        }
    }

    return(
        <div>
            <h1>Tipo Atividades</h1>
            <button onClick={zera}>Novo Tipo Atividade</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">id</label>
                <input type="text" name="id" id="id" value={0} disabled/>
                <br />
                <label htmlFor="nome">nome:</label>
                <input type="text" name="nome" id="nome"/>

                <button>cadastrar</button>
            </form>
            {/* <p><Link to="../nova_atividade">Nova Atividade</Link></p> */}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {tiposAtividades!=undefined && tiposAtividades.length>0?
                    tiposAtividades.map((tiposAtividade,idx)=>{
                        return (
                        <tr key={idx}>
                            <td>{tiposAtividade.id}</td>
                            <td>{tiposAtividade.nome}</td>
                            <td><button onClick={(e) => altera(tiposAtividade.id)}>Alterar</button></td>
                            <td><button onClick={(e) => deleta(tiposAtividade.id)}>Deletar</button></td>
                        </tr>
                        )
                    }):"Não existem tipos de atividade"
                }
                </tbody>
            </table>
        </div>
    )
}