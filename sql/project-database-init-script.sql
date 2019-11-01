drop TABLE if EXISTS users;

<<<<<<< HEAD
drop table if exists users;

 create table users (

    id integer not null primary key, 
    username varchar(64) unique not null,
    password varchar(64) not null, 
    salthashpassword varchar(58) not null

);

drop table if exists profile;

 create table profile (

    id integer not null primary key, 
    username varchar(64) unique not null,
    image varchar(256) not null,
    foreign key (username) references users(username)
);
=======
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
>>>>>>> origin/master
