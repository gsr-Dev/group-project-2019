drop table if exists comments;

drop table if exists articles;

drop table if exists profile;

drop table if exists users;

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

 create table profile (

    id integer not null primary key, 
    username varchar(64) unique not null,
    image varchar(256) not null,
    foreign key (username) references users(username)
);



create table articles (
    id integer not null primary key, 
    username varchar(64) not null,
    title varchar(128) not null,
    date datetime,
    content text,
    foreign key (username) references users(username)
);



create table comments (
    id integer not null primary key, 
    username varchar(64) not null,
    date datetime,
    content text,
    articleID integer not null,
    foreign key (username) references users(username)
)
