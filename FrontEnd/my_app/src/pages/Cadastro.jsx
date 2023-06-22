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
            JSON.stringify({
                nome:e.target.nome.value,
                login:e.target.login.value,
                senha:e.target.senha.value
            })
        ];
        let login = await RequestHTTP(...options);

        
        console.log(login);
        if (login.status == 200) {
            setCookie('token', JSON.parse(login.responseText).token, { path: '/', maxAge: 3600 });
            console.log("redireciona");
            navigate("/home");
        }else{
            const formulario = document.getElementById("formulario")
            console.log("cadastro incorreto")
            alert(JSON.parse(login.responseText).error)
        }
    }

    return(
    <div className="login-container">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nome">nome:</label>
            <br />
            <input type="text" id="nome" name="nome" required/>
            <br />
            <label htmlFor="login">login:</label>
            <br />
            <input type="text" id="login" name="login" required/>
            <br />
            <label htmlFor="senha">senha:</label>
            <br />
            <input type="password" id="senha" name="senha" required/>
            <br></br>
            <input type="submit" value="Cadastrar" />
        </form>
        <Link to="/"><button className="register-button">Fazer Login</button></Link>
    </div>
      )
}