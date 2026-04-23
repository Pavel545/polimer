"use client";

import Image from "next/image";
import { useState } from "react";
import s from "./style.module.css";
import { Counter } from "@/components/Counter";

export default function AboutInfo() {
  const slides = [
    { src: "/img/aboutPage/slide/1.jpg", alt: "Продукция компании 1" },
    { src: "/img/aboutPage/slide/2.jpg", alt: "Продукция компании 2" },
    { src: "/img/aboutPage/slide/3.jpg", alt: "Продукция компании 3" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={s.info}>
      <div className="container">
        
        <h2 className="h2">
О нас в цифрах:
            </h2>
        <div className={s.infoContent}>
         

            <div className={s.infoContentTextItem}>
              <h3> {`>`} <Counter as="span" end={16} /> лет на рынке России.</h3>
              <span>ООО "Полимерные Технологии"  более 16 лет производит качественные канализационные полимерно-песчаные люки. </span>
            </div>
            <div className={s.infoContentTextItem}>
              <h3>{`>`} <Counter as="span" end={120000}/> люков в год.</h3>
              <span>Производственные и складские мощности позволяют компании Полимерные Технологии производить и реализовывать более 120000 полимерно-песчаных люков в год. </span>
            </div>
            <div className={s.infoContentTextItem}>
              <h3>{'>'} <Counter as="span" end={100}/> городов</h3>
              <span>ООО "Полимерные Технологии"  поставляют полимерно-песчаные люки в более чем 100 городов России</span>
            </div>
             <div className={s.infoContentTextItem}>
              <h3> {'>'} <Counter as="span" end={150}/> тонн переработанного пластика</h3>
              <span>ООO "Полимерные Технологии" экологически направленная компания </span>
            </div>

        </div>

        {/* Slider Component */}
        <div className={s.slider}>
          <div className={s.sliderContainer}>
            <button 
              className={`${s.sliderButton} ${s.sliderButtonPrev}`} 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={s.sliderImg}>
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                width={1370}
                height={624}
                priority={currentSlide === 0}
              />
            </div>
            
            <button 
              className={`${s.sliderButton} ${s.sliderButtonNext}`} 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className={s.sliderDots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${s.sliderDot} ${currentSlide === index ? s.sliderDotActive : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}