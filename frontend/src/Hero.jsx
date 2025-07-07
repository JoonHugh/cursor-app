// import heroImage from '../public/assets/hero-image.jpg';
import styles from './Hero.module.css';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DEBUG = import.meta.env.DEBUG;

function Hero() {
  
  const { featured } = useSelector(state => state.blogs);
  const topBlogs = Array.isArray(featured) ? featured.slice(0, 3) : [];
  const navigate = useNavigate();

  const sliderRef = useRef(null);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.clientWidth;
      slider.scrollTo({ left: slideWidth * index, behavior: 'smooth' });

    } // if
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
    <div className={styles["image-container"]}>
      <div className={styles["slider-wrapper"]} onClick={() => {
        if (DEBUG) console.log("hi")
        if (DEBUG) console.log(topBlogs)
      }}>
        <div ref={sliderRef} className={styles["slider"]} onMouseDown={handleDrag}>
          {topBlogs.map((blog, index) => (
            <div
              key={blog._id}
              className={styles["slide"]}
              style={{ flex: '0 0 100%' }}
              onClick={() => {
                console.log(topBlogs)
                navigate(`/blog/${blog.slug}`)
              }}
            >
              <img
                src={blog.image?.startsWith('http') ? blog.image : '/assets/hero-image.jpg'}
                alt={`Hero-Image-${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className={styles["hover-text"]}>
                <span className={styles["hero-category"]}>{blog.category}</span>
                <h2 className={styles["hero-title"]}>{blog.title}</h2>
                <div className={styles["hero-meta"]}>
                  <span>{blog.user?.username}</span> • 
                  <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span> •
                  <span>{blog.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["slider-nav"]}>
          {topBlogs.map((_, index) => (
            <button key={index} onClick={() => scrollToSlide(index)}></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
