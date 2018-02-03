SHOW DATABASES;
Drop database if exists dropbox_db;
create database dropbox_db;

use dropbox_db;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  UserId int(11) NOT NULL AUTO_INCREMENT,
  FirstName varchar(255) NOT NULL,
  LastName varchar(255) NOT NULL,
  EmailId varchar(255) NOT NULL,
  Password varchar(20) NOT NULL,
  Work varchar(255) DEFAULT NULL,
  Education varchar(255) DEFAULT NULL,
  Contact varchar(20) DEFAULT NULL,
  Interests varchar(255) DEFAULT NULL,
  PRIMARY KEY (UserId),
  UNIQUE KEY EmailId (EmailId)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS Activity;

CREATE TABLE Activity(
ActivityId int(11) not null AUTO_INCREMENT,
Description varchar(10000) not null,
UserId int(11) not null,
ActivityTime varchar(100) not null,
primary key (ActivityId),
key UserId (UserId),
Constraint Activity_ibfk_1 Foreign key (UserId) References Users (UserId)
) engine=InnoDB auto_increment=27 Default charset=latin1;


Drop table if exists Directory;
CREATE TABLE Directory (
  Id int(11) NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  Type int(1) NOT NULL,
  Members varchar(10000) DEFAULT NULL,
  IsStarred int(1) DEFAULT NULL,
  UserId int(11) DEFAULT NULL,
  ParentId int(11) DEFAULT NULL,
  Path varchar(10000) DEFAULT NULL,
  PRIMARY KEY (Id),
  KEY UserId (UserId),
  KEY ParentId (ParentId),
  CONSTRAINT Directory_ibfk_1 FOREIGN KEY (UserId) REFERENCES Users (UserId),
  CONSTRAINT Directory_ibfk_2 FOREIGN KEY (ParentId) REFERENCES Directory (Id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

show tables;
