# hd-web-module


# 기본 테이블 구조 입니다.
# 아래 SQL을 붙여넣어 테이블을 만들고 필요에 따라 컬럼을 생성해 사용하세요.

+-------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+
| Field       | Type             | Collation          | Null | Key | Default           | Extra          | Privileges                      | Comment                         |
+-------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+
| uid         | int(10) unsigned | NULL               | NO   | PRI | NULL              | auto_increment | select,insert,update,references | 유저 고유 번호                  |
| id          | varchar(255)     | utf8mb4_general_ci | NO   |     |                   |                | select,insert,update,references | 유저 아이디                     |
| pw          | varchar(255)     | utf8mb4_general_ci | NO   |     |                   |                | select,insert,update,references | 유저 비밀번호                   |
| create_date | datetime         | NULL               | NO   |     | CURRENT_TIMESTAMP |                | select,insert,update,references | 유저 생성 시각                  |
| update_date | datetime         | NULL               | NO   |     | CURRENT_TIMESTAMP |                | select,insert,update,references | 유저 수정 시각                  |
| delete_date | datetime         | NULL               | YES  |     | NULL              |                | select,insert,update,references | 유저 삭제 시각 및 여부          |
+-------------+------------------+--------------------+------+-----+-------------------+----------------+---------------------------------+---------------------------------+

CREATE TABLE HAEDO.Users (
	uid INT UNSIGNED auto_increment NOT NULL COMMENT '유저 고유 번호',
	id varchar(255) DEFAULT '' NOT NULL COMMENT '유저 아이디',
	pw varchar(255) DEFAULT '' NOT NULL COMMENT '유저 비밀번호',
	create_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '유저 생성 시각',
	update_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '유저 수정 시각',
	delete_date DATETIME NULL COMMENT '유저 삭제 시각 및 여부',
	CONSTRAINT Users_PK PRIMARY KEY (uid)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci
COMMENT='유저 테이블';
