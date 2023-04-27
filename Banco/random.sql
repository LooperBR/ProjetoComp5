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

SELECT NOW();

INSERT INTO atividade(titulo,descricao,data_limite,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
VALUES('Checar Banco','Checar se não ssurgiu nenhum dado sujo','2023-03-21','7:30',1,1,2);

CALL insere_atividade(1,
'teste proc',
'fazendo gambiarra com a proc',
'2023-04-27',
'12:00:00',
1,
1,
1,
0,
1,
0,
1,
0,
0)