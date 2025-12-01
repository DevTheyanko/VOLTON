// Simple animation on scroll y control de menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.mobile-menu a, .nav-links a');
    
    // Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.visibility = 'hidden';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Control del menú móvil mejorado
    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        function openMobileMenu() {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Previene scroll en body
            
            // Asegurarse de que el menú tenga la altura correcta
            setTimeout(adjustMobileMenuPosition, 10);
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Restaura scroll en body
        }
        
        // Abrir menú
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Cerrar menú con overlay
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Para enlaces que son botones
                if (this.tagName === 'BUTTON') return;
                
                // Solo procesar si es un enlace interno
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    closeMobileMenu();
                    
                    // Smooth scrolling para anchor links
                    e.preventDefault();
                    const target = document.querySelector(targetId);
                    if (target) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: target.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }, 300); // Pequeño delay para que se cierre el menú primero
                    }
                } else {
                    closeMobileMenu();
                }
            });
        });
        
        // Cerrar menú con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Smooth scrolling para anchor links (para escritorio)
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ajustar altura del hero para compensar el header fijo
    function adjustHeroPadding() {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero');
        if (header && hero) {
            const headerHeight = header.offsetHeight;
            hero.style.paddingTop = (headerHeight + 80) + 'px';
        }
    }
    
    // Ajustar posición y altura del menú móvil
    function adjustMobileMenuPosition() {
        const header = document.querySelector('header');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (header && mobileMenu) {
            const headerHeight = header.offsetHeight;
            mobileMenu.style.top = headerHeight + 'px';
            
            // Calcular la altura máxima disponible
            const viewportHeight = window.innerHeight;
            const maxMenuHeight = viewportHeight - headerHeight;
            mobileMenu.style.maxHeight = maxMenuHeight + 'px';
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    adjustHeroPadding();
    adjustMobileMenuPosition();
    window.addEventListener('resize', function() {
        adjustHeroPadding();
        adjustMobileMenuPosition();
    });
});