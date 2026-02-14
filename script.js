let step = 1;
let noClicks = 0;
let noButtonDisabled = false; // NEW: Track disabled state

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function revealSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.body.style.overflow = 'auto'; // Allow scroll for mobile
    document.getElementById('buttons').style.display = 'none';
    
    // 🌟 MASSIVE HEART SHOWER - 300+ brighter hearts!
    const heartShower = setInterval(() => {
        for(let i = 0; i < 8; i++) { // 8 hearts per frame
            createFallingHeart();
        }
    }, 50); // Every 50ms = 160 hearts/second!
    
    // Stop after 10 seconds of pure magic ✨
    setTimeout(() => {
        clearInterval(heartShower);
    }, 10000);
}


function showNoMessage() {
    // **FIX 1**: Stop if already disabled or too many clicks
    if (noButtonDisabled || noClicks >= 5) {
        return;
    }
    
    noClicks++;
    document.querySelectorAll('.no-message').forEach(msg => msg.classList.add('hidden'));
    
    if (noClicks <= 3) {
        const msg = document.getElementById(`noMessage${noClicks}`);
        setTimeout(() => {
            msg.classList.remove('hidden');
            msg.classList.add('show');
        }, 200);
    }
    
    // **FIX 2**: Move No button + start disable countdown
    const noBtn = document.getElementById('noBtn');
    const maxX = window.innerWidth - 120;
    noBtn.style.position = 'fixed';
    noBtn.style.left = (Math.random() * maxX) + 'px';
    noBtn.style.top = (Math.random() * 400) + 'px';
    noBtn.style.transition = 'all 0.5s ease';
    
    // **FIX 3**: DISABLE after 4th click (3 messages shown)
    if (noClicks === 4) {
        setTimeout(() => {
            noButtonDisabled = true;
            noBtn.innerHTML = '😜 Just say Yes! 🤍 Sorry You dont have other option 🤣';
            noBtn.style.background = '#ff4081';
            noBtn.onclick = revealSurprise; // Redirect to Yes!
        }, 1000);
    }
}

window.onload = () => {
    const messages = [
        "Ena Pakkura 👀 ?? Intha last one year something special for me,so intha valentines day normal ah iruka kudathula😜😜",
        "You make every day better just by your presence 💖",
        "Will you be my Valentine? Forever?"
    ];
    
    typeWriter(document.getElementById('title'), 'Hey love... 💋');
    
    let msgIndex = 0;
    const showNext = () => {
        if (msgIndex < 3) {
            const msg = document.getElementById(`message${msgIndex + 1}`);
            typeWriter(msg, messages[msgIndex]);
            msg.classList.remove('hidden');
            msg.classList.add('show');
            msgIndex++;
            
            if (msgIndex === 3) {
                setTimeout(() => {
                    document.getElementById('buttons').classList.remove('hidden');
                }, 1000);
            }
        }
    };
    
    setTimeout(showNext, 2000);
    setTimeout(showNext, 5000);
    setTimeout(showNext, 9000);
};

// Event listeners
document.getElementById('yesBtn').addEventListener('click', revealSurprise);
document.getElementById('noBtn').addEventListener('click', showNoMessage);

function createFallingHeart() {
    const hearts = ['💖', '💕', '💗', '💝', '🌸', '✨', '💫'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    
    // 🌟 BRIGHTER + RANDOM SIZES + GLOW
    const size = 18 + Math.random() * 25;
    const x = Math.random() * (window.innerWidth - 60);
    
    heart.style.cssText = `
        position: fixed; 
        left: ${x}px; 
        top: -60px;
        font-size: ${size}px;
        pointer-events: none; 
        z-index: 2000;
        text-shadow: 0 0 15px #ff69b4, 0 0 25px #ff1493;
        opacity: 0.9;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    document.body.appendChild(heart);
    
    // 🎭 FALL + SWAY + FADE + ROTATE
    let fallSpeed = 2 + Math.random() * 4;
    let sway = 0;
    let rotation = 0;
    
    const fall = setInterval(() => {
        const rect = heart.getBoundingClientRect();
        
        // Fall down
        heart.style.top = (parseFloat(heart.style.top) + fallSpeed) + 'px';
        
        // Side-to-side sway
        sway += 0.3;
        heart.style.left = (parseFloat(heart.style.left) + Math.sin(sway) * 1.5) + 'px';
        
        // Continuous rotation
        rotation += 8;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        // Fade out
        const opacity = parseFloat(heart.style.opacity);
        heart.style.opacity = (opacity - 0.01);
        
        // Remove when off screen
        if (rect.bottom > window.innerHeight + 50 || opacity < 0.1) {
            clearInterval(fall);
            heart.remove();
        }
    }, 20);
}

}
