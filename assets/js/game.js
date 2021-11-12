var playerName = window.prompt("What is your robot's name?");

// function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min );

    return value;
};

var playerHealth = 30;
var playerAttack = 12;
var playerMoney = 12;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = randomNumber(40,60);
var enemyAttack = 10;

var priceAttack = 7;
var priceHealth = 7;
var boughtAttack = 6;
var boughtHealth = 20;

var fight = function(enemyName) {
    // alert players that they are starting the round

    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if player chooses to skip and stop loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 

            // if true, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodby!");
                //  subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log(playerName + " now has " + playerMoney + " money remaing.");
                break;
            }
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);

        //log remaining health
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
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(enemyAttack -3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);

        //log remaining health
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

// function to start a new game
var startGame = function() {
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // indicate the round number
            window.alert("Welcome to Robot Gladiator's! Round " + (i + 1));
    
            // pick new enemy to fight from arraybob
            var pickedEnemyName = enemyNames[i];

            // reset player stats
            // playerHealth = 100;
            // playerAttack = 10;
            // playerMoney - 10;
    
            //reset enemy health
            enemyHealth = randomNumber(40,60);
    
            // call fight function with enemy-robot
            fight(pickedEnemyName);

            //if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game over!");
        }
    }
    // out of health or enemies
    endGame();
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE to make a choice?"
    );
    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            if (playerMoney >= priceHealth) {
                window.alert("Refilling player's health by 20 for 7 dollars");
    
                // increase health and decrease money
                playerHealth = playerHealth + boughtHealth;
                playerMoney = playerMoney - priceHealth;
            } else {
                window.alert("You don't have enough money!")
            }
            break;

        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= priceAttack) {
                window.alert("Upgrading player's attach by 6 for 7 dollars.");
    
                // increase attack and decrease money
                playerAttack = playerAttack + boughtAttack;
                playerMoney = playerMoney - priceAttack;
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to end a game
var endGame = function() {
    // if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    // ask if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// start the game on page load
startGame();