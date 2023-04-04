SELECT * FROM avatar;
SELECT * FROM usuario;
SELECT * FROM tipo_atividade;
SELECT * FROM atividade;
SELECT * FROM atividade_completacao;
SELECT * FROM atividade_repete;

INSERT INTO avatar(nome,imagem,nivel) VALUES('basico','basico.jpg',1);

INSERT INTO usuario(nome,login,senha,nivel,xp,avatar_id) VALUES('Joao','Joao','senha',1,0,1);

INSERT INTO tipo_atividade(nome,geral,usuario_id) VALUES('Escola',1,NULL);
INSERT INTO tipo_atividade(nome,geral,usuario_id) VALUES('Trabalho',1,NULL);
INSERT INTO tipo_atividade(nome,geral,usuario_id) VALUES('ESports',0,1);

INSERT INTO atividade(titulo,descricao,data_criacao,data_limite,data_primeira_completacao,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
VALUES('Checar Banco','Checar se não ssurgiu nenhum dado sujo','2023-03-20','2023-03-21',NULL,'7:30',1,1,2);

INSERT INTO atividade(titulo,descricao,data_criacao,data_limite,data_primeira_completacao,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
VALUES('Dever Paulo','Enviar dever de engenharia de software','2023-03-20','2023-03-20',NULL,'23:59',0,1,1);

INSERT INTO atividade(titulo,descricao,data_criacao,data_limite,data_primeira_completacao,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
VALUES('CBLOL','Assistir torneio do CBLOL','2023-03-20','2023-03-21',NULL,'13:00',1,1,3);

INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(1,2);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(1,3);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(1,4);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(1,5);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(1,6);

INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(3,2);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(3,3);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(3,4);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(3,5);
INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(3,6);

INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-03-20','2023-03-20',1);
INSERT INTO atividade_completacao(data_inicio,data_fim,data_completacao,atividade_id) VALUES('2023-03-21','2023-03-21','2023-03-21',1);
INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-04-20','2023-04-20',1);
INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-03-20','2023-03-20',2);
INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-03-20','2023-03-20',3);
INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-03-21','2023-03-21',3);
INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES('2023-04-01','2023-04-30',3);

SELECT * FROM avatar;
SELECT * FROM usuario;
SELECT * FROM tipo_atividade;
SELECT * FROM atividade;
SELECT * FROM atividade_completacao;
SELECT * FROM atividade_repete;