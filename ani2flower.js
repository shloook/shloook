let angle = 0;
const k = 7; // Controls the number of petals
const scale = 200; // Controls the size
const speed = 0.005; // Animation speed
const numberOfFlowers = 20; // Number of flowers to draw

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawFlower(flowerIndex) {
    ctx.beginPath();
    ctx.strokeStyle = getRandomColor(); // Add random color
    ctx.lineWidth = 1;

    let prevX = null, prevY = null;
    // Calculate offset based on flowerIndex to distribute flowers in a circle
    let offsetX = Math.cos(flowerIndex / numberOfFlowers * 2 * Math.PI) * 100; // Adjust 100 to control the radius of the circle
    let offsetY = Math.sin(flowerIndex / numberOfFlowers * 2 * Math.PI) * 100; // Adjust 100 to control the radius of the circle

    for (let theta = 0; theta < angle; theta += 0.01) {
        let r = Math.cos(k * theta); // Rose curve equation
        let x = scale * r * Math.cos(theta) + canvas.width / 2 + offsetX;
        let y = scale * r * Math.sin(theta) + canvas.height / 2 + offsetY;

        if (prevX !== null && prevY !== null) {
            ctx.lineTo(x, y);
        } else {
            ctx.moveTo(x, y);
        }

        prevX = x;
        prevY = y;
    }
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas to prevent overlapping

    for (let i = 0; i < numberOfFlowers; i++) {
        drawFlower(i);
    }

    angle += speed;
    requestAnimationFrame(animate);
}

animate();