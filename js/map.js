// Инициализация карты
let map;
let markers = [];
let routes = {};
let currentRoute = null;

function initMap() {
    // Центр карты на Стародубе
    map = L.map('map').setView([52.5851, 32.7603], 14);
    
    // Добавляем слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Добавляем маркеры достопримечательностей
    addLandmarks();
    
    // Добавляем обработчики для кнопок маршрутов
    document.querySelectorAll('.show-route').forEach(btn => {
        btn.addEventListener('click', function() {
            const routeId = this.getAttribute('data-route');
            showRoute(routeId);
        });
    });
    
    // Добавляем поиск
    document.getElementById('search-btn').addEventListener('click', searchLandmarks);
    document.getElementById('landmark-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchLandmarks();
    });
}

function addLandmarks() {
    const landmarks = [
        {
            id: 1,
            title: 'Собор Рождества Христова',
            description: 'Построен в конце XVII века, являлся полковым храмом Стародубского полка.',
            lat: 52.583000, 
            lng: 32.760906,
            address: 'ул. Первомайская, д. 11',
            category: 'Архитектура',
            icon: 'building'
        },
        {
            id: 2,
            title: 'Никольская церковь',
            description: 'Построена в 1802 году в классическом стиле.',
            lat: 52.582136,
            lng: 32.762588,
            address: 'ул. Евсеевская, 23',
            category: 'Архитектура',
            icon: 'building'
        },
        {
            id: 3,
            title: 'Памятник А.И. Рубцу',
            description: 'Композитору и собирателю русских народных песен.',
            lat: 52.584147,
            lng: 32.768228,
            address: 'ул. Калинина, 13',
            category: 'Культура',
            icon: 'person'
        },
        {
            id: 4,
            title: 'Памятник И.Г. Щегловитову',
            description: 'Генерал-прокурору Российской Империи.',
            lat: 52.584998,
            lng: 32.760976,
            address: 'Советская площадь',
            category: 'История',
            icon: 'person'
        },
        {
            id: 5,
            title: 'Парк 40-летия Победы',
            description: 'Памятники десантникам, пограничникам и воинам-землякам.',
            lat: 52.586129,
            lng: 32.759181,
            address: 'ул. Свердлова, 8',
            category: 'Мемориал',
            icon: 'tree'
        },
        {
            id: 6,
            title: 'Сквер 348 дивизии',
            description: 'Памятник ИС-2 и "Стена памяти" погибшим в ВОВ.',
            lat: 52.584832,
            lng: 32.762625,
            address: 'ул. Калинина, 3',
            category: 'Мемориал',
            icon: 'flag'
        },
        {
            id: 7,
            title: 'Церковь Богоявления',
            description: 'Построена в 1789 году в стиле украинского барокко.',
            lat: 52.576034,
            lng: 32.767453,
            address: 'ул. Фрунзе, 63',
            category: 'Архитектура',
            icon: 'building'
        },
        {
            id: 8,
            title: 'Тюремный замок',
            description: 'Построен в начале XIX века по проекту Адриана Захарова.',
            lat: 52.580571,
            lng: 32.762502,
            address: 'ул. Евсеевская',
            category: 'Архитектура',
            icon: 'building'
        }
    ];
    
    // Определяем маршруты
    routes = {
        historic: {
            name: 'Исторический центр',
            waypoints: [
                [52.583000, 32.760906], // Собор
                [52.582136, 32.762588], // Никольская церковь
                [52.584998, 32.760976], // Памятник Щегловитову
                [52.580571, 32.762502], // Тюремный замок
                [52.576034, 32.767453]  // Церковь Богоявления
            ],
            color: '#3a5a78'
        },
        memorial: {
            name: 'Памятные места',
            waypoints: [
                [52.586129, 32.759181], // Парк Победы
                [52.584832, 32.762625], // Сквер 348 дивизии
                [52.584147, 32.768228]  // Памятник Рубцу
            ],
            color: '#d4a762'
        }
    };
    
    // Создаем маркеры для каждой достопримечательности
    landmarks.forEach(landmark => {
        const marker = L.marker([landmark.lat, landmark.lng], {
            icon: L.divIcon({
                className: 'custom-marker',
                html: `<div class="marker-icon"><i class="bi bi-${landmark.icon}"></i></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            })
        }).addTo(map);
        
        // Всплывающее окно с информацией
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${landmark.title}</h3>
                <p>${landmark.description}</p>
                <p class="address"><i class="bi bi-geo-alt"></i> ${landmark.address}</p>
                <button class="btn btn-sm btn-outline-primary mt-2 center-marker" 
                    data-lat="${landmark.lat}" data-lng="${landmark.lng}">
                    Центрировать на карте
                </button>
            </div>
        `);
        
        // Сохраняем маркер для дальнейшего использования
        markers.push({
            id: landmark.id,
            marker: marker,
            data: landmark
        });
        
        // Обработчик клика по элементу в сайдбаре
        document.querySelectorAll(`.landmark-item[data-id="${landmark.id}"]`).forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                marker.openPopup();
                map.setView([landmark.lat, landmark.lng], 16);
            });
        });
    });
    
    // Обработчик для кнопок в popup
    map.on('popupopen', function(e) {
        const popup = e.popup;
        popup.getElement().querySelector('.center-marker').addEventListener('click', function() {
            const lat = this.getAttribute('data-lat');
            const lng = this.getAttribute('data-lng');
            map.setView([lat, lng], 16);
        });
    });
}

