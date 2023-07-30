-- First, create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS employee_db;

-- Select the database to use
USE employee_db;

-- Create the department table
CREATE TABLE department (
 id INT PRIMARY KEY,
 name VARCHAR(30)
);

-- Create the role table
CREATE TABLE role (
 id INT PRIMARY KEY,
 title VARCHAR(30),
 salary DECIMAL,
 department_id INT
);

-- Create the employee table
CREATE TABLE employee (
 id INT PRIMARY KEY,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT,
 manager_id INT
);
