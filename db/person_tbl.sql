use humans;

CREATE TABLE `person` (
	`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'UUID',
	`name` varchar(100) NOT NULL COMMENT 'name of a person',
    `date_of_birth` datetime DEFAULT NULL COMMENT 'birthday',
    `id_card_number` varchar(256) DEFAULT NULL COMMENT 'identity card number',
    `gender` char(1) DEFAULT 'X' COMMENT 'X-NA, M-Male, F-Female',
    `email` varchar(255) DEFAULT NULL,
    `country` char(2) DEFAULT NULL,
    `cdate` datetime NOT NULL COMMENT 'create date',
    `mdate` datetime DEFAULT NULL COMMENT 'update date',
	KEY `id_card_IDX` (`id_card_number`),
	KEY `name_IDX` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT 'Person';
