const background = new Sprite({
	position: {
		x: 0,
		y: 50,
	},
	size: {
		width: canvas.width,
		height: 250,
	},
	image: '././assets/background.jpg'

});

const shop = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	size: {
		width: canvas.width,
		height: 50,
	},
	image: '././assets/shop.jpg'
});

const king = new Plantation({
	position: {
		x: 10,
		y: background.position.y + 10,
	},
	image: '././assets/player.gif'
});

const line = new Sprite({
	position: {
		x: king.position.x + 60,
		y: background.position.y
	},
	size: {
		width: 3,
		height: background.size.height,
	},
	image: '././assets/dropplant.jpg'
});

const mouse = {
	position: {
		x: 0,
		y: 0,
	},
	gameObject: undefined,
	isDragging: false,
	isShopDragging: false,
};

const kingConfig = {
	coins: 10,
	kills: 0,
	level: 0,
	isAttacking: false,
	win: undefined,
}

const plants = {
	duplervilhas: {
		pos:{ x: 10, y: 0 },
		value: 10,
		shop: new Sprite({
			position: {
				x: 10,
				y: 0,
			},
			size: {
				width: shop.size.height,
				height: shop.size.height / 1.5,
			},
			image: '././assets/duplervilha.shop.jpg'
		}),
	
		list: []
	},
	potato: {
		pos:{ x: 61, y: 0 },
		value: 5,
		shop: new Sprite({
			position: {
				x: 61,
				y: 0,
			},
			size: {
				width: shop.size.height,
				height: shop.size.height / 1.5,
			},
			image: '././assets/potato.shop.webp'
		}),
	
		list: []
	},
};

const zumbiesList = 0;
const canDropPlants = [];
const zumbies = [];
const Ammunitions = [];
let zumbieDamage = 25;