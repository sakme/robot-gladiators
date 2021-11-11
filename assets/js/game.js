// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 15;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 15;
var enemyAttack = 12;

var fight = function(enemyName) {
    // alert players that they are starting the round
    window.alert("Welcome to Robot Gladiator's!");

    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if player chooses to skip and stop loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 

            // if true, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodby!");
                //  subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log(playerName + " now has " + playerMoney + " money remaing.");
                break;
            }
        }

        // remove enemy's health by subtracting teh amount in playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy"s health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has died!");
            
            //award player money for winning
            playerMoney = playerMoney +20;

            // leave while loop since enemy is dead
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        };

        // remove player"s health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player"s health
        if (playerHealth <=0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 15;
    // call fight function with enemy-robot
    fight(pickedEnemyName);
};