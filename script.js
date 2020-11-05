const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const skyImg = new Image()
skyImg.src = "images/sky.jpg"

let sky = { x: 0, y: 0, w: canvas.width, h: canvas.height }

let ship = { x: (canvas.width / 2) + 400, y: canvas.height / 2, w: 80, h: 80 }

skyImg.onload = function () {
    ctx.drawImage(skyImg, 0, 20, canvas.width, canvas.height)
}

const shipImg = new Image()
shipImg.src = "images/enterprise.jpg"

shipImg.onload = function () {
    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h)
}

window.onkeydown = function (event) {
    switch (event.key) {
        case 'ArrowUp':
            ship.y -= 30
            break;
        case 'ArrowDown':
            ship.y += 30
            break;
    }
}

const allObstacles = []


setInterval(function () {

    let newObs = {
        x: 0,
        y: Math.random() * canvas.height - 10,
        w: 25,
        h: 25,
        color: "#" + ((1 << 24) * Math.random() | 0).toString(16)
    }

    allObstacles.push(newObs)

}, 700)


function detectCollision(obs) {
    if (ship.x < obs.x + obs.w &&
        ship.x + ship.w > obs.x &&
        ship.y < obs.y + obs.h &&
        ship.y + ship.h > obs.y) {
        // collision detected!
        console.log('collision!')
        cancelAnimationFrame(animationId)
        alert(`Score is ${score} you rock!`)
        window.location.reload()
    }
}





let score = 1;
let speed = 5


function drawObstacle() {
    //Loop thru all obstacles
    for (let obs of allObstacles) {
        ctx.fillStyle = obs.color
        console.log(speed)
        obs.x += speed
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h)
        detectCollision(obs)
        //Removes when passed ship/sky 
        if (obs.x > canvas.width) {
            score += 0
            speed += .2
            allObstacles.shift()
        }
    }

}










let animationId = null

function animate() {
    animationId = requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //Redraw everything 
    ctx.drawImage(skyImg, sky.x, sky.y, sky.w, sky.h)

    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h)

    drawObstacle() // detectCollision()

}
animate()