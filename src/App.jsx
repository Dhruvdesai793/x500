import React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { gsap } from 'gsap';
import LandingAnimation from './LandingAnimation';

import imgSamirande from './assets/profile/samirande_.jpg';
import imgGatsu from './assets/profile/Purv.jpg';
import imgShivaraj from './assets/profile/shivaraj215.jpg';
import imgKelley from './assets/profile/kelleyllc.jpg';
import imgSarabjeet from './assets/profile/Sarabjeet___.jpg';
import imgV3dxxh from './assets/profile/v3dxxh.jpg';
import imgLoveucifer from './assets/profile/loveucifer.jpg';
import imgSerotoninwave from './assets/profile/serotoninwave.jpg';
import imgShbhm from './assets/profile/shbhmX0.jpg';
import imgAtharv from './assets/profile/atharvbuilds.jpg';
import imgJdhruv from './assets/profile/jdhruv14.jpg';
import imgJigyasu from './assets/profile/Jigyasu_rajput.jpg';
import imgDishant from './assets/profile/dishantwt_.jpg';
import imgLuckynot from './assets/profile/_luckynot.jpg';
import imgCyberFLASH from './assets/profile/TheCyberFLASH.jpg';
import imgSarthak from './assets/profile/sarthaktwtt.jpg';
import imgCookWrites from './assets/profile/cook_writes.jpg';
import imgTypical from './assets/profile/typi_cal_.jpg';

const userHandle = 'Noctravellian';
const userName = 'Dhruv Desai';
const userXLink = `https://x.com/${userHandle}`;
const userLinkedIn = 'https://www.linkedin.com/in/dhruv-desai-b0779b370/';
const userGithub = 'https://github.com/Dhruvdesai793';

const accentColor = '#EF4444';
const textColor = '#F5F5F5';
const bgColor = '#000000';

const innerCircle = [
  { name: '@samirande_', img: imgSamirande },
  { name: '@gatsu_enjoyer', img: imgGatsu },
  { name: '@shivaraj215', img: imgShivaraj },
  { name: '@kelleyllc', img: imgKelley },
  { name: '@Sarabjeet___', img: imgSarabjeet },
  { name: '@v3dxxh', img: imgV3dxxh },
  { name: '@loveucifer', img: imgLoveucifer },
  { name: '@serotoninwave', img: imgSerotoninwave },
  { name: '@shbhmX0', img: imgShbhm },
  { name: '@atharvbuilds', img: imgAtharv },
  { name: '@jdhruv14', img: imgJdhruv },
  { name: '@Jigyasu_rajput', img: imgJigyasu },
  { name: '@dishantwt_', img: imgDishant },
  { name: '@_luckynot', img: imgLuckynot },
  { name: '@TheCyberFLASH', img: imgCyberFLASH },
  { name: '@sarthaktwtt', img: imgSarthak },
  { name: '@cook_writes', img: imgCookWrites },
  { name: '@typi_cal_', img: imgTypical },
].map(p => ({ ...p, link: `https://x.com/${p.name.substring(1)}` }));

const MAX_NODES_DESKTOP = 24;
const MAX_NODES_MOBILE = 20;
const RING_ROTATION_SPEED = 15;
const RING_ROTATION_SPEED_HOVER = 50;
const DESKTOP_BREAKPOINT = 1024;

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });
    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
};

const CustomCursor = ({ isLoading }) => {
    const cursorDotRef = useRef(null);
    const cursorCircleRef = useRef(null);
    useEffect(() => {
        const dot = cursorDotRef.current;
        const circle = cursorCircleRef.current;
        if (!dot || !circle) return;
        gsap.set([dot, circle], { xPercent: -50, yPercent: -50 });
        const xToDot = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3" });
        const yToDot = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3" });
        const xToCircle = gsap.quickTo(circle, "x", { duration: 0.7, ease: "power3" });
        const yToCircle = gsap.quickTo(circle, "y", { duration: 0.7, ease: "power3" });
        const handleMouseMove = e => { xToDot(e.clientX); yToDot(e.clientY); xToCircle(e.clientX); yToCircle(e.clientY); };
        window.addEventListener("mousemove", handleMouseMove);
        const handleMouseEnter = () => gsap.to(circle, { scale: 3, borderColor: accentColor, duration: 0.4 });
        const handleMouseLeave = () => gsap.to(circle, { scale: 1, borderColor: textColor, duration: 0.4 });
        let elements = [];
        if (!isLoading) {
            elements = document.querySelectorAll('.cursor-pointer');
            elements.forEach(el => { el.addEventListener('mouseenter', handleMouseEnter); el.addEventListener('mouseleave', handleMouseLeave); });
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            elements.forEach(el => { el.removeEventListener('mouseenter', handleMouseEnter); el.removeEventListener('mouseleave', handleMouseLeave); });
        };
    }, [isLoading]);
    return (
        <div className='hidden md:block'>
            <div ref={cursorDotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full z-[101] pointer-events-none" style={{ background: accentColor }}></div>
            <div ref={cursorCircleRef} className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full z-[101] pointer-events-none" style={{ borderColor: textColor }}></div>
        </div>
    );
};

const SocialIcons = {
    LinkedIn: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-1.1-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.3a3.5 3.5 0 013.1-1.8c2.45 0 4.5 2.05 4.5 4.5V19z"></path></svg>,
    GitHub: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 01.1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48A10 10 0 0022 12 10 10 0 0012 2z"></path></svg>,
};

const ConfettiCanvas = ({ isPopped }) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const particles = useRef([]);
    const { width, height } = useWindowSize();
    const colors = useMemo(() => [accentColor, '#F5F5F5', '#A9A9A9', '#DC2626', '#FBBF24'], []);
    const shapes = useMemo(() => ['●', '▲', '■', '★'], []);

    useEffect(() => {
        if (isPopped && canvasRef.current && width && height) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            const isMobile = width < 768;
            const totalParticles = isMobile ? 150 : 300;
            const centerX = width / 2;
            const centerY = height / 2;

            particles.current = Array.from({ length: totalParticles }).map(() => {
                const angle = Math.random() * 2 * Math.PI;
                const velocity = Math.random() * 8 + 4;
                return {
                    x: centerX, y: centerY,
                    vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity,
                    life: 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shape: shapes[Math.floor(Math.random() * shapes.length)],
                    size: Math.random() * 10 + 5,
                    rotation: Math.random() * 2 * Math.PI,
                    rotationSpeed: (Math.random() - 0.5) * 0.2,
                };
            });

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.current = particles.current.filter(p => p.life > 0);

                particles.current.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    p.vy += 0.08; p.life -= 0.01;
                    p.rotation += p.rotationSpeed;

                    ctx.save();
                    ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
                    ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
                    ctx.font = `${p.size}px sans-serif`; ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle'; ctx.fillText(p.shape, 0, 0);
                    ctx.restore();
                });

                if (particles.current.length > 0) {
                    animationFrameId.current = requestAnimationFrame(animate);
                }
            };
            animate();
        }
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [isPopped, width, height, colors, shapes]);

    return <AnimatePresence>{isPopped && <motion.canvas ref={canvasRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-[150]" />}</AnimatePresence>;
};

const StarfieldBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div className="stars"></div>
        <div className="twinkling"></div>
    </div>
);

const OrbitingNode = React.memo(({ follower, vector, parentRotation, onNodeHoverStart, onNodeHoverEnd, isDimmed, scaleOnHover }) => {
    const [isHovered, setIsHovered] = useState(false);
    const counterRotate = useTransform(parentRotation, v => -v);
    return (
        <motion.div
            className="absolute top-1/2 left-1/2"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ scale: 1, x: vector.x, y: vector.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 1.5 + vector.index * 0.1 }}
            style={{ rotate: isHovered ? counterRotate : 0 }}
            onHoverStart={() => { setIsHovered(true); onNodeHoverStart(); }}
            onHoverEnd={() => { setIsHovered(false); onNodeHoverEnd(); }}
        >
            <motion.a
                href={follower.link} target="_blank" rel="noopener noreferrer"
                className="cursor-pointer relative flex items-center justify-center group w-12 h-12 md:w-16 md:h-16"
                whileHover={{ scale: scaleOnHover, zIndex: 50, rotate: 360 }}
                animate={{ opacity: isDimmed ? 0.3 : 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 10,
                    rotate: { duration: 0.7, ease: 'easeOut' }
                }}
            >
                <motion.div className="absolute w-full h-full rounded-full blur-xl" style={{ backgroundColor: accentColor, opacity: 0.3 }} />
                <motion.img
                    src={follower.img} alt={follower.name}
                    className="relative w-full h-full rounded-full object-cover border-2 border-gray-700 group-hover:border-red-500 transition-colors duration-300"
                    style={{ boxShadow: `0 0 15px #00000090` }}
                />
                <motion.div
                    className="absolute top-full mt-2 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ delay: isHovered ? 0.7 : 0, duration: 0.3 }}
                >
                    <span className="whitespace-nowrap px-3 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs md:text-sm text-white font-poppins shadow-lg">
                        {follower.name}
                    </span>
                </motion.div>
            </motion.a>
        </motion.div>
    );
});

