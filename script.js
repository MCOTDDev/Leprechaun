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
            const slides = Array.from(track.children);
            const nextButton = document.querySelector('.next');
            const prevButton = document.querySelector('.prev');
            const dotsContainer = document.querySelector('.gallery-dots');

            let currentIndex = 0;
            let startPos = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            let isDragging = false;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            function updateDots() {
                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            function goToSlide(index) {
                currentIndex = index;
                currentTranslate = -100 * currentIndex;
                prevTranslate = currentTranslate;
                setSliderPosition();
                updateDots();
            }

            function setSliderPosition() {
                track.style.transform = `translateX(${currentTranslate}%)`;
            }

            // Navigation buttons
            nextButton.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0); // Loop back to first slide
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(slides.length - 1); // Loop to last slide
                }
            });

            // Touch events
            track.addEventListener('touchstart', touchStart);
            track.addEventListener('touchmove', touchMove);
            track.addEventListener('touchend', touchEnd);

            // Mouse events
            track.addEventListener('mousedown', touchStart);
            track.addEventListener('mousemove', touchMove);
            track.addEventListener('mouseup', touchEnd);
            track.addEventListener('mouseleave', touchEnd);

            function touchStart(event) {
                startPos = getPositionX(event);
                isDragging = true;
                track.style.cursor = 'grabbing';
            }

            function touchMove(event) {
                if (isDragging) {
                    const currentPosition = getPositionX(event);
                    const diff = startPos - currentPosition;
                    const move = (diff / track.offsetWidth) * 100;
                    currentTranslate = prevTranslate - move;
                    
                    // Add resistance at the edges
                    if (currentTranslate > 0) {
                        currentTranslate = currentTranslate / 3;
                    } else if (currentTranslate < -100 * (slides.length - 1)) {
                        const overflow = currentTranslate + 100 * (slides.length - 1);
                        currentTranslate = -100 * (slides.length - 1) + overflow / 3;
                    }
                    
                    setSliderPosition();
                }
            }

            function touchEnd() {
                isDragging = false;
                track.style.cursor = 'grab';
                
                const movedBy = currentTranslate - prevTranslate;
                
                // If moved enough, switch to next/prev slide
                if (Math.abs(movedBy) > 20) {
                    if (movedBy < 0) {
                        currentIndex = Math.min(currentIndex + 1, slides.length - 1);
                    } else {
                        currentIndex = Math.max(currentIndex - 1, 0);
                    }
                }
                
                currentTranslate = -100 * currentIndex;
                prevTranslate = currentTranslate;
                
                setSliderPosition();
                updateDots();
            }

            function getPositionX(event) {
                return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            }

            // Auto-play functionality
            let autoplayInterval;

            function startAutoplay() {
                autoplayInterval = setInterval(() => {
                    if (currentIndex < slides.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(0);
                    }
                }, 3000); // Change slide every 5 seconds
            }

            function stopAutoplay() {
                clearInterval(autoplayInterval);
            }

            // Start autoplay initially
            startAutoplay();

            // Stop autoplay on user interaction
            track.addEventListener('mouseenter', stopAutoplay);
            track.addEventListener('mouseleave', startAutoplay);
            track.addEventListener('touchstart', stopAutoplay);
            track.addEventListener('touchend', startAutoplay);
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
