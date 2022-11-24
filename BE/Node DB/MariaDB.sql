use adam;

select *
from family;

-- 테이블이 존재하는 경우만 수행
DROP TABLE goods; 

-- 테이블 생성
CREATE TABLE goods(
itemid int,
itemname VARCHAR(100), 
price int,
description VARCHAR(200), 
pictureurl VARCHAR(100),
updatedate varchar(20),
PRIMARY KEY (itemid)
)engine=InnoDB DEFAULT CHARSET=utf8;

insert into goods values(1, '레몬', 500,'비타민 C가 풍부한 쓴귤', 'lemon.jpg', '2020-08-01');
insert into goods values(2, '오렌지', 1500, '비타민 C가 풍부한 당귤', 'orange.jpg', '2020-08-01');
insert into goods values(3, '키위', 2000, '비타민 C가 풍부한 다래', 'kiwi.jpg', '2020-08-01');
insert into goods values(4, '포도', 1000, '항상화 성분과 당분이 높고 무기물이 많은 과일', 'grape.jpg', '2020-08-01'); 
insert into goods values(5, '딸기', 2000, '수분함량이 높은 과일', 'strawberry.jpg', '2020-08-01');
insert into goods values(6, '무화과', 300, '칼슘, 섬유질 및 항산화 물질을 많이 함유된 식물', 'fig.jpg', '2020-08-01');
insert into goods values(7, '레몬', 500,'비타민 C가 풍부한 쓴귤', 'lemon.jpg', '2020-08-01');
insert into goods values(8, '오렌지', 1500, '비타민 C가 풍부한 당귤', 'orange.jpg', '2020-08-01');
insert into goods values(9, '키위', 2000, '비타민 C가 풍부한 다래', 'kiwi.jpg', '2020-08-01');
insert into goods values(10, '포도', 1000, '항상화 성분과 당분이 높고 무기물이 많은 과일', 'grape.jpg', '2020-08-01'); 
insert into goods values(11, '딸기', 2000, '수분함량이 높은 과일', 'strawberry.jpg', '2020-08-01');
insert into goods values(12, '무화과', 300, '칼슘, 섬유질 및 항산화 물질을 많이 함유된 식물', 'fig.jpg', '2020-08-01');
insert into goods values(13, '레몬', 500,'비타민 C가 풍부한 쓴귤', 'lemon.jpg', '2020-08-01');
insert into goods values(14, '오렌지', 1500, '비타민 C가 풍부한 당귤', 'orange.jpg', '2020-08-01');
insert into goods values(15, '키위', 2000, '비타민 C가 풍부한 다래', 'kiwi.jpg', '2020-08-01');
insert into goods values(16, '포도', 1000, '항상화 성분과 당분이 높고 무기물이 많은 과일', 'grape.jpg', '2020-08-01'); 
insert into goods values(17, '딸기', 2000, '수분함량이 높은 과일', 'strawberry.jpg', '2020-08-01');
insert into goods values(18, '무화과', 300, '칼슘, 섬유질 및 항산화 물질을 많이 함유된 식물', 'fig.jpg', '2020-08-01');
insert into goods values(19, '딸기', 2000, '수분함량이 높은 과일', 'strawberry.jpg', '2020-08-01');
insert into goods values(20, '무화과', 300, '칼슘, 섬유질 및 항산화 물질을 많이 함유된 식물', 'fig.jpg', '2020-08-01');
insert into goods values(21, '레몬', 500,'비타민 C가 풍부한 쓴귤', 'lemon.jpg', '2020-08-01');
insert into goods values(22, '오렌지', 1500, '비타민 C가 풍부한 당귤', 'orange.jpg', '2020-08-01');
insert into goods values(23, '키위', 2000, '비타민 C가 풍부한 다래', 'kiwi.jpg', '2020-08-01');
insert into goods values(24, '포도', 1000, '항상화 성분과 당분이 높고 무기물이 많은 과일', 'grape.jpg', '2020-08-01'); 
insert into goods values(25, '딸기', 2000, '수분함량이 높은 과일', 'strawberry.jpg', '2020-08-01');
insert into goods values(26, '무화과', 300, '칼슘, 섬유질 및 항산화 물질을 많이 함유된 식물', 'fig.jpg', '2020-08-01');
insert into goods values(27, '레몬', 500,'비타민 C가 풍부한 쓴귤', 'lemon.jpg', '2020-08-01');
insert into goods values(28, '오렌지', 1500, '비타민 C가 풍부한 당귤', 'orange.jpg', '2020-08-01');
insert into goods values(29, '키위', 2000, '비타민 C가 풍부한 다래', 'kiwi.jpg', '2020-08-01');
insert into goods values(30, '포도', 1000, '항상화 성분과 당분이 높고 무기물이 많은 과일', 'grape.jpg', '2020-08-01'); 

commit;

select * from goods;

select * from family;

use node;

DROP TABLE goods; 

CREATE TABLE goods(
id INT NOT NUll AUTO_INCREMENT,
itemid int,
itemname VARCHAR(100), 
price int,
description VARCHAR(200), 
pictureurl VARCHAR(100),
updatedate varchar(20),
PRIMARY KEY (id)
)engine=InnoDB DEFAULT CHARSET=utf8;

select * from goods;


CREATE TABlE users (
id INT NOT NUll AUTO_INCREMENT,
name VARCHAR(20) NOT NUll,
age INT UNSIGNED NOT NUll,
created_at DATETIME NOT NUll DEFAUlT now(),
PRIMARY KEY(id),
UNIQUE INDEX name_UNIQUE (name ASC)) engine=InnoDB DEFAULT CHARSET=utf8;

insert into users(name, age) values('adam', 26);
insert into users(name, age) values('itggangpae', 52);

select * from users;

CREATE TABLE comments (
id INT NOT NULL AUTO_INCREMENT,
commenter INT NOT NULL,
comment VARCHAR(100) NOT NULL,
created_at DATETIME NOT NULL DEFAULT now(),
PRIMARY KEY(id),
INDEX commenter_idx (commenter),
CONSTRAINT commenterfk FOREIGN KEY (commenter) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE) 
DEFAULT CHARSET=utf8 ENGINE=InnoDB;

insert into comments(commenter, comment) values(1, '가입 인사');
insert into comments(commenter, comment) values(2, '반갑습니다.');

select * from comments;

select * from users;