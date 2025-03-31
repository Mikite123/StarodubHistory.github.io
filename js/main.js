// Инициализация элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Активация всплывающих подсказок Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Инициализация каруселей
    const carousels = [].slice.call(document.querySelectorAll('.carousel'));
    carousels.forEach(function(carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover'
        });
    });
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                if(history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Фиксированная навигация при скролле
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

// Анимации при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    if(animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback для браузеров без поддержки IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
}

// Обработчик для кнопок "Показать на карте"
document.addEventListener('DOMContentLoaded', function() {
    const showOnMapButtons = document.querySelectorAll('.show-on-map');
    
    showOnMapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            
            // Здесь будет код для отображения маркера на карте
            // В реальном проекте нужно передать эти координаты в map.js
            console.log(`Показать на карте: ${lat}, ${lng}`);
            
            // Если мы на странице карты, можно вызвать функцию из map.js
            if(typeof showMarkerOnMap === 'function') {
                showMarkerOnMap(lat, lng);
            } else {
                // Иначе переходим на страницу карты с параметрами
                window.location.href = `map.html?lat=${lat}&lng=${lng}`;
            }
        });
    });
});