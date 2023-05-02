import RequestHTTP from "../libraries/RequestHTTP";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
export default function NovaAtividade() {
    const [cookies, setCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const [tiposAtividades,setTiposAtividades] = useState([])

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
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
          }
          
          const d = new Date(e.target.data_limite.value);
          let h = addZero(d.getHours());
          let m = addZero(d.getMinutes());
          let s = addZero(d.getSeconds());
          let time = h + ":" + m + ":" + s;
        let options = [
            "POST",
            "http://localhost:9001/nova_atividade",
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
                titulo:e.target.titulo.value,
                descricao:e.target.descricao.value,
                data_limite:e.target.data_limite.value,
                horario_repeticao:time,
                repete:e.target.repete.checked ? 1 : 0,
                tipo_atividade_id:e.target.tipo.value,
                segunda:e.target.segunda.checked ? 1 : 0,
                terca:e.target.terca.checked ? 1 : 0,
                quarta:e.target.quarta.checked ? 1 : 0,
                quinta:e.target.quinta.checked ? 1 : 0,
                sexta:e.target.sexta.checked ? 1 : 0,
                sabado:e.target.sabado.checked ? 1 : 0,
                domingo:e.target.domingo.checked ? 1 : 0
            })
        ];
        let atividade_inserida = await RequestHTTP(...options);

        
        console.log(atividade_inserida);
        if (atividade_inserida.status == 200) {
            console.log("criou");
            navigate("/home");
        }else{
            console.log("cadastro incorreto")
            alert(JSON.parse(atividade_inserida.responseText).error)
        }
    }
    return (
        <div>
            <h1>Nova Atividade</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titulo">Titulo</label>
                <input type="text" name="titulo" id="titulo" />
                <br />
                <label htmlFor="descricao">descrição</label>
                <textarea name="descricao" id="descricao" cols="30" rows="10"></textarea>
                <br />
                <label htmlFor="data_limite">Data Limite</label>
                <input type="datetime-local" name="data_limite" id="data_limite" />
                <br />
                <label htmlFor="tipo">tipo</label>
                <select name="tipo" id="tipo">
                {tiposAtividades!=undefined && tiposAtividades.length>0?
                    tiposAtividades.map((tipo)=>{
                        return (<option key={tipo.id} value={tipo.id}>{tipo.nome}</option>)
                    }):
                    "<option value='1'>Escola</option>"+
                    "<option value='2'>Trabalho</option>"
                }
                </select>
                <br />
                <label htmlFor="repete">Tarefa Diaria</label>
                <input type="checkbox" name="repete" id="repete" />
                <br />
                <div id="dias_repetir">
                    <label htmlFor="domingo">domingo</label>
                    <input type="checkbox" name="domingo" id="domingo" />
                    <label htmlFor="segunda">segunda</label>
                    <input type="checkbox" name="segunda" id="segunda" />
                    <label htmlFor="terca">terca</label>
                    <input type="checkbox" name="terca" id="terca" />
                    <label htmlFor="quarta">quarta</label>
                    <input type="checkbox" name="quarta" id="quarta" />
                    <label htmlFor="quinta">quinta</label>
                    <input type="checkbox" name="quinta" id="quinta" />
                    <label htmlFor="sexta">sexta</label>
                    <input type="checkbox" name="sexta" id="sexta" />
                    <label htmlFor="sabado">sabado</label>
                    <input type="checkbox" name="sabado" id="sabado" />
                    <br />
                </div>
                <button>Criar atividade</button>
            </form>
        </div>
    );
}