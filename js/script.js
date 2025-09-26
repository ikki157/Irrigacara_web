document.addEventListener('DOMContentLoaded', () => {

    // --- MENU MOBILE HAMBÚRGUER ---
    createMobileMenu();

    // --- ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // O elemento é considerado visível quando 10% dele estiver na tela
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- TRANSIÇÃO DE COR DE FUNDO AO ROLAR A PÁGINA ---
    const sections = document.querySelectorAll('.section');
    const body = document.body;

    // Objeto para garantir que a cor só mude uma vez por seção
    let currentSectionColor = ''; 

    window.addEventListener('scroll', () => {
        let sectionInView = false;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Verifica se o meio da seção está na metade superior da tela
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                const newColor = section.getAttribute('data-bg-color');
                if (newColor && newColor !== currentSectionColor) {
                    body.style.backgroundColor = newColor;
                    currentSectionColor = newColor;
                }
                sectionInView = true;
            }
        });

        // Se nenhuma seção estiver em foco (ex: no topo antes da primeira seção)
        if (!sectionInView && window.scrollY < 200) {
             const heroColor = document.getElementById('hero').getAttribute('data-bg-color');
             if(heroColor !== currentSectionColor) {
                body.style.backgroundColor = heroColor;
                currentSectionColor = heroColor;
             }
        }
    });

    // --- OTIMIZAÇÕES PARA DISPOSITIVOS MÓVEIS ---
    optimizeForMobile();

});

// --- FUNÇÃO PARA CRIAR MENU MOBILE ---
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const nav = document.querySelector('.navbar nav');
    
    // Criar botão hambúrguer
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Menu');
    
    // Adicionar o botão antes do nav
    navbar.insertBefore(hamburger, nav);
    
    // Toggle do menu mobile
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        hamburger.classList.toggle('active');
        
        // Prevenir scroll quando menu aberto
        if (nav.classList.contains('nav-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao clicar em link
    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// --- OTIMIZAÇÕES PARA MOBILE ---
function optimizeForMobile() {
    // Melhorar performance do scroll em mobile
    let ticking = false;
    
    function updateScroll() {
        // Lógica de scroll existente
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    // Detectar dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Melhorar interações touch nos botões
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
            }, { passive: true });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // Adicionar animações suaves aos ícones de contato
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        
        item.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}