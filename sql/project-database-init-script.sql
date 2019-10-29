/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists users;

 create table users (

    id integer not null primary key, 
    username varchar(64) unique not null,
    password varchar(64) not null, 
    salthashpassword varchar(58) not null
);
