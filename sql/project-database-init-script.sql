drop TABLE if EXISTS users;

create table users (
id INTEGER not null PRIMARY KEY,
username varchar(64) unique not null,
password varchar(64) not null,
salthashpassword varchar(58) not null,
email varchar(100),
realName varchar(100),
dob date,
description TEXT
);