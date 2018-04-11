/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';
-- ----------------------------
--  Table structure for `phoneInfo`
-- ----------------------------

DROP TABLE IF EXISTS `phoneType`;
CREATE TABLE `phoneType` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `platform` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`platform`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='手机品牌';

DROP TABLE IF EXISTS `phoneInfo`;
CREATE TABLE `phoneInfo` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `platform` varchar(100) NOT NULL,
  `name` char(100) NOT NULL,
  `up_time` timestamp NOT NULL,
  `last_price_time` timestamp NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic` varchar(255),
  `desc` varchar(255),
  `route` varchar(255),
  `type` varchar(50),
  `trend` varchar(10),
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='手机信息';

DROP TABLE IF EXISTS `searchInfo`;
CREATE TABLE `searchInfo` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `platform` varchar(100) NOT NULL,
  `name` char(100) NOT NULL,
  `up_time` timestamp NOT NULL,
  `last_price_time` timestamp NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic` varchar(255),
  `desc` varchar(255),
  `route` varchar(255),
  `type` varchar(255),
  `trend` varchar(10),
  PRIMARY KEY (`id`),
  KEY `multiIdx` (`platform`, `name`, `type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='手机信息';

SET FOREIGN_KEY_CHECKS = 1;
