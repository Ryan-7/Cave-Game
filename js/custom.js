//Auto scroll the info box 
$("#infoBox").animate({
  scrollTop: $("#infoBox")[0].scrollHeight
}, 1000);

window.setInterval(function() {
  var elem = document.getElementById('infoBox');
  elem.scrollTop = elem.scrollHeight;
}, 500);

var userName;
var equippedWeapon;
var randomNumber;
var integer;
var newInteger;
var userExperience = 0;
var userGold = null;
var userHealth = 100;
var userTotalHealth = 100;
var enemeyEncounter;
var userGold;
var infoBox = document.getElementById("infoBox");
var healthBox = document.getElementById("healthBox");
var inventoryBox = document.getElementById("inventoryBox");

//Enemies 

function Enemy(name, health, maxHealth, power, accuracy, exp, gold, specialItem) {
  this.name = name;
  this.health = health;
  this.maxHealth = maxHealth;
  this.power = power;
  this.accuracy = accuracy;
  this.exp = exp;
  this.gold = gold;
  this.specialItem = specialItem;
  this.attack = function(weaponPower, weaponAccuracy, weaponLuck) {

    randomNumberAttack = Math.random();
    someIntegerAttack = (randomNumberAttack * 10) + 1;
    newIntegerAttack = Math.floor(someIntegerAttack);

    if (newIntegerAttack < weaponAccuracy) {
      this.health = this.health - weaponPower;
      $("#enemyHealth").html(this.health);
      infoBox.innerHTML += " Hit!<br>";
    } else {
      infoBox.innerHTML += " Your attack missed!<br>The enemy gets an open shot!<br>";
      userHealth = userHealth - this.power;
      $("#health").html(userHealth);
    }

    if (this.health <= 0) {
      infoBox.innerHTML += " The enemy Dead!<br>";
      userExperience = userExperience + this.exp;
      infoBox.innerHTML += " You gained 10 Exp!<br>";
      $("#gold").html(userGold);
      $("#attackEnemy").addClass("hidden");
      $("#runAway").addClass("hidden");
      $("#healthIndicator").addClass("hidden");
      $("#caveOptions").removeClass("hidden");

      randomNumberGold = Math.random();
      someIntegerGold = (randomNumberGold * 10) + 1;
      newIntegerGold = Math.floor(someIntegerGold);
      if (newIntegerGold <= weaponLuck) {
        infoBox.innerHTML += " You found " + this.gold + " gold!<br>";
        userGold = userGold + this.gold;
        $("#gold").html(userGold);
      } else {
        userGold = userGold;
        $("#gold").html(userGold);
        infoBox.innerHTML += " The enemy didn't drop anything<br>";
      }
    }
  };
}
//name, health, maxHealth, power, accuracy, exp, gold, specialItem
var mugger = new Enemy("Mugger", 20, 20, 4, 10, 10, 5, null);
var snake = new Enemy("Snake", 10, 10, 2, 5, 5, 3, null);
var blacksmith = new Enemy("Blacksmith", 30, 30, 10, 5, 25, 30, blackSword);


function Weapon(name, power, accuracy, luck) {
  this.name = name;
  this.power = power;
  this.accuracy = accuracy;
  this.luck = luck;
}

//Weapons (Accuracy and luck compared against a random number of 1 - 10, ie 9 = 90% chance of success)

var meleeGloves = new Weapon("Melee Gloves", 5, 5, 9);
var bronzeSword = new Weapon("Bronze Sword", 10, 6, 6);
var silverDagger = new Weapon("Silver Sword", 20, 5, 5);
var blackSword = new Weapon("Black Sword", 20, 7, 6);


//Start Game
var startGame = document.getElementById("startGame");
startGame.onclick = function() {
  start()
};

function start() {
  userName = $("input#getName").val();
  if (userName === "") {
    alert("Please enter a Username");
  } else {
    infoBox.innerHTML += "<br>Nice to meet you, " + userName + ". I rescued you by the river last night. I was not able to salvage your weapon but you can borrow one of mine. I see that you are a fighter -- we have a problem with muggers around here and they hangout in the old coal mine. I will need you to give me 25 gold in return for my hospitality, then I will give you directions to the closest city.";
    infoBox.innerHTML += "<br> Please equip a weapon of your choosing below.";
    $("#startGame").addClass("hidden");
    $("#chooseWeap").removeClass("hidden");
    $("#theForm").removeClass("hidden");
    $("#getName").addClass("hidden");
    $("#enterName").addClass("hidden");
    $("#gameExplain").removeClass("hidden");
  }
}

