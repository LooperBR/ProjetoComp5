import { Link } from "react-router-dom"
import RequestHTTP from "../libraries/RequestHTTP";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Cadastro(){
    const [cookies, setCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        let options = [
        "POST",
        "http://localhost:9001/cadastro",
        [
            {
            header: "Content-Type",
            value: "application/json",
            },
        ],
        '{"login":"' +
            e.target.login.value +
            '","senha":"' +
            e.target.senha.value +
            '"}',
        ];
        let login = await RequestHTTP(...options);

        
        console.log(login);
        if (login.status == 200) {
            setCookie('username', login.login, { path: '/', maxAge: 3600 });
            setCookie('token', JSON.parse(login.responseText).token, { path: '/', maxAge: 3600 });
            console.log("redireciona");
            navigate("/home");
        }else{
            const formulario = document.getElementById("formulario")
            console.log("login incorreto")
        }
    }

    return(
    <div>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nome">nome:</label>
            <br />
            <input type="text" id="nome" name="nome"/>
            <br />
            <label htmlFor="login">login:</label>
            <br />
            <input type="text" id="login" name="login"/>
            <br />
            <label htmlFor="senha">senha:</label>
            <br />
            <input type="password" id="senha" name="senha"/>
            <br></br>
            <input type="submit" value="Cadastrar" />
        </form>
        <Link to="/"><button>Fazer Login</button></Link>
    </div>
      )
}