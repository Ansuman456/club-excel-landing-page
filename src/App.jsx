import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Hexagon,
    ArrowDown,
    CornerRightDown,
    Terminal,
    LayoutGrid,
    BrainCircuit,
    Smartphone,
    Blocks,
    Zap,
    Infinity,
    ArrowUpRight,
    Briefcase,
    Network,
    Layers,
    Github,
    Linkedin,
    Twitter,
    Mail,
    MapPin
} from 'lucide-react';

function App() {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize AOS
        AOS.init({ duration: 800, once: true });

        // Custom Cursor Logic
        const cursor = cursorRef.current;
        const triggers = document.querySelectorAll('.hover-trigger, a, button');

        const handleMouseMove = (e) => {
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        };

        const handleMouseEnter = () => cursor?.classList.add('hovered');
        const handleMouseLeave = () => cursor?.classList.remove('hovered');

        document.addEventListener('mousemove', handleMouseMove);
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', handleMouseEnter);
            trigger.addEventListener('mouseleave', handleMouseLeave);
        });

        // 3D Tilt Card Logic
        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach(card => {
            const handleCardMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            };

            const handleCardMouseLeave = () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            };

            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
        });

        // Animated Canvas Background
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationId;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5;
                this.alpha = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            resize();
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        resize();
        initParticles();
        animate();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            triggers.forEach(trigger => {
                trigger.removeEventListener('mouseenter', handleMouseEnter);
                trigger.removeEventListener('mouseleave', handleMouseLeave);
            });
            window.removeEventListener('resize', handleResize);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    // Initialize UnicornStudio for Aura Background
    useEffect(() => {
        let scene = null;

        const initUnicornStudio = () => {
            if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                window.UnicornStudio.init().then((scenes) => {
                    if (scenes && scenes.length > 0) {
                        scene = scenes[0];
                    }
                }).catch((err) => {
                    console.warn('UnicornStudio init error:', err);
                });
            }
        };

        // Check if script is already loaded
        if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
            initUnicornStudio();
            return;
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src*="unicornStudio.umd.js"]');
        if (existingScript) {
            // Wait for existing script to load
            existingScript.addEventListener('load', initUnicornStudio);
            return;
        }

        // Load the script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
        script.onload = initUnicornStudio;
        document.head.appendChild(script);

        // Cleanup function to destroy the scene when component unmounts
        return () => {
            if (scene && typeof scene.destroy === 'function') {
                scene.destroy();
            }
        };
    }, []);

    return (
        <>
            {/* Aura Background - Interactive Canvas Animation */}
            <div
                className="aura-background-component fixed top-0 w-full h-screen -z-10"
                data-alpha-mask="80"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)'
                }}
            >
                <div
                    data-us-project="X0ErZR3QhPzMHfKgBbJJ"
                    className="absolute top-0 left-0 -z-10 w-full h-full"
                ></div>
            </div>

            {/* Custom Cursor */}
            <div id="cursor" ref={cursorRef}></div>

            {/* Animated Background */}
            <canvas id="bg-canvas" ref={canvasRef}></canvas>

            {/* Grain Overlay */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

            {/* Navigation */}
            <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-8 hover-trigger transition-all hover:bg-white/10 shadow-2xl shadow-black/50">
                    <a href="#" className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                        <Hexagon className="w-4 h-4 fill-white" />
                        CLUB EXCEL
                    </a>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wide hover-trigger">Home</a>
                        <a href="#about" className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wide hover-trigger">About</a>
                        <a href="#domains" className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors uppercase tracking-wide hover-trigger">Domains</a>
                    </div>
                    <a href="#join" className="text-[11px] font-semibold bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-colors hover-trigger">
                        Join Now
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full opacity-30 animate-pulse"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
                    <div data-aos="fade-down" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm text-[10px] tracking-widest text-neutral-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                        NIST's Premier Tech Community
                    </div>

                    <h1 data-aos="fade-up" data-aos-delay="100" className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500 leading-[0.9] hover-trigger cursor-default">
                        BUILD THE<br />IMPOSSIBLE
                    </h1>

                    <p data-aos="fade-up" data-aos-delay="200" className="max-w-xl mx-auto text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                        Club Excel is the architect of the future. We merge code, creativity, and chaos to forge the next generation of technologists.
                    </p>

                    <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <a href="#intro" className="group relative px-8 py-4 bg-white text-black text-xs font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover-trigger">
                            <span className="relative z-10 flex items-center gap-2">Discover More <ArrowDown className="w-3 h-3" /></span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Scroll-Driven Portal Section */}
            <section id="portal" className="relative py-32 bg-black border-t border-white/5 overflow-hidden">
                <div className="bg-grid-small absolute inset-0 z-0"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div data-aos="fade-right">
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-4">The Portal</h2>
                            <p className="text-neutral-500 text-sm max-w-sm">Step into a world where lines of code translate into tangible impact.</p>
                        </div>
                        <div className="hidden md:block">
                            <CornerRightDown className="w-12 h-12 text-neutral-700 animate-bounce" />
                        </div>
                    </div>

                    {/* The "Portal" Window */}
                    <div className="portal-container rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md p-3 shadow-[0_0_50px_-12px_rgba(59,130,246,0.1)]">
                        <div className="portal-window relative aspect-video bg-[#050505] rounded-xl overflow-hidden group border border-white/5">

                            {/* Fake UI Top Bar */}
                            <div className="absolute top-0 left-0 right-0 h-9 bg-neutral-900/90 border-b border-white/5 flex items-center px-4 gap-2 z-20">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors"></div>
                                </div>
                                <div className="mx-auto text-[10px] text-neutral-500 font-mono tracking-widest flex items-center gap-2">
                                    <Terminal className="w-3 h-3" /> club_excel_core.sys
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 pt-9 flex items-center justify-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    {/* Terminal Side */}
                                    <div className="border-r border-white/5 p-10 flex flex-col justify-center bg-black/40">
                                        <div className="font-mono text-xs text-blue-400 mb-4 tracking-wide">&gt; initiating_sequence...</div>
                                        <div className="font-mono text-xs text-neutral-400 space-y-2">
                                            <div className="flex items-center gap-2"><span className="text-neutral-600">[00:01]</span> Loading modules...</div>
                                            <div className="flex items-center gap-2 text-green-400/80"><span className="text-neutral-600">[00:02]</span> [OK] Web Development</div>
                                            <div className="flex items-center gap-2 text-green-400/80"><span className="text-neutral-600">[00:03]</span> [OK] Artificial Intelligence</div>
                                            <div className="flex items-center gap-2 text-green-400/80"><span className="text-neutral-600">[00:04]</span> [OK] Blockchain Protocol</div>
                                            <div className="flex items-center gap-2 text-green-400/80"><span className="text-neutral-600">[00:05]</span> [OK] Mobile Architecture</div>
                                            <div className="mt-4 text-blue-400">&gt; Ready for input<span className="blink-cursor inline-block w-2 h-4 align-middle bg-blue-400 ml-1"></span></div>
                                        </div>
                                    </div>

                                    {/* Visual Side */}
                                    <div className="relative overflow-hidden hidden md:block">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-48 h-48 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                            <div className="w-32 h-32 border border-blue-500/30 rounded-full absolute animate-[spin_10s_linear_infinite] border-t-transparent border-r-transparent"></div>
                                            <div className="w-48 h-48 border border-purple-500/20 rounded-full absolute animate-[spin_15s_linear_infinite_reverse] border-b-transparent border-l-transparent"></div>
                                            <div className="absolute w-2 h-2 bg-white rounded-full blur-[2px] animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3D Tilt Services / Domains */}
            <section id="domains" className="py-32 bg-black relative">
                {/* Decoration */}
                <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-900/5 blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-xs font-mono text-blue-500 mb-12 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> System Modules
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                        {/* Full Stack Card */}
                        <div className="tilt-card group h-[420px] relative rounded-3xl bg-[#080808] border border-white/10 hover:border-white/20 transition-all duration-300 p-8 overflow-hidden hover-trigger hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="tilt-content relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
                                        <LayoutGrid className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Full Stack</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">Architecting scalable web solutions from root to node.</p>
                                </div>

                                {/* Visual: Code Window */}
                                <div className="tilt-inner mt-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out test-padding">
                                    <div className="code-window p-5 shadow-2xl bg-black/90 backdrop-blur border-white/10 group-hover:border-blue-500/20 transition-colors">
                                        <div className="flex gap-2 mb-4 opacity-40">
                                            <span className="code-dot bg-red-500"></span>
                                            <span className="code-dot bg-yellow-500"></span>
                                            <span className="code-dot bg-green-500"></span>
                                        </div>
                                        <div className="text-neutral-400 font-mono text-[11px]">
                                            <span className="text-purple-400">const</span> app = <span className="text-blue-400">new</span> NextApp();<br />
                                            <span className="text-purple-400">await</span> app.<span className="text-yellow-300">deploy</span>({'{'}<br />
                                            &nbsp;&nbsp;target: <span className="text-green-400">'serverless'</span>,<br />
                                            &nbsp;&nbsp;mode: <span className="text-green-400">'production'</span><br />
                                            {'}'});
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI/ML Card */}
                        <div className="tilt-card group h-[420px] relative rounded-3xl bg-[#080808] border border-white/10 hover:border-white/20 transition-all duration-300 p-8 overflow-hidden hover-trigger hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="tilt-content relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-colors">
                                        <BrainCircuit className="w-6 h-6 text-white group-hover:text-purple-200 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Intelligence</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">Training models to predict, analyze and automate the future.</p>
                                </div>

                                {/* Visual: Data Graph */}
                                <div className="tilt-inner mt-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out test-padding">
                                    <div className="code-window p-5 shadow-2xl bg-black/90 backdrop-blur border-white/10 h-32 flex items-end justify-between gap-2 group-hover:border-purple-500/20 transition-colors">
                                        <div className="w-full bg-purple-500/20 h-[40%] rounded-sm transition-all duration-700 delay-75 group-hover:bg-purple-500/40 group-hover:h-[60%]"></div>
                                        <div className="w-full bg-purple-500/40 h-[70%] rounded-sm transition-all duration-700 delay-100 group-hover:bg-purple-500/60 group-hover:h-[50%]"></div>
                                        <div className="w-full bg-purple-500/60 h-[50%] rounded-sm transition-all duration-700 delay-150 group-hover:bg-purple-500/80 group-hover:h-[80%]"></div>
                                        <div className="w-full bg-purple-500/80 h-[90%] rounded-sm transition-all duration-700 delay-200 group-hover:bg-white group-hover:h-[95%]"></div>
                                        <div className="w-full bg-white h-[60%] rounded-sm transition-all duration-700 delay-300 group-hover:bg-purple-500/30 group-hover:h-[70%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* App Dev Card */}
                        <div className="tilt-card group h-[420px] relative rounded-3xl bg-[#080808] border border-white/10 hover:border-white/20 transition-all duration-300 p-8 overflow-hidden hover-trigger hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="tilt-content relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-colors">
                                        <Smartphone className="w-6 h-6 text-white group-hover:text-green-200 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Mobile Native</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">Crafting seamless experiences for iOS and Android ecosystems.</p>
                                </div>

                                {/* Visual: Phone Mockup */}
                                <div className="tilt-inner mt-8 flex justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <div className="w-36 h-44 border-[6px] border-neutral-800 bg-neutral-900 rounded-t-3xl border-b-0 relative overflow-hidden shadow-2xl group-hover:border-neutral-700 transition-colors">
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-neutral-800 rounded-full"></div>
                                        <div className="mt-8 mx-3 space-y-3 opacity-60">
                                            <div className="h-10 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-lg w-full"></div>
                                            <div className="flex gap-2">
                                                <div className="h-16 bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-lg w-1/2"></div>
                                                <div className="h-16 bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-lg w-1/2"></div>
                                            </div>
                                            <div className="h-20 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-lg w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blockchain Card */}
                        <div className="tilt-card group h-[420px] relative rounded-3xl bg-[#080808] border border-white/10 hover:border-white/20 transition-all duration-300 p-8 overflow-hidden hover-trigger hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="tilt-content relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-colors">
                                        <Blocks className="w-6 h-6 text-white group-hover:text-orange-200 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Web3</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed">Decentralized protocols and smart contract engineering.</p>
                                </div>

                                {/* Visual: Blocks */}
                                <div className="tilt-inner mt-8 flex items-center justify-center gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-80 test-padding-more">
                                    <div className="w-12 h-12 border border-orange-500/50 bg-orange-500/10 rounded-lg flex items-center justify-center text-[10px] font-mono text-orange-400 shadow-[0_0_15px_-5px_rgba(249,115,22,0.5)]">HASH</div>
                                    <div className="w-8 h-[1px] bg-neutral-700 relative">
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-[ping_1.5s_linear_infinite]"></div>
                                    </div>
                                    <div className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-mono text-neutral-300">0x4F</div>
                                    <div className="w-8 h-[1px] bg-neutral-700"></div>
                                    <div className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-mono text-neutral-300">0x9A</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* NEW SECTION 1: INTRODUCTION */}
            <section id="intro" className="relative py-32 bg-[#020202] border-t border-white/5 overflow-hidden">
                {/* Aura Spotlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-40 pointer-events-none"></div>
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-600/5 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div data-aos="fade-up" className="inline-block mb-6">
                        <span className="py-1 px-3 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-widest uppercase">
                            NIST's Premier Tech Hub
                        </span>
                    </div>

                    <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-8 leading-[1.1]">
                        Pioneering the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Digital Frontier</span>
                    </h2>

                    <p data-aos="fade-up" data-aos-delay="200" className="text-neutral-400 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
                        Club Excel is the cornerstone of technical innovation at the National Institute of Science and Technology.
                        We are a collective of visionaries focused on <span className="text-white font-normal">Full Stack</span>, <span className="text-white font-normal">Cloud Computing</span>, and <span className="text-white font-normal">Artificial Intelligence</span>.
                        We don't just write code; we cultivate the skills that forge the future.
                    </p>
                </div>
            </section>

            {/* NEW SECTION 2: ABOUT (Bento Grid Style) */}
            <section id="about" className="relative py-24 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <h2 data-aos="fade-right" className="text-3xl md:text-5xl font-medium tracking-tighter text-white">The Ecosystem</h2>
                        <p data-aos="fade-left" className="text-neutral-500 text-sm max-w-xs mt-4 md:mt-0 text-right">Where innovation thrives and boundaries are broken.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Main Feature Card */}
                        <div data-aos="fade-up" className="md:col-span-2 relative p-8 md:p-12 rounded-3xl bg-neutral-900/20 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
                                <div>
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 mb-6">
                                        <Zap className="w-5 h-5 text-yellow-200" />
                                    </div>
                                    <h3 className="text-2xl font-medium text-white mb-4">Innovation Unleashed</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                                        Whether you are a coding enthusiast or just beginning your journey, Club Excel provides the platform to hone your technical skills. We collaborate on inventive projects that push the limits of what's possible in tech.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500">Domains</div>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-neutral-300 border border-white/5">Web</span>
                                        <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-neutral-300 border border-white/5">App</span>
                                        <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-neutral-300 border border-white/5">AI/ML</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background element */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors"></div>
                        </div>

                        {/* Secondary Card */}
                        <div data-aos="fade-up" data-aos-delay="100" className="relative p-8 rounded-3xl bg-neutral-900/20 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden group flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>

                            <div className="relative z-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Infinity className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">Limitless Potential</h3>
                                <p className="text-neutral-500 text-xs leading-relaxed">
                                    Join us in pushing the boundaries. Be part of the future of technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 3: WHY CHOOSE US */}
            <section className="relative py-32 bg-[#020202] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-6">Why Choose Us?</h2>
                        <p data-aos="fade-up" data-aos-delay="100" className="text-neutral-400 text-sm">Joining Club Excel is more than a membership; it's a career accelerator.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div data-aos="fade-up" className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500">
                            <div className="h-full bg-black rounded-xl p-8 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                    <Briefcase className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">Professional Growth</h3>
                                <p className="text-neutral-500 text-xs leading-relaxed group-hover:text-neutral-400 transition-colors">
                                    Gain hands-on experience that bridges the gap between academic theory and industry demands.
                                </p>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div data-aos="fade-up" data-aos-delay="100" className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-500">
                            <div className="h-full bg-black rounded-xl p-8 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                                    <Network className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">Industry Gateways</h3>
                                <p className="text-neutral-500 text-xs leading-relaxed group-hover:text-neutral-400 transition-colors">
                                    Open doors to exciting opportunities and connect with a network of successful alumni and experts.
                                </p>
                            </div>
                        </div>

                        {/* Benefit 3 */}
                        <div data-aos="fade-up" data-aos-delay="200" className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-emerald-500/50 transition-all duration-500">
                            <div className="h-full bg-black rounded-xl p-8 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center mb-6 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                    <Layers className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">Strong Foundation</h3>
                                <p className="text-neutral-500 text-xs leading-relaxed group-hover:text-neutral-400 transition-colors">
                                    Build a robust technical foundation that prepares you for a thriving career in the ever-evolving tech world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="join" className="relative bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-black to-black"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-6">
                            <a href="#" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-3">
                                <Hexagon className="w-8 h-8 fill-white" />
                                CLUB EXCEL
                            </a>
                            <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
                                National Institute of Science and Technology.<br />
                                Empowering students to build the future through code.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all hover-trigger"><Github className="w-4 h-4" /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all hover-trigger"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all hover-trigger"><Twitter className="w-4 h-4" /></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-mono text-xs text-neutral-500 mb-6 uppercase tracking-widest">Sitemap</h4>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li><a href="#" className="hover:text-white transition-colors hover-trigger">Home</a></li>
                                <li><a href="#domains" className="hover:text-white transition-colors hover-trigger">Domains</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors hover-trigger">About</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-mono text-xs text-neutral-500 mb-6 uppercase tracking-widest">Contact</h4>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> clubexcel@nist.edu</li>
                                <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> NIST, Odisha</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
                        <p>© 2024 Club Excel. Built for the future.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-neutral-400">Privacy</a>
                            <a href="#" className="hover:text-neutral-400">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
