const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => { navMenu.classList.toggle('active'); });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => { navMenu.classList.remove('active'); });
        });
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) { alert('Please fill in all fields'); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { alert('Please enter a valid email address'); return; }
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }