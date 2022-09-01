# hd-web-module


# 기본 테이블 구조 입니다.
# 아래 SQL을 붙여넣어 테이블을 만들고 필요에 따라 컬럼을 생성해 사용하세요.

+--------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+
| Field        | Type             | Collation          | Null | Key | Default           | Extra          | Privileges                      | Comment                         |
+--------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+
| uid          | int(10) unsigned | NULL               | NO   | PRI | NULL              | auto_increment | select,insert,update,references | 유저 고유 번호                  |
| id           | varchar(255)     | utf8mb4_general_ci | NO   |     |                   |                | select,insert,update,references | 유저 아이디                     |
| pw           | varchar(255)     | utf8mb4_general_ci | NO   |     |                   |                | select,insert,update,references | 유저 비밀번호                   |
| create_date  | datetime         | NULL               | NO   |     | CURRENT_TIMESTAMP |                | select,insert,update,references | 유저 생성 시각                  |
| update_date  | datetime         | NULL               | NO   |     | CURRENT_TIMESTAMP |                | select,insert,update,references | 유저 수정 시각                  |
| delete_date  | datetime         | NULL               | YES  |     | NULL              |                | select,insert,update,references | 유저 삭제 시각 및 여부          |
| signout_date | datetime         | NULL               | YES  |     | NULL              |                | select,insert,update,references | 유저 로그아웃 시각              |
+--------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+

-- HAEDO.Users definition

CREATE TABLE `Users` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '유저 고유 번호',
  `id` varchar(255) NOT NULL DEFAULT '' COMMENT '유저 아이디',
  `pw` varchar(255) NOT NULL DEFAULT '' COMMENT '유저 비밀번호',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '유저 생성 시각',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '유저 수정 시각',
  `delete_date` datetime DEFAULT NULL COMMENT '유저 삭제 시각 및 여부',
  `signout_date` datetime DEFAULT NULL COMMENT '유저 로그아웃 시각',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='유저 테이블';