import express, { response } from "express";
//import Conexao from './libraries/Conexao.js'
import cors from "cors";
import bodyParser from "body-parser";
import crypto from'crypto';
import {query} from './libraries/database.js'
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

const usuarios = [{ login: "admin", senha: "admin" },{ login: "joao", senha: "teste" }];

const atividades = [
  {
    id: 1,
    titulo: "teste",
    dataLimite: new Date(2023, 9, 9),
    descricao: "testando saporra",
    diario: false,
    usuario: "admin"
  },
  {
    id: 2,
    titulo: "teste2",
    dataLimite: new Date(2023, 5, 27),
    descricao: "testando saporra2",
    diario: false,
    usuario: "admin"
  },
];

let sessoes =[]

const jsonParser = bodyParser.json();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

function validaSessao(req){
  let authorization = req.headers['authorization']
  if(authorization){
    let bearer = authorization.substring(7)
    let usuario = sessoes.find((sessao) => {
      return sessao.token == bearer
    })
    return usuario
  }else{
    return undefined
  }
  

}

app.use(cors(corsOptions));

app.get("/teste", jsonParser, (req, res) => {
  console.log(req.body);
  console.log(sessoes);
  res.send("hello world");
});

app.get("/sessoes", jsonParser, (req, res) => {
  let usuario = validaSessao(req)
  console.log(usuario)
  console.log(sessoes);
  if(usuario){
    res.send("hello world");
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.get("/checa_sessao", jsonParser, (req, res) => {
  let usuario = validaSessao(req)
  console.log(usuario)
  console.log(sessoes);
  if(usuario){
    res.send("hello world");
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.get("/atividades", jsonParser, async(req, res) => {
  let usuario = validaSessao(req)
  console.log(usuario)
  console.log(req.headers['authorization'])
  if(usuario){
    let atividades_usuario = await query('SELECT a.* FROM atividade a INNER JOIN usuario u ON u.id = a.usuario_id WHERE u.login = ?',[usuario.login])
    // let atividades_usuario = atividades.filter((atividade)=>{
    //   return atividade.usuario == usuario.login
    // })
    res.send(atividades_usuario[0]);
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.post("/login", jsonParser, async(req, res) => {
  console.log("login");
  let usuario = await query('SELECT * FROM usuario WHERE login = ? AND senha = ?;',[req.body.login,req.body.senha]);
  console.log(usuario[0])
  if (usuario[0].length>0) {
    
    sessoes.find((sessao,i)=>{
      if(sessao.login.toLowerCase() == req.body.login.toLowerCase()){
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
        "login": usuario[0][0].login,
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
