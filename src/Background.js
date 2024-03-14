import React, { useEffect } from 'react';
import './background.css';

const Background = () => {
  useEffect(() => {
    var canvas = document.getElementById('backgroundCanvas'),
        ctx = canvas.getContext('2d'),
        rate = 60,
        arc = 100,
        time,
        size = 7,
        speed = 20,
        parts = [],
        colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
    var mouse = { x: 0, y: 0 };

    function setCanvasSize() {
      canvas.setAttribute('width', window.innerWidth);
      canvas.setAttribute('height', window.innerHeight);
    }

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    function create() {
      time = 0;

      for(var i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * window.innerWidth),
          y: Math.ceil(Math.random() * window.innerHeight),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random()*colors.length)],
          size: Math.random() * size
        }
      }
    }

    function particles() {
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      for(var i = 0; i < arc; i++) {
        var li = parts[i];
        var distanceFactor = DistanceBetween( mouse, parts[i] );
        distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
        ctx.beginPath();
        ctx.arc(li.x,li.y,li.size*distanceFactor,0,Math.PI*2,false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle=li.c;
        if(i%2===0)
          ctx.stroke();
        else
          ctx.fill();

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if(li.x > window.innerWidth){
           li.x = 0; 
        }
        if(li.y > window.innerHeight) {
           li.y = 0; 
        }
        if(li.x < 0) {
           li.x = window.innerWidth; 
        }
        if(li.y < 0) {
           li.y = window.innerHeight; 
        }
      }
      if(time < speed) {
        time++;
      }
      setTimeout(particles,1000/rate);
    }

    function MouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
      

    function DistanceBetween(p1,p2) {
       var dx = p2.x-p1.x;
       var dy = p2.y-p1.y;
       return Math.sqrt(dx*dx + dy*dy);
    }

    canvas.addEventListener('mousemove', MouseMove, false);
    create();
    particles();

    // Clean up function
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <canvas id="backgroundCanvas"></canvas>;
};

export default Background;
