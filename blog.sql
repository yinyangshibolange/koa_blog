/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 05/11/2020 19:59:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for artical
-- ----------------------------
DROP TABLE IF EXISTS `artical`;
CREATE TABLE `artical`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `subtitle` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '子标题',
  `abstract` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '摘要',
  `user` int NULL DEFAULT NULL COMMENT '用户/作者',
  `time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `assort` int NULL DEFAULT NULL COMMENT '分类',
  `image` int NULL DEFAULT NULL COMMENT '图片对象',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `lasttime` datetime(0) NULL DEFAULT NULL COMMENT '最后修改时间',
  `count` int NULL DEFAULT NULL COMMENT '浏览数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_user`(`user`) USING BTREE,
  INDEX `fk_image`(`image`) USING BTREE,
  CONSTRAINT `fk_image` FOREIGN KEY (`image`) REFERENCES `image` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of artical
-- ----------------------------
INSERT INTO `artical` VALUES (12, '文章标题', NULL, NULL, 2, '2020-11-02 14:17:45', NULL, NULL, '*请在此处开始输入文章内容*\n我打打打啊打打\n### 阿达西哇\n![_img11_15985823907329740.jpg](http://i1.fuimg.com/729163/60a9eabc91f6b664.jpg)\n![Markdown](http://i1.fuimg.com/729163/60bcc9002d9051c9.png)', '2020-11-02 14:17:45', NULL);
INSERT INTO `artical` VALUES (13, '文章标题', NULL, NULL, 2, '2020-11-03 16:05:14', NULL, NULL, '*请在此处开始输入文章内容*', '2020-11-03 16:05:14', NULL);

-- ----------------------------
-- Table structure for artical_tags
-- ----------------------------
DROP TABLE IF EXISTS `artical_tags`;
CREATE TABLE `artical_tags`  (
  `artical` int NOT NULL COMMENT '文章id',
  `tag` int NOT NULL COMMENT '标签id',
  UNIQUE INDEX `index_articalid_tagid`(`artical`, `tag`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of artical_tags
-- ----------------------------
INSERT INTO `artical_tags` VALUES (12, 1);
INSERT INTO `artical_tags` VALUES (12, 2);
INSERT INTO `artical_tags` VALUES (12, 3);
INSERT INTO `artical_tags` VALUES (12, 8);
INSERT INTO `artical_tags` VALUES (13, 1);
INSERT INTO `artical_tags` VALUES (13, 2);
INSERT INTO `artical_tags` VALUES (13, 5);
INSERT INTO `artical_tags` VALUES (13, 8);
INSERT INTO `artical_tags` VALUES (13, 9);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL COMMENT '评论id',
  `parentid` int NULL DEFAULT NULL COMMENT '父评论id，在回复别人评论时使用',
  `user` int NOT NULL COMMENT '用户',
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `artical` int NOT NULL COMMENT '文章id',
  `time` datetime(0) NULL DEFAULT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_artical`(`artical`) USING BTREE,
  INDEX `fk_comment_user`(`user`) USING BTREE,
  CONSTRAINT `fk_artical` FOREIGN KEY (`artical`) REFERENCES `artical` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, NULL, 2, 'fff', 12, NULL);
INSERT INTO `comment` VALUES (2, 1, 2, '23123', 12, NULL);
INSERT INTO `comment` VALUES (3, 2, 2, '4123123', 12, NULL);
INSERT INTO `comment` VALUES (4, 3, 2, '4341231', 12, NULL);
INSERT INTO `comment` VALUES (5, 4, 2, '654543234', 12, NULL);
INSERT INTO `comment` VALUES (6, NULL, 2, '435', 12, NULL);
INSERT INTO `comment` VALUES (7, 6, 2, '54356', 12, NULL);
INSERT INTO `comment` VALUES (8, 6, 2, '4535', 12, NULL);
INSERT INTO `comment` VALUES (9, 7, 2, '6565', 12, NULL);
INSERT INTO `comment` VALUES (10, 9, 2, '575rwer', 12, NULL);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片路径',
  `type` int NULL DEFAULT NULL COMMENT '图片类型，大图，缩略图，头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------

-- ----------------------------
-- Table structure for tagcloud
-- ----------------------------
DROP TABLE IF EXISTS `tagcloud`;
CREATE TABLE `tagcloud`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tagcloud
-- ----------------------------
INSERT INTO `tagcloud` VALUES (7, 'c#');
INSERT INTO `tagcloud` VALUES (6, 'c++');
INSERT INTO `tagcloud` VALUES (4, 'go');
INSERT INTO `tagcloud` VALUES (2, 'java');
INSERT INTO `tagcloud` VALUES (1, 'javascript');
INSERT INTO `tagcloud` VALUES (9, 'nginx');
INSERT INTO `tagcloud` VALUES (5, 'php');
INSERT INTO `tagcloud` VALUES (3, 'python');
INSERT INTO `tagcloud` VALUES (10, 'ruby');
INSERT INTO `tagcloud` VALUES (8, 'vb');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 'IT猫', '1192492051@qq.com');

-- ----------------------------
-- Procedure structure for p_获取文章列表
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_获取文章列表`;
delimiter ;;
CREATE PROCEDURE `p_获取文章列表`(OUT `r_code` int,IN `param` blob,OUT `r_msg` blob)
BEGIN
	#Routine body goes here...
	select * from artical;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
