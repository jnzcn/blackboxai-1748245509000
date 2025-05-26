document.addEventListener('DOMContentLoaded', () => {
    // Loading screen animation
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);

    // Initialize skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.textContent.match(/\d+/)[0] + '%';
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Smooth scrolling for sections
    let isScrolling = false;
    let currentSection = 0;
    const sections = document.querySelectorAll('.section');

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            currentSection = index;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            scrollToSection(currentSection - 1);
        }
    });

    // Mouse wheel navigation
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                scrollToSection(currentSection + 1);
            } else {
                scrollToSection(currentSection - 1);
            }
        }, 50);
    }, { passive: true });

    // Language switch functionality
    const languageButtons = document.querySelectorAll('.language-switch button');
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Add translation logic here if needed
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Update current section on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY;
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop - sectionHeight / 3) {
                    currentSection = index;
                }
            });
        }, 100);
    });

    // Hide scroll instruction after first scroll
    let hasScrolled = false;
    const scrollInstruction = document.querySelector('.scroll-instruction');
    window.addEventListener('scroll', () => {
        if (!hasScrolled) {
            hasScrolled = true;
            scrollInstruction.style.opacity = '0';
            setTimeout(() => {
                scrollInstruction.style.display = 'none';
            }, 500);
        }
    }, { once: true });
});
