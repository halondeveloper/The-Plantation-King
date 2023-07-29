const positionForDrop = {
	x: line.position.x,
	y: shop.size.height + 5,
}
const dropSize = 65;
for(let i = 0;i < 15;i++){

	if( i == 5 || i == 10 || i == 15 ){
		positionForDrop.x = line.position.x;
		positionForDrop.y += dropSize;
	}

	canDropPlants.push(new Drop({
		position: {
			x: positionForDrop.x + 4,
			y: positionForDrop.y,
		},
		image: '././assets/dropplant.jpg'
	}));

	positionForDrop.x += dropSize + 2;
}
canvas.addEventListener('mousemove', (e) => {
  gameObjects(e);

   if (mouse.isDragging) {
     const novoY = mouse.position.y - king.size / 2;
     if (novoY >= limiteSuperiorDoFundo && novoY <= limiteInferiorDoFundo) {
       king.position.y = novoY;
     }
   }
   if (mouse.gameObject && plants[mouse.gameObject]) {
   	if(canMoveitem){
   		if (mouse.isShopDragging) {
   	  		plants[mouse.gameObject].shop.position.x = mouse.position.x - plants[mouse.gameObject].shop.size.width / 2;
   	  		plants[mouse.gameObject].shop.position.y = mouse.position.y - plants[mouse.gameObject].shop.size.height / 2;
   		}
   	}
   }
});
canvas.addEventListener('mousedown', () => {
  if (mouse.gameObject === 'king') {
    mouse.isDragging = true;
  }
  Object.entries(plants).forEach(([plantName, plant]) => {
    if (canMoveitem) {
      mouse.isShopDragging = true;
    }
  });
});

canvas.addEventListener('mouseup', () => {
  mouse.isDragging = false;
  mouse.isShopDragging = false;
  let hlf;
  let imgU;
  if (mouse.gameObject && plants[mouse.gameObject]) {
    if (
      plants[mouse.gameObject].shop.position.x > line.position.x + line.size.width &&
      plants[mouse.gameObject].shop.position.y > shop.position.y + shop.size.height
    ) { 

      canDropPlants.forEach((dropPlant, index) => {
        if (
          plants[mouse.gameObject].shop.position.x >= dropPlant.position.x &&
          plants[mouse.gameObject].shop.position.x <= dropPlant.position.x + dropSize &&
          plants[mouse.gameObject].shop.position.y >= dropPlant.position.y &&
          plants[mouse.gameObject].shop.position.y <= dropPlant.position.y + dropSize 
        ) {
        	let canDropPlant;
  			const calc = (dropPlant.size - dropSize);
  			Object.entries(plants).forEach(([plantName, plant]) => {
  				plant.list.forEach((data) => { 
  					if(
  						canDropPlants[index].position.x == data.position.x &&
  						canDropPlants[index].position.y == data.position.y 
  					){
  						canDropPlant = false;
  					}else {
  						canDropPlant = true;
  					}
  				})
  				if(!plant.list.length > 0) canDropPlant = true;
  			})
  		if(canDropPlant){
  			if(mouse.gameObject !== 'potato'){
  				hlf=100
  				imgU = '././assets/disparevilha.png'
  			}else {
  				hlf=1200
 				imgU = '././assets/potato.webp'
  			}
  		  	plants[mouse.gameObject].list.push(new Plantation({
        		position: {
        			x: dropPlant.position.x,
        			y: dropPlant.position.y - calc 
        		},
        		life: hlf,
        		image: imgU
        	}));
        	kingConfig.coins -= plants[mouse.gameObject].value;
  		}
        }
      });
    }
  }
    Object.entries(plants).forEach(([plantName, plant]) => {
    	plant.shop.position.x = plant.pos.x;
    	plant.shop.position.y = plant.pos.y;
  	});
    mouse.gameObject = undefined;
});
let winQtd = 100;
setInterval(()=>{
	if(zumbies.length == 0){
		for(let i=0;i < 4;i++){
			if(kingConfig.kills < winQtd){
				zumbieDamage+=2;
				ZumbiesController();
			}else {
				kingConfig.win = true;
			}
		}
	}
}, 2000)
var plantData = undefined;

function update(){
	window.requestAnimationFrame(update);
	if(kingConfig.win == undefined){
	c.clearRect(0, 0, canvas.width, canvas.height)
		background.draw();
		shop.draw();
		king.draw();
		line.draw();
	
  		canDropPlants.forEach((drop)=>{
  			drop.draw();
  		})
	
  		Object.entries(plants).forEach(([plantName, plant]) => {
  		  if (plant.shop instanceof Sprite) {
  		    plant.shop.draw();
  			c.fillStyle = 'white';
			c.font = '15px sans-serif';
  			c.fillText(plant.value, plant.shop.position.x, plant.shop.size.height + 15);


  		    if(plant.list.length > 0){
  		    	plant.list.forEach((data)=>{
  		    		data.draw();
  		    		plantData = plantName;
  		    	})
  		    }
  		  }
  		});
	
  		zumbies.forEach(( zumbie )=> {
  			zumbie.data.draw();
  			ZumbieMovement(zumbie.data, plantData);
  		})
	
  		AmmunitionController();
	
  		Ammunitions.forEach(( ammunition ) => {
  			ammunition.data.draw();
  		})

  		c.fillStyle = 'white';
		c.font = '20px sans-serif';
  		c.fillText(kingConfig.coins, canvas.width / 2, 30);
		c.font = '20px sans-serif';
  		c.fillText(kingConfig.kills + ' abates', canvas.width - 150, 30);


  	}else if(kingConfig.win == true){
  		document.querySelector('h1').innerText = 'Você ganhou!!';
  		document.querySelector('h1').style.display = 'block';
  	}else {
  		document.querySelector('h1').innerText = 'Você perdeu!!';
  		document.querySelector('h1').style.display = 'block';
  	}
}
update();
