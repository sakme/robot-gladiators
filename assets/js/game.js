// function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min );

    return value;
};

var priceAttack = 7;
var priceHealth = 7;
var boughtAttack = 7;
var boughtHealth = 30;

var fight = function(enemy) {
    // alert players that they are starting the round

    while(playerInfo.health > 0 && enemy.health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if player chooses to skip and stop loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 

            // if true, leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodby!");
                //  subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log(playerInfo.name + " now has " + playerInfo.money + " dollars remaining.");
                break;
            }
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        //log remaining health
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy"s health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            // console.log(playerInfo.money);

            // leave while loop since enemy is dead
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(enemy.attack -3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        //log remaining health
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player"s health
        if (playerInfo.health <=0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 1,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = randomNumber(50,80);
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= priceHealth) {
            window.alert("Refilling player's health by " + boughtHealth + " for " + priceHealth + " dollars.");
                this.health += boughtHealth;
                this.money -= priceHealth;
                // console.log(playerInfo.health + " " + playerInfo.money);
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= priceAttack) {
            window.alert("Upgrading player's attack by " + boughtAttack + " for " + priceAttack + " dollars.");
                this.attack += boughtAttack;
                this.money -= priceAttack;
                // console.log(playerInfo.attack + " " + playerInfo.money);
        } else {
            window.alert("You don't have enough mondy!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // indicate the round number
            window.alert("Welcome to Robot Gladiator's! Round " + (i + 1));
    
            // pick new enemy to fight from arraybob
            var pickedEnemyObj = enemyInfo[i];
    
            //reset enemy health
            pickedEnemyObj.health = randomNumber(40,60);
    
            // call fight function with enemy-robot
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            } else if (playerInfo.health <= 0) {
                endGame();
                break;
            }
        } else {
            // out of health or enemies
            endGame();
        }
    }
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
            playerInfo.refillHealth();
            break;

        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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