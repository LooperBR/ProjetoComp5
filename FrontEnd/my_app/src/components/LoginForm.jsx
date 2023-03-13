import { useEffect } from "react";
import RequestHTTP from "../libraries/RequestHTTP";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(()=>{
    if (cookies.username) {
      console.log("tem cookie")
      console.log(cookies)
      navigate("/home");
    }
  },[]);

  async function handleSubmit(e) {
    e.preventDefault();
    let options = [
      "POST",
      "http://localhost:9001/login",
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
      setCookie('username', e.target.login.value, { path: '/', maxAge: 3600 });
      setCookie('token', JSON.parse(login.responseText).token, { path: '/', maxAge: 3600 });
      console.log("redireciona");
      navigate("/home");
    }else{
      console.log("login incorreto")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login">login:</label>
      <br />
      <input type="text" id="login" name="login" />
      <br />
      <label htmlFor="senha">senha:</label>
      <br />
      <input type="password" id="senha" name="senha" />
      <br></br>
      <input type="submit" value="Logar" />
    </form>
  );
}