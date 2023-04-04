export default function Perfil(){
    return(
        <div>
            <h1>Perfil</h1>
            <img src={require("../public/basico.png")} alt="avatar" />
            <p>Nome: João</p>
            <p>Nivel: 10</p>
            <p>XP: 25/100</p>
            <button>Trocar senha</button>
        </div>
    )
}