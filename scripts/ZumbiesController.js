let max = 2
let at = 0;
let veloc = 0.5;
function ZumbiesController() {
  const localesY = {
    top: 60,
    middle: 125,
    bottom: 190,
  };

  const totalY = localesY.top + localesY.middle + localesY.bottom;

  const normalizedLocalesY = {
    top: localesY.top / totalY,
    middle: localesY.middle / totalY,
    bottom: localesY.bottom / totalY,
  };

  const randomY = Math.random();
  let yPosition;
  if (randomY < normalizedLocalesY.top) {
    yPosition = localesY.top;
  } else if (randomY < normalizedLocalesY.top + normalizedLocalesY.middle) {
    yPosition = localesY.middle;
  } else {
    yPosition = localesY.bottom;
  }

  zumbies.forEach((zumbie) => {
    if(zumbie.data.position.y == yPosition){
      zumbie.data.position.x += zumbie.data.size.width * 2;
    }
  })

  zumbies.push(
  {
    life: 100,
    data: new Sprite({
      position: {
        x: canvas.width - 2,
        y: yPosition,
      },
      size: {
        width: 50,
        height: 50,
      },
      image: '././assets/Zumbie.webp'
    })
  }
  );
}

function ZumbieMovement(zumbie, plantData) {
    let collided = false;
    if(plantData != undefined){
      plants[plantData].list.forEach((plant, index) => {
        if(
          zumbie.position.x >= plant.position.x &&
          zumbie.position.x <= plant.position.x + plant.size &&
          zumbie.position.y >= plant.position.y &&
          zumbie.position.y <= plant.position.y + plant.size
        ){

          if(plant.life > 0){
            setTimeout(()=>{
              plant.life -= zumbieDamage;
            }, 4000);
          }else {
            plants[plantData].list.splice(index, 1);
          }

          collided = true;
        }
      });
      plants['potato'].list.forEach((plant, index) => {
        if(
          zumbie.position.x >= plant.position.x &&
          zumbie.position.x <= plant.position.x + plant.size &&
          zumbie.position.y >= plant.position.y &&
          zumbie.position.y <= plant.position.y + plant.size
        ){

          if(plant.life > 0){
            setTimeout(()=>{
              plant.life -= zumbieDamage;
            }, 4000);
          }else {
            plants[plantData].list.splice(index, 1);
          }

          collided = true;
        }
      });
    }

    if(!collided){
      if(zumbie.position.x + zumbie.size.width > line.position.x + line.size.width){
        zumbie.position.x -= veloc;
      }else if(
          zumbie.position.x >= king.position.x &&
          zumbie.position.x <= king.position.x + king.size &&
          zumbie.position.y >= king.position.y &&
          zumbie.position.y <= king.position.y + king.size
      ){
        if(at < max){
          zumbie.position.x += 200;
        }else {
          kingConfig.win = false;
        }
        at++;
      }else {
        kingConfig.win = false;
      }
    }
}
