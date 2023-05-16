import { useEffect } from "react";
import RequestHTTP from "../libraries/RequestHTTP";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(()=>{
    async function checalogin(){
      let options = [
        "GET",
        "http://localhost:9001/checa_sessao",
        [
          {
              header: "authorization",
              value: "Bearer "+cookies.token,
          }
        ]
      ];
      let login = await RequestHTTP(...options);
      console.log(login)
      //console.log(login.response)
      if (!login || login.status == 401) {
          console.log("nao tem cookie")
      }else if(login.status == 200){
          console.log("tem cookie")
          console.log(cookies)
          navigate("/home");
      }else{
        console.log("nao tem cookie")
      }
    }
    if(cookies.username){
      checalogin()
    }
    
  },[]);

  const styleRightForm = {
    color: "blue",
    backgroundColor : "white"
  }
  
  const styleWrongForm = {
    color: "red",
    backgroundColor : "yellow"
  }

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
      const formulario = document.getElementById("formulario")
      formulario.style.color = styleWrongForm.color
      formulario.style.backgroundColor = styleWrongForm.backgroundColor
      console.log("login incorreto")
    }
  }

  function resetFormStyle(){
    const formulario = document.getElementById("formulario")
    formulario.style.color = styleRightForm.color
    formulario.style.backgroundColor = styleRightForm.backgroundColor
  }

  return (
    <form id="formulario" style={styleRightForm} onSubmit={handleSubmit}>
      <label htmlFor="login">login:</label>
      <br />
      <input type="text" id="login" name="login" onChange={resetFormStyle}/>
      <br />
      <label htmlFor="senha">senha:</label>
      <br />
      <input type="password" id="senha" name="senha" onChange={resetFormStyle}/>
      <br></br>
      <input type="submit" value="Logar" />
    </form>
  );
}
