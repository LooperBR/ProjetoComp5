import express from "express";
//import Conexao from './libraries/Conexao.js'
import cors from "cors";
import bodyParser from "body-parser";
import banco from "./banco.json" assert { type: "json" };

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

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

const jsonParser = bodyParser.json();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors(corsOptions));

app.post("/teste", jsonParser, (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/login", jsonParser, (req, res) => {
  console.log('express');
  console.log(req.body);
  res.send(req.body);
});

app.listen(9001, () => {
  console.log("it's over 9000!!!!!!!!!!");
});
