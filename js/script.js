class CarouselSolucoes {
    constructor() {
        this.carouselContainer = document.querySelector('.carousel-container');
        this.indicators = document.querySelectorAll('.indicador');
        this.originalSlides = document.querySelectorAll('.cards-solucoes');
        this.totalSlides = this.originalSlides.length;
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        this.createClones();
        
        this.allSlides = document.querySelectorAll('.cards-solucoes');
        
        this.currentIndex = this.totalSlides;
        this.updateCarousel(false); 
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
        
        this.carouselContainer.addEventListener('transitionend', () => {
            this.handleTransitionEnd();
        });
        
        this.startAutoPlay();
    }
    
    createClones() {
        for (let i = this.totalSlides - 1; i >= 0; i--) {
            const clone = this.originalSlides[i].cloneNode(true);
            clone.classList.add('clone');
            clone.classList.remove('active');
            this.carouselContainer.insertBefore(clone, this.carouselContainer.firstChild);
        }
        
        this.originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            clone.classList.remove('active');
            this.carouselContainer.appendChild(clone);
        });
    }
    
    updateCarousel(withTransition = true) {
        this.carouselContainer.style.transition = withTransition 
            ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'none';
        
        const slideWidth = this.allSlides[0].offsetWidth;
        const gap = 30;
        const offset = -(this.currentIndex * (slideWidth + gap));
        
        this.carouselContainer.style.transform = `translateX(${offset}px)`;
        
        this.updateActiveStates();
    }
    
    updateActiveStates() {
        this.allSlides.forEach(slide => slide.classList.remove('active'));
        
        this.allSlides[this.currentIndex].classList.add('active');
        
        const realIndex = this.getRealIndex();
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('ativo', index === realIndex);
        });
    }
    
    getRealIndex() {
        if (this.currentIndex < this.totalSlides) {
            return this.currentIndex;
        } else if (this.currentIndex >= this.totalSlides * 2) {
            return this.currentIndex - (this.totalSlides * 2);
        } else {
            return this.currentIndex - this.totalSlides;
        }
    }
    
    goToSlide(realIndex) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex = realIndex + this.totalSlides;
        this.updateCarousel(true);
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex++;
        this.updateCarousel(true);
    }
    
    handleTransitionEnd() {
        this.isTransitioning = false;
        if (this.currentIndex >= this.totalSlides * 2) {
            this.carouselContainer.style.transition = 'none';
            this.currentIndex = this.totalSlides;
            requestAnimationFrame(() => {
                this.updateCarousel(false);
                requestAnimationFrame(() => {
                    this.carouselContainer.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }
        else if (this.currentIndex < this.totalSlides) {
            this.carouselContainer.style.transition = 'none';
            this.currentIndex = this.totalSlides * 2 - 1;
            requestAnimationFrame(() => {
                this.updateCarousel(false);
                requestAnimationFrame(() => {
                    this.carouselContainer.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 8000);
    }
    
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new CarouselSolucoes();
});
