DROP DATABASE IF EXISTS customer_db;
CREATE DATABASE customer_db;

-- department
--
-- id: INT PRIMARY KEY
--
-- name: VARCHAR(30) to hold department name

create table department (
    id int primary key,
    name varchar(30)
);

-- role
--
-- id: INT PRIMARY KEY
--
-- title: VARCHAR(30) to hold role title
--
-- salary: DECIMAL to hold role salary
--
-- department_id: INT to hold reference to department role belongs to
create table role (
    id int primary key,
    title varchar(30),
    salary decimal,
    department_id int
);

-- employee
--
-- id: INT PRIMARY KEY
--
-- first_name: VARCHAR(30) to hold employee first name
--
-- last_name: VARCHAR(30) to hold employee last name
--
-- role_id: INT to hold reference to employee role
--
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
create table employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);