const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const Inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")

const outputPath = path.resolve(__dirname, "output", "team.html")

const render = require("./lib/htmlRenderer")

const teamMembers = []
const idArray = []

function appMenu() {
    function CreateManager() {
        console.log("please build your team");
        Inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "what is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "what is your manager's id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "please enter a positive number greater than zero"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "what is your manager's email",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "what if your manager's office number?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero."
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        })
    }


    function createTeam() {

        Inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "which type of team member would you like to add?",
                choices: [
                    "engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        Inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "what is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "what is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "this ID is already taken. Please enter a different ID."
                        } else {
                            return true;
                        }
                    }
                    return "please enter a positive number greater than zero"
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "what is your engineer's Github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        })
    }

    function addIntern() {
        Inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "what is your inter's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "what is your interns's id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "this ID is already taken. Please enter a different ID."
                        } else {
                            return true;
                        }
                    }
                    return "please enter a positive number greater than zero"
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "what is your intern's email?",
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "what is your intern's School name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }


    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    CreateManager();

}

appMenu();