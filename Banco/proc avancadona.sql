DELIMITER $$
CREATE PROCEDURE cria_atividade_completacao(in p_id_atividade INT)
BEGIN
	
	DECLARE v_dias_diff INT;
	DECLARE v_horario_repeticao TIME;
	DECLARE v_id INT;
	START TRANSACTION;
	SET p_id_atividade = IFNULL(p_id_atividade, 0);
	
	CREATE TEMPORARY TABLE TempAtividades (id INT,horario_repeticao TIME,dia_semana INT,diferenca INT); 
	
	if p_id_atividade = 0 then
		INSERT INTO TempAtividades(id,horario_repeticao,dia_semana)
			SELECT 
				a.id,a.horario_repeticao,
				COALESCE(
					(SELECT MIN(dia_semana) FROM atividade_repete ar WHERE  a.id = ar.atividade_id AND (ar.dia_semana>DAYOFWEEK(NOW()) OR (ar.dia_semana=DAYOFWEEK(NOW()) AND a.horario_repeticao<CURRENT_TIME()))),
					(SELECT MIN(dia_semana) FROM atividade_repete ar WHERE  a.id = ar.atividade_id)
				) dia_semana
			FROM atividade a
			LEFT JOIN atividade_completacao ac ON ac.atividade_id = a.id AND ac.data_fim>NOW()
			WHERE repete = 1 
			AND ac.id IS NULL;
			
		UPDATE TempAtividades SET diferenca = (DAYOFWEEK(NOW()) - dia_semana)*-1;
	
		UPDATE TempAtividades SET diferenca = 7+diferenca WHERE diferenca < 0;
		
		UPDATE TempAtividades SET diferenca = 7 WHERE diferenca = 0 AND horario_repeticao<CURRENT_TIME();
	END if;
	
	
	
	
	SELECT * FROM TempAtividades;
	
	if p_id_atividade = 0 then-- execucao diaria
		WHILE EXISTS(SELECT 1 FROM TempAtividades LIMIT 1) DO
		   
		   SELECT horario_repeticao,id,diferenca INTO v_horario_repeticao,v_id,v_dias_diff FROM TempAtividades LIMIT 1;
			INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id) VALUES(NOW(),concat(date(ADDDATE(NOW(), INTERVAL v_dias_diff DAY)),' ', v_horario_repeticao),v_id);
		   
		   DELETE FROM TempAtividades WHERE v_id=id;
		END WHILE;
	ELSE -- execucao de atividade especifica
	
	
		INSERT INTO atividade_completacao(data_inicio,data_fim,atividade_id)
			select NOW(),data_limite,p_id_atividade FROM atividade WHERE id = p_id_atividade;
		
		
	END if;
	
	DROP TABLE TempAtividades;
	COMMIT;
	
END $$
delimiter ;
-- fim da proc

/* CALL cria_atividade_completacao(6);

 DROP PROCEDURE cria_atividade_completacao;

SELECT * FROM atividade_completacao ac
INNER JOIN atividade a ON a.id = ac.atividade_id
WHERE ac.id > 10
;

SELECT 
	a.id,a.horario_repeticao,
	COALESCE(
		(SELECT MIN(dia_semana) FROM atividade_repete ar WHERE  a.id = ar.atividade_id AND (ar.dia_semana>DAYOFWEEK(NOW()) OR (ar.dia_semana=DAYOFWEEK(NOW()) AND a.horario_repeticao<CURRENT_TIME()))),
		(SELECT MIN(dia_semana) FROM atividade_repete ar WHERE  a.id = ar.atividade_id)
	) dia_semana
FROM atividade a
LEFT JOIN atividade_completacao ac ON ac.atividade_id = a.id AND ac.data_fim>NOW()
WHERE repete = 1 
AND ac.id IS NULL;

SELECT * FROM atividade_completacao;
DELETE FROM atividade_completacao WHERE data_inicio>'2023-06-12';

SELECT '2023-06-12'
*/