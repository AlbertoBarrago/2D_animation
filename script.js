const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

let time = 0;
let currentAnimation = 'orbit';
let speed = 0.01;

// Clear canvas
function clear() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, width, height);
}

// Animation 1: Simple Orbit
function orbit() {
	clear();

	const x = centerX + Math.cos(time) * 150;
	const y = centerY + Math.sin(time) * 150;

	ctx.fillStyle = '#0f0';
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, Math.PI * 2);
	ctx.fill();
}

// Animation 2: Lissajous Curve
function lissajous() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, width, height);

	const a = 3;
	const b = 2;
	const x = centerX + Math.sin(time * a) * 200;
	const y = centerY + Math.sin(time * b) * 200;

	ctx.fillStyle = '#0ff';
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.PI * 2);
	ctx.fill();
}

// Animation 3: Spiral
function spiral() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, width, height);

	const r = (time * 2) % 300;
	const x = centerX + Math.cos(time * 3) * r;
	const y = centerY + Math.sin(time * 3) * r;

	ctx.fillStyle = '#f0f';
	ctx.beginPath();
	ctx.arc(x, y, 8, 0, Math.PI * 2);
	ctx.fill();
}

// Animation 4: Wave
function wave() {
	clear();

	ctx.strokeStyle = '#0f0';
	ctx.lineWidth = 2;
	ctx.beginPath();

	for (let x = 0; x < width; x += 2) {
		const y = centerY + Math.sin(x * 0.02 + time) * 100;
		if (x === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}

	ctx.stroke();

	ctx.strokeStyle = '#f00';
	ctx.beginPath();
	for (let x = 0; x < width; x += 2) {
		const y = centerY + Math.sin(x * 0.03 - time * 1.5) * 60;
		if (x === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();
}

// Animation 5: Particles in circle
function particles() {
	clear();

	const numParticles = 50;

	for (let i = 0; i < numParticles; i++) {
		const angle = (i / numParticles) * Math.PI * 2 + time;
		const r = 150 + Math.sin(time * 2 + i) * 50;
		const x = centerX + Math.cos(angle) * r;
		const y = centerY + Math.sin(angle) * r;
		const size = 3 + Math.sin(time * 3 + i) * 2;

		ctx.fillStyle = `hsl(${(i * 360 / numParticles + time * 50) % 360}, 70%, 60%)`;
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// Animation 6: Breathing Circle
function breathing() {
	clear();

	const scale = 1 + Math.sin(time * 2) * 0.3;
	const radius = 100 * scale;
	const rotation = time;

	ctx.save();
	ctx.translate(centerX, centerY);
	ctx.rotate(rotation);

	for (let i = 0; i < 8; i++) {
		const angle = (i / 8) * Math.PI * 2;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius;

		ctx.fillStyle = `hsl(${i * 45}, 70%, 50%)`;
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.restore();
}

// Animation 7: Mandala
function mandala() {
	clear();

	const layers = 5;
	const petals = 12;

	ctx.save();
	ctx.translate(centerX, centerY);

	for (let layer = 0; layer < layers; layer++) {
		const radius = 50 + layer * 40;
		const petalSize = 20 - layer * 2;

		for (let i = 0; i < petals; i++) {
			const angle = (i / petals) * Math.PI * 2 + time * (1 - layer * 0.1);
			const x = Math.cos(angle) * radius;
			const y = Math.sin(angle) * radius;

			const hue = (layer * 60 + time * 50) % 360;
			ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
			ctx.beginPath();
			ctx.arc(x, y, petalSize, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	ctx.restore();
}

// Animation 8: Tunnel Effect
function tunnel() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	ctx.fillRect(0, 0, width, height);

	const rings = 30;

	for (let i = 0; i < rings; i++) {
		const radius = ((time * 50 + i * 20) % 400);
		const alpha = 1 - (radius / 400);

		if (radius > 20) {
			ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
			ctx.stroke();
		}
	}
}
// Set animation
function setAnimation(name) {
	currentAnimation = name;
	time = 0;
}

// Update speed from slider
function updateSpeed(value) {
	speed = parseFloat(value);
	const speedMultiplier = (value / 0.05).toFixed(1);
	document.getElementById('speedValue').textContent = speedMultiplier + 'x';
}

// Main animation loop
function animate() {
	switch (currentAnimation) {
		case 'orbit': orbit(); break;
		case 'lissajous': lissajous(); break;
		case 'spiral': spiral(); break;
		case 'wave': wave(); break;
		case 'particles': particles(); break;
		case 'breathing': breathing(); break;
		case 'mandala': mandala(); break;
		case 'tunnel': tunnel(); break;
	}

	time += speed;
	requestAnimationFrame(animate);
}

// Event listeners
document.querySelectorAll('.controls button').forEach(button => {
	button.addEventListener('click', function() {
		setAnimation(this.dataset.animation);

		// Update active button
		document.querySelectorAll('.controls button').forEach(btn => {
			btn.classList.remove('active');
		});
		this.classList.add('active');
	});
});

// Speed slider listener
document.getElementById('speedSlider').addEventListener('input', function() {
	updateSpeed(this.value);
});

// Initialize and start
document.querySelector('.controls button').classList.add('active');
animate();
