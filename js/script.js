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

    // --- FUNCIONALIDADES DOS CONTATOS E FORMULÁRIO ---
    setupContactInteractions();
    setupContactForm();

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
        document.body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
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

// --- FUNÇÃO PARA ANIMAÇÕES DOS CONTATOS ---
function setupContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// --- FUNÇÃO PARA O FORMULÁRIO DE CONTATO ---
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const formData = new FormData(this);
            const dados = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                assunto: formData.get('assunto'),
                mensagem: formData.get('mensagem')
            };
            
            // Feedback visual
            const button = this.querySelector('button');
            const originalText = button.textContent;
            const originalBackground = button.style.background;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            // Simular envio (aqui você integraria com seu backend)
            setTimeout(() => {
                button.textContent = 'Mensagem Enviada!';
                button.style.background = '#4CAF50';
                
                // Limpar formulário
                this.reset();
                
                // Resetar botão após 3 segundos
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = originalBackground;
                }, 3000);
                
                // Mostrar mensagem de sucesso
                console.log('Dados da mensagem:', dados);
                
                // Criar notificação personalizada
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
            }, 1500);
        });
    }
}

// --- FUNÇÃO PARA MOSTRAR NOTIFICAÇÕES ---
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: var(--font-body);
        font-size: 14px;
        max-width: 300px;
        transform: translateX(350px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(350px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}