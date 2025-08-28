import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { RoughEase } from 'gsap/EasePack';

gsap.registerPlugin(MotionPathPlugin, CSSRulePlugin, RoughEase);

const LandingAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const screen = containerRef.current;
    if (!screen) return;
    
    const ctx = gsap.context(() => {
        const starfield = screen.querySelector('.starfield');
        const starfieldStars = gsap.utils.toArray('.starfield-star');
        const stardustParticles = gsap.utils.toArray('.stardust-particle');
        const supernovaParticles = gsap.utils.toArray('.supernova-particle');
        const emberParticles = gsap.utils.toArray('.ember-particle');
        const blastWave = screen.querySelector('.blast-wave');
        const scene1 = screen.querySelector('.scene-1-container');
        const scene2 = screen.querySelector('.scene-2-container');
        const scene3 = screen.querySelector('.scene-3-container');
        const supernovaFlash = screen.querySelector('.supernova-flash');
        const stellarCore = screen.querySelector('.stellar-core');
        const finalNameChars = gsap.utils.toArray('.final-name-char');
        const turbulence = screen.querySelector('#turbulence feTurbulence');
        
        gsap.set([scene1, scene2, scene3, supernovaFlash, stellarCore, blastWave], { autoAlpha: 0 });
        gsap.set(finalNameChars, { autoAlpha: 0, yPercent: 100, scale: 1.5 });
        
        const tl = gsap.timeline({ onComplete, delay: 1 });
        
        tl.to(screen, { autoAlpha: 1, duration: 0.5 });

        tl.addLabel("act1")
          .from(starfield, { opacity: 0, duration: 3, ease: 'power2.inOut' }, "act1")
          .to(scene1, { autoAlpha: 1, duration: 1 }, "act1+=1")
          .to(turbulence, { attr: { baseFrequency: '0.02 0.02' }, duration: 2.5, ease: 'power2.out' }, "act1+=1")
          .from(stardustParticles, {
              x: () => gsap.utils.random(-window.innerWidth * 0.5, window.innerWidth * 0.5),
              y: () => gsap.utils.random(-window.innerHeight * 0.5, window.innerHeight * 0.5),
              scale: 0, autoAlpha: 0, duration: 2.5, ease: 'power3.out', stagger: 0.01,
          }, "act1+=1")
          .from(scene1.querySelector('.milestone-text'), { autoAlpha: 0, scale: 1.2, duration: 1.5 }, "act1+=2")
          .from(scene1.querySelector('.sub-text'), { autoAlpha: 0, y: 20, duration: 1 }, "act1+=2.5");

        tl.addLabel("act2", "+=2.5")
          .to(scene1, { autoAlpha: 0, scale: 0.8, duration: 1, ease: 'power3.in' }, "act2")
          .to(stardustParticles, { scale: 0, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, "<")
          .to(turbulence, { attr: { baseFrequency: '0 0' }, duration: 1, ease: 'power2.in' }, "<")
          
          .to(supernovaFlash, { autoAlpha: 1, duration: 0.05, repeat: 1, yoyo: true }, "act2+=0.8")
          .to(screen, {
              x: 'random(-35, 35)',
              y: 'random(-35, 35)',
              rotation: 'random(-4, 4)',
              duration: 0.1,
              repeat: 9,
              yoyo: true,
              ease: 'power2.inOut'
          }, "<")
          .to(screen, {
              x: 'random(-8, 8)',
              y: 'random(-8, 8)',
              rotation: 'random(-1, 1)',
              duration: 1.5,
              ease: 'rough({ strength: 2, points: 30, template: none.out, taper: "out" })'
          }, ">-0.1")
          
          .fromTo(blastWave, 
              { autoAlpha: 1, scale: 0, borderWidth: '6px' }, 
              { scale: 3, autoAlpha: 0, duration: 1.2, ease: 'cubic.out', borderWidth: '0px' }, 
              "act2+=0.8"
          )
          
          .fromTo(supernovaParticles, { scale: 0, autoAlpha: 1, backgroundColor: '#FFFFFF' }, {
              scale: () => gsap.utils.random(0.5, 2.0),
              x: () => gsap.utils.random(-window.innerWidth * 1.8, window.innerWidth * 1.8),
              y: () => gsap.utils.random(-window.innerHeight * 1.8, window.innerHeight * 1.8),
              rotation: () => gsap.utils.random(-360, 360),
              duration: () => gsap.utils.random(1.8, 2.8),
              autoAlpha: 0,
              backgroundColor: '#FFDDBB',
              ease: 'expo.out',
              stagger: 0.001,
          }, "<")
          
          .fromTo(emberParticles, { scale: 0, autoAlpha: 1 }, {
              scale: () => gsap.utils.random(0.5, 1.2),
              x: () => gsap.utils.random(-window.innerWidth, window.innerWidth),
              y: () => gsap.utils.random(-window.innerHeight, window.innerHeight),
              rotation: () => gsap.utils.random(-720, 720),
              duration: () => gsap.utils.random(3.5, 5),
              autoAlpha: 0,
              ease: 'power2.out',
              stagger: 0.01,
              background: 'radial-gradient(circle, #fee2e2 0%, #991b1b 80%)'
          }, "<0.1")
          
          .to(scene2, { autoAlpha: 1, duration: 2, ease: 'power2.out' }, "act2+=1.5")
          .from(scene2.querySelector('.sub-text'), { autoAlpha: 0, y: -20, duration: 1.5 }, "<0.5")
          .from(scene2.querySelector('.milestone-number'), { autoAlpha: 0, scale: 0.7, duration: 1.5 }, "<");
          
        tl.addLabel("act3", "+=3")
          .to(scene2, { autoAlpha: 0, scale: 1.2, duration: 1.5, ease: 'power3.in' }, "act3")
          .to(starfieldStars, {
              motionPath: {
                  path: (i, target) => {
                      const screenRect = screen.getBoundingClientRect();
                      const targetRect = target.getBoundingClientRect();
                      const startX = targetRect.left - screenRect.left;
                      const startY = targetRect.top - screenRect.top;
                      const endX = screen.offsetWidth / 2;
                      const endY = screen.offsetHeight / 2;
                      return [{ x: startX, y: startY }, { x: endX, y: endY }];
                  },
                  curviness: 0.5
              },
              scale: 0,
              opacity: 0,
              duration: 1.5,
              stagger: 0.005,
              ease: 'power2.in'
          }, "act3")
          .to(stellarCore, { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power3.in' }, "act3")
          .from(stellarCore, { scale: 50 }, "<")
          .to(stellarCore, { 
              scale: 0.5, 
              duration: 0.5, 
              ease: 'power2.inOut', 
              repeat: 1, 
              yoyo: true 
          }, ">")
          .to(stellarCore, { scale: 0, duration: 0.2, ease: 'power2.in' });
        
        tl.to(scene3, { autoAlpha: 1, duration: 0.1 }, ">-0.1")
          .fromTo(blastWave, { autoAlpha: 1, scale: 0, boxShadow: `0 0 0px 0px #EF4444` }, {
              scale: 5, autoAlpha: 0, duration: 1.5, ease: 'expo.out',
              boxShadow: `0 0 500px 200px #EF4444`
          }, ">")
          .fromTo(finalNameChars, {
              autoAlpha: 1,
              color: 'transparent',
              cssRule: { 'webkit-text-stroke': `1px #EF444444` }
          }, {
              color: '#F5F5F5',
              cssRule: { 'webkit-text-stroke': `1px #EF444400` },
              textShadow: `0 0 15px #EF4444`,
              duration: 1.5,
              ease: 'power3.inOut',
              stagger: { amount: 0.5, from: 'center' }
          }, "<")
          .from(screen.querySelector('.cta-container'), { autoAlpha: 0, y: 50, duration: 1, ease: 'power3.out' }, ">-0.5");
        
        tl.to(screen, { autoAlpha: 0, duration: 2, ease: 'power2.in' }, "+=3");

    }, screen);
    
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div 
        ref={containerRef} 
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black landing-container"
        exit={{ opacity: 0 }}
    >
        <svg className="absolute w-0 h-0">
            <filter id="lensing-effect">
                <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0 0" numOctaves="1" result="warp"/>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
            </filter>
        </svg>

        <div className="starfield absolute inset-0 pointer-events-none" style={{ filter: 'url(#lensing-effect)' }}>
            {Array.from({ length: 200 }).map((_, i) => (
                <div key={i} className="starfield-star absolute w-0.5 h-0.5 rounded-full bg-gray-300" style={{ top: `${gsap.utils.random(0, 100)}%`, left: `${gsap.utils.random(0, 100)}%`, opacity: gsap.utils.random(0.2, 0.8), transform: `scale(${gsap.utils.random(0.5, 1.2)})` }}></div>
            ))}
        </div>

        <div className="absolute-center pointer-events-none">
             {Array.from({ length: 150 }).map((_, i) => (
                <div key={i} className="stardust-particle absolute w-1 h-1 rounded-full bg-amber-100"></div>
            ))}
            {Array.from({ length: 300 }).map((_, i) => (
                <div key={i} className="supernova-particle absolute w-2 h-2 rounded-full bg-white"></div>
            ))}
            {Array.from({ length: 70 }).map((_, i) => (
                <div key={i} className="ember-particle absolute w-1.5 h-1.5 rounded-full" style={{ background: `radial-gradient(circle, #FFEDD5 0%, #EF4444 70%)` }}></div>
            ))}
        </div>
        <div className="supernova-flash absolute inset-0" style={{ background: `radial-gradient(circle, white 0%, #EF4444 30%, transparent 70%)` }}></div>
        <div className="blast-wave absolute w-1 h-1 rounded-full border-white"></div>
        <div className="stellar-core absolute w-4 h-4 rounded-full bg-white" style={{ boxShadow: `0 0 20px 10px #EF4444`}}></div>

        <div className="scene-1-container absolute-center">
            <div className="flex flex-col items-center text-center font-bebas">
                <p className="milestone-text" style={{ color: '#F5F5F5', fontSize: 'clamp(60px, 15vw, 150px)', textShadow: `0 0 15px #EF4444` }}>500+ FOLLOWERS</p>
                <p className="sub-text -mt-2 font-poppins text-gray-300" style={{ fontSize: 'clamp(16px, 4vw, 32px)' }}>A COSMIC BLOOM</p>
            </div>
        </div>

        <div className="scene-2-container absolute-center">
             <div className="flex flex-col items-center text-center font-bebas">
                <p className="sub-text mb-2 font-poppins text-gray-300" style={{ fontSize: 'clamp(18px, 5vw, 40px)' }}>THE NEXT HORIZON</p>
                <p className="milestone-number" style={{ color: '#EF4444', textShadow: `0 0 20px #EF4444`, fontSize: 'clamp(80px, 22vw, 220px)' }}>2000</p>
            </div>
        </div>
        
        <div className="scene-3-container absolute-center">
            <div className="flex w-full max-w-[90vmin] flex-col items-center justify-center text-center">
                <h1 className="font-bebas mb-6 leading-none tracking-[0.2em]" style={{ color: '#F5F5F5', fontSize: 'clamp(40px, 10vw, 100px)' }}>
                    {'NOCTRA'.split('').map((char, i) => (
                        <span key={i} className="final-name-char inline-block">{char}</span>
                    ))}
                </h1>
                <div className="cta-container mt-18">
                    <p className="font-poppins" style={{ color: '#F5F5F5', fontSize: 'clamp(18px, 4vw, 36px)' }}>
                        JOIN THE COSMIC JOURNEY
                    </p>
                    <p className="font-poppins mt-2 opacity-70" style={{ color: '#F5F5F5', fontSize: 'clamp(14px, 2.5vw, 24px)' }}>
                        Follow @Noctravellian on X
                    </p>
                </div>
            </div>
        </div>
        
        <style>{`
            .absolute-center { 
                position: absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .landing-container {
                opacity: 0;
            }
        `}</style>
    </motion.div>
  );
};

export default LandingAnimation;