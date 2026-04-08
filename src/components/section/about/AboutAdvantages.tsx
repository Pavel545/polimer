"use client";

import { Stagger, StaggerItem, BlurIn } from "@/components/ui/Motion";
import AboutCard from "./AboutCard";
import AboutSlider from "./AboutSlider";
import s from "./AboutAdvantages.module.css";
import { AboutItem } from "@/types/about";

type AboutAdvantagesProps = {
  details: AboutItem[]
  activeAbout: AboutItem
  setActiveAbout: (item: AboutItem) => void
}

export default function AboutAdvantages({ 
  details, 
  activeAbout, 
  setActiveAbout 
}: AboutAdvantagesProps) {
  return (
    <section className={s.advantages}>
      <div className="container">
        <h2 className="h2">
          Преимущества компании Полимерные технологии
        </h2>
        
        <div className={s.advantagesContent}>
          <Stagger 
            className={s.advantagesGrid} 
            stagger={0.1} 
            delay={0.4} 
            amount={0.2}
          >
            {details.map((item, index) => (
              <StaggerItem key={index}>
                <AboutCard
                  item={item}
                  isActive={activeAbout.title === item.title}
                  onMouseEnter={() => setActiveAbout(item)}
                />
              </StaggerItem>
            ))}
          </Stagger>

          <BlurIn delay={0.8} amount={0.2}>
            <AboutSlider activeItem={activeAbout} />
          </BlurIn>
        </div>
      </div>
    </section>
  );
}