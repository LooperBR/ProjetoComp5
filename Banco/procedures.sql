DELIMITER $$
CREATE PROCEDURE insere_usuario(in p_nome VARCHAR(45),in p_login VARCHAR(45),in p_senha VARCHAR(45))
BEGIN
	DECLARE v_user_id int unsigned default 0;

	INSERT INTO usuario(nome,login,senha,nivel,xp,avatar_id) VALUES(p_nome,p_login,p_senha,1,0,1);

	set v_user_id = last_insert_id();

	-- do more stuff with v_user_id e.g. logs etc...

	select * from usuario where id = v_user_id;
END $$
delimiter ;

