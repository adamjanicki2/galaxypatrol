window.onload = initAll;
var canvas;
var ctx;
var interval;
var shootSound;
var shotsX = [];
var shotsY = [];
var spaceX = [];
var spaceY = [];
var powerupX=0;
var powerupY=0;
var time = 250;
var rand = 0;
var ys = 0;
var question=false;
var shield = false;
var shotsHeight = 10;
var powerup =false;
var sw = 4;
var sh = 10;
var heartBuffer=40;
var aChange=false;
var bChange=false;
var cChange=false;
var dChange=false;
var aC=false;
var bC=false;
var cC=false;
var dC=false;
var scoreInc=10;
var yellow3 = false;
var randomX = 0;
var yellow1=false;
var yellow2 = false;
var w = []
var h = [];
var sX = [];
var sY = [];
var aX = 140;
var aY = 200;
var bX = 340;
var bY = 200;
var cX = 140;
var cY = 300;
var dX = 340;
var dY = 300;
var u;
var heartX = 20;
var timevar2;
var bleep;
var explosion;
var oneup;
var rapid;
var xwing;
var num;
var limit = 0;
var aText;
var bText;
var cText;
var dText;
var xPos;
var yPos;
var ti = 0;
var coef1;
var coef2;
var exponent;
var shotnum = 0;
var sSpeed = 4;
var makespace=true;
var spaceSpeed = 1;
var enemiesHeight = 20;
var enemiesBuffer = 10;
var imageSpeed = 4;
var imageWidth = 100
var imageHeight = 100;
var hits = 0;
var imageX;
var ySpeed = 0;
var imageY;
var yVel = 5;
var temp;
var right;
var x;
var y;
var x1;
var y1;
var sad;
var music;
var levelup;
var playMathMode = false;
var start = false;
var win = false;
var enemySpeed = 1;
var bufferX;
var bufferY;
var reset = false;
var power1;
var power2;
var shotTime = 3;
var enemyrowcount = 4;
var enemycolumncount = 8;
var shotSpeed = -4;
var shotsWidth = 4;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var enter = false;
var enemyTime = shotTime*5;
var ts = 0;
var ts1 = 0;
var ts2 = 0;
var level = 1;
var timevar;
var lives = 3;
var score = 0;
var randomRow;
var randomColumn;
var enemy = [];
var enemies = [];
for(var c=0; c<enemycolumncount; c++) {
   enemies[c] = [];
   for(var r=0; r<enemyrowcount; r++) {
       enemies[c][r] = { x: 0, y: 0, status: 1 };
   }
}
var firstCol = 0;
var ly = 0;
var fy = 0;
var lastCol=enemycolumncount-1;
var power = Math.floor(Math.random()*6+1);
var base = Math.floor(Math.random()*10+1);
var counter = enemyrowcount*enemycolumncount;
function initAll()
{
   canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext("2d");
   imageX = canvas.offsetLeft+(canvas.width/2)-(imageWidth/2);
   imageY = (canvas.offsetTop+canvas.height-imageHeight)-85;
   document.addEventListener("keydown",keyDownHandler, false);
   document.addEventListener("keyup", keyUpHandler,false);
   document.addEventListener("mouseup", mouseUpHandler,false);
   document.addEventListener("mousemove",mouseMoveHandler,false);
   bufferX = (canvas.width/2)-((enemyrowcount*enemiesHeight)+((-1+enemyrowcount)*enemiesBuffer));
   bufferY = 100;
   for(var c=0; c<enemycolumncount; c++)
   {
       for(var r=0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
           var enemiesX = (c*(enemiesHeight+enemiesBuffer))+bufferX;
           var enemiesY = (r*(enemiesHeight+enemiesBuffer))+bufferY;
           enemies[c][r].x = enemiesX;
           enemies[c][r].y = enemiesY;
           }
          
       }
   }
   imgObj = document.getElementById('myImage');
   imgObj.style.position= 'absolute';
   imgObj.style.top = (canvas.offsetTop-20)+'px';
   imgObj.style.left = (canvas.offsetLeft+100)+'px';
   imgObj.style.visibility='visible';
   imgObj2 = document.getElementById('myImage2');
   imgObj2.style.position= 'absolute';
   imgObj2.style.top = (canvas.offsetTop+60)+'px';
   imgObj2.style.left = (canvas.offsetLeft+450)+'px';
   imgObj2.style.visibility='visible';
   start = true;
   bleep = new Audio();
    bleep.src = "shoot.mp3";
    explosion = new Audio();
    explosion.src = "explosion.mp3";
    oneup = new Audio();
    oneup.src = "1up.mp3";
    rapid = new Audio();
    rapid.src = "powerup.mp3";
    music = new Audio();
    music.src = "music.mp3";
    sad = new Audio();
    sad.src = "end.mp3";
   levelup = new Audio();
   levelup.src = "levelup.mp3";
   xwing = new Audio();
   xwing.src = "xwing.wav";
   setTitle();
   interval = setInterval(setTitle,5);
}
function setTitle()
{
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Galaxy",170,130);
   ctx.fillText("Patrol",182,220)
   ctx.font = "20px Comic Sans MS";
   ctx.fillText("Adam Janicki", 235, 260)
   makeButtonOne();
   makeButtonTwo();
   ctx.fillStyle = "#000000";
   ctx.font = "38px Impact";
   ctx.fillText("Fun Mode", 225, 420);
   ctx.font = "33px Impact";
   ctx.fillText("Calculus Mode",200,320);
   
   if(enter==true)
   {
       start=false;
       clearInterval(interval);
       imgObj.style.visibility='visible';
       imgObj.style.left = imageX+'px';
       imgObj.style.top = imageY+'px';
       imgObj2.style.visibility='hidden';
       interval = setInterval(playFun,20);
       timevar = setInterval(countTime,100);
       countTime();
       playFun();
   }
   else if(playMathMode==true)
   {
       start=false;
       clearInterval(interval);
       imgObj.style.visibility='visible';
       imgObj.style.left = imageX+'px';
       imgObj.style.top = imageY+'px';
       imgObj2.style.visibility='hidden';
       interval = setInterval(playMath,20);
       timevar = setInterval(countTime,100);
       timevar2 = setInterval(makeTime, 100);
       makeTime();
       countTime();
       playMath();
   }
}
function countTime()
{
    time++;
    if(time==300)
    {
        rand = Math.floor(Math.random()*6+1);
        randomX = Math.floor(Math.random()*(canvas.width-100)+50);
    }
   ts++;
   ts1++;
   if(makespace==true)
   {
       ts2++;
   }
   if(rand==2 || rand==3 || rand==4 || rand==5 || rand==6)
   {
       if(powerup==true)
            limit++;
   }
   if(limit==200&&powerup==true)
   {
       if(rand==2)
       {
        shotTime = 3;
        shotSpeed = shotSpeed/2;
        limit=0;
        rand = 0;
       }
       else if(rand==3)
       {
        imageSpeed = imageSpeed/2;
        limit=0;
        rand=0;
       }
       else if(rand==4)
       {
        shotsWidth = shotsWidth/2;
        shotsHeight = shotsHeight/2;
        limit=0;
        rand=0;
       }
       else if(rand==5)
       {
        scoreInc = scoreInc/2;
        limit=0;
        rand=0;
       }
       else if(rand==6)
       {
           shield=false;
           limit=0;
           rand=0;
       }
       powerup=false;
   }
}
function playFun()
{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawSpace();
   imgObj.style.left = imageX+"px";
   if(ti==3&&hit==true)
       imgObj.style.visibility = 'hidden';
    if(ti==6&&hit==true)
    {
        imgObj.style.visibility = 'visible';
        ti=0;
    }
    if(ti==20&&hit==true)
    {
        hit=false;
        imgObj.style.visibility = 'visible';
        clearInterval(timevar2);
    }
   drawShots();
   drawEnemies();
   drawFace();
   collisionDetection();
   drawHearts();
   drawHearts2();
   drawHearts3();
   printScore();
   drawPower();
   makeShield();
   if(lives<=0)
   {
       win=true;
       clearInterval(interval);
       clearInterval(timevar);
       sad.play();
       interval = setInterval(setWin, 5);
       setWin();
   }
   if(hits==320)
   {
       win=true;
       clearInterval(interval);
       clearInterval(timevar);
       interval = setInterval(setWin, 5);
       setWin();
   }
   if(counter==0)
   {
       reset=true;
   }
   if(reset==true)
   {
       resetLevel();
       reset=false;
   }
   for(var c = enemycolumncount-1; c>=0; c--)
   {
       for(var r = enemyrowcount-1; r>=0; r--)
       {
           if(enemies[c][r].status==1)
           {
               lastCol = c;
               ly = r;
               c = -100;
               r=-100;
           }
       }
   }
   for(var c = 0; c<enemycolumncount; c++)
   {
       for(var r = 0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
               firstCol = c;
               fy = r;
               c = 100;
               r=100;
           }
       }
   }
   if(imageX-imageSpeed>=canvas.offsetLeft&&leftPressed==true)
       imageX-=imageSpeed;
   if(imageX+imageWidth<=canvas.width+canvas.offsetLeft&&rightPressed==true)
       imageX+=imageSpeed;
  
   if(enemies[lastCol][ly].x+enemiesHeight>=canvas.width-bufferX+50)
   {   
       enemySpeed=enemySpeed*-1;
       ySpeed+=5;
   }
   if(enemies[firstCol][fy].x<=bufferX-50)
   {
       enemySpeed=enemySpeed*-1;
       ySpeed+=yVel;
   }
  
}
function makeButtonOne()
{
    ctx.beginPath();
    if(yellow1==true)
        ctx.fillStyle="#dbff4d";
    else if(yellow1==false)
        ctx.fillStyle="rgb(255,255,255)";
    
    ctx.rect(200,280,200,50);
    ctx.fill();
    ctx.closePath();
}
function makeButtonTwo()
{
    ctx.beginPath();
    if(yellow2==true)
        ctx.fillStyle="rgb(0,250,250)";
    else if(yellow2==false)
        ctx.fillStyle="rgb(255,255,255)";
    
    ctx.rect(225,380,150,50);
    ctx.fill();
    ctx.closePath();
}
function makeShield()
{
    if(shield==true)
    {
        ctx.beginPath();
        ctx.fillStyle = "#00ffff";
        ctx.arc(imageX-canvas.offsetLeft+40,imageY-canvas.offsetTop+53,30,0,Math.PI,true);
        ctx.fill();
        ctx.arc(imageX-canvas.offsetLeft+50,imageY-canvas.offsetTop+63,20,0,Math.PI,true);
        ctx.fillStyle = "#000000";
        ctx.fill();
    }
}
function playMath()
{
    temp = lives;
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawSpace();
   imgObj.style.left = imageX+"px";
   drawShots();
   drawEnemies();
   drawFace();
   collisionDetection();
   drawHearts();
   drawHearts2();
   drawHearts3();
   printScore();
   drawPower();
   makeShield();
   if(lives<=0)
   {
       win=true;
      
       clearInterval(interval);
       clearInterval(timevar);
       sad.play();
       interval = setInterval(setWin, 5);
       setWin();
   }
   if(hits==320)
   {
       win=true;
       
       clearInterval(interval);
       clearInterval(timevar);
       interval = setInterval(setWin, 5);
       setWin();
   }
   if(counter==0)
   {
       reset=true;
   }
   if(reset==true)
   {
       resetLevel();
       reset=false;
   }
    if(temp>lives&&win==false)
    {
        for(var i = 0; i<shotsX.length; i++)
        {
         shotsX.pop();
            shotsY.pop();
            i--;
        }
        for(var i = 0; i<sX.length; i++)
        {
            sX.pop();
            sY.pop();
            i--;
        }
        num = Math.floor(Math.random()*3+1);
        if(num==1)
        {
            power = Math.floor(Math.random()*6+2);
            base = Math.floor(Math.random()*10+1);
            while(base==power || base==power-1 || base+1==power)
                base = Math.floor(Math.random()*10+1);
            power1 = ""+power;
         question=true;
         clearInterval(interval);
            clearInterval(timevar);
            u = Math.floor(Math.random()*4+1);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            interval = setInterval(setCalc,5);
            setCalc();
        }
        else if(num==2)
        {
            power = Math.floor(Math.random()*6+2);
            question=true;
            base = Math.floor(Math.random()*8+1);
            while(base==power || base==power-1 || base+1==power)
                base = Math.floor(Math.random()*10+1);
            clearInterval(interval);
            clearInterval(timevar);
            u = Math.floor(Math.random()*4+1);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            interval = setInterval(setAntiCalc,5);
            setAntiCalc();
        }
        else if(num==3)
        {
            question=true;
            u = Math.floor(Math.random()*4+1);
            power = Math.floor(Math.random()*6+2);
            coef1 = Math.floor(Math.random()*6+2);
            coef2 = Math.floor(Math.random()*9+1);
            exponent = Math.floor(Math.random()*6+2);
            clearInterval(interval);
            clearInterval(timevar);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            interval = setInterval(setChain,5);
            setChain();
        }
    }

   for(var c = enemycolumncount-1; c>=0; c--)
   {
       for(var r = enemyrowcount-1; r>=0; r--)
       {
           if(enemies[c][r].status==1)
           {
               lastCol = c;
               ly = r;
               c = -100;
               r=-100;
           }
       }
   }
   for(var c = 0; c<enemycolumncount; c++)
   {
       for(var r = 0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
               firstCol = c;
               fy = r;
               c = 100;
               r=100;
           }
       }
   }
   if(imageX-imageSpeed>=canvas.offsetLeft&&leftPressed==true)
       imageX-=imageSpeed;
   if(imageX+imageWidth<=canvas.width+canvas.offsetLeft&&rightPressed==true)
       imageX+=imageSpeed;
  
   if(enemies[lastCol][ly].x+enemiesHeight>=canvas.width-bufferX+50)
   {   
       enemySpeed=enemySpeed*-1;
       ySpeed+=5;
   }
   if(enemies[firstCol][fy].x<=bufferX-50)
   {
       enemySpeed=enemySpeed*-1;
       ySpeed+=yVel;
   }
  
}
function collisionDetection() {
   //shots vs enemies detection
   for(var c=0; c<enemycolumncount; c++) {
     for(var r=0; r<enemyrowcount; r++) {
       for(var i = 0; i<shotsX.length; i++)
       {
           var b = enemies[c][r];
           if(b.status == 1)
           {
               if(shotsX[i] > b.x-shotsWidth && shotsX[i] < b.x+enemiesHeight && shotsY[i] > b.y+ySpeed && shotsY[i] < b.y+ySpeed+enemiesHeight)
               {
                   shotsY[i] = -100;
                   counter--;
                   b.status = 0;
                   score+=scoreInc;
                   hits++;
                   xwing.play();
               }
           }
       }
     }
   }
   //enemy shots vs player detection
   for(var i = 0; i<sX.length; i++)
   {
       if(sX[i]>=imageX-canvas.offsetLeft+20 && sX[i]+shotsWidth <=imageX+imageWidth-38-canvas.offsetLeft)
       {
           if(sY[i]+sh>=imageY+20 && sY[i]<=imageY+50 && shield==false)
           {
               lives--;
               sY[i]=600;
               explosion.play();
               hit=true;
               ti=0;
           }
           else if(sY[i]+sh>=imageY+15 && sY[i]<=imageY+50 && shield==true)
           {
               sY[i]=600;
           }
       }
   }
   //enemy vs player detection
   for(var c = 0; c<enemycolumncount; c++)
   {
       for(var r = 0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
              
               if(enemies[c][r].y+ySpeed+enemiesHeight==canvas.height || enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+1 || enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+2 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+3 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+4 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+5 || enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+6 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+7 || enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+8 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+9 ||enemies[c][r].y+ySpeed+enemiesHeight==canvas.height+10)
               {
                   enemies[c][r].status=0;
                   lives--;
                   counter--;
               }
           }
       }
   }
   //player vs powerups
   if(powerupX+30>=imageX-canvas.offsetLeft+20 && powerupX<=imageX+imageWidth-canvas.offsetLeft-40)
   {
       if(powerupY+30>=imageY+20 && rand==1 && powerupY+30<=canvas.width+25)
       {
        lives++;
        powerupY=600;
        oneup.play();
        powerup=true;
       }
       else if(powerupY+30>=imageY+20 && rand==2 && powerupY+30<=canvas.width+25)
       {
        shotTime =1;
        shotSpeed = shotSpeed *2;
        powerupY=600;
        rapid.play();
        powerup=true;
       }
       else if(powerupY+30>=imageY+20 && rand==3 && powerupY+30<=canvas.width+25)
       {
        imageSpeed=imageSpeed*2;
        powerupY=600;
        rapid.play();
        powerup=true;
       }
       else if(powerupY+30>=imageY+20 && rand==4 && powerupY+30<=canvas.width+25)
       {
        shotsWidth=shotsWidth*2;
        shotsHeight=shotsHeight*2;
        powerupY=600;
        rapid.play();
        powerup=true;
       }
       else if(powerupY+30>=imageY+20 && rand==5 && powerupY+30<=canvas.width+25)
       {
        scoreInc = scoreInc*2;
        powerupY=600;
        rapid.play();
        powerup=true;
       }
       else if(powerupY+30>=imageY+20 && rand==6 && powerupY+30<=canvas.width+25)
       {
        shield=true;
        powerupY=600;
        rapid.play();
        powerup=true;
       }
   }
}
function setCalc()
{
    var j = power+1;
    var o = power-1;
    var pb = power*base;
    var plus = power+base;
    imgObj.style.visibility = 'hidden';
    if(u==1)
    {
        xPos = aX;
        yPos = aY;
        aText = pb+"X^"+o;
        bText = pb+"X^"+j;
        cText = plus+"X^"+o;
        dText = power+"X^"+base;
    }
    if(u==2)
    {
        xPos = bX;
        yPos = bY;
        bText = pb+"X^"+o;
        aText = pb+"X^"+j;
        dText = plus+"X^"+o;
        cText = power+"X^"+base;
    }
    if(u==3)
    {
        xPos = cX;
        yPos = cY;
        cText = pb+"X^"+o;
        dText = pb+"X^"+j;
        aText = plus+"X^"+o;
        bText = power+"X^"+base;
    }
    if(u==4)
    {
        xPos = dX;
        yPos = dY;
        dText = pb+"X^"+o;
        cText = pb+"X^"+j;
        bText = plus+"X^"+o;
        aText = power+"X^"+base;
    }
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle = "rgb(255,255,255)";
   ctx.font = "30px Courier New";
   ctx.fillText("What is the derivative of "+base+"X^"+power+"?",10,100);
    makeAns1();
    makeAns2();
    makeAns3();
    makeAns4();
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.font = "20px Courier New";
   ctx.fillText("A) "+aText, aX, aY+20);
   ctx.fillText("B) "+bText, bX, bY+20);
   ctx.fillText("C) "+cText, cX, cY+20);
   ctx.fillText("D) "+dText, dX, dY+20);
   ctx.closePath();
   if(right==true&&question==true)
   {
       x=0;
       y=0;
       imgObj.style.visibility = 'visible';
       right=false;
       question = false;
       aChange=false;
       bChange=false;
       cChange=false;
       dChange=false;
       clearInterval(interval);
       timevar = setInterval(countTime, 100);
       interval = setInterval(playMath, 20);
       playMath();
   }
}
function setAntiCalc()
{
    var derivBase = base*power;
    var derivPower = power-1;
    var ppp = power+1;
    var b2 = derivBase*derivPower;
    var p2 = power-1;
    imgObj.style.visibility = 'hidden';
    if(u==1)
    {
        xPos = aX;
        yPos = aY;
        aText = base+"X^"+power;
        bText = power+"X^"+base;
        cText = base+"X^"+ppp;
        dText = b2+"X^"+p2;
    }
    if(u==2)
    {
        xPos = bX;
        yPos = bY;
        bText = base+"X^"+power;
        aText = power+"X^"+base;
        dText = base+"X^"+ppp;
        cText = b2+"X^"+p2;
    }
    if(u==3)
    {
        xPos = cX;
        yPos = cY;
        cText = base+"X^"+power;
        dText = power+"X^"+base;
        aText = base+"X^"+ppp;
        bText = b2+"X^"+p2;
    }
    if(u==4)
    {
        xPos = dX;
        yPos = dY;
        dText = base+"X^"+power;
        cText = power+"X^"+base;
        bText = base+"X^"+ppp;
        aText = b2+"X^"+p2;
    }
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle = "rgb(255,255,255)";
   ctx.font = "30px Courier New";
   ctx.fillText("What is the antiderivative of ",60,100);
   ctx.fillText(derivBase+"X^"+derivPower+"?",60,130);
   makeAns1();
   makeAns2();
   makeAns3();
   makeAns4();
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.font = "20px Courier New";
   ctx.fillText("A) "+aText, aX, aY+20);
   ctx.fillText("B) "+bText, bX, bY+20);
   ctx.fillText("C) "+cText, cX, cY+20);
   ctx.fillText("D) "+dText, dX, dY+20);
   ctx.closePath();
   if(right==true&&question==true)
   {
       x=0;
       y=0;
       imgObj.style.visibility = 'visible';
       right=false;
       question = false;
       aChange=false;
       bChange=false;
       cChange=false;
       dChange=false;
       clearInterval(interval);
       timevar = setInterval(countTime, 100);
       interval = setInterval(playMath, 20);
       playMath();
   }
}
function setChain()
{
    var coef = power;
    var power1 = power-1;
    var temp = coef1;
    var dum = coef1*exponent;
    var temp1=exponent;
    var ex = exponent-1;
    imgObj.style.visibility = 'hidden';
    if(u==1)
    {
        xPos = aX;
        yPos = aY;
        aText = coef+"("+dum+"X^"+ex+")^"+power1;
        bText = power1+"("+temp+"X^"+temp1+"+"+coef2+")^"+power1;
        cText = "("+dum+"X^"+ex+")^"+coef;
        dText = coef+"("+ex+"X^"+dum+")^"+power1;
    }
    if(u==2)
    {
        xPos = bX;
        yPos = bY;
        bText = coef+"("+dum+"X^"+ex+")^"+power1;
        aText = power1+"("+temp+"X^"+temp1+"+"+coef2+")^"+power1;
        dText = "("+dum+"X^"+ex+")^"+coef;
        cText = coef+"("+ex+"X^"+dum+")^"+power1;
    }
    if(u==3)
    {
        xPos = cX;
        yPos = cY;
        cText = coef+"("+dum+"X^"+ex+")^"+power1;
        dText = power1+"("+temp+"X^"+temp1+"+"+coef2+")^"+power1;
        aText = "("+dum+"X^"+ex+")^"+coef;
        bText = coef+"("+ex+"X^"+dum+")^"+power1;
    }
    if(u==4)
    {
        xPos = dX;
        yPos = dY;
        dText = coef+"("+dum+"X^"+ex+")^"+power1;
        cText = power1+"("+temp+"X^"+temp1+"+"+coef2+")^"+power1;
        bText = "("+dum+"X^"+ex+")^"+coef;
        aText = coef+"("+ex+"X^"+dum+")^"+power1;
    }
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle = "rgb(255,255,255)";
   ctx.font = "30px Courier New";
   ctx.fillText("What is the Derivative of ",60,100);
   ctx.fillText( "("+coef1+"X^"+exponent+"+"+coef2+")^"+power+"?",60,130);
   makeAns1();
   makeAns2();
   makeAns3();
   makeAns4();
   ctx.fillStyle = "rgb(0,0,0)";
   ctx.font = "14px Courier New";
   ctx.fillText("A)"+aText, aX, aY+20);
   ctx.fillText("B)"+bText, bX, bY+20);
   ctx.fillText("C)"+cText, cX, cY+20);
   ctx.fillText("D)"+dText, dX, dY+20);
   ctx.closePath();
   if(right==true&&question==true)
   {
       x=0;
       y=0;
       imgObj.style.visibility = 'visible';
       right=false;
       question = false;
       aChange=false;
       bChange=false;
       cChange=false;
       dChange=false;
       clearInterval(interval);
       timevar = setInterval(countTime, 100);
       interval = setInterval(playMath, 20);
       playMath();
   }
}
function resetLevel()
{
    levelup.play();
   for(var c=0; c<enemycolumncount; c++)
   {
       for(var r=0; r<enemyrowcount; r++)
       {
           enemies[c][r].status = 1;
       }
   }
   for(var c=0; c<enemycolumncount; c++)
   {
       for(var r=0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
           var enemiesX = (c*(enemiesHeight+enemiesBuffer))+bufferX;
           var enemiesY = (r*(enemiesHeight+enemiesBuffer))+bufferY;
           enemies[c][r].x = enemiesX;
           enemies[c][r].y = enemiesY;
           }
          
       }
   }
   for(var i = 0; i<shotsX.length; i++)
   {
       shotsX.pop();
       shotsY.pop();
       i--;
   }
   for(var i = 0; i<sX.length; i++)
   {
       sX.pop();
       sY.pop();
       i--;
   }
    yVel+=3;
   firstCol = 0;
   ySpeed = 0;
   fy=0;
   ly=0;
   lastCol = enemyrowcount-1;
   ts=0;
   ts1=0;
   if(level<5)
        enemyTime = enemyTime-2;
    else if(level>=5)
        enemyTime = enemyTime-1;
   counter = enemyrowcount*enemycolumncount;
   level++;
}
function drawEnemies()
{
   for(var c=0; c<enemycolumncount; c++)
   {
       for(var r=0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
           ctx.beginPath();
           ctx.rect(enemies[c][r].x, enemies[c][r].y+ySpeed, enemiesHeight, enemiesHeight);
           ctx.fillStyle = "#FFEB3B";
           ctx.fill();
           ctx.closePath();
           enemies[c][r].x+=enemySpeed;
           }
          
       }
   }

}
function drawPower()
{
    if(time==300)
    {
        time=0;
        powerupX = randomX;
        powerupY = 0;
        ys=2;
    }
    if(rand==1)
    {
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "20px Courier New";
        ctx.fillText("+",powerupX+9,powerupY+22);
    }
    else if(rand==2)
    {
        ctx.fillStyle = "rgb(0,255,0)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.font = "10px Courier New";
        ctx.fillText("Shots",powerupX,powerupY+16);
        ctx.font = "12px Courier New";
        ctx.fillText("x2",powerupX+5,powerupY+25);
    }
    else if(rand==3)
    {
        ctx.fillStyle = "rgb(255,100,0)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = "10px Courier New";
        ctx.fillText("Speed",powerupX,powerupY+18);
    }
    else if(rand==4)
    {
        ctx.fillStyle = "rgb(0,255,255)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = "10px Courier New";
        ctx.fillText("Width",powerupX,powerupY+16);
        ctx.font = "12px Courier New";
        ctx.fillText("x2",powerupX+3,powerupY+25);
    }
    else if(rand==5)
    {
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "10px Courier New";
        ctx.fillText("Score",powerupX,powerupY+16);
        ctx.font = "12px Courier New";
        ctx.fillText("x2",powerupX+3,powerupY+25);
    }
    else if(rand==6)
    {
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.rect(powerupX, powerupY, 30,30)
        ctx.fill();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "8px Courier New";
        ctx.fillText("shield",powerupX,powerupY+16);
    }
    powerupY+=ys;

}
function drawFace()
{
    for(var c=0; c<enemycolumncount; c++)
   {
       for(var r=0; r<enemyrowcount; r++)
       {
           if(enemies[c][r].status==1)
           {
           ctx.beginPath();
           //ears
           ctx.rect(enemies[c][r].x-1, enemies[c][r].y+ySpeed, 5,4);
           ctx.rect(enemies[c][r].x-1, enemies[c][r].y+ySpeed+4, 3,1);
           ctx.rect(enemies[c][r].x-1, enemies[c][r].y+ySpeed+5, 2,1);

           ctx.rect(enemies[c][r].x+16, enemies[c][r].y+ySpeed, 5,4);
           ctx.rect(enemies[c][r].x+18, enemies[c][r].y+ySpeed+4, 3,1);
           ctx.rect(enemies[c][r].x+19, enemies[c][r].y+ySpeed+5, 2,1);
           //forehead
           ctx.rect(enemies[c][r].x+6, enemies[c][r].y+ySpeed, 8,4);
           //eyes
           ctx.rect(enemies[c][r].x+4, enemies[c][r].y+5+ySpeed, 2,2);
           ctx.rect(enemies[c][r].x+14, enemies[c][r].y+5+ySpeed, 2,2);
           //mouth
           ctx.rect(enemies[c][r].x+6, enemies[c][r].y+ySpeed+15, 9,1);
           //fins
           ctx.rect(enemies[c][r].x+1, enemies[c][r].y+ySpeed+19, 3,1);
           ctx.rect(enemies[c][r].x+6, enemies[c][r].y+ySpeed+19, 3,1);
           ctx.rect(enemies[c][r].x+11, enemies[c][r].y+ySpeed+19, 3,1);
           ctx.rect(enemies[c][r].x+16, enemies[c][r].y+ySpeed+19, 3,1);


           
           ctx.fillStyle = "rgb(0,0,0)";
           ctx.fill();
           ctx.closePath();
           enemies[c][r].x+=enemySpeed;
        }
          
       }
   }
}
function makeAns1()
{
    ctx.beginPath();
    if(aC==true&&aChange==false)
        ctx.fillStyle="rgb(0,255,255)";
    else if(aChange==true)
        ctx.fillStyle="rgb(255,0,0)";
    else if(aChange==false&&aC==false)
        ctx.fillStyle="rgb(255,255,255)";
    ctx.rect(aX,aY,110,25);
    ctx.fill();
    ctx.closePath();
}
function makeAns2()
{
    ctx.beginPath();
    if(bC==true&&bChange==false)
        ctx.fillStyle="rgb(0,255,255)";
    else if(bChange==true)
        ctx.fillStyle="rgb(255,0,0)";
    else if(bChange==false&&bC==false)
        ctx.fillStyle="rgb(255,255,255)";
    
    ctx.rect(bX,bY,110,25);
    ctx.fill();
    ctx.closePath();
}
function makeAns3()
{
    ctx.beginPath();
    if(cC==true&&cChange==false)
        ctx.fillStyle="rgb(0,255,255)";
    else if(cChange==true)
        ctx.fillStyle="rgb(255,0,0)";
    else if(cChange==false&&cC==false)
        ctx.fillStyle="rgb(255,255,255)";
    
    ctx.rect(cX,cY,110,25);
    ctx.fill();
    ctx.closePath();
}
function makeAns4()
{
    ctx.beginPath();
    if(dC==true&&dChange==false)
        ctx.fillStyle="rgb(0,255,255)";
    else if(dChange==true)
        ctx.fillStyle="rgb(255,0,0)";
    else if(dChange==false&&dC==false)
        ctx.fillStyle="rgb(255,255,255)";
    ctx.rect(dX,dY,110,25);
    ctx.fill();
    ctx.closePath();
}
function printScore()
{
   ctx.beginPath();
   ctx.font = "24px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Level: "+level,380,60);
   ctx.fillText("Score: "+score,480,60);
}
function drawSpace()
{
   ctx.beginPath();
   if(ts2==3)
   {
       ts2=0;
       w.push(Math.floor(Math.random()*5+2));
       h.push(Math.floor(Math.random()*5+2));
       spaceX.push(Math.floor(Math.random()*(canvas.width-7)));
       spaceY.push(0);
   }
   for(var i = 0; i<h.length; i++)
   {
       if(spaceY[i]>canvas.width)
       {
           spaceY[i]=0;
           makespace = false;
       }
       ctx.rect(spaceX[i],spaceY[i], w[i],h[i]);
       ctx.fillStyle = "rgb(10,10,250)";
       ctx.fill();
       spaceY[i]+=spaceSpeed;
   }
}
function drawShots()
{
   randomRow = Math.floor(Math.random()*enemyrowcount);
   randomColumn = Math.floor(Math.random()*enemycolumncount);
   var a = enemies[randomColumn][randomRow].status;
   while(a==0&&counter>=1)
   {
       randomRow = Math.floor(Math.random()*enemyrowcount);
       randomColumn = Math.floor(Math.random()*enemycolumncount);
       a = enemies[randomColumn][randomRow].status;
   }
   if(ts1>=enemyTime&&counter>0)
   {
       sX.push(enemies[randomColumn][randomRow].x+(enemiesHeight-sw)/2);
       sY.push(enemies[randomColumn][randomRow].y+ySpeed+enemiesHeight);
       ts1 = 0;
   }
   for(var i = 0; i<sX.length; i++)
   {
       ctx.beginPath();
       ctx.rect(sX[i],sY[i], sw, sh);
       ctx.fillStyle = "rgb(0,255,20)";
       ctx.fill();
       ctx.closePath();
       sY[i]+=sSpeed;
   }
   if(upPressed==true)
   {
       shotsX.push(imageX-canvas.offsetLeft-10+((imageWidth-shotsWidth)/2));
       shotsY.push(canvas.height-imageHeight+60-shotsHeight);
       upPressed=false;
   }
   for(var i = 0; i<shotsX.length; i++)
   {
       ctx.beginPath();
       ctx.rect(shotsX[i],shotsY[i], shotsWidth, shotsHeight);
       ctx.fillStyle = "rgb(255,0,0)";
       ctx.fill();
       ctx.closePath();
       shotsY[i]+=shotSpeed;
   }
}
function drawHearts()
{
    ctx.beginPath();
    for(var i = 0; i<lives; i++)
    {
        var a = (i*heartBuffer) + heartX;
        ctx.fillStyle = "#ff0000";
        ctx.rect(heartX + (i*heartBuffer), 40, 26, 22);
        ctx.fill();
        }
    ctx.closePath();
}
function drawHearts2()
{
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    for(var i =0; i<lives; i++) {
        var a = (i*heartBuffer) + heartX;
        //sides
        ctx.rect(a,50,2,12);
        ctx.rect(a+2,52,2,10);
        ctx.rect(a+4,54,2,8);
        ctx.rect(a+6,56,2,6);
        ctx.rect(a+8,58,2,4);
        ctx.rect(a+10,60,2,2);
        ctx.rect(a+24,50,2,12);
        ctx.rect(a+22,52,2,10);
        ctx.rect(a+20,54,2,8);
        ctx.rect(a+18,56,2,6);
        ctx.rect(a+16,58,2,4);
        ctx.rect(a+14,60,2,2);
        //top
        ctx.rect(a,40,4,2);
        ctx.rect(a+22,40,4,2);
        ctx.rect(a,42,2,2);
        ctx.rect(a+24,42,2,2);
        //middle
        ctx.rect(a+10, 40, 6,2);
        ctx.rect(a+12, 42,2,2);
        ctx.fill();
    }
    ctx.closePath();
}
function drawHearts3()
{
    ctx.beginPath();
    for(var i = 0; i<lives; i++)
    {
        var a = (i*heartBuffer) + heartX;
        ctx.fillStyle = "#ffffff";
        ctx.rect(a+17, 42, 2, 2);
        ctx.rect(a+19, 44, 2, 2);
        ctx.rect(a+21, 46, 2, 2);
        ctx.fill();
    }
}
function setWin()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
   imgObj.style.visibility = "hidden";
   if(hits==320)
   {
   ctx.beginPath();
   var acc = Math.floor((hits/shotnum)*100);
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("You Win!",140,200);
   ctx.font = "50px Impact";
   ctx.fillText("Score: "+score,200,280);
   ctx.fillText("Hits: "+hits,200,330);
   ctx.fillText("Shots: "+shotnum,200,380);
   if(shotnum>0)
        ctx.fillText("Accuracy: "+acc+"%",200,430);
    else if(shotnum==0)
        ctx.fillText("Accuracy: "+"0%",200,430);
   ctx.font = "20px Courier New";
   if(yellow3==true)
        ctx.fillStyle = "#dbff4d";
    else if(yellow3==false)
        ctx.fillStyle = "#ffffff";
   ctx.rect(255,460, 100,25);
   ctx.fill();
   ctx.fillStyle = "#000000";
   ctx.fillText("Restart",260,480);
   ctx.closePath();
   }
   else
   {
   ctx.beginPath();
   var acc = Math.floor((hits/shotnum)*100);
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Gameover",100,200);
   ctx.font = "50px Impact";
   ctx.fillText("Score: "+score,200,280);
   ctx.fillText("Hits: "+hits,200,330);
   ctx.fillText("Shots: "+shotnum,200,380);
   if(shotnum>0)
        ctx.fillText("Accuracy: "+acc+"%",200,430);
    else if(shotnum==0)
        ctx.fillText("Accuracy: "+"0%",200,430);
   ctx.font = "20px Courier New";
   if(yellow3==true)
        ctx.fillStyle = "#dbff4d";
    else if(yellow3==false)
        ctx.fillStyle = "#ffffff";
   ctx.rect(255,460, 100,25);
   ctx.fill();
   ctx.fillStyle = "#000000";
   ctx.fillText("Restart",260,480);
   ctx.closePath();
   }
}
function keyDownHandler(e)
{
   if(e.keyCode==37)
       leftPressed=true;
   if(e.keyCode==39)
       rightPressed=true;
   if(e.keyCode==13)
       enter=true;
   if(e.keyCode==82)
       document.location.reload();
}
function keyUpHandler(e)
{
   if(e.keyCode==37)
       leftPressed=false;
   if(e.keyCode==39)
       rightPressed=false;
   if(e.keyCode==32&&ts>=shotTime)
   {
       upPressed=true;
       ts=0;
       shotnum++;
       bleep.play();
   }
   else if(e.keyCode==38&&ts>=shotTime)
   {
       upPressed=true;
       ts=0;
       shotnum++;
       bleep.play();
   }
}
function mouseUpHandler(e)
{
   x = e.clientX - canvas.offsetLeft;
   y = e.clientY - canvas.offsetTop;
   if(x>=255 && x<=355 && y>=460 && y<485 && win==true)
   {
       document.location.reload();
   }
   if(start==true && x>=225 && x<=375 && y>=380 && y<=430)
   {
       enter=true;
       music.play();
   }
   if(start==true && x>=200 && x<=400 && y>=280 && y<=330)
   {
       playMathMode=true;
       music.play();
   }
   if(question==true && x>=xPos && x<=xPos+110 && y>=yPos && y<=yPos+25)
   {
       right=true;
       oneup.play();
   }
   //making answer choice turn red.
   if(xPos==aX&&question==true)
   {
        if(x>=bX && x<=bX+110 && y>=bY && y<=bY+25)
            bChange=true;
        if(x>=cX && x<=cX+110 && y>=cY && y<=cY+25)
            cChange=true;
        if(x>=dX && x<=dX+110 && y>=dY && y<=dY+25)
            dChange=true;
        
   }
   if(xPos==bX&&question==true)
   {
    if(x>=aX && x<=aX+110 && y>=aY && y<=aY+25)
        aChange=true;
    if(x>=cX && x<=cX+110 && y>=cY && y<=cY+25)
        cChange=true;
    if(x>=dX && x<=dX+110 && y>=dY && y<=dY+25)
        dChange=true;
   }
   if(xPos==cX&&question==true)
   {
    if(x>=bX && x<=bX+110 && y>=bY && y<=bY+25)
        bChange=true;
    if(x>=aX && x<=aX+110 && y>=aY && y<=aY+25)
        aChange=true;
    if(x>=dX && x<=dX+110 && y>=dY && y<=dY+25)
        dChange=true;
   }
   if(xPos==dX&&question==true)
   {
    if(x>=bX && x<=bX+110 && y>=bY && y<=bY+25)
        bChange=true;
    if(x>=cX && x<=cX+110 && y>=cY && y<=cY+25)
        cChange=true;
    if(x>=aX && x<=aX+110 && y>=aY && y<=aY+25)
        aChange=true;
   }
}
function mouseMoveHandler(e)
{
    x1 = e.clientX - canvas.offsetLeft;
    y1 = e.clientY - canvas.offsetTop;
    if(start==true && x1>=225 && x1<=375 && y1>=380 && y1<=430)
   {
       yellow2=true;
   }
   if(start==true && x1>=200 && x1<=400 && y1>=280 && y1<=330)
   {
       yellow1=true;
   }
   if(start==true && (x1<=225 || x1>=375) || (y1<=380 || y1>=430) && yellow2 == true)
   {
       yellow2=false;
   }
   if(start==true && (x1<=200 || x1>=400) || (y1<=280 || y1>=330) && yellow1 == true)
   {
       yellow1=false;
   }
   if(x1>=255 && x1<=355 && y1>=460 && y1<485 && win==true)
   {
       yellow3 = true;
   }
   if((x1<=255 || x1>=355 || y1<=460 || y1>485) && win==true)
   {
       yellow3 = false;
   }
   if(question==true)
   {
    if(x1>=aX && x1<=aX+110 && y1>=aY && y1<=aY+25)
        aC=true;
    if(x1>=cX && x1<=cX+110 && y1>=cY && y1<=cY+25)
        cC=true;
    if(x1>=dX && x1<=dX+110 && y1>=dY && y1<=dY+25)
        dC=true;
    if(x1>=bX && x1<=bX+110 && y1>=bY && y1<=bY+25)
        bC=true;
    if(x1<=aX || x1>=aX+110 || y1<=aY || y1>=aY+25)
        aC=false;
    if(x1<=cX || x1>=cX+110 || y1<=cY || y1>=cY+25)
        cC=false;
    if(x1<=dX || x1>=dX+110 || y1<=dY || y1>=dY+25)
        dC=false;
    if(x1<=bX || x1>=bX+110 && y1<=bY || y1>=bY+25)
        bC=false;
   }
}
function makeTime()
{
    ti++;
}
