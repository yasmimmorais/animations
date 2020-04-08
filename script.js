// Customize these...
var n = 800, //points in the line
    speed = 30,
    amp = 400, // base amplitude
    rand = 0, //modifies amp
    cycles = 7,
    pan = window.innerWidth; //adjust panning to make a smoother lateral movement

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    particles = [],
    Particle = function(index) {
      this.x = this.y = this.index = this.alpha = index;
      this.dur = 100/speed;
      this.draw = function(){ ctx.globalAlpha = this.alpha; ctx.lineTo(this.x, this.y); }
    };



function setParticle(p) {
  gsap.timeline({defaults:{duration:p.dur}, repeat:-1, yoyo:true })
      .fromTo(p, {
        x:(pan+cw)/n*(p.index+1),
        y:ch/2 + (gsap.utils.random(amp,amp+rand)*Math.cos(p.index/n*cycles)),
        alpha:0.9,
      },{
        y:ch/2 - (gsap.utils.random(amp,amp+rand)*Math.cos(p.index/n*cycles)),
        yoyo:true,
        repeat:1,
        ease:Sine.easeInOut
      })
      .to(p, {
        duration:p.dur*2,
        x:'-='+(pan-n),
        ease:Sine.easeInOut
      }, 0)
}


// First run & handle resize
for (var i=0; i<n; i++) particles.push(new Particle(i));
window.addEventListener('resize', init);
init();

function init() {
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
  for (var i=0; i<n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i]);
  }
}
colorBase = 240;

gsap.ticker.add(function(){
  colorBase+=0.2;
  ctx.globalAlpha = 0.05;
  ctx.globalCompositeOperation = 'source-over';  
  ctx.fillStyle = 'hsl('+colorBase+', 100%,50% )';//"#a00070";
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = "#aaa";
  ctx.beginPath();
  ctx.moveTo(-n,ch/2);
  for (var i=0; i<n; i++) particles[i].draw();
  ctx.stroke();
});