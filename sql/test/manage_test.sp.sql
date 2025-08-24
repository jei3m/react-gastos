DROP PROCEDURE IF EXISTS `manage_test`;

-- START Stored Procedure Script
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `manage_test`(
	IN p_id INT,
    IN p_action_type ENUM('create', 'update', 'delete'),
    IN p_name VARCHAR(25),
    IN p_description VARCHAR(50),

    OUT p_response JSON
)
BEGIN

    DECLARE v_affected_rows INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    CASE p_action_type

        WHEN 'create' THEN
            -- INSERT statement
            INSERT INTO tests
            (
                name,
                description
            )
            VALUES
            (
                p_name,
                p_description
            );

            SET v_affected_rows = ROW_COUNT();

            IF v_affected_rows > 0 THEN
                SET p_response = JSON_OBJECT(
                    'responseCode', 200, 
                    'responseMessage', 'Test Successfully Inserted',
                    'affectedRows', v_affected_rows
                );
            ELSE
                SET p_response = JSON_OBJECT(
                    'responseCode', 500, 
                    'responseMessage', 'Failed to Insert Test'
                );
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to Insert Test';
            END IF;
            
		WHEN 'update' THEN
			-- UPDATE statement
			UPDATE 
				tests 
            SET 
				name = p_name, 
                description = p_description 
			WHERE 
				id = p_id;
                
			SET v_affected_rows = ROW_COUNT();
            
            IF v_affected_rows > 0 THEN
				SET p_response = JSON_OBJECT(
					'responseCode', 200,
                    'responseMessage', 'Test Updated Successfully'
                );
			ELSE
				SET p_response = JSON_OBJECT(
					'responseCode', 500,
                    'responseMessage', 'Failed to Update test'
                );
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to Update test';
			END IF;
        WHEN 'delete' THEN
			-- DELETE statement
			DELETE FROM
				tests
			WHERE
				id = p_id;
                
			SET v_affected_rows = ROW_COUNT();
            
			IF v_affected_rows > 0 THEN
				SET p_response = JSON_OBJECT(
					'responseCode', 200,
                    'responseMessage', 'Test Deleted Successfully'
                );
			ELSE
				SET p_response = JSON_OBJECT(
					'responseCode', 500,
                    'responseMessage', 'Failed to Delete test'
                );
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to Delete test';
			END IF;
            
        ELSE
			SET p_response = JSON_OBJECT
                            (
                                'responseCode', 400, 
                                'responseMessage', 'Invalid Action Type'
                            );
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unsupported action type';
    END CASE;

    COMMIT;
END $$
DELIMITER ;
-- END Stored Procedure Script