const DesktopRing = ({ followers, hoveredNodeKey, setHoveredNodeKey }) => {
    const [radius, setRadius] = useState(300);
    const rotation = useMotionValue(0);
    useEffect(() => {
        const controls = animate(rotation, 360, {
            duration: hoveredNodeKey !== null ? RING_ROTATION_SPEED_HOVER : RING_ROTATION_SPEED,
            ease: 'linear', repeat: Infinity,
        });
        return () => controls.stop();
    }, [hoveredNodeKey, rotation]);
    useEffect(() => {
        const updateRadius = () => setRadius(window.innerWidth * 0.3);
        updateRadius(); window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);
    const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
    const parallaxX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-35, 35]);
    const parallaxY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-35, 35]);
    const handleMouseMove = (e) => { mouseX.set(e.clientX - window.innerWidth / 2); mouseY.set(e.clientY - window.innerHeight / 2); };
    return (
        <motion.div className="absolute inset-0 flex items-center justify-center z-10" onMouseMove={handleMouseMove} style={{ x: parallaxX, y: parallaxY }}>
            <motion.div className="relative w-0 h-0" style={{ rotate: rotation }}>
                {followers.map((follower, i) => {
                    const key = `desktop-node-${i}`;
                    const angle = (i / followers.length) * 2 * Math.PI;
                    const vector = { x: radius * Math.cos(angle), y: radius * Math.sin(angle), index: i };
                    return <OrbitingNode key={key} follower={follower} vector={vector} parentRotation={rotation} onNodeHoverStart={() => setHoveredNodeKey(key)} onNodeHoverEnd={() => setHoveredNodeKey(null)} isDimmed={hoveredNodeKey !== null && hoveredNodeKey !== key} scaleOnHover={2.2} />;
                })}
            </motion.div>
        </motion.div>
    );
};

const MobileOrbit = ({ followers, hoveredNodeKey, setHoveredNodeKey }) => {
    const [radius, setRadius] = useState(0);
    const rotation = useMotionValue(0);
    useEffect(() => {
        const controls = animate(rotation, 360, {
            duration: hoveredNodeKey !== null ? RING_ROTATION_SPEED_HOVER / 2 : RING_ROTATION_SPEED / 2,
            ease: 'linear', repeat: Infinity,
        });
        return () => controls.stop();
    }, [hoveredNodeKey, rotation]);
    useEffect(() => {
        const calculateRadius = () => setRadius(window.innerHeight * 0.40);
        calculateRadius(); window.addEventListener('resize', calculateRadius);
        return () => window.removeEventListener('resize', calculateRadius);
    }, []);
    return (
        <motion.div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div className="relative w-0 h-0" style={{ rotate: rotation }}>
                {followers.map((follower, i) => {
                    const key = `mobile-node-${i}`;
                    const angle = (i / followers.length) * 2 * Math.PI;
                    const vector = { x: radius * Math.cos(angle), y: radius * Math.sin(angle), index: i };
                    return <OrbitingNode key={key} follower={follower} vector={vector} parentRotation={rotation} onNodeHoverStart={() => setHoveredNodeKey(key)} onNodeHoverEnd={() => setHoveredNodeKey(null)} isDimmed={hoveredNodeKey !== null && hoveredNodeKey !== key} scaleOnHover={1.8} />;
                })}
            </motion.div>
        </motion.div>
    );
};

const OrbitalSystem = () => {
    const { width } = useWindowSize();
    const [hoveredNodeKey, setHoveredNodeKey] = useState(null);
    const visibleFollowers = useMemo(() => {
        const maxNodes = (width || 0) < DESKTOP_BREAKPOINT ? MAX_NODES_MOBILE : MAX_NODES_DESKTOP;
        return shuffleArray([...innerCircle]).slice(0, maxNodes);
    }, [width]);
    if (!width) return null;
    return width < DESKTOP_BREAKPOINT ?
        <MobileOrbit followers={visibleFollowers} hoveredNodeKey={hoveredNodeKey} setHoveredNodeKey={setHoveredNodeKey} /> :
        <DesktopRing followers={visibleFollowers} hoveredNodeKey={hoveredNodeKey} setHoveredNodeKey={setHoveredNodeKey} />;
};

