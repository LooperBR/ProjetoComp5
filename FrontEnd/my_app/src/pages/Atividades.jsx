import { Link } from "react-router-dom";

export default function Atividades(){
    return(
        <div>
            <h1>Atividades</h1>
            <Link to="../nova_atividade">Nova Atividade</Link>
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
            <div style={{backgroundColor: "yellow"}}>
                <h2>Atividade 3</h2>
                <p>descrição da atividade</p>
                <p>tempo restante 23:09:10:56</p>
                <button>Concluir atividades</button>
            </div>
            
        </div>
    )
}