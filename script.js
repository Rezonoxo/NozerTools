document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update icon
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Dispatch custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    });

    // Category filtering functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter projects by category
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = card.dataset.category === category ? 'block' : 'none';
            }
        });
    }
    
    // Set up category filter click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const category = this.dataset.category;
            filterProjects(category);
            
            // Save last category to localStorage
            localStorage.setItem('lastCategory', category);
        });
    });
    
    // Apply last used category filter if available
    const lastCategory = localStorage.getItem('lastCategory');
    if (lastCategory) {
        const lastActiveLink = document.querySelector(`.nav-link[data-category="${lastCategory}"]`);
        if (lastActiveLink) {
            lastActiveLink.click();
        }
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        projectCards.forEach(card => {
            if (card.style.display === 'none') return;
            
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = card.querySelector('.tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Card click effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicked on a link inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Get mouse position relative to card
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position the ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Navigate if card has onclick attribute
            if (this.onclick) {
                setTimeout(() => {
                    this.onclick();
                }, 300);
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });

    // Responsive menu toggle for mobile (optional)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    document.querySelector('.main-nav').prepend(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('.main-nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.main-nav');
        if (!nav.contains(e.target) && window.innerWidth <= 768) {
            document.querySelector('.main-nav ul').style.display = 'none';
        }
    });

    // Handle window resize
    function handleResize() {
        const nav = document.querySelector('.main-nav ul');
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
});

// Add ripple effect styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
    }
    
    @keyframes ripple {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
    
    .dark-mode .ripple-effect {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(rippleStyle);