let step = 1;
let animationRunning = false;
let noClicks = 0;
let noButton = null;
let yesButton = null;

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            animationRunning = false;
        }
    }
    type();
}

function revealSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('buttons').style.display = 'none';
    
    for(let i = 0; i < 100; i++) {
        setTimeout(() => createHeart(Math.random() * window.innerWidth, -50), i * 10);
    }
}

function showNoMessage() {
    noClicks++;
    const noMessages = ['noMessage1', 'noMessage2', 'noMessage3'];
    
    // Hide previous no message
    document.querySelectorAll('.no-message').forEach(msg => {
        msg.classList.add('hidden');
    });
    
    // Show current convincing message
    if (noClicks <= 3) {
        const currentNoMsg = document.getElementById(noMessages[noClicks-1]);
        setTimeout(() => {
            currentNoMsg.classList.remove('hidden');
            currentNoMsg.classList.add('show');
        }, 300);
    }
    
    // Move No button around
    moveNoButton();
}

function moveNoButton() {
    if (!noButton) return;
    
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 100;
    
    noButton.style.position = 'fixed';
    noButton.style.left = Math.random() * maxX + 'px';
    noButton.style.top = Math.random() * maxY + 'px';
    noButton.style.transition = 'all 0.5s ease';
}

function nextMessage() {
    if (step > 3 || animationRunning) return;
    
    animationRunning = true;
    const messages = ['message1', 'message2', 'message3'];
    const current = document.getElementById(messages[step-1]);
    const next = document.getElementById(messages[step]);
    
    current.classList.remove('show');
    setTimeout(() => {
        current.classList.add('hidden');
        next.classList.remove('hidden');
        typeWriter(next, next.textContent, 80);
        next.classList.add('show');
        step++;
        animationRunning = false;
    }, 1000);
}

// Initialize buttons
window.onload = () => {
    yesButton = document.getElementById('yesBtn');
    noButton = document.getElementById('noBtn');
    
    typeWriter(document.getElementById('title'), 'Hey love... 💕');
    setTimeout(() => {
        document.getElementById('message1').classList.add('show');
        document.getElementById('buttons').style.display = 'flex';
    }, 2000);
    
    setTimeout(nextMessage, 5000);
    setTimeout(nextMessage, 9000);
};

// Button event listeners
document.getElementById('yesBtn').addEventListener('click', revealSurprise);
document.getElementById('noBtn').addEventListener('click', showNoMessage);

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖','💕','💗','💝'][Math.floor(Math.random()*4)];
    heart.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px; 
        font-size: ${15+Math.random()*15}px; 
        pointer-events: none; z-index: 1000;
        transform: rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(heart);
    
    let dy = 0;
    const fall = setInterval(() => {
        dy += 2 + Math.random()*2;
        heart.style.top = (y + dy) + 'px';
        heart.style.opacity = 1 - (dy / 400);
        if (dy > 400) {
            clearInterval(fall);
            heart.remove();
        }
    }, 20);
}
