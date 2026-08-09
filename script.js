document.addEventListener('DOMContentLoaded', () => {
    // Animate progress bar on load
    setTimeout(() => {
        const progressBar = document.getElementById('streak-progress');
        if (progressBar) {
            progressBar.style.width = '20%';
        }
    }, 500);

    // Subtle 3D tilt effect for the card on desktop
    const visualContainer = document.querySelector('.hero-visual');
    const card = document.querySelector('.glass-card');
    
    if (visualContainer && card && window.innerWidth >= 1024) {
        visualContainer.addEventListener('mousemove', (e) => {
            const rect = visualContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            // Max rotation is 10 degrees
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        visualContainer.addEventListener('mouseleave', () => {
            // Reset to initial slight tilt when mouse leaves
            card.style.transform = `rotateX(2deg) rotateY(-8deg)`;
        });
    }

    // High-performance Staggered Rotating Text (Vanilla Port of React Code)
    class RotatingText {
        constructor(element, texts, interval = 3500) {
            this.element = element;
            this.texts = texts;
            this.interval = interval;
            this.currentIndex = 0;
            
            this.element.style.position = 'relative';
            this.element.style.display = 'inline-flex';
            this.element.style.alignItems = 'center';
            this.element.style.verticalAlign = 'top';
            
            this.animate();
            setInterval(() => this.animate(), this.interval);
        }

        animate() {
            const text = this.texts[this.currentIndex];
            
            const newContainer = document.createElement('span');
            newContainer.style.display = 'inline-flex';
            newContainer.style.whiteSpace = 'pre-wrap';
            
            // Split characters and set incremental delay
            const words = text.split(' ');
            let charIndex = 0;
            words.forEach((word, wIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-flex';
                
                const chars = Array.from(word);
                chars.forEach((char) => {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = char;
                    charSpan.className = 'rt-char';
                    charSpan.style.transitionDelay = `${charIndex * 0.03}s`;
                    charIndex++;
                    wordSpan.appendChild(charSpan);
                });
                
                newContainer.appendChild(wordSpan);
                if (wIndex < words.length - 1) {
                    const space = document.createElement('span');
                    space.innerHTML = '&nbsp;';
                    newContainer.appendChild(space);
                }
            });

            this.element.appendChild(newContainer);

            // Handle old text container
            const children = Array.from(this.element.children);
            children.forEach(child => {
                if (child !== newContainer) {
                    child.style.position = 'absolute';
                    child.style.left = '0';
                    child.style.top = '0';
                    const oldChars = child.querySelectorAll('.rt-char');
                    oldChars.forEach((c, i) => {
                        c.style.transitionDelay = `${i * 0.03}s`;
                        c.classList.remove('in');
                        c.classList.add('out');
                    });
                    setTimeout(() => {
                        if (this.element.contains(child)) {
                            this.element.removeChild(child);
                        }
                    }, 1500); 
                }
            });

            // Force reflow for new characters
            void newContainer.offsetWidth;

            // Animate new characters in
            const newChars = newContainer.querySelectorAll('.rt-char');
            newChars.forEach(c => c.classList.add('in'));

            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        }
    }

    const decodeEl = document.getElementById('rotate-decode');
    if (decodeEl) {
        new RotatingText(decodeEl, ["Decoding AI.", "Building Apps.", "Writing Code."], 4000);
    }
    
    const futureEl = document.getElementById('rotate-future');
    if (futureEl) {
        new RotatingText(futureEl, ["Shaping The Future.", "Defining Careers.", "Inspiring Leaders."], 4000);
    }

    // Video Loader Logic
    const loader = document.getElementById('video-loader');
    const loaderVideo = document.getElementById('loader-video');
    
    if (loader) {
        const fadeLoader = () => {
            if (!loader.classList.contains('fade-out')) {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 800);
            }
        };

        // Fade out after 4 seconds max
        const loaderTimeout = setTimeout(fadeLoader, 4000);

        // Fade out early if video ends before 4 seconds
        if (loaderVideo) {
            loaderVideo.addEventListener('ended', () => {
                clearTimeout(loaderTimeout);
                fadeLoader();
            });
        }
    }

    // Modal Interaction JS
    const regModal = document.getElementById('regModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const heroOpenModalBtn = document.getElementById('heroOpenModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const successCloseBtn = document.getElementById('successCloseBtn');
    const regForm = document.getElementById('regForm');
    const modalSuccess = document.getElementById('modalSuccess');

    // Restore login button text on load if registered
    const registeredUser = localStorage.getItem('registeredUser');
    if (registeredUser) {
        if (openModalBtn) {
            openModalBtn.textContent = `Hey, ${registeredUser.trim().split(' ')[0]}`;
        }
    }

    // Auto-trigger registration modal if redirected from dashboard due to missing auth
    if (localStorage.getItem('promptRegister') === 'true') {
        localStorage.removeItem('promptRegister');
        setTimeout(() => {
            openModal();
        }, 800); // Trigger after page fade
    }

    function openModal() {
        const registered = localStorage.getItem('registeredUser');
        if (registered) {
            window.location.href = 'dashboard.html';
            return;
        }
        if (regModal) {
            regModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    const closeModal = () => {
        if (regModal) {
            regModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (regForm && modalSuccess) {
                    regForm.style.display = 'block';
                    modalSuccess.style.display = 'none';
                    regForm.reset();
                }
            }, 400);
        }
    };

    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            const registered = localStorage.getItem('registeredUser');
            if (registered) {
                window.location.href = 'dashboard.html';
            } else {
                openModal();
            }
        });
    }

    if (heroOpenModalBtn) {
        heroOpenModalBtn.addEventListener('click', (e) => {
            const registered = localStorage.getItem('registeredUser');
            if (registered) {
                window.location.href = 'dashboard.html';
            } else {
                openModal();
            }
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            closeModal();
            window.location.href = 'dashboard.html';
        });
    }

    if (regModal) {
        regModal.addEventListener('click', (e) => {
            if (e.target === regModal) {
                closeModal();
            }
        });
    }

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('formName').value;
            const dobVal = document.getElementById('formDob').value;
            const emailVal = document.getElementById('formEmail').value;
            const cityVal = document.getElementById('formCity').value;
            
            // Save registration state to localStorage
            localStorage.setItem('registeredUser', nameVal);
            localStorage.setItem('userDob', dobVal);
            localStorage.setItem('userEmail', emailVal);
            localStorage.setItem('userCity', cityVal);

            regForm.style.display = 'none';
            if (openModalBtn) {
                openModalBtn.textContent = `Hey, ${nameVal.trim().split(' ')[0]}`;
            }
            if (modalSuccess) {
                modalSuccess.style.display = 'flex';
                document.getElementById('successTitle').textContent = `You're in, ${nameVal.split(' ')[0]}!`;
                document.getElementById('successMessage').innerHTML = `Your registration is complete. We've sent details to <strong style="color: #ffffff;">${emailVal}</strong>.`;
            }
        });
    }
});
