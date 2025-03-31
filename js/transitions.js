// Плавные переходы между страницами
document.addEventListener('DOMContentLoaded', function() {
    const pageTransition = document.querySelector('.page-transition');
    
    // Прячем переход после загрузки страницы
    if(pageTransition) {
        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 500);
    }
    
    // Обработка кликов по ссылкам
    document.querySelectorAll('a').forEach(link => {
        // Исключаем ссылки с определенными классами или атрибутами
        if(link.classList.contains('no-transition') || 
        link.getAttribute('target') === '_blank' || 
        link.href.includes('mailto:') || 
        link.href.includes('tel:')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            // Проверяем, ведет ли ссылка на другую страницу нашего сайта
            if(this.href && 
            !this.href.includes('#') && 
            this.href.indexOf(window.location.hostname) !== -1 && 
            this.href !== window.location.href) {
                
                e.preventDefault();
                const destination = this.href;
                
                // Активируем переход
                if(pageTransition) {
                    pageTransition.classList.add('active');
                    
                    // Задержка перед переходом
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 500);
                } else {
                    window.location.href = destination;
                }
            }
        });
    });
    
    // Обработка навигации через кнопки браузера
    window.addEventListener('pageshow', function(event) {
        if(event.persisted && pageTransition) {
            pageTransition.classList.remove('active');
        }
    });
});