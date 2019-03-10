var field = new Field();

for (var i = 0, l = 0; i <= 5; i++) {

	var side = new Side({
		number: i + 1
	});
	for (var j = 0, c = 0; j <= 8; j++) {
		var square = new Square({
			color: i,
			level: l,
			col: c
		});
		c++;

		if (c > 2) {
			c = 0;
			l++;
			if (l > 2) {
				l = 0;
			}
		}
		side.addSquare(square);
	}

	field.addSide(side);
}


Field.prototype.render = function(target) {
	console.log("render");
	this.target = target;
	target.html('');
	$.each(this.sides, function(s, side) {
		target.append("<div class='side side-" + side.number + "' ></div>");
		$.each(side.squares, function(sq, square) {
			$('.side-' + side.number).append("<div class='sq sq-" + square.color + "'>" + square.level + " : " + square.col + "</div>");
		});
	});

}


Field.prototype.rotateLevel = function(levelNumber, direction) {

	if (direction == "left") {
		let buf = [];
		for (var s = 0; s <= 3; s++) {
			let sqNoLev = {
				1: [0, 1, 2],
				2: [3, 4, 5],
				3: [6, 7, 8]
			}

			if (buf.length == 0) {
				buf = [
					this.sides[s].squares[sqNoLev[levelNumber][0]],
					this.sides[s].squares[sqNoLev[levelNumber][1]],
					this.sides[s].squares[sqNoLev[levelNumber][2]]
				]
			}

			if (s + 1 < 4) {
				this.sides[s].squares[sqNoLev[levelNumber][0]] = this.sides[s + 1].squares[sqNoLev[levelNumber][0]];
				this.sides[s].squares[sqNoLev[levelNumber][1]] = this.sides[s + 1].squares[sqNoLev[levelNumber][1]];
				this.sides[s].squares[sqNoLev[levelNumber][2]] = this.sides[s + 1].squares[sqNoLev[levelNumber][2]];
			} else {
				this.sides[s].squares[sqNoLev[levelNumber][0]] = buf[0];
				this.sides[s].squares[sqNoLev[levelNumber][1]] = buf[1];
				this.sides[s].squares[sqNoLev[levelNumber][2]] = buf[2];
			}

		}

		if (levelNumber == 1) {
			rotateSide(this.sides[4], "right");
		}
		if (levelNumber == 3) {
			rotateSide(this.sides[5], "right");
		}
	}

	if (direction == "right") {
		let buf = [];
		let sqNoLev = {
			1: [0, 1, 2],
			2: [3, 4, 5],
			3: [6, 7, 8]
		}
		buf = [
			this.sides[3].squares[sqNoLev[levelNumber][0]],
			this.sides[3].squares[sqNoLev[levelNumber][1]],
			this.sides[3].squares[sqNoLev[levelNumber][2]]
		];
		for (var s = 3; s >= 0; s--) {
			if (s >= 1) {

				this.sides[s].squares[sqNoLev[levelNumber][0]] = this.sides[s - 1].squares[sqNoLev[levelNumber][0]];
				this.sides[s].squares[sqNoLev[levelNumber][1]] = this.sides[s - 1].squares[sqNoLev[levelNumber][1]];
				this.sides[s].squares[sqNoLev[levelNumber][2]] = this.sides[s - 1].squares[sqNoLev[levelNumber][2]];
			} else {
				this.sides[s].squares[sqNoLev[levelNumber][0]] = buf[0];
				this.sides[s].squares[sqNoLev[levelNumber][1]] = buf[1];
				this.sides[s].squares[sqNoLev[levelNumber][2]] = buf[2];
			}
		}
		if (levelNumber == 1) {
			rotateSide(this.sides[4], "left");
		}
		if (levelNumber == 3) {
			rotateSide(this.sides[5], "left");
		}
	}


	function rotateSide(side, direction) {
		if (direction == "right") {
			let step = {
				0: 2,
				1: 5,
				2: 8,
				3: 1,
				4: 4,
				5: 7,
				6: 0,
				7: 3,
				8: 6
			}

			let buf = jQuery.extend(true, {}, side);
			for (var i = 0; i <= 8; i++) {
				side.squares[step[i]] = buf.squares[i]
			}
		}

		if (direction == "left") {
			let step = {
				0: 6,
				1: 3,
				2: 0,
				3: 7,
				4: 4,
				5: 1,
				6: 8,
				7: 5,
				8: 2
			}

			let buf = jQuery.extend(true, {}, side);
			for (var i = 0; i <= 8; i++) {
				side.squares[step[i]] = buf.squares[i]
			}
		}
	}



	this.render(this.target);

}


Field.prototype.rotateCol = function(colNumber, direction) {


	this.render(this.target);

}

field.render($('.cube-fields'));

field.rotateCol(1, "up");



function Field(opt) {
	var that = this;
	this.target = '';
	this.sides = [];
	this.addSide = function(side) {
		that.sides.push(side);
	}
}

function Square(opt) {
	var colors = ["red", "blue", "yellow", "green", "gray", "orange"]
	this.color = colors[opt.color];
	this.level = opt.level;
	this.col = opt.col;
}

function Side(opt) {
	var that = this;
	this.number = opt.number;
	this.squares = [];
	this.addSquare = function(square) {
		that.squares.push(square);
	}
}