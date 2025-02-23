document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector(".title");
    title.classList.add("animate");
});

function copyToClipboard() {
    const tokenAddress = document.getElementById("tokenAddress").innerText;
    navigator.clipboard.writeText(tokenAddress).then(() => {
        alert("Token Address Copied!");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const images = Array.from(track.children);
    const gallery = document.querySelector('.gallery');
    let currentIndex = 0;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    // Calculate the width each image should move
    function getTranslateX() {
        const imageWidth = images[0].offsetWidth;
        const margin = parseInt(window.getComputedStyle(images[0]).marginRight);
        return -(currentIndex * (imageWidth + (margin * 2)));
    }

    function updateGallery() {
        track.style.transform = `translateX(${getTranslateX()}px)`;
        updateArrowVisibility();
    }

    function updateArrowVisibility() {
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
        
        leftArrow.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        rightArrow.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
    }

    window.nextImage = function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateGallery();
        }
    };

    window.prevImage = function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    };

    // Touch and mouse events for swipe functionality
    function handleDragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = getTranslateX();
        track.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const distance = x - startX;
        track.style.transform = `translateX(${scrollLeft + distance}px)`;
    }

    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease-out';
        
        const x = e.type === 'mouseup' ? e.pageX : e.changedTouches[0].pageX;
        const distance = x - startX;
        
        if (Math.abs(distance) > 100) { // Minimum distance for swipe
            if (distance > 0 && currentIndex > 0) {
                prevImage();
            } else if (distance < 0 && currentIndex < images.length - 1) {
                nextImage();
            } else {
                updateGallery(); // Reset to current position
            }
        } else {
            updateGallery(); // Reset to current position
        }
    }

    // Add event listeners for touch and mouse events
    gallery.addEventListener('mousedown', handleDragStart);
    gallery.addEventListener('touchstart', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    // Handle window resize
    window.addEventListener('resize', updateGallery);

    // Initial setup
    updateGallery();
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the heading element
    const heading = document.querySelector('.how-to-buy');
    
    // Add the pulsing class to start the animation
    heading.classList.add('pulsing');
});

const PUBS = [
            {
                name: "The First Sip 🍺",
                description: "Contract deployed! Time to raise your glass to our journey!",
                locked_text: "Click to start the lucky journey!"
            },
            {
                name: "The Social Hour 🎉",
                description: "1000 holders! The craic is mighty!",
                locked_text: "Building our community..."
            },
            {
                name: "The Lucky Break 🍀",
                description: "First CEX listing! The green candles are flowing!",
                locked_text: "Preparing for takeoff..."
            },
            {
                name: "Diamond Hands Inn 💎",
                description: "5000 holders! WAGMI!",
                locked_text: "HODLing strong..."
            },
            {
                name: "The Green Candle Tavern 📈",
                description: "New ATH! The bulls are charging!",
                locked_text: "Climbing higher..."
            },
            {
                name: "Moonshot Manor 🌙",
                description: "10,000 holders! Look at us go!",
                locked_text: "Almost to the moon..."
            },
            {
                name: "The Golden Pint 🏆",
                description: "Top 100 on CoinGecko! We've made crypto history!",
                locked_text: "The final milestone awaits..."
            }
        ];

        const unlockedPubs = new Set([]);
        const leprechaun = document.querySelector('.leprechaun');
        const pubsContainer = document.getElementById('pubs');

        function createPathDots(startX, startY, endX, endY, duration) {
            const numDots = 10;
            const container = document.querySelector('.pub-container');
            
            for (let i = 0; i < numDots; i++) {
                setTimeout(() => {
                    const dot = document.createElement('div');
                    dot.className = 'path-dot';
                    const progress = i / numDots;
                    dot.style.left = `${startX + (endX - startX) * progress}px`;
                    dot.style.top = `${startY + (endY - startY) * progress}px`;
                    container.appendChild(dot);
                    setTimeout(() => dot.remove(), 1000);
                }, (duration / numDots) * i);
            }
        }

        function createPub(pub, index) {
            const isLast = index === PUBS.length - 1;
            const div = document.createElement('div');
            div.className = `pub ${index > 0 ? 'locked' : ''} ${isLast ? 'final-pub' : ''}`;
            
            div.innerHTML = `
                <div class="milestone-number">Milestone ${index + 1}/${PUBS.length}</div>
                <div class="pub-glass">
                    <div class="beer-liquid"></div>
                    <div class="foam"></div>
                </div>
                <div class="pub-content">
                    <h2 class="pub-name">${pub.name}</h2>
                    <p class="pub-description">
                        ${unlockedPubs.has(index) ? pub.description : pub.locked_text}
                    </p>
                </div>
            `;
            
            div.addEventListener('click', () => unlockPub(index, div));
            return div;
        }

        function unlockPub(index, element) {
            if (index > unlockedPubs.size || unlockedPubs.has(index)) return;

            // Calculate positions for leprechaun movement
            const startPos = leprechaun.getBoundingClientRect();
            const endPos = element.getBoundingClientRect();
            const containerPos = document.querySelector('.pub-container').getBoundingClientRect();

            // Move leprechaun
            leprechaun.classList.add('moving');
            leprechaun.style.left = '20px';
            leprechaun.style.top = `${endPos.top - containerPos.top + 40}px`;

            // Create path effect
            createPathDots(
                startPos.left - containerPos.left,
                startPos.top - containerPos.top,
                20,
                endPos.top - containerPos.top + 40,
                1500
            );
            
            // Unlock pub
            element.classList.remove('locked');
            element.classList.add('unlocked');
            
            // Fill beer
            const beerLiquid = element.querySelector('.beer-liquid');
            const foam = element.querySelector('.foam');
            
            setTimeout(() => {
                beerLiquid.style.height = '90%';
                foam.style.display = 'block';
            }, 500);

            // Update content
            setTimeout(() => {
                leprechaun.classList.remove('moving');
                element.querySelector('.pub-description').textContent = PUBS[index].description;
                unlockedPubs.add(index);

                if (index < PUBS.length - 1) {
                    const nextPub = element.nextElementSibling;
                    if (nextPub) nextPub.classList.remove('locked');
                }

                // Update leprechaun text
                const messages = [
                    "Top o' the mornin'!",
                    "This is the way!",
                    "WAGMI! 🚀",
                    "Diamond hands! 💎",
                    "Bullish! 📈",
                    "Moon soon! 🌙",
                    "We made it! 🎉"
                ];
                leprechaun.querySelector('.leprechaun-text').textContent = messages[index];

                // Check completion
                if (unlockedPubs.size === PUBS.length) {
                    document.getElementById('completionMessage').style.display = 'block';
                    leprechaun.querySelector('.leprechaun-text').textContent = "To the moon! 🚀";
                }
            }, 1500);
        }

        // Initialize pubs
        PUBS.forEach((pub, index) => {
            pubsContainer.appendChild(createPub(pub, index));
        });

        // Position leprechaun at start
        setTimeout(() => {
            leprechaun.style.left = '-80px';
            leprechaun.style.top = '100px';
        }, 100);
