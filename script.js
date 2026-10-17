document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. Typewriter Effect in Hero Section
    ========================================== */
    const roles = [
        "curious software developer.",
        "full-stack web explorer.",
        "UI & visual design enthusiast.",
        "collaborative student builder."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById("typewriter");

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 85;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1800; // Pause at full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();


    /* ==========================================
       2. Interactive Gold Particle Background
    ========================================== */
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        const cursorGlow = document.getElementById("cursor-glow");
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.45;
            this.speedY = (Math.random() - 0.5) * 0.45;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(197, 155, 39, 0.45)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 25 : 55;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles with subtle gold lines
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 130) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.18 - distance / 800})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    /* ==========================================
       3. Scroll-Reveal Intersection Observer
    ========================================== */
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach((el) => revealObserver.observe(el));


    /* ==========================================
       4. 3D Mouse Tilt Effect on Glass Cards
    ========================================== */
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });


    /* ==========================================
       5. Interactive Tech Stack Filtering
    ========================================== */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const skillItems = document.querySelectorAll(".skill-item");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            skillItems.forEach((item) => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.classList.remove("d-none");
                } else {
                    item.classList.add("d-none");
                }
            });
        });
    });


    /* ==========================================
       6. Interactive Contact Form Feedback
    ========================================== */
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const message = document.getElementById("messageInput").value.trim();

        formFeedback.classList.remove("d-none", "alert-success", "alert-warning");

        if (!name || !email || !message) {
            formFeedback.classList.add("alert-warning");
            formFeedback.textContent = "Please fill in all fields before sending.";
            return;
        }

        formFeedback.classList.add("alert-success");
        formFeedback.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Thank you, <strong>${name}</strong>! Your message has been recorded.`;
        contactForm.reset();
    });
});