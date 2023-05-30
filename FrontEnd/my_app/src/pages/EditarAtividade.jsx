import { useEffect, useState } from "react";
import RequestHTTP from "../libraries/RequestHTTP";
import { useCookies } from "react-cookie";
import { useParams,useNavigate } from "react-router-dom";

export default function EditarAtividade(){
    const { id } = useParams();
    const [cookies, setCookie] = useCookies(["user"]);
    const [atividade,setAtividade] = useState({
        "id":"",
"titulo":"",
"descricao":"",
"data_criacao":"",
"data_limite":"",
"data_primeira_completacao":"",
"horario_repeticao":"",
"repete":"",
"usuario_id":"",
"tipo_atividade_id":"",
    })
    const [tiposAtividades,setTiposAtividades] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        async function PegaDados(){
            let options = [
                "GET",
                "http://localhost:9001/atividade/"+id,
                [
                    {
                        header: "authorization",
                        value: "Bearer "+cookies.token,
                    }
                ]
              ];
              let atividadesHTTP = await RequestHTTP(...options)
              console.log("atividades")
              console.log(atividadesHTTP.responseText)
              let ativ = await JSON.parse(atividadesHTTP.responseText)
              ativ.data_limite = new Date(ativ.data_limite)
              const offset = ativ.data_limite.getTimezoneOffset()
              ativ.data_limite = new Date(ativ.data_limite.getTime() - (offset*60*1000))
              ativ.data_limite = ativ.data_limite.toISOString()
              ativ.data_limite = ativ.data_limite.substring(0,ativ.data_limite.length-1)
              console.log(ativ.data_limite)
              setAtividade(ativ);
              console.log(ativ)
              options = [
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
              //console.log(tiposAtividades)
              
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
            "http://localhost:9001/edita_atividade",
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
                id:atividade.id,
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

        
        //console.log(atividade_inserida);
        if (atividade_inserida.status == 200) {
          //  console.log("criou");
            window.location.reload(false)
        }else{
            //console.log("cadastro incorreto")
            alert(JSON.parse(atividade_inserida.responseText).error)
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titulo">Titulo</label>
                <input type="text" name="titulo" id="titulo" defaultValue={atividade.titulo}/>
                <br />
                <label htmlFor="descricao">descrição</label>
                <textarea name="descricao" id="descricao" cols="30" rows="10" defaultValue={atividade.descricao}></textarea>
                <br />
                <label htmlFor="data_limite">Data Limite</label>
                <input type="datetime-local" name="data_limite" id="data_limite" defaultValue={atividade.data_limite}/>
                <br />
                <label htmlFor="tipo">tipo</label>
                <select name="tipo" id="tipo" defaultValue={atividade.tipo_atividade_id}>
                {tiposAtividades!=undefined && tiposAtividades.length>0?
                    tiposAtividades.map((tipo)=>{
                        return (<option key={tipo.id} value={tipo.id} >{tipo.nome}</option>)
                    }):
                    "<option value='1'>Escola</option>"+
                    "<option value='2'>Trabalho</option>"
                }
                </select>
                <br />
                <label htmlFor="repete">Tarefa Diaria</label>
                <input type="checkbox" name="repete" id="repete" defaultValue={atividade.repete}/>
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
                <button>Editar atividade</button>
            </form>
        </div>
    )
}