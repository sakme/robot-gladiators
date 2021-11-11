var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyName, enemyAttack, enemyHealth);

var fight = function() {
    // alert players that they are starting the round
    window.alert("Welcome to Robot Gladiator's!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player chooses to fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //remove enemy"s health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy"s health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove player"s health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player"s health
        if (playerHealth <=0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    // if player chooses to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if tur, leave fight
        if (confirmSkip) {
            window.alert(playerName + "has decided to skip this fight. Goodby!");
            //  subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
            console.log(playerName + " now has " + playerMoney + " money remaing.");
        }
        //  if false, ask question again by funning fight() again
        else {
            fight();
        }
    // if wrong value selected
    } else {
        window.alert("You need to choose a valid option. Try again!");
        fight();
    }
};

fight();