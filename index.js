const inquirer = require('inquirer');
const db = require('./db/connection');
    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }];

function handleAction(answers) {
    switch (answers.action) {
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        case 'Exit':
            console.log("Goodbye!");
            return;
    }
}

// Start the loop by asking the first question
inquirer.prompt(questions).then(handleAction);



const viewAllDepartments = () => {
    console.log('View all departments');
    db.query('SELECT * FROM department', (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            console.log(`\n ID: ${rows[i].id} | Name: ${rows[i].name}`);

        }
    });
}

// viewAllRoles is a function that will query the database and return all roles
const viewAllRoles = () => {
    console.log('View all roles');
    db.query('SELECT * FROM role', (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            // get the department name for each role
            db.query('SELECT name FROM department WHERE id = ?', [rows[i].department_id], (err, result) => {
                if (err) {
                    console.log('\n Error:', err);
                } else {
                    console.log(`\n ID: ${rows[i].id} | Title: ${rows[i].title} | Salary: ${rows[i].salary} | Department: ${result[0].name}`);

                }
            });
        }
    });
}

// viewAllEmployees is a function that will query the database and return all employees
const viewAllEmployees = () => {
    console.log('View all employees');
    db.query('SELECT * FROM employee', (err, rows) => {
        for (let i = 0; i < rows.length; i++) {
            // get the role title for each employee
            db.query('SELECT title FROM role WHERE id = ?', [rows[i].role_id], (err, result) => {
                if (err) {
                    console.log('\n Error:', err);
                } else {
                    console.log(`\n ID: ${rows[i].id} | First Name: ${rows[i].first_name} | Last Name: ${rows[i].last_name} | Role: ${result[0].title}`);
                }
            });
        }
    });
}
// addDepartment is a function that will prompt the user to enter a department name and then add that department to the database
const addDepartment = () => {
    console.log('Add a department');
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ];
    inquirer.prompt(questions)
        .then((answers) => {
            db.query("INSERT INTO department (name) VALUES (?)", [answers.name], (err, result) => {
                if(err) {
                    console.log('\n Error:', err);
                } else {
                    console.log('\n Department added');

                }
            });
        });
}

// addRole is a function that will prompt the user to enter a role name and salary and then add that role to the database
const addRole = () => {
    console.log('Add a role');
    // return a map of department names and ids from the database
    db.query('SELECT * FROM department', (err, rows) => {
        const departments = rows.map((department) => {
            return {
                name: department.name,
                value: department.id
            }
        });
        const questions = [
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department of the role?',
                choices: departments

            }
        ];

        inquirer.prompt(questions)
            .then((answers) => {
                db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.title, answers.salary, answers.department], (err, result) => {
                    if (err) {
                        console.log('\n Error:', err);
                    } else {
                        console.log('\n Role added');
                    }
                });
            });
    });
}

// addEmployee is a function that will prompt the user to enter an employee's first name, last name, role, and manager and then add that employee to the database
const addEmployee = () => {
    console.log('Add an employee');
    const questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID of the employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID of the employee?'
        }
    ];
    inquirer.prompt(questions)
        .then((answers) => {
           db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, result) => {
               if(err) {
                   console.log('\n Error:', err);
               } else {
                   console.log('\n Employee added');
               }
           });
        });
}

// updateEmployeeRole is a function that will prompt the user to select an employee to update and their new role and then update that employee in the database
const updateEmployeeRole = () => {
    console.log('Update an employee role');
    const questions = [
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the employee you would like to update?'
        }
    ];
    inquirer.prompt(questions)
        .then((answers) => {
            const id = answers.id;
            const questions = [
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the new role ID of the employee?'
                }
            ];
            inquirer.prompt(questions)
                .then((answers) => {
                    const role_id = answers.role_id;
                    db.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id], (err, result) => {
                        if(err) {
                            console.log('\n Error:', err);
                        } else {
                            console.log('\n Employee updated');
                        }
                    });
                });
        });
}
