SET FOREIGN_KEY_CHECKS = 0;

/** 建立数据库Data_structure **/
CREATE DATABASE IF NOT EXISTS `Data_structure` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `Data_structure`;

/** 2、用户主表  t_User ,单位编号原来是not null**/
DROP TABLE IF EXISTS `Data_structure`.`T_User`;
CREATE TABLE `Data_structure`.`t_user` (
    `userid`    int(10)     NOT NULL AUTO_INCREMENT COMMENT '自动编号',
    `phonenum`    varchar(11) DEFAULT NULL            COMMENT '手机号码',
    `name`      varchar(20) DEFAULT NULL            COMMENT '用户姓名',
    `sex`     varchar(20) NOT NULL                COMMENT '性别', 
    `password`  varchar(20) DEFAULT NULL            COMMENT '账户密码',
    PRIMARY KEY (`userid`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**3、建立算法表 t_algorithm **/
DROP TABLE IF EXISTS `Data_structure`.`t_algorithm`;
CREATE TABLE `Data_structure`.`t_algorithm` (
    `algoid`    int(10)     NOT NULL AUTO_INCREMENT COMMENT '自动编号',
    `algoname`  varchar(20)    NOT NULL        COMMENT '算法名称',
    `algourl`  varchar(100)      NOT NULL    COMMENT '算法路径',
    PRIMARY KEY (`algoid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

commit;


