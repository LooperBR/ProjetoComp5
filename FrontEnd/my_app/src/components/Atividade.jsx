import { useEffect, useState } from "react"

export default function Atividade({id,titulo,descricao,data_limite}){
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
    return (
        <div style={{backgroundColor: "yellow"}}>
            <h2>{titulo}</h2>
            <p>{descricao}</p>
            <p>tempo restante {tempo.dia}:{tempo.hora}:{tempo.minuto}:{tempo.segundo}</p>
            <p>até {data_limite.toString()}</p>
            <button>Concluir atividade</button>
        </div>
    )
}