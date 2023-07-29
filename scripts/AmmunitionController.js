function AmmunitionController(){
	if(plants['duplervilhas'].list.length > 0){
		plants['duplervilhas'].list.forEach((duplervilha, index) => {

			zumbies.forEach((zumbie) => {
				if(zumbie.data.position.y == duplervilha.position.y){
					
            const calc = (plants['duplervilhas'].list[index].size / 2) - 10 / 2; //centralizar
            const Ammunition = {
              position: {
                x: plants['duplervilhas'].list[index].position.x,
                y: plants['duplervilhas'].list[index].position.y + calc,
              }
            }
            let exist = false;
            Ammunitions.forEach(( ammunition, index ) => {
              if(ammunition.local.x == Ammunition.position.x && ammunition.local.y == Ammunition.position.y){
                  AmmunitionMovement(ammunition, index, duplervilha);
                  exist = true;
              }
            });

            if(!exist){
                  Ammunitions.push(
                    {
                      local: Ammunition.position,
                      data: new Sprite(
                        {
                          position: {
                            x: Ammunition.position.x,
                            y: Ammunition.position.y,
                          },
                          size: {
                            width: 20,
                            height: 10,
                          },
                          image: '././assets/ammunition.webp'
                        })
                    }
                  );
            }
				}
			});

		});
	}
}

function AmmunitionMovement(ammunition, index, duplervilha){

  zumbies.forEach((zumbie, i) => {
    if(
      ammunition.data.position.x >= zumbie.data.position.x &&
      ammunition.data.position.x <= zumbie.data.position.x + zumbie.data.size.width &&
      ammunition.data.position.y >= zumbie.data.position.y &&
      ammunition.data.position.y <= zumbie.data.position.y + zumbie.data.size.height
    ){
      if(zumbie.life > 0){
        zumbie.life -= 8;
      }else{
        zumbies.splice(i, 1);
        kingConfig.coins +=7;
        kingConfig.kills += 1;
        veloc += 0.1;
      }

      Ammunitions.splice(index, 1);
    }else if (!duplervilha){
      Ammunitions.splice(index, 1)
    }else {
        ammunition.data.position.x += 1.5;
    }
  })

}