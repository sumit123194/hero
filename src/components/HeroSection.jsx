import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImage from '../assets/car.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef([]);
  const statsRefs = useRef([]);
  const carRef = useRef(null);

  // 🎬 1. INITIAL LOAD ANIMATION (Requirement #2)
  useEffect(() => {
    // Staggered headline reveal (smooth fade + movement)
    const tl = gsap.timeline();
    
    tl.fromTo(headlineRef.current, 
      { 
        opacity: 0, 
        y: 60,
        rotationX: -15 
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.7)"
      }
    );

    // Statistics animate in one by one (subtle delay)
    tl.fromTo(statsRefs.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 40
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.5" // Overlap with headline
    );

    // 🎯 3. SCROLL-BASED ANIMATION (Core Feature - Requirement #3)
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1, // Tied to scroll progress
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Main visual element (car) moves smoothly based on scroll
        gsap.to(carRef.current, {
          y: -250 * progress,        // Moves up
          scale: 1 + 0.4 * progress, // Scales up
          rotation: 8 * progress,    // Slight rotation
          ease: "none"               // Natural scroll interpolation
        });
      }
    });

    // Pin hero section (smooth behavior)
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Exact headline from assignment
  const letters = "W E L C O M E  I T Z F I Z Z".split(' ');

  return (
    <section 
      ref={heroRef}
      className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-20"
      style={{ height: '100vh' }} // Requirement #1: First screen exactly
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 animate-pulse z-0"></div>
      
      {/* Car - Main visual element */}
      <div 
        ref={carRef}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[400px] z-20"
      >
        <img 
          src={carImage} 
          alt="Sports Car"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Content - Centered */}
      <div className="container mx-auto px-6 text-center relative z-30 max-w-4xl">
        {/* 1. Letter-spaced headline (Exact match - Requirement #1) */}
        <h1 className="text-6xl md:text-8xl xl:text-9xl font-black uppercase tracking-[0.3em] mb-24 leading-tight">
          {letters.map((letter, index) => (
            <span
              key={index}
              ref={el => headlineRef.current[index] = el}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-400 drop-shadow-2xl"
              style={{ display: 'inline-block', width: '1.2em' }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* 2. Impact metrics/statistics (Requirement #1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '99%', label: 'Performance' },
            { value: '150+', label: 'MPH Top Speed' },
            { value: '0-60', label: 'in 2.8s' },
            { value: '500+', label: 'HP Beast' }
          ].map((stat, index) => (
            <div
              key={index}
              ref={el => statsRefs.current[index] = el}
              className="group"
            >
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-xl mb-2 group-hover:scale-110 transition-all duration-300">
                {stat.value}
              </div>
              <p className="text-lg text-white/80 font-medium tracking-wide capitalize">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