//-------Random Enemy Encounter Cave---------// 
var continueOn = document.getElementById("caveContinue");
continueOn.onclick = function() {
  randomEncounter()
};

function randomEncounter() {
  randomNumber = Math.random();
  someInteger = (randomNumber * 10) + 1;
  newInteger = Math.floor(someInteger);
  if (newInteger > 3 && newInteger < 7) {
    $("#caveOptions").addClass("hidden");
    infoBox.innerHTML += " A mugger is coming after you!<br>";
    fightEnemy(mugger);
  } else if (newInteger >= 7) {
    $("#caveOptions").addClass("hidden");
    fightEnemy(snake);
    infoBox.innerHTML += " A snake is coming after you!<br>";
  } else if (newInteger <= 2) {
    $("#caveOptions").addClass("hidden");
    fightEnemy(blacksmith);
    infoBox.innerHTML += " A Blacksmith is coming after you!<br>";
  } else {
    infoBox.innerHTML += " Nothing but a bunch of rocks.<br>";
  }
}

var attackEnemy = document.getElementById("attackEnemy");
var runAway = document.getElementById("runAway");


function fightEnemy(enemyType) {
  enemyType.health = enemyType.maxHealth;
  placeholderName = enemyType.name;
  $("#nameAtt").html(placeholderName);
  $("#nameRun").html(placeholderName);
  $("#nameHealth").html(placeholderName);
  if (enemyType.health > 0) {
    $("#attackEnemy").removeClass("hidden");
    $("#runAway").removeClass("hidden");
    $("#healthIndicator").removeClass("hidden");
    $("#enemyHealth").html(enemyType.health);
    attackEnemy.onclick = function() {
      enemyType.attack(equippedWeapon.power, equippedWeapon.accuracy, equippedWeapon.luck)
    };
    runAway.onclick = function() {
      run()
    };

  }
}

function run() {
  $("#infoBox").append("No room to run away!<br>");
}




var form = document.getElementById("theForm");
form.onchange = function() {
  equipWeapon()
};

function equipWeapon() {
  if (document.getElementById("selectWeapon").selectedIndex === 0) {
    alert("Please select a weapon!");
  } else if (document.getElementById("selectWeapon").selectedIndex === 1) {
    equippedWeapon = meleeGloves;
  } else if (document.getElementById("selectWeapon").selectedIndex === 2) {
    equippedWeapon = bronzeSword;
  } else if (document.getElementById("selectWeapon").selectedIndex === 3) {
    equippedWeapon = silverDagger;
  } else if (document.getElementById("selectWeapon").selectedIndex === 4) {
    equippedWeapon = blackSword;
  }

  document.getElementById("infoBox").innerHTML = " You choose: " + equippedWeapon.name + ".";
  $("#caveEntrance").removeClass("hidden");
}

var caveEntrance = document.getElementById("caveEntrance");
caveEntrance.onclick = function() {
  enterCave()
};

function enterCave() {
  if (document.getElementById("selectWeapon").selectedIndex === 0) {
    alert("Please select a weapon!");
  } else {
    $("#theForm").addClass("hidden");
    $("#chooseWeap").addClass("hidden");
    $("#caveEntrance").addClass("hidden");
    infoBox.innerHTML = " You enter the old coal mine...It's dark but it's not silent...";
    $("#caveOptions").removeClass("hidden");
    $("#healthBox").removeClass("hidden");
    $("#health").html(userHealth);
    $("#inventoryBox").removeClass("hidden");
    $("#gameExplain").addClass("hidden");


  }
}

var caveSign = document.getElementById("caveSign");
caveSign.onclick = function() {
  caveSignRead()
};

function caveSignRead() {
  infoBox.innerHTML = "The sign reads: <i>This area is off-limits. Go away!</i><br>";
}

var inventoryPop = document.getElementById("inventory");
inventoryPop.onclick = function() {
  openInventory()
};

function openInventory() {
  $("#inventoryPop").removeClass("hidden");
  $("#everything").addClass("hidden");
}

var closeInventory = document.getElementById("closeInventory");
closeInventory.onclick = function() {
  closeInvent()
};

function closeInvent() {
  $("#inventoryPop").addClass("hidden");
  $("#everything").removeClass("hidden");
}




// if an enemey drops a weapon, give the user the ability to equip the weapon and just assign the variable to the new weapon 

// use math random to see if the enemy's attack works
