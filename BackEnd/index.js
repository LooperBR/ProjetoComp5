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



const jsonParser = bodyParser.json();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

async function validaSessao(req){
  let authorization = req.headers['authorization']
  if(authorization){
    let bearer = authorization.substring(7)
    let usuario = await query('select usuario_id from token where token = ? and data_limite > NOW()',[bearer])
    if(usuario[0].length>0){
      return usuario[0][0].usuario_id
    }else{
      return undefined
    }
    
  }else{
    return undefined
  }
  

}

async function createNewToken(id){
  await query('delete from token where usuario_id = ?;',[id])

  let session_token = crypto.randomBytes(40).toString('hex')

  let existe = await query('select * from token where token = ?',[session_token]);
  while(existe[0].length>0){
      session_token = crypto.randomBytes(40).toString('hex')
      existe = await query('select * from token where token = ?',[session_token]);
  }

  let data_limite = new Date()
  data_limite.setTime(data_limite.getTime()+ (1000*60*60))

  await query('insert into token(usuario_id,token,data_limite) values(?,?,?);',[id,session_token,data_limite])
  
  return session_token
}

app.use(cors(corsOptions));

app.get("/teste", jsonParser, (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

app.get("/sessoes", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  if(usuario_id){
    res.send("hello world");
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.get("/checa_sessao", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  if(usuario_id){
    res.send("hello world");
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.get("/tiposAtividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let tipos_atividade = await query('SELECT * FROM tipo_atividade a WHERE geral = 1 OR usuario_id = ?',[usuario_id])
    // let atividades_usuario = atividades.filter((atividade)=>{
    //   return atividade.usuario == usuario.login
    // })
    res.send(tipos_atividade[0]);
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
});

app.post("/novo_tipo_atividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let tipo_atividade = req.body
    console.log(tipo_atividade)
    await query('INSERT INTO tipo_atividade(nome,geral,usuario_id) VALUES(?,0,?);',
    [tipo_atividade.nome,usuario_id]);
    res.send({response:"success"});
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.post("/altera_tipo_atividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let tipo_atividade = req.body
    console.log(tipo_atividade)
    await query('UPDATE tipo_atividade set nome = ? where id = ? and usuario_id = ? and geral = 0;',
    [tipo_atividade.nome,tipo_atividade.id,usuario_id]);
    res.send({response:"success"});
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.post("/deleta_tipo_atividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let tipo_atividade = req.body
    console.log(tipo_atividade)
    await query('UPDATE atividade SET tipo_atividade_id = 1 WHERE tipo_atividade_id = ? AND usuario_id = ?;',
    [tipo_atividade.id,usuario_id]);
    await query('Delete from tipo_atividade where id = ? and usuario_id = ? and geral = 0;',
    [tipo_atividade.id,usuario_id]);
    res.send({response:"success"});
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.get("/atividade/:ativId", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let atividades_usuario = await query('SELECT a.* FROM atividade a  WHERE a.usuario_id = ? and a.id = ?',[usuario_id,req.params.ativId])
    // let atividades_usuario = atividades.filter((atividade)=>{
    //   return atividade.usuario == usuario.login
    // })
    res.send(atividades_usuario[0][0]);
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
});

app.get("/atividades", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let atividades_usuario = await query('SELECT a.* FROM atividade a  WHERE a.usuario_id = ?',[usuario_id])
    // let atividades_usuario = atividades.filter((atividade)=>{
    //   return atividade.usuario == usuario.login
    // })
    res.send(atividades_usuario[0]);
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
});

app.post("/nova_atividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let atividade = req.body
    console.log(atividade)
    let atividades_usuario = await query('CALL insere_atividade(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [usuario_id,atividade.titulo,atividade.descricao,atividade.data_limite,atividade.horario_repeticao,atividade.repete,atividade.tipo_atividade_id,atividade.segunda,atividade.terca,atividade.quarta,atividade.quinta,atividade.sexta,atividade.sabado,atividade.domingo]);
    res.send({id:atividades_usuario[0][0][0].id});
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.post("/edita_atividade", jsonParser, async (req, res) => {
  let usuario_id = await validaSessao(req)
  console.log(usuario_id)
  console.log(req.headers['authorization'])
  if(usuario_id){
    let atividade = req.body
    console.log(atividade)
    let atividades_usuario = await query('CALL edita_atividade(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [atividade.id,usuario_id,atividade.titulo,atividade.descricao,atividade.data_limite,atividade.horario_repeticao,atividade.repete,atividade.tipo_atividade_id,atividade.segunda,atividade.terca,atividade.quarta,atividade.quinta,atividade.sexta,atividade.sabado,atividade.domingo]);
    res.send({id:atividades_usuario[0][0][0].id});
  }else{
    res.status(401).send({"error":"Bearer token invalid or not found"});
  }
  
  
});

app.post("/cadastro", jsonParser, async(req, res) => {
  
  let usuario = await query('SELECT * FROM usuario WHERE login = ?;',[req.body.login])
  if(usuario[0].length>0){
    res.status(400).send({"error":"username already in use"})
    return
  }
  usuario = await query('CALL insere_usuario(?,?,?)',[req.body.nome,req.body.login,req.body.senha])
  let token = await createNewToken(usuario[0][0][0].id)
  console.log("teste")
  res.send({"token": token});
  
});


app.post("/login", jsonParser, async(req, res) => {
  console.log("login");
  let usuario = await query('SELECT * FROM usuario WHERE login = ? AND senha = ?;',[req.body.login,req.body.senha]);
  console.log(usuario[0])
  if (usuario[0].length>0) {
    let token = await createNewToken(usuario[0][0].id)
    let retorno = {"token":token}
    res.send(retorno);
  } else {
    res.status(404).send({"error":"user not found"});
  }
});

app.listen(9001, () => {
  console.log("it's over 9000!!!!!!!!!!");
});