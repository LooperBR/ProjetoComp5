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