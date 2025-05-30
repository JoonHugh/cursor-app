// import heroImage from '../public/assets/hero-image.jpg';
import styles from './Hero.module.css';
import { randomImage, randomViews } from './Blog.jsx';
import { randomizer }  from './EntryHeader.jsx';
import { useRef } from 'react';

function randomShares(viewsString) {
    console.log(viewsString);
    const views = viewsString.match(/(\d+)/);
    console.log("views at 0", views[0]);
    if (views[0] > 10) return parseInt(views[0] / 42) + ' SHARES';
    
    return parseInt(views[0] * 1000 / 42) + ' SHARES';
}

function Hero() {
    const sliderRef = useRef(null);
    const containerRef = useRef(null);
    const slides = [0, 1, 2].map((i) => {
      const entry = randomizer();
      const views = randomViews();
      const shares = randomShares(views);
      const image = i === 0 ? "/assets/hero-image.jpg" : randomImage(entry.category);
      return { entry, views, shares, image };
    });
  
    const scrollToSlide = (index) => {
      const slider = sliderRef.current;
      if (!slider) return;
      const slideWidth = slider.clientWidth;
      slider.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    };
  
    const handleDrag = (e) => {
      if (!sliderRef.current) return;
      let isDown = false;
      let startX;
      let scrollLeft;
  
      const slider = sliderRef.current;
  
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
  
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
  
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
  
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    };
  
    return (
      <div className={styles["image-container"]} ref={containerRef}>
        <div className={styles["slider-wrapper"]}>
          <div
            ref={sliderRef}
            className={styles["slider"]}
            onMouseDown={handleDrag}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={styles["slide"]}
                style={{ position: 'relative', flex: '0 0 100%' }}
              >
                <img
                  src={slide.image}
                  alt={`Hero-Image-${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className={styles["hover-text"]}>
                  <span className={styles["hero-category"]}>{slide.entry.category}</span>
                  <h2 className={styles["hero-title"]}>{slide.entry.title}</h2>
                  <div className={styles["hero-meta"]}>
                    <span>{slide.entry.name}</span> • <span>JUNE, 2025</span> • <span>{slide.views}</span> • <span><i className="material-icons">&#xe80d;</i> {slide.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["slider-nav"]}>
            {slides.map((_, index) => (
              <button key={index} onClick={() => scrollToSlide(index)}></button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Hero;
  