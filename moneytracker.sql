/*
SQLyog Community v12.4.3 (32 bit)
MySQL - 10.4.32-MariaDB : Database - moneytracker
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`moneytracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;


/* Procedure structure for procedure `sp_getusersummary` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getusersummary` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getusersummary`(IN user_id INT)
BEGIN
    SELECT 
        w.`name`, 
        w.`description`,
        SUM(CASE WHEN t.`type` = 'expense' THEN t.`amount` ELSE 0 END) AS expense_amount,
        SUM(CASE WHEN t.`type` = 'income' THEN t.`amount` ELSE 0 END) AS income_amount,
        SUM(CASE WHEN t.`type` = 'income' THEN t.`amount` ELSE 0 END) - 
        SUM(CASE WHEN t.`type` = 'expense' THEN t.`amount` ELSE 0 END) AS balance
    FROM 
        `wallet` w
    LEFT JOIN 
        `transaction` t ON w.`id` = t.`wallet_id`
    WHERE 
        w.`user_id` = user_id
    GROUP BY 
        w.`id`;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getwallettransactions` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getwallettransactions` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getwallettransactions`(wallet_id int(20))
BEGIN
		select `id`,`type`,`description`,`date`,`amount` from `transaction` order by `id` desc;
	END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
