class Driver { //setting a class also using reserved (magic) words
    constructor(name, number) {
    this.name = name;
    this.number = number;
    }
    
    describe() {
    return this.name + " " + "drivers the number" + " "+ this.number + " "+ 'car.' ;
    }
}


class Team {
    constructor(name) {
    this.name = name;
    this.drivers = [];
    }
    
    addDriver(driver) { //withen the team class adding players to an array thats built in to the class
    if (driver instanceof Driver) {
    this.drivers.push(driver);
    } else {
    throw new Error(`You can only add an instance of driver. 
    argument is not a driver: ${driver}`);// throws an error message if input isnt corret
    }
    }
    
    describe() {
    return `${this.name} has ${this.drivers.length} drivers on the team.`;
    }
}


class Menu {
    constructor() {
    this.teams = [];
    this.selectedTeam = null;
    }
    
    start() { //main function to visulize the menu app
    let selection = this.showMainMenuOptions(); 
    while (selection != 0) {
    switch(selection) {
    case '1' :
    this.createTeam();
    break;
    case '2' :
    this.viewTeam();
    break;
    case '3' :
    this.deleteTeam();
    break;
    case '4' :
    this.displayTeams();
    break;
    default:
    selection = 0;
    }
    selection = this.showMainMenuOptions();
    }
    alert('Goodbye!');
    }
    
    
    showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create a new team
    2) view a team
    3) delete a team
    4) display all teams
    `);
    }
    
    showTeamMenuOptions(teamInfo) {
    return prompt(`
    0) back
    1) add a new driver
    2) delete a driver
    -----------------
    ${teamInfo}
    `);
    }
    
    displayTeams() {// funcation to disply the teams. Teams are in an array
    let teamString = '';
    for (let i = 0; i < this.teams.length; i++) {
    teamString += i+ ') ' + this.teams[i].name + '\n';
    }
    alert(teamString);
    }
    
    createTeam() {//using PUSH to add teams to the array and take the name you input
    let name = prompt('Enter name for new team: ');
    this.teams.push(new Team(name));
    }
    
    viewTeam() {// biggest issue I had was using driver and drivers in places where I should of used the other, which would throw an error for my code
    let index = prompt("Enter the index of the team that you want to view:");
    if (index > -1 && index < this.teams.length) {
    this.selectedTeam = this.teams[index];
    let description = 'Team Name: ' + this.selectedTeam.name + '\n';
    description += ' ' + this.selectedTeam.describe() + '\n ';
    for (let i = 0; i < this.selectedTeam.drivers.length; i++) {
    description += i + ') ' + this.selectedTeam.drivers[i].describe() + '\n';
    }
    let selection1 = this.showTeamMenuOptions(description);
    switch (selection1) {
    case '1' :
    this.createDriver();
    break;
    case '2' :
    this.deleteDriver();
    }
    }
    }
    
    deleteTeam() {
    let index = prompt('Enter the index of the team that you wish to delete: ');
    if (index > -1 && index < this.teams.length) {
    this.teams.splice(index,1);
    }
    }
    
    
    createDriver() {//using PUSH to add drivers to the array that is inside each team
    let name = prompt('Enter name for new driver: ');
    let number = prompt('Enter number for new driver: ');
    this.selectedTeam.addDriver(new Driver(name,number));
    }
    
    deleteDriver() {//using SPLICE to delate a driver from the array (TEAM)
    let index = prompt('Enter the index of the driver that you wish to delete: ');
    if (index > -1 && index < this.selectedTeam.driver.length) { this.selectedTeam.driver.splice(index,1);
    }
    }
    }
    let menu = new Menu();
    menu.start();// loops it self back the main menu unless exited or error