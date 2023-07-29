class Sprite{
	constructor({ position, size, image }){
		this.position = position;	
		this.size = size;
		this.image = new Image();
		this.image.src = image;
	}

	draw(){
		c.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
	}
}

class Plantation {
	constructor({ position, life, image }){
		this.position = position;
		this.size = 50;
		this.life = life;
		this.image = new Image();
		this.image.src = image;
	}

	draw(){
		c.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
	}
}

class Drop{
	constructor({ position, image }){
		this.position = position;
		this.image = new Image();
		this.image.src = image;
		this.size = 60;
	}

	draw(){
		c.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
	}
}