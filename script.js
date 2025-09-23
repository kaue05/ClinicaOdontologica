// Menu Toggle para dispositivos móveis
function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Scroll suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Adicionar event listeners para links de navegação
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav a, .footer-section a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);

                // Fechar menu mobile se estiver aberto
                const nav = document.querySelector('.nav');
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });
});

// Função para envio do formulário
function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Validação básica
    if (!data.nome || !data.email || !data.telefone || !data.servico) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Simular envio do formulário
    try {
        // Aqui você integraria com um serviço de email ou backend
        console.log('Dados do formulário:', data);

        // Salvar no localStorage como backup
        const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));

        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        event.target.reset();

    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        logError('Erro no envio do formulário', error);
        alert('Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.');
    }
}

// Função para log de erros
function logError(message, error) {
    const errorLog = {
        timestamp: new Date().toISOString(),
        message: message,
        error: error.toString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };

    // Salvar erro no localStorage
    const errors = JSON.parse(localStorage.getItem('errorLog') || '[]');
    errors.push(errorLog);
    localStorage.setItem('errorLog', JSON.stringify(errors));

    console.error('Erro registrado:', errorLog);
}

// Animação de scroll para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .contact-item, .stat');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Inicializar animações quando a página carregar
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Função para destacar link ativo na navegação
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Inicializar destaque do link ativo
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Função para mostrar/ocultar botão de voltar ao topo
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botão de voltar ao topo
document.addEventListener('DOMContentLoaded', initBackToTop);