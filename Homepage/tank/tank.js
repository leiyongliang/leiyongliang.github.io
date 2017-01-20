var herocolor=new Array("#BA9658","#FEF26E")
var enemycolor=new Array("#00A2B5","#00FEFE")

function Bullet(x,y,direct){
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.s=1
	this.timer=null;
	this.islive=true
	this.run=function run(){
		if(this.x<=0||this.x>=400||this.y<=0||this.y>=300){
			window.clearInterval(this.timer);
			this.islive=false;
		}else{
			switch(this.direct){
				case 0:
					this.y-=this.s
					break;
				case 1:
					this.x+=this.s
					break;
				case 2:
					this.y+=this.s
					break;
				case 3:
					this.x-=this.s
					break;


		 }
		}

	}
}



function Tank(x,y,direct,color){
	 this.x=x
	 this.y=y
	 this.direct=direct
	 this.color=color
	 this.p=4
	 //иорф
	 this.moveup=function(){
		 this.y-=this.p
		 this.direct=0
	 }
	 this.movedown=function(){
		 this.y+=this.p
		 this.direct=2
	 }
	 this.moveleft=function(){
		 this.x-=this.p
		 this.direct=3
	 }
	 this.moveright=function(){
		 this.x+=this.p
		 this.direct=1
	 }



}


function Hero(x,y,direct,color){
	this.tank=Tank;
	this.tank(x,y,direct,color);
	this.shotEnemy=function(){
		switch(this.direct){
			case 0:
				heroBullet=new Bullet(this.x+9,this.y-10,this.direct);
			break
			case 1:
				heroBullet=new Bullet(this.x+39,this.y+9,this.direct);
			break;
			case 2:
				heroBullet=new Bullet(this.x+9,this.y+39,this.direct);
			break;
			case 3:
				heroBullet=new Bullet(this.x-10,this.y+9,this.direct);
			break;
		}

		var timer=window.setInterval("heroBullet.run()",50);
		heroBullet.timer=timer


		
	}

 }



function Enemy(x,y,direct,color){
	this.tank=Tank;
	this.tank(x,y,direct,color);	

 }


 function drawbullet(){
	 
	 if(heroBullet!=null&&heroBullet.islive){

		cxt.fillStyle="#FEF26E"
		cxt.fillRect(heroBullet.x,heroBullet.y,2,2)
		}

 }

 function drawtk(tank){
      
	  switch(tank.direct){
	  case 0://up
	  case 2://down
      
	  cxt.fillStyle=tank.color[0]
	  cxt.fillRect(tank.x,tank.y,5,30)
	  cxt.fillRect(tank.x+15,tank.y,5,30)
	  cxt.fillRect(tank.x+6,tank.y+5,8,20)
	  cxt.beginPath()
	  cxt.fillStyle=tank.color[1]
	  cxt.arc(tank.x+10,tank.y+15,4,0,360,true)
	  cxt.fill()
	  cxt.closePath()
	  
	  cxt.strokeStyle=tank.color[1]
	  cxt.lineWidth=1.5
	  cxt.beginPath()
	  cxt.moveTo(tank.x+10,tank.y+15)
	  if(tank.direct==0){
	  cxt.lineTo(tank.x+10,tank.y-10)
	  }else if(tank.direct==2){
	  cxt.lineTo(tank.x+10,tank.y+40)
	  }

	  cxt.closePath()
	  cxt.stroke()
	  break

	  case 1://up
	  case 3://down


	  cxt.fillStyle=tank.color[0]
	  cxt.fillRect(tank.x,tank.y,30,5)
	  cxt.fillRect(tank.x,tank.y+15,30,5)
	  cxt.fillRect(tank.x+5,tank.y+6,20,8)
	  cxt.beginPath()
	  cxt.fillStyle=tank.color[1]
	  cxt.arc(tank.x+15,tank.y+10,4,0,360,true)
	  cxt.fill()
	  cxt.closePath()
	  
	  cxt.strokeStyle=tank.color[1]
	  cxt.lineWidth=1.5
	  cxt.beginPath()
	  cxt.moveTo(tank.x+15,tank.y+10)
	  if(tank.direct==1){
	  cxt.lineTo(tank.x+40,tank.y+10)
	  }else if(tank.direct==3){
	  cxt.lineTo(tank.x-10,tank.y+10)
	  }

	  cxt.closePath()
	  cxt.stroke()
	  break

	  }
  }