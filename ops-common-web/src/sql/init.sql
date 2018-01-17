CREATE TABLE `ops`.`common_db_connect` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '数据库名称',
  `host` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '数据库host地址',
  `username` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `port` int(11) DEFAULT NULL COMMENT '端口',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='数据库连接配置';

CREATE TABLE `ops`.`common__meta_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `connect_id` bigint(20) NOT NULL COMMENT '数据库连接id,关联common__db_connect#id',
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '配置名称',
  `schema_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Schema名字',
  `table_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'table名字',
  `config_json` text COLLATE utf8_unicode_ci NOT NULL COMMENT '配置，json格式',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='项目元配置';

CREATE TABLE `ops`.`common__column_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `meta_id` bigint(20) NOT NULL COMMENT '项目元配置id,关联common__meta_config#id',
  `schema_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '该字段所在schema名字',
  `table_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '该字段所在table名字',
  `column_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '字段名称',
  `data_type` varchar(16) COLLATE utf8_unicode_ci NOT NULL COMMENT '数据类型',
  `column_type` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '数据完整类型',
  `config_json` text COLLATE utf8_unicode_ci NOT NULL COMMENT '配置，json格式',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_metaId_schema_table_column` (`meta_id`,`schema_name`,`table_name`,`column_name`),
  KEY `idx_metaId` (`meta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='项目字段配置';