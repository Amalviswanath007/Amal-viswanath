/* 
==============================================
   Main JavaScript
==============================================
*/

// --- Preloader Cache Check ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggle (Mobile) ---
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Toggle icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    
    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
    
    window.addEventListener('scroll', scrollHeader);

    // --- Scroll Top Button ---
    const scrollTop = document.getElementById('scroll-top');
    
    function showScrollTop() {
        if (window.scrollY >= 500) {
            scrollTop.classList.add('show-scroll');
        } else {
            scrollTop.classList.remove('show-scroll');
        }
    }
    
    window.addEventListener('scroll', showScrollTop);

    // --- Active Link on Scroll Section ---
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjust for header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-list a[href*=' + sectionId + ']');

            if(navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const appearOptions = {
        threshold: 0.1, // Trigger slightly earlier
        rootMargin: "0px 0px -100px 0px" // Trigger when element is 100px above bottom of viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('appear');
            } else {
                entry.target.classList.add('appear');
            }
        });
    }, appearOptions);

    animatedElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            
            // Construct email subject and body
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Details:\n${project}`);
            
            // Open user's default email client
            window.location.href = `mailto:amalvnath5878@gmail.com?subject=${subject}&body=${body}`;
            
            // Optional: Show a brief success message
            const formMessage = document.getElementById('form-message');
            if (formMessage) {
                formMessage.textContent = 'Opening your email client...';
                formMessage.style.color = 'var(--primary-color)';
                setTimeout(() => { formMessage.textContent = ''; }, 3000);
            }
        });
    }

});
