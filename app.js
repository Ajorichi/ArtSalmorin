const canvas = document.querySelector(".canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 180;

const currentFrame = (index) => `./background/${(index + 1).toString()}.jpg`;
const images = [];
let anim = {frame:0};

for(let i = 0; i < frameCount; i++){
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

gsap.to(anim, {
    frame: frameCount-1,
    snap: "frame",
    ease: "none",
    scrollTrigger:{
        scrub: true,
        pin: "canvas",
        end: "400%"
    },
    onUpdate: render
});

var listones = gsap.utils.toArray('.info');

listones.forEach((info) => {
  
    gsap.fromTo(info, 
        {opacity: 0},
        { opacity: 1,
        scrollTrigger: {
            trigger:info,
            start: 'top top+=400',
            scrub: true,
            end: '+=100'
        }
    })
    //.to(info, {autoAlpha:1});
});

listones.forEach((info) => {

    gsap.fromTo(info, 
        {opacity: 1},
        { opacity: 0,
        scrollTrigger: {
            trigger:info,
            start: 'top top+=200',
            scrub: true,
            end: '+=100'
        }
    })
//.to(info, {autoAlpha:1});
});

gsap.fromTo('.contactInfo', 
    {opacity: 0},
    { opacity: 1,
    scrollTrigger: {
        trigger:'.skillInfo',
        start: 'top top+=50',
        scrub: true,
        end: '+=100',
        markers: true
    }
});

images[0].onload = render;

function render(){
    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;
    
    context.clearRect(0,0,canvas.width, canvas.height);
    context.drawImage(images[anim.frame], 0, 0);
}