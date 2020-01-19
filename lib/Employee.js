class Employee {
  constructor(name, id, role, email, school) {
    this.name = name;
    this.id = id;
    this.role = role;
    this.email = email;
    this.school = school;
  };

  getName() {
    return this.name;
  };
  getRole() {
    return 'Employee';
  };
  getId() {
    return this.id;
  };
  getEmail() {
    return this.email;
  };
}

module.exports = Employee;