const HeroSection = () => (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden p-4">
        <StarfieldBackground />
        <OrbitalSystem />
        <motion.div
            className="relative flex flex-col items-center p-6 sm:p-8 rounded-lg bg-black/60 backdrop-blur-md border border-gray-800/50 z-20"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-wider leading-none">
                JOURNEY TO <span className="shimmer-text">2K</span>
            </h1>
            <p className="font-poppins text-sm sm:text-lg text-gray-400 mt-4 max-w-lg">
                I'm Dhruv, an 18-year-old CS student mastering backend development and know a little bit of frontend to make things look better. This is a tribute to the incredible community I'm building, with the goal of reaching 2,000 allies. Let's learn, build, and grow together.
            </p>
            <motion.a
                href={userXLink} target="_blank" rel="noopener noreferrer"
                className="cursor-pointer mt-8 inline-block px-10 sm:px-12 py-3 sm:py-4 font-bebas text-xl sm:text-2xl tracking-wider text-black rounded-sm"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 25px ${accentColor}90` }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${accentColor}` }} whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >Follow My Journey on X</motion.a>
            <div className="mt-6 flex items-center justify-center gap-6">
                <motion.a href={userGithub} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-400 hover:text-white" whileHover={{ y: -3, scale: 1.1 }}><SocialIcons.GitHub className="w-8 h-8" /></motion.a>
                <motion.a href={userLinkedIn} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-400 hover:text-white" whileHover={{ y: -3, scale: 1.1 }}><SocialIcons.LinkedIn className="w-8 h-8" /></motion.a>
            </div>
        </motion.div>
    </section>
);

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isPopped, setIsPopped] = useState(false);
    
    const handleLoadingComplete = () => {
        setIsLoading(false);
        setTimeout(() => {
            setIsPopped(true);
            setTimeout(() => setIsPopped(false), 5000);
        }, 2000);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;700&display=swap');
                .font-bebas { font-family: 'Bebas Neue', sans-serif; }
                .font-poppins { font-family: 'Poppins', sans-serif; }
                body { background-color: ${bgColor}; color: ${textColor}; cursor: none; overflow: hidden; }
                ::selection { background-color: ${accentColor}; color: ${bgColor}; }
                .cursor-pointer { cursor: none; }
                .shimmer-text {
                    color: ${accentColor};
                    background: linear-gradient(90deg, ${accentColor} 25%, #fff 50%, ${accentColor} 75%);
                    background-size: 400% 100%;
                    -webkit-background-clip: text; background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 5s linear infinite;
                }
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                .stars, .twinkling { position: absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; display:block; }
                .stars { background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCBsQKA473i6oAAAAoUlEQVRIx2P8//8/Ay0BEwONwUDBy0B+//3/n8EaBv//DxSCn4EDkGAYo4a/bAYGhv/3/3/ACkBEvwCqQBb/v0H8F0I6ToGjYChgBBgQIKwA+f/f/0/h//8/wH4FzMDAwMCg3wD5cWwA/Q8MPv/3/x8YGRiQAUwYjBJ41WAkEGMARQYWZgYGFwD5f0MDUyQjAxsDAzMAAACT4S3s81cQsgAAAABJRU5ErkJggg==) repeat top center; z-index: 0; }
                .twinkling { background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCBsQLA65q19MAAAAqklEQVRIx+3RsQ2DMBRF0e/M7PZPXsH4j+I/dC5nShro5dBrz0TjD4y/33/c+5Xvwr8zIqAAUkAJKAAFlIACUEACKAEFoAAUoAIUoAIUoAIUoAIUoAIUoAIUoAIUoAIUoAIUoAIUoAIUoP8g9/8AdfwX0AAvwQtYgS1YgS1YgS1YgS1YgS1YgS1YgS1YgS1YgS1YgS1YgS38A1j+A1iY/gBt291L/2/w5gAAAABJRU5ErkJggg==) repeat top center; z-index: 1; animation: move-twink-back 200s linear infinite; }
                @keyframes move-twink-back { from { background-position: 0 0; } to { background-position: -10000px 5000px; } }
            `}</style>
            <CustomCursor isLoading={isLoading} />
            <ConfettiCanvas isPopped={isPopped} />
            <AnimatePresence>
                {isLoading && <LandingAnimation key="loader" onComplete={handleLoadingComplete} />}
            </AnimatePresence>
            {!isLoading && (
                <motion.main className="min-h-screen w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0 }}>
                    <HeroSection />
                    <footer className="text-center py-4 px-2 fixed bottom-0 w-full z-50 pointer-events-none">
                        <p className="font-poppins text-xs sm:text-sm text-gray-700">
                            {userName} // CS'29 © {new Date().getFullYear()}.
                            <span className="block sm:inline-block sm:ml-1"></span>
                        </p>
                    </footer>
                </motion.main>
            )}
        </>
    );
}