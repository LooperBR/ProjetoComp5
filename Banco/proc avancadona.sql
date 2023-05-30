

DECLARE p_id_atividade INT DEFAULT 0;

CREATE TEMPORARY TABLE TempAtividades (id INT,horario_repeticao TIME); 

if p_id_atividade = 0 then
	INSERT INTO TempAtividades
		SELECT a.id,a.horario_repeticao FROM atividade a
		INNER JOIN atividade_repete ar ON a.id = ar.atividade_id
		LEFT JOIN atividade_completacao ac ON ac.atividade_id = a.id AND ac.data_fim>NOW()
		WHERE repete = 1 
		AND ar.dia_semana = DAYOFWEEK(NOW())
		AND ac.id IS NULL;
END if;


DECLARE v_horario_repeticao DATETIME;
DECLARE v_id INT;

SELECT * FROM TempAtividades;

if p_id_atividade = 0 then-- execucao diaria
	WHILE EXISTS(SELECT 1 FROM TempAtividades LIMIT 1) DO
	   
	   SELECT v_horario_repeticao:=horario_repeticao,v_id:=id FROM TempAtividades LIMIT 1;
		INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES(NOW(),ADDTIME(NOW(),v_horario_repeticao),v_id);
	   
	   DELETE FROM TempAtividades WHERE v_id=id;
	END WHILE;
ELSE -- execucao de atividade especifica
	INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES(NOW(),ADDTIME(NOW(),v_horario_repeticao),v_id);
END if;

DROP TABLE TempAtividades;

SELECT a.id,a.horario_repeticao FROM atividade a
INNER JOIN atividade_repete ar ON a.id = ar.atividade_id
LEFT JOIN atividade_completacao ac ON ac.atividade_id = a.id AND ac.data_fim>NOW()
WHERE repete = 1 
AND ar.dia_semana = DAYOFWEEK(NOW())
AND ac.id IS NULL;

SELECT * FROM atividade_completacao ac
WHERE ac.atividade_id = 1 AND ac.data_fim<NOW()