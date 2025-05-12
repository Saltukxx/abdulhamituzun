// Mobil menü işlemleri
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

hamburgerMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
});

// Scroll olduğunda header'ın görünümünü değiştirme
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = 'white';
    }
});

// Smooth scroll için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    });
});

// Form gönderimi
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini topla
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            message: this.querySelector('textarea').value
        };
        
        // Bu kısımda form verilerini backend'e gönderme işlemi yapılabilir
        console.log('Form verileri:', formData);
        
        // Kullanıcıya mesaj göster
        alert('Mesajınız gönderildi! En kısa sürede size dönüş yapılacaktır.');
        
        // Formu temizle
        this.reset();
    });
}

// Sayfa yüklendiğinde animasyonlar
document.addEventListener("DOMContentLoaded", function() {
    // Hero animasyonu
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Scroll animasyonlarını başlat
    setTimeout(checkScrollAnimations, 500);
});

// Scroll animasyonları için elementleri seç
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

// Scroll olduğunda elementleri kontrol et
window.addEventListener('scroll', checkScrollAnimations);

function checkScrollAnimations() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

// Gelişmiş smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Smooth scroll efekti
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    });
});

// Galeri için basit lightbox eklentisi
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Şu anki resim yolunu al
        const currentImgSrc = this.querySelector('img').src;
        
        // Lightbox oluştur
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        // Lightbox içeriği
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="${currentImgSrc}" class="lightbox-image">
            </div>
        `;
        
        // Lightbox'ı sayfaya ekle
        document.body.appendChild(lightbox);
        
        // Scrolling'i devre dışı bırak
        document.body.style.overflow = 'hidden';
        
        // Resim yüklendikten sonra görünür yap
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        lightboxImg.onload = function() {
            lightbox.style.opacity = '1';
        };
        
        // Lightbox kapatma
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
                closeLightbox(lightbox);
            }
        });
        
        // ESC tuşu ile kapatma
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
            }
        });
    });
});

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
    }, 300);
}

// Animasyonlu sayaç
function animateCounter(element, target) {
    let start = 0;
    const duration = 2000;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = Math.floor(progress * target);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Sayaçlar için gözlemci oluştur (eğer sayaç eklenmişse)
const counterElements = document.querySelectorAll('.counter');
if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form doğrulama
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Focus animasyonu
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
            
            // Basit doğrulama
            if (this.hasAttribute('required') && this.value === '') {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Tüm gerekli alanları doğrula
        let isValid = true;
        
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && input.value === '') {
                input.parentElement.classList.add('error');
                isValid = false;
            }
        });
        
        if (isValid) {
            // Form verilerini topla
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Form gönderme animasyonu
            contactForm.classList.add('sending');
            
            // Form gönderimi simülasyonu (gerçekte AJAX kullanılacak)
            setTimeout(() => {
                contactForm.classList.remove('sending');
                contactForm.classList.add('success');
                
                // Başarı mesajı
                const successMessage = document.createElement('div');
                successMessage.classList.add('form-success-message');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız gönderildi! En kısa sürede size dönüş yapılacaktır.';
                
                contactForm.appendChild(successMessage);
                
                // Formu temizle
                this.reset();
                
                // Başarı mesajını kaldır
                setTimeout(() => {
                    contactForm.classList.remove('success');
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.removeChild(successMessage);
                    }, 300);
                }, 3000);
            }, 1500);
        }
    });
}

// Sayfayı yeniden yükle
window.addEventListener('load', () => {
    // Animasyon sınıflarını ekle
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in');
    });
    
    document.querySelectorAll('.about-image').forEach(image => {
        image.classList.add('slide-in-left');
    });
    
    document.querySelectorAll('.about-text').forEach(text => {
        text.classList.add('slide-in-right');
    });
    
    document.querySelectorAll('.activity-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.05}s`;
    });
    
    document.querySelectorAll('.news-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.contact-info, .contact-form').forEach((item, index) => {
        item.classList.add(index === 0 ? 'slide-in-left' : 'slide-in-right');
    });
    
    // Scroll animasyonlarını kontrol et
    checkScrollAnimations();
});

// Hero bölümü için gelişmiş paralaks efekti
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            // Sayfanın ne kadar aşağı kaydırıldığını hesapla
            const scrolled = window.pageYOffset;
            
            // Hero arka planı paralaks etkisi
            hero.style.backgroundPosition = `center ${scrolled * 0.4}px`;
            
            // Hero içeriğinin yavaşça kaybolması
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = 1 - scrolled / 500;
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }
    
    // Mobil cihazlarda arkaplanı sabit gösterme (performans için)
    function checkMobile() {
        if (window.innerWidth <= 768) {
            if (hero) hero.style.backgroundAttachment = 'scroll';
        } else {
            if (hero) hero.style.backgroundAttachment = 'fixed';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

// Gelişmiş hamburger menü
hamburgerMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
    
    // Hamburger animasyonu
    if (hamburgerMenu.classList.contains('active')) {
        hamburgerMenu.querySelector('.bar:nth-child(1)').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        hamburgerMenu.querySelector('.bar:nth-child(2)').style.opacity = '0';
        hamburgerMenu.querySelector('.bar:nth-child(3)').style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        hamburgerMenu.querySelector('.bar:nth-child(1)').style.transform = 'none';
        hamburgerMenu.querySelector('.bar:nth-child(2)').style.opacity = '1';
        hamburgerMenu.querySelector('.bar:nth-child(3)').style.transform = 'none';
    }
});

// Footer animasyonları için JavaScript eklentisi
document.addEventListener('DOMContentLoaded', function() {
    // Footer yukarı kaydırma butonu
    const footer = document.querySelector('footer');
    
    // Eğer footer görünürse, sınıfları ekle
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.footer-logo, .footer-links, .footer-contact, .footer-social').forEach(element => {
                    element.classList.add('visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    if (footer) {
        footerObserver.observe(footer);
    }
    
    // Sayfa yüklendikten sonra footer'a smooth scroll özelliği ekle
    document.querySelectorAll('.footer-links a, .footer-bottom-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Eğer link # ile başlıyorsa smooth scroll kullan
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Sayaç animasyonu 
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.innerText.replace(/[^\d]/g, '');
        const text = counter.innerText;
        const suffix = text.replace(/[\d.]/g, ''); // + veya K+ gibi sonekleri koru
        let count = 0;
        const duration = 2000; // 2 saniye
        const frameDuration = 1000/60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const increment = target / totalFrames;
        
        const animateCount = () => {
            count += increment;
            counter.innerText = Math.floor(count) + suffix;
            
            if (count < target) {
                requestAnimationFrame(animateCount);
            } else {
                counter.innerText = text; // Orijinal metni geri yükle
            }
        };
        
        counter.innerText = "0" + suffix;
        animateCount();
    });
}

// Sayfa yüklendiğinde ve scroll yapıldığında animasyonları kontrol et
document.addEventListener("DOMContentLoaded", function() {
    // Seçim istatistikleri animasyonu
    const statsFill = document.querySelectorAll('.stat-fill');
    const statsSection = document.querySelector('.election-stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statsFill.forEach(fill => {
                        const width = fill.getAttribute('style').replace('width: ', '').replace(';', '');
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 300);
                    });
                    
                    // Sayaçları başlat
                    animateCounters();
                    
                    // İşlem bittikten sonra observer'ı temizle
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(statsSection);
    }
});

// Seçim Sonuçları Bölümü İçin JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animasyon sıralaması için kartlara sıra numarası atama
    const animateCards = document.querySelectorAll('.animate-card');
    animateCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // Progress bar'ın genişliğini ayarlama
    const progressBars = document.querySelectorAll('.secim-progress-bar');
    setTimeout(() => {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth + '%';
        });
    }, 1000);
    
    // Scroll ile animasyonu tetikleme
    const secimSection = document.getElementById('secim-sonuclari');
    let animationTriggered = false;
    
    function checkScroll() {
        if (animationTriggered) return;
        
        const sectionTop = secimSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            animationTriggered = true;
            
            // Logo ve avatar efektlerini güçlendir
            document.querySelectorAll('.secim-logo').forEach(logo => {
                logo.style.animation = 'pulse 2s infinite';
            });
            
            document.querySelectorAll('.secim-icon').forEach(icon => {
                icon.style.animation = 'pulse 2s infinite';
            });
            
            // Sayıları yavaşça artan animasyon
            const counterElements = document.querySelectorAll('.counter-up');
            counterElements.forEach(counter => {
                const text = counter.textContent;
                const value = parseInt(text.replace(/[^0-9]/g, ''));
                
                let startValue = 0;
                const duration = 2000;
                const startTime = Date.now();
                
                function updateCounter() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        startValue = Math.floor(progress * value);
                        counter.textContent = text.replace(/[0-9,]+/, startValue.toLocaleString());
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = text;
                    }
                }
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // İlk yükleme kontrolü
});

// Grafikleri oluştur
function initCharts() {
    // Canvas elementlerini kontrol et
    const genelChartCanvas = document.getElementById('genel-chart');
    const erzurumChartCanvas = document.getElementById('erzurum-chart');
    
    if (!genelChartCanvas || !erzurumChartCanvas) {
        console.log('Chart canvas elementleri bulunamadı, daha sonra tekrar deneyin.');
        setTimeout(initCharts, 1000); // 1 saniye sonra tekrar dene
        return;
    }
    
    try {
        // Genel seçim grafiği
        const genelCtx = genelChartCanvas.getContext('2d');
        new Chart(genelCtx, {
            type: 'bar',
            data: {
                labels: ['AK Parti', 'CHP', 'İYİ Parti', 'Zafer', 'Diğer'],
                datasets: [{
                    label: '2023 Genel Seçim Sonuçları',
                    data: [35.6, 25.3, 9.8, 5.11, 24.19],
                    backgroundColor: [
                        '#FFA500',
                        '#FF0000',
                        '#87CEEB',
                        '#e63946',
                        '#A9A9A9'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        // Erzurum grafiği
        const erzurumCtx = erzurumChartCanvas.getContext('2d');
        new Chart(erzurumCtx, {
            type: 'pie',
            data: {
                labels: ['AK Parti', 'MHP', 'Zafer', 'CHP', 'İYİ Parti', 'Diğer'],
                datasets: [{
                    label: 'Erzurum Sonuçları',
                    data: [42.5, 18.7, 5.11, 10.2, 8.3, 15.19],
                    backgroundColor: [
                        '#FFA500',
                        '#800000',
                        '#e63946',
                        '#FF0000',
                        '#87CEEB',
                        '#A9A9A9'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        console.log('Grafikler başarıyla oluşturuldu');
    } catch (error) {
        console.error('Grafik oluşturma hatası:', error);
    }
}

// Faaliyetler sayaç animasyonu
function animateFaaliyetCounters() {
    const counters = document.querySelectorAll('.faaliyet-count');
    
    if (counters.length === 0) return;
    
    let animationStarted = false;
    
    function startCountAnimation() {
        if (animationStarted) return;
        
        const faaliyetSection = document.getElementById('faaliyetler');
        if (!faaliyetSection) return;
        
        const sectionTop = faaliyetSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            animationStarted = true;
            
            counters.forEach(counter => {
                const targetValue = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = Date.now();
                let currentValue = 0;
                
                function updateCounter() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        currentValue = Math.floor(progress * targetValue);
                        counter.textContent = currentValue.toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = targetValue.toLocaleString();
                    }
                }
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', startCountAnimation);
    startCountAnimation(); // İlk yükleme kontrolü
}

document.addEventListener('DOMContentLoaded', function() {
    animateFaaliyetCounters();
}); 