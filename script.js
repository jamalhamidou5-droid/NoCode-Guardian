document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(11, 15, 25, 0.9)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(11, 15, 25, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    // Demo Scanner Logic
    const btnScan = document.getElementById('btn-scan');
    const resultsContainer = document.getElementById('scanner-results');

    if (btnScan && resultsContainer) {
        btnScan.addEventListener('click', () => {
            btnScan.disabled = true;
            btnScan.textContent = 'Analyse en cours...';
            resultsContainer.innerHTML = '';
            
            const logs = [
                { type: 'info', msg: 'Connexion à Airtable établie (Base: CRM_Clients)...', delay: 500 },
                { type: 'info', msg: 'Analyse de 2,481 enregistrements...', delay: 1500 },
                { type: 'error', msg: '🔴 43 doublons détectés (ex: Record #842, #911)', delay: 2500 },
                { type: 'warning', msg: '🟠 21 emails invalides (ex: "jean@gmail" -> sans .com)', delay: 3500 },
                { type: 'warning', msg: '🟠 87 numéros de téléphone mal formatés', delay: 4500 },
                { type: 'success', msg: '✅ Score de qualité estimé: 72/100', delay: 5500 },
                { type: 'info', msg: 'Génération du rapport et préparation de l\'auto-fix...', delay: 6500 }
            ];

            let cumulativeDelay = 0;

            logs.forEach((log) => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `scan-line ${log.type}`;
                    line.innerHTML = `<span>${log.msg}</span> <span>[${new Date().toLocaleTimeString()}]</span>`;
                    resultsContainer.appendChild(line);
                }, log.delay);
                cumulativeDelay = Math.max(cumulativeDelay, log.delay);
            });

            setTimeout(() => {
                btnScan.textContent = 'Relancer le Scan';
                btnScan.disabled = false;
            }, cumulativeDelay + 1000);
        });
    }

    // Animate compare cards, steps, pricing cards on scroll
    const animatedElements = document.querySelectorAll('.compare-card, .step, .pricing-card, .scanner-container, .cta-content');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // Beta form handler
    const betaForm = document.getElementById('beta-form');
    if (betaForm) {
        betaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = betaForm.querySelector('.input-email');
            const email = emailInput.value;
            
            if (email) {
                betaForm.innerHTML = `
                    <div style="padding: 1rem; color: #6ee7b7; font-size: 1.1rem;">
                        ✅ Merci ! <strong>${email}</strong> a été ajouté à la liste bêta.<br>
                        <span style="font-size: 0.9rem; color: var(--text-muted);">Nous vous contacterons très bientôt.</span>
                    </div>
                `;
            }
        });
    }
});
