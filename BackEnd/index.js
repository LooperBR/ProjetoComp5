import express, { response } from "express";
//import Conexao from './libraries/Conexao.js'
import cors from "cors";
import bodyParser from "body-parser";
import crypto from'crypto';

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

const usuarios = [{ login: "admin", senha: "admin" },{ login: "joao", senha: "teste" }];

const atividades = [
  {
    id: 1,
    titulo: "teste",
    dataLimite: new Date(2022, 1, 1),
    descricao: "testando saporra",
    diario: false,
  },
  {
    id: 2,
    titulo: "teste2",
    dataLimite: new Date(2022, 2, 2),
    descricao: "testando saporra2",
    diario: false,
  },
];

let sessoes =[]

const jsonParser = bodyParser.json();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors(corsOptions));

app.get("/teste", jsonParser, (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

app.get("/sessoes", jsonParser, (req, res) => {
  console.log(sessoes);
  res.send("hello world");
});

app.post("/login", jsonParser, (req, res) => {
  console.log("login");
  let usuario = usuarios.find((usuario) => {
    return usuario.login == req.body.login && usuario.senha == req.body.senha;
  });
  if (usuario) {
    
    sessoes.find((sessao,i)=>{
      if(sessao.login == req.body.login){
        sessoes.splice(i,1)
        return true
      }
    })

    let session_token = crypto.randomBytes(40).toString('hex')
    while(sessoes.find((sessao) => {
      return sessao.token == session_token;
    })){
      session_token = crypto.randomBytes(40).toString('hex')
    }
    sessoes.push(
      {
        "login": usuario.login,
        "token": session_token
      }
    )
    let retorno = {"token":session_token}
    res.send(retorno);
  } else {
    res.status(404).send({"error":"user not found"});
  }
});

app.listen(9001, () => {
  console.log("it's over 9000!!!!!!!!!!");
});
