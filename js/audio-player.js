// Аудиоплеер для прослушивания народных песен
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.querySelector('.audio-player');
    if(!audioPlayer) return;
    
    const audio = audioPlayer.querySelector('audio');
    const playBtn = audioPlayer.querySelector('.play-btn');
    const progressBar = audioPlayer.querySelector('.progress-bar');
    const timeDisplay = audioPlayer.querySelector('.time-display');
    const currentTimeElement = timeDisplay.querySelector('.current-time');
    const durationElement = timeDisplay.querySelector('.duration');
    
    let isPlaying = false;
    
    // Обновляем время продолжительности при загрузке метаданных
    audio.addEventListener('loadedmetadata', function() {
        durationElement.textContent = formatTime(audio.duration);
    });
    
    // Обработчик клика по кнопке воспроизведения
    playBtn.addEventListener('click', function() {
        if(isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Обновление прогресса воспроизведения
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeElement.textContent = formatTime(audio.currentTime);
    });
    
    // Перемотка при клике на прогресс-бар
    audioPlayer.querySelector('.progress-bar-container').addEventListener('click', function(e) {
        const clickPosition = e.clientX - this.getBoundingClientRect().left;
        const containerWidth = this.clientWidth;
        const seekTime = (clickPosition / containerWidth) * audio.duration;
        audio.currentTime = seekTime;
    });
    
    // Сброс состояния при завершении воспроизведения
    audio.addEventListener('ended', function() {
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        isPlaying = false;
    });
    
    // Форматирование времени в минуты:секунды
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});