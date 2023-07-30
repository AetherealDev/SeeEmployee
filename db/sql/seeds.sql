-- seeds.sql

-- Insert data into the 'department' table
INSERT INTO department (id, name) VALUES
 (1, 'HR'),
 (2, 'Finance'),
 (3, 'Marketing'),
 (4, 'IT');

-- Insert data into the 'role' table
INSERT INTO role (id, title, salary, department_id) VALUES
 (1, 'HR Manager', 60000, 1),
 (2, 'Finance Analyst', 55000, 2),
 (3, 'Marketing Specialist', 50000, 3),
 (4, 'IT Developer', 65000, 4),
 (5, 'IT Manager', 70000, 4);

-- Insert data into the 'employee' table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
 (1, 'John', 'Doe', 1, NULL),
 (2, 'Jane', 'Smith', 2, 1),
 (3, 'Michael', 'Johnson', 3, 1),
 (4, 'Emily', 'Williams', 4, 1),
 (5, 'William', 'Brown', 5, 1),
 (6, 'Olivia', 'Jones', 2, 5);