function showRoute(routeId) {
    // Удаляем предыдущий маршрут
    if (currentRoute) {
        map.removeControl(currentRoute);
        currentRoute = null;
    }
    
    const route = routes[routeId];
    if (!route) return;
    
    // Создаем новый маршрут
    currentRoute = L.Routing.control({
        waypoints: route.waypoints.map(wp => L.latLng(wp[0], wp[1])),
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        lineOptions: {
            styles: [{color: route.color, opacity: 0.7, weight: 5}]
        },
        createMarker: function(i, wp) {
            return L.marker(wp.latLng, {
                icon: L.divIcon({
                    className: 'route-marker',
                    html: `<div class="route-marker-icon">${i+1}</div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 24]
                })
            });
        }
    }).addTo(map);
    
    // Центрируем карту по маршруту
    const bounds = new L.LatLngBounds(route.waypoints);
    map.fitBounds(bounds, {padding: [50, 50]});
}

function searchLandmarks() {
    const query = document.getElementById('landmark-search').value.toLowerCase();
    if (!query) return;
    
    // Ищем совпадения
    const found = markers.filter(m => 
        m.data.title.toLowerCase().includes(query) || 
        m.data.description.toLowerCase().includes(query) ||
        m.data.address.toLowerCase().includes(query)
    );
    
    if (found.length > 0) {
        // Центрируем карту на первом найденном результате
        const first = found[0];
        map.setView([first.data.lat, first.data.lng], 16);
        first.marker.openPopup();
        
        // Подсвечиваем все найденные маркеры
        markers.forEach(m => {
            if (found.includes(m)) {
                m.marker.getElement().classList.add('highlight-marker');
            } else {
                m.marker.getElement().classList.remove('highlight-marker');
            }
        });
    } else {
        alert('Ничего не найдено');
    }
}

// Инициализация карты после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        initMap();
        
        // Обработка параметров URL (если есть координаты для выделения маркера)
        const urlParams = new URLSearchParams(window.location.search);
        const lat = urlParams.get('lat');
        const lng = urlParams.get('lng');
        
        if (lat && lng) {
            map.setView([lat, lng], 16);
            const marker = markers.find(m => 
                m.data.lat === parseFloat(lat) && 
                m.data.lng === parseFloat(lng)
            );
            if (marker) marker.marker.openPopup();
        }
    }
});