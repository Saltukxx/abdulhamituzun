// Eksik görsel dosyaları için placeholder yönetimi
document.addEventListener('DOMContentLoaded', function() {
    // Tüm resim elementlerini seç
    const images = document.querySelectorAll('img');
    
    // Her bir resim için yükleme hatası dinleyicisi ekle
    images.forEach(img => {
        img.onerror = function() {
            // Resim yüklenemezse placeholder göster
            this.src = 'https://via.placeholder.com/800x600/e6e6e6/1d3557?text=Resim+Yakında';
            this.alt = 'Placeholder görsel';
        };
    });
    
    // Hero arka plan resmi
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Hero arka plan resmi kontrol et
        const img = new Image();
        img.onload = function() {
            // Resim yüklendiyse normal arka planı kullan
        };
        img.onerror = function() {
            // Resim yüklenemezse gradyan arka plan kullan
            heroSection.style.background = 'linear-gradient(135deg, #1d3557 0%, #e63946 100%)';
        };
        // Hero arka plan resmi kaynağını kontrol et
        img.src = 'hero-bg.jpg';
    }
}); 