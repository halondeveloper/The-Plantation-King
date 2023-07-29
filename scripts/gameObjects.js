const limiteSuperiorDoFundo = shop.size.height;
const limiteInferiorDoFundo = canvas.height - king.size;
let canMoveitem = false;
function gameObjects(e){
	const rec = canvas.getBoundingClientRect();
	mouse.position.x = Math.abs(rec.x - e.clientX);
	mouse.position.y = Math.abs(rec.y - e.clientY);
	if (
	    mouse.position.x >= king.position.x &&
	    mouse.position.x <= king.position.x + king.size &&
	    mouse.position.y >= king.position.y &&
	    mouse.position.y <= king.position.y + king.size
	  ) {
		// KING
	    canvas.style.cursor = 'pointer';
	    mouse.gameObject = 'king';
	}else if (
	    mouse.position.y < limiteSuperiorDoFundo ||
	    mouse.position.y > limiteInferiorDoFundo || 
	    mouse.position.x >= shop.position.x &&
	    mouse.position.x <= shop.position.x + shop.size.width &&
	    mouse.position.y <= shop.position.y + shop.size.height
	  ) {
	    canvas.style.cursor = 'default';
	    if(mouse.gameObject == 'king'){
	    	mouse.gameObject = undefined;
	    }
	    mouse.isDragging = false; 
	  } else {
	    canvas.style.cursor = 'default';
	    if(mouse.gameObject == 'king'){
	    	mouse.gameObject = undefined;
	    }
	}

  	Object.entries(plants).forEach(([plantName, plant]) => {
  		if (
   			mouse.position.x >= plant.shop.position.x &&
   			mouse.position.x <= plant.shop.position.x + plant.shop.size.width &&
   			mouse.position.y >= plant.shop.position.y &&
   			mouse.position.y <= plant.shop.position.y + plant.shop.size.height
  		) {
    		if(kingConfig.coins >= plant.value){
    			canvas.style.cursor = 'pointer';
    			canMoveitem = true;
    		}else {
    			canvas.style.cursor = 'not-allowed';
    			canMoveitem = false;
    		}
    		mouse.gameObject = plantName;
  		}
	});

}