SELECT * FROM avatar;
SELECT * FROM usuario;
SELECT * FROM tipo_atividade;
SELECT * FROM atividade;
SELECT * FROM atividade_completacao;
SELECT * FROM atividade_repete;
SELECT * FROM token;

-- login de usuario
SELECT * FROM usuario WHERE login = 'joao' AND senha = 'senha';

SELECT * FROM atividade WHERE usuario_id = 1;

SELECT * FROM atividade_completacao ac
INNER JOIN atividade a ON a.id = ac.atividade_id;

-- relatório de atividades_completadas
SELECT 
	case when data_inicio > now() then 'futura' 
	when data_completacao IS NOT NULL then 'completada'
	when data_fim > now() then 'ocorrendo' 
	ELSE 'atrasada'
	END,
ac.data_inicio,
ac.data_fim,
ac.data_completacao,
a.titulo
FROM atividade_completacao ac
INNER JOIN atividade a ON a.id = ac.atividade_id;

SELECT * FROM atividade;

UPDATE atividade SET tipo_atividade_id = 1 WHERE tipo_atividade_id = 3 AND usuario_id = 1;

SELECT NOW();

SELECT * FROM tipo_atividade a WHERE geral = 1 OR usuario_id =1;

INSERT INTO atividade(titulo,descricao,data_limite,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
VALUES('Checar Banco','Checar se não ssurgiu nenhum dado sujo','2023-03-21','7:30',1,1,2);

CALL insere_atividade(1,
'teste proc2',
'fazendo gambiarra com a proc2',
'2023-05-16',
'14:55:55',
1,
1,
1,
0,
1,
0,
1,
0,
0)

CALL edita_atividade(16,
1,
'teste edita',
'fazendo gambiarra com a proc de editar',
'2023-05-25',
'16:00:00',
1,
2,
0,
1,
0,
1,
0,
0,
1)

SELECT * FROM atividade_repete WHERE atividade_id = 16;

SELECT DAYOFWEEK(NOW())

SELECT * FROM atividade_completacao ac
INNER JOIN atividade a ON a.id = ac.atividade_id
WHERE ac.data_completacao IS null

SELECT a.*,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=1) then 1 ELSE 0 END Domingo,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=2) then 1 ELSE 0 END Segunda,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=3) then 1 ELSE 0 END Terca,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=4) then 1 ELSE 0 END Quarta,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=5) then 1 ELSE 0 END Quinta,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=6) then 1 ELSE 0 END Sexta,
case when EXISTS(SELECT 1 FROM atividade_repete rep WHERE rep.atividade_id = a.id AND rep.dia_semana=7) then 1 ELSE 0 END Sabado
FROM atividade a  WHERE a.usuario_id = ? and a.id = ?

UPDATE usuario SET senha = novasenha WHERE id = ?

INSERT INTO tipo_atividade(nome,geral,usuario_id) VALUES('ESports',0,1);