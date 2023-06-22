DELIMITER $$
CREATE PROCEDURE insere_usuario(in p_nome VARCHAR(45),in p_login VARCHAR(45),in p_senha VARCHAR(45))
BEGIN
	DECLARE v_user_id int unsigned default 0;

	INSERT INTO usuario(nome,login,senha,nivel,xp,avatar_id) VALUES(p_nome,p_login,p_senha,1,0,1);

	set v_user_id = last_insert_id();

	select * from usuario where id = v_user_id;
END $$
delimiter ;

DELIMITER $$
CREATE PROCEDURE insere_atividade(IN p_usuario_id INT,
											IN p_titulo VARCHAR(45),
											IN p_descricao TEXT,
											IN p_data_limite DATETIME,
											IN p_horario_repeticao TIME,
											IN p_repete TINYINT,
											IN p_tipo_atividade_id INT,
											IN p_segunda TINYINT,
											IN p_terca TINYINT,
											IN p_quarta TINYINT,
											IN p_quinta TINYINT,
											IN p_sexta TINYINT,
											IN p_sabado TINYINT,
											IN p_domingo TINYINT)
BEGIN
	DECLARE v_atividade_id int unsigned default 0;

	INSERT INTO atividade(titulo,descricao,data_limite,horario_repeticao,repete,usuario_id,tipo_atividade_id) 
		VALUES(p_titulo,p_descricao,p_data_limite,p_horario_repeticao,p_repete,p_usuario_id,p_tipo_atividade_id);

	set v_atividade_id = last_insert_id();

	select * from atividade where id = v_atividade_id;
	
	if p_domingo = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,1);
	END if;
	
	if p_segunda = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,2);
	END if;
	
	if p_terca = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,3);
	END if;
	
	if p_quarta = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,4);
	END if;
	
	if p_quinta = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,5);
	END if;
	
	if p_sexta = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,6);
	END if;
	
	if p_sabado = 1 then
		INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(v_atividade_id,7);
	END if;
	
	CALL cria_atividade_completacao(v_atividade_id,0,0);
	
END $$
delimiter ;

DELIMITER $$
CREATE PROCEDURE edita_atividade(IN p_atividade_id INT,
											IN p_usuario_id INT,
											IN p_titulo VARCHAR(45),
											IN p_descricao TEXT,
											IN p_data_limite DATETIME,
											IN p_horario_repeticao TIME,
											IN p_repete TINYINT,
											IN p_tipo_atividade_id INT,
											IN p_segunda TINYINT,
											IN p_terca TINYINT,
											IN p_quarta TINYINT,
											IN p_quinta TINYINT,
											IN p_sexta TINYINT,
											IN p_sabado TINYINT,
											IN p_domingo TINYINT)
BEGIN

	UPDATE atividade SET titulo=p_titulo,descricao=p_descricao,data_limite=p_data_limite,horario_repeticao=p_horario_repeticao,repete=p_repete,tipo_atividade_id=p_tipo_atividade_id
		WHERE id = p_atividade_id AND usuario_id = p_usuario_id;
	
	if p_domingo = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=1) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,1);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=1;
	END if;
	
	if p_segunda = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=2) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,2);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=2;
	END if;
	
	if p_terca = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=3) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,3);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=3;
	END if;
	
	if p_quarta = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=4) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,4);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=4;
	END if;
	
	if p_quinta = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=5) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,5);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=5;
	END if;
	
	if p_sexta = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=6) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,6);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=6;
	END if;
	
	if p_sabado = 1 then
		if not EXISTS(SELECT 1 FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=7) then
			INSERT INTO atividade_repete(atividade_id,dia_semana) VALUES(p_atividade_id,7);		
		end if;
	else
		DELETE FROM atividade_repete WHERE atividade_id = p_atividade_id AND dia_semana=7;
	END if;
	
	DELETE FROM atividade_completacao WHERE atividade_id = p_atividade_id AND data_completacao IS NULL AND data_desistencia IS NULL;
	CALL cria_atividade_completacao(0,0,p_usuario_id);
	
END $$
DELIMITER ;