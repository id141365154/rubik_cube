var field = new Field();

for (var i = 0, l = 0; i <= 5; i++) {

	var side = new Side({
		number: i + 1
	});
	for (var j = 0, c = 0; j <= 8; j++) {
		var square = new Square({
			color: i,
			level: l,
			col: c,
			el: ""
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
	var that = this;
	setTimeout(function() {

		that.target = target;
		target.html('');
		$.each(that.sides, function(s, side) {
			target.append("<div class='side side-" + side.number + "' ></div>");
			$.each(side.squares, function(sq, square) {
				var el = $('.side-' + side.number).append("<div class='sq sq-" + square.color + "'></div>");
				square.el = el[0].children[sq];
			});
		});
	}, 300);

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
				this.sides[s].squares[sqNoLev[levelNumber][0]].col = 0;
				this.sides[s].squares[sqNoLev[levelNumber][0]].el.classList.add("sq--animate-slide-rigth");
				this.sides[s].squares[sqNoLev[levelNumber][1]] = this.sides[s + 1].squares[sqNoLev[levelNumber][1]];
				this.sides[s].squares[sqNoLev[levelNumber][1]].col = 1;
				this.sides[s].squares[sqNoLev[levelNumber][1]].el.classList.add("sq--animate-slide-rigth");
				this.sides[s].squares[sqNoLev[levelNumber][2]] = this.sides[s + 1].squares[sqNoLev[levelNumber][2]];
				this.sides[s].squares[sqNoLev[levelNumber][2]].col = 2;
				this.sides[s].squares[sqNoLev[levelNumber][2]].el.classList.add("sq--animate-slide-rigth");
			} else {
				this.sides[s].squares[sqNoLev[levelNumber][0]] = buf[0];
				this.sides[s].squares[sqNoLev[levelNumber][0]].col = 0;
				this.sides[s].squares[sqNoLev[levelNumber][0]].el.classList.add("sq--animate-slide-rigth");
				this.sides[s].squares[sqNoLev[levelNumber][1]] = buf[1];
				this.sides[s].squares[sqNoLev[levelNumber][1]].col = 1;
				this.sides[s].squares[sqNoLev[levelNumber][1]].el.classList.add("sq--animate-slide-rigth");
				this.sides[s].squares[sqNoLev[levelNumber][2]] = buf[2];
				this.sides[s].squares[sqNoLev[levelNumber][2]].col = 2;
				this.sides[s].squares[sqNoLev[levelNumber][2]].el.classList.add("sq--animate-slide-rigth");
			}

		}

		if (levelNumber == 1) {
			this.rotateSide(this.sides[4], "right");
		}
		if (levelNumber == 3) {
			this.rotateSide(this.sides[5], "right");
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
				this.sides[s].squares[sqNoLev[levelNumber][0]].col = 0;
				this.sides[s].squares[sqNoLev[levelNumber][0]].el.classList.add("sq--animate-slide-left");
				this.sides[s].squares[sqNoLev[levelNumber][1]] = this.sides[s - 1].squares[sqNoLev[levelNumber][1]];
				this.sides[s].squares[sqNoLev[levelNumber][1]].col = 1;
				this.sides[s].squares[sqNoLev[levelNumber][1]].el.classList.add("sq--animate-slide-left");
				this.sides[s].squares[sqNoLev[levelNumber][2]] = this.sides[s - 1].squares[sqNoLev[levelNumber][2]];
				this.sides[s].squares[sqNoLev[levelNumber][2]].col = 2;
				this.sides[s].squares[sqNoLev[levelNumber][2]].el.classList.add("sq--animate-slide-left");
			} else {
				this.sides[s].squares[sqNoLev[levelNumber][0]] = buf[0];
				this.sides[s].squares[sqNoLev[levelNumber][0]].col = 0;
				this.sides[s].squares[sqNoLev[levelNumber][0]].el.classList.add("sq--animate-slide-left");
				this.sides[s].squares[sqNoLev[levelNumber][1]] = buf[1];
				this.sides[s].squares[sqNoLev[levelNumber][1]].col = 1;
				this.sides[s].squares[sqNoLev[levelNumber][1]].el.classList.add("sq--animate-slide-left");
				this.sides[s].squares[sqNoLev[levelNumber][2]] = buf[2];
				this.sides[s].squares[sqNoLev[levelNumber][2]].col = 2;
				this.sides[s].squares[sqNoLev[levelNumber][2]].el.classList.add("sq--animate-slide-left");
			}
		}
		if (levelNumber == 1) {
			this.rotateSide(this.sides[4], "left");
		}
		if (levelNumber == 3) {
			this.rotateSide(this.sides[5], "left");
		}
	}



	this.render(this.target);

}

Field.prototype.rotateSide = function(side, direction) {
	if (direction == "right") {
		let step = {
			0: { pos: 2, col: 2 },
			1: { pos: 5, col: 2 },
			2: { pos: 8, col: 2 },
			3: { pos: 1, col: 1 },
			4: { pos: 4, col: 1 },
			5: { pos: 7, col: 1 },
			6: { pos: 0, col: 0 },
			7: { pos: 3, col: 0 },
			8: { pos: 6, col: 0 }
		}

		let buf = jQuery.extend(true, {}, side);
		for (var i = 0; i <= 8; i++) {
			side.squares[step[i]] = buf.squares[i]
		}
	}

	if (direction == "left") {
		let step = {
			0: { pos: 6, col: 0 },
			1: { pos: 3, col: 0 },
			2: { pos: 0, col: 0 },
			3: { pos: 7, col: 1 },
			4: { pos: 4, col: 1 },
			5: { pos: 1, col: 1 },
			6: { pos: 8, col: 2 },
			7: { pos: 5, col: 2 },
			8: { pos: 2, col: 2 }
		}

		let buf = jQuery.extend(true, {}, side);
		for (var i = 0; i <= 8; i++) {
			side.squares[step[i].pos] = buf.squares[i]
			side.squares[step[i].pos].col = step[i].col;
		}
	}
}


Field.prototype.rotateCol = function(colNumber, direction) {
	let moveColFromsideToSide = (col, sides) => {
		let buf = sides[0].squares.filter((v, k) => {
			if (v.col === col) {
				return true;
			}
		});

		for (let i = 0; i <= sides.length - 1; i++) {
			for (let s = sides[i].squares.length - 1; s >= 0; s--) {
				if (sides[i].squares[s].col === col) {
					if (typeof sides[i + 1] === "object") {
						sides[i].squares[s] = sides[i + 1].squares[s];

						if (direction == "down") {
							sides[i].squares[s].el.classList.add("sq--animate-slide-down");
						}
						if (direction == "up") {
							sides[i].squares[s].el.classList.add("sq--animate-slide-up");
						}
					}
				}
			}
		}

		let bufIter = 0;
		for (let j = 0; j <= sides[sides.length - 1].squares.length - 1; j++) {
			if (sides[sides.length - 1].squares[j].col === col) {
				sides[sides.length - 1].squares[j] = buf[bufIter];
				bufIter++;
			}
		}
	}


	if (direction == "up") {
		moveColFromsideToSide(colNumber, [this.sides[0], this.sides[5], this.sides[2], this.sides[4]]);
		if (colNumber == 0) {
			this.rotateSide(this.sides[3], "left");
		}

		if (colNumber == 2) {
			this.rotateSide(this.sides[1], "right");
		}
	}

	if (direction == "down") {
		moveColFromsideToSide(colNumber, [this.sides[4], this.sides[2], this.sides[5], this.sides[0]]);
		if (colNumber == 0) {
			this.rotateSide(this.sides[3], "right");
		}

		if (colNumber == 2) {
			this.rotateSide(this.sides[1], "left");
		}
	}



	this.render(this.target);

}

field.render($('.cube-fields'));

//field.rotateCol(1, "up");


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