// inside this main.js javascript file
// we will write all of the code to make our game work!

var mainState = {
	// the preload function runs right before the game starts
	preload: function() {
		// any code inside these curlies runs before game starts!
		// we will write code here to load the images and the sound
		game.load.image('background', 'assets/sky-night-starshorizon3.jpg');
		// load santa image to use as sprite later on
		game.load.image('santa', 'assets/christmas_santa_christmas_3.png');
		
		// load snowball image
		game.load.image('snowball', 'assets/snow_ball.png');
		game.load.image('christmas-tree', 'assets/christmas-tree.png');
		
	},
	// the create function runs right AFTER preload to draw the game
	create: function() {
		// our code in these curlies will display sprites (objects)
		// if keep track of a score we would set to zero here to start
		//game.world.setBounds(0, 0, 1920, 1200);
		// set background color of game stage
		//game.stage.image = ('background', 'assets/sky-night-starshorizon3.jpg');
		 game.add.sprite(0, 0, 'background');
		// add the physics engine to control for gravity, etc. automatically
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// now let's put the santa into the game at a specific location(x,y)
		this.santa = game.add.sprite(300, 245, 'santa');
		
		// attach some physics for: movement, gravity, collision
		game.physics.arcade.enable(this.santa);
		
		// add some gravity value to help the santa fall down to ground (vertical)
		this.santa.body.gravity.y = 1000;
				// connect the user hitting the spacebar to a function called 'jump'
		/*var spacebar = game.input.keyboard.addKey(
			Phaser.Keyboard.SPACEBAR
		);
		spacebar.onDown.add(this.jump, this);
		var pointer1 = game.input.activePointer.isDown(
			Phaser.PointerMode.CURSOR
		);*/
		
		
		// get ready to build a bunch of snowball objects in a Group
		this.snowballs = game.add.group();
		// add timer to run every 1.5 seconds to add a row of snowballs to the game
		this.timer = game.time.events.loop(2000, this.addRowOfsnowballs, this);
		
		// add scoring with a variable to keep track of it
		this.score = 0;
		this.labelScore = game.add.text(20,20, 'Score 0', {font: "30px Arial", fill: "#ffffff"});
		this.level = 1;
		this.labelLevel = game.add.text(20,50, 'Level 1', {font: "30px Arial", fill: "#ffffff"});
	},
	// the update function runs OVER and OVER and OVER again in a loop
	// once for each time Phaser.js redraws the screen (refresh)
	// a frame rate
	
	update: function() {
		// the main game update code that runs every frame
		// if the santa is outside the screen (too high or too low), restart game
		if (game.input.activePointer.isDown) 
			{ 
			this.santa.body.velocity.y = -250;
			}
		if ( ( this.santa.y < 0 ) || ( this.santa.y > 800 ) ) {
			this.restartGame();
		}
		
		//function fly (){this.santa.body.velocity.y = -250;}
		// check to see if santa has collided with any snowballs
		game.physics.arcade.overlap(
			this.santa, this.snowballs, this.restartGame, null, this
		);
		
	},
	
	// jump moves santa up
	
	
	// restartGame starts game over
	restartGame: function() {
		game.state.start("main");
	},
	
	// addOnesnowball creates one chunk of snowball for our group of snowballs
	// should be able to set the x and y position of each snowball
	addOnesnowball: function( x, y ) {
		// create a snowball set its position and add it to group
		
		if (this.score <= 4)
		{ 
			var snowball = game.add.sprite( x, y, 'snowball');
		this.snowballs.add( snowball );
		// add physics to snowball and move it horizontally
		game.physics.arcade.enable(snowball);
			snowball.body.velocity.x = -150;
		}
		else if(this.score > 4)
		{
			var snowball = game.add.sprite( x, y, 'christmas-tree');
		this.snowballs.add( snowball );
		// add physics to snowball and move it horizontally
		game.physics.arcade.enable(snowball);
			snowball.body.velocity.x = -200;
			this.level = 2;
			this.labelLevel.text = this.level;
		}
		// check to see if snowball is off the screen and destroy it if it is
		snowball.checkWorldBounds = true;
		snowball.outOfBoundsKill = true;
	},
	addRowOfsnowballs: function() {
		// make a random number to decide where the hole in the wall is
		// so pick a random number between 1 and 5 for our variable hole
		var hole = Math.floor(Math.random() * 5) + 1;
		
		// add 6 snowballs with a hole left in them
		for ( var counter = 0; counter < 16; counter = counter + 1 ) {
			if ( counter != hole  && counter != (hole+1) )
			{
				this.addOnesnowball(800, counter * 60 + 10);
			}
		}
		
		// every time we add a row of snowballs increase score by 1
		this.score = this.score + 1;
		this.labelScore.text = this.score;
			
	}
	
};

// we need to tell the Phaser.js code to create a new game
// when we do this, we define the dimensions (width + height) in px
var game = new Phaser.Game(800,700); // 400px w by 490px h game
	/*winW = window.offsetWidth;            
	winH = window.offsetHeight;                       
	            // set canvas to above size            
	var game = new Phaser.Game(winW, winH, Phaser.CANVAS, '', 
	{ 
		preload: preload, 
		create: create, 
		update:update
	});
	console.log(game);*/
// now we can start the game code running
game.state.add('main', mainState, true);







