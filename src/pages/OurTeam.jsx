import { useState } from 'react';
import { Hexagon, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const OurTeam = () => {
    const advisors = [
        { name: "Swetanjali Mahrana", role: "Assistant Professor", img: "swetanjali.jpg", color: "blue" },
        { name: "Bandhan Panda", role: "Assistant Professor", img: "bandhan.jpg", color: "blue" }
    ];

    const members = [


        { name: "Payal", role: "Core Member", img: "payaljr.jpg" },
        { name: "Govinda", role: "Core Member", img: "Govindajr.jpg" },
        { name: "Rudransh", role: "Core Member", img: "rudranshjr.jpg" },
        { name: "Gaurav Tiwari", role: "Core Member", img: "gauravjr.jpg" },
        { name: "Abhimanyu", role: "Core Member", img: "Abhimanyujr.jpg" },
        { name: "Sriya", role: "Core Member", img: "usriyareddyjr.jpg" },
        { name: "Sruti", role: "Core Member", img: "srutiprustyjr.jpg" },
        { name: "Priya", role: "Core Member", img: "Priyapatrajr.jpg" },
        { name: "Sudip", role: "Core Member", img: "Sudipdasjr.jpg" },
        { name: "Rudra", role: "Core Member", img: "Rudrajr.jpg" },
        { name: "Aman", role: "Core Member", img: "amanjr.jpg" },
        { name: "Srikant", role: "Core Member", img: "srikantjr.jpg" },
        { name: "Mohammad Ehsan", role: "Core Member", img: "eshanjr.jpg" },
        { name: "Sai Kalyan", role: "Core Member", img: "Ksaikalyanjr.jpg" },
        { name: "Disha", role: "Core Member", img: "disha.jpg", linkedin: "https://www.linkedin.com/in/disha-rani-dash-74409b2b5" },
        { name: "Sweta Gupta", role: "Core Member", img: "sweta.jpg", linkedin: "https://www.linkedin.com/in/sweta-gupta-67386b282" },
        { name: "Renisha Parui", role: "Core Member", img: "renisa.jpg", linkedin: "https://www.linkedin.com/in/renisha-p-3b264a263/" },
        { name: "Abhisekh Padhy", role: "Core Member", img: "abhishek.jpg", linkedin: "https://www.linkedin.com/in/abhisekh-padhy-7374011b6" },
        { name: "Biraja", role: "Core Member", img: "biraja.jpg", linkedin: "https://www.linkedin.com/in/biraja-nayak-993960310" },
        { name: "Samiksha Mohapatra", role: "Core Member", img: "samiksha.jpg", linkedin: "https://www.linkedin.com/in/samiksha-mohapatra-a34517334/" },
        { name: "Akash Kumar", role: "Core Member", img: "akash.jpg", linkedin: "https://www.linkedin.com/in/akash-kumar-17576132b" },
        { name: "Sujata Kumari", role: "Core Member", img: "sujata.jpg", linkedin: "https://www.linkedin.com/in/sujata-kumari-44779b316/" },
        { name: "Ashutosh Nayak", role: "Core Member", img: "ashutoshnayak.jpg", linkedin: "https://www.linkedin.com/in/ashutosh-nayak-749ab4222" },
        { name: "Tadvab Pradhan", role: "Core Member", img: "tadvab.jpg", linkedin: "https://www.linkedin.com/in/tadvab-pradhan-97a976300" },
        { name: "Riya Suman Padhy", role: "Core Member", img: "riya.jpg", linkedin: "https://www.linkedin.com/in/riya-padhy-139397330" },
        { name: "Amitanshu Sahu", role: "Core Member", img: "amitanshu.jpg", linkedin: "https://www.linkedin.com/in/amitanshusahu/" },
        { name: "K Swagat Kumar", role: "Core Member", img: "swagat.jpg", linkedin: "https://www.linkedin.com/in/k-swagat-kumar-919046210/" },
        { name: "sai sarthak sadangi", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/sai-sarthak-sadangi/" },
        { name: "Ashmita Maharana", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/ashmita-maharana/" },
        { name: "N Jayant Rao", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/n-jayant-rao-093036315" },
        { name: "Md Amanullah", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/md-amanullah-79523224b/" },
        { name: "Ayush Kumar Gupta", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/ayush-kumar-gupta-a1450a324/" },
        { name: "D.Jyothika", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/d-jyothika-2b5734332" },
        { name: "Puja Pradhan", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/puja-pradhan-34ba2b248" },
        { name: "Vineet Patnaik", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/vineet-patnaik-76857436b/" },
        { name: "Ansuman Padhy", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/ansuman-padhy-7603b5322/" },
        { name: "Koustubha pathy", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/koustubha-pathy-758243332" },
        { name: "M.Roshni Princy", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/m-roshni-princy-ba517a358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
        { name: "Aditya kumar Rath", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/aditya-kumar-rath-849aa5309" },
        { name: "Rajiv dey", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/rajiv-dey-6b4033307" },
        { name: "Yagyashini Bhagat", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/yagyashini-bhagat-18151a332" },
        { name: "Rishav Kumar Singh", role: "Core Member", img: "avatar.png", linkedin: "https://www.linkedin.com/in/rishav-kumar-singh-81a69433b" }
    ];

    const alumni = [
        { name: "Anwesh", role: "Club Alumni", img: "anwesh.jpg" },
        { name: "Mayank", role: "Club Alumni", img: "mayank.jpg" },
        { name: "SOUMIK BERA", role: "Club Alumni", img: "soumik.jpg" },
        { name: "Bishal", role: "Club Alumni", img: "bishal.jpg" },
        { name: "Akshat", role: "Club Alumni", img: "akshat.jpg" },
        { name: "Naveen", role: "Club Alumni", img: "naveen.jpg" },
        { name: "Abhinav", role: "Club Alumni", img: "abhinav.jpg" },
        { name: "Rahul Kumar", role: "Club Alumni", img: "rahul.jpg" },
        { name: "Gourav", role: "Club Alumni", img: "gourav.jpg" },
        { name: "Asutosh", role: "Club Alumni", img: "ashutosh.png" },
        { name: "Ashutosh Biswal", role: "Club Alumni", img: "ashutoshbiswal.jpg" },
        { name: "Adil Zamal", role: "Club Alumni", img: "adil.jpg" },
        { name: "Rishav Kumar", role: "Club Alumni", img: "RishavKumar.jpg" },
        { name: "Asish Patnaik", role: "Club Alumni", img: "asishpatnaik.jpg" },
        { name: "Aryan Asgar", role: "Club Alumni", img: "aryan.jpg" },
        { name: "Chiranjeeb Nayak", role: "Club Alumni", img: "chiranjeeb.jpg" },
        { name: "K Nandini Dora", role: "Club Alumni", img: "nandini.jpg" },
        { name: "Nikhil Kumar Singh", role: "Club Alumni", img: "nikhil.jpg" },
        { name: "Ritik Kumar Kapsime", role: "Club Alumni", img: "ritik.jpg" },
        { name: "Sanat Dash", role: "Club Alumni", img: "sanat.jpg" },
        { name: "Sushovan Paul", role: "Club Alumni", img: "sushovan.jpg" },
        { name: "Sunny Kumar", role: "Club Alumni", img: "sunny.jpg" },
        { name: "Ashu Sharma", role: "Club Alumni", img: "ashu.jpg" },
        { name: "Akarsh Agarwal", role: "Club Alumni", img: "akarsh.jpg" },
        { name: "Dipti Mishra", role: "Club Alumni", img: "deepti.jpg" },
        { name: "Hritvik Ranjan", role: "Club Alumni", img: "hritvik.jpg" },
        { name: "Laxmi Narayan", role: "Club Alumni", img: "narayan.jpg" },
        { name: "Rupesh Raj Tripathy", role: "Club Alumni", img: "rupesh.jpg" },
        { name: "Shradha Kyal", role: "Club Alumni", img: "sradha.jpg" },
        { name: "Sonali Sahu", role: "Club Alumni", img: "sonali.jpg" },
        { name: "Niharika Kumari", role: "Club Alumni", img: "Niharika.jpg" },
        { name: "Suraj Kumar Sahu", role: "Club Alumni", img: "suraj.jpg" },
        { name: "Sarbajit Mohanty", role: "Club Alumni", img: "sarbajit.jpg" },
        { name: "Sanjeev", role: "Club Alumni", img: "sanjeev.jpg" },
        { name: "Pabitra", role: "Club Alumni", img: "Pabitra.jpg" },
        { name: "Vibhav", role: "Club Alumni", img: "vibhav.jpg" },
        { name: "Varsha", role: "Club Alumni", img: "varsha.jpg" },
        { name: "Biswamohan", role: "Club Alumni", img: "Biswabhiya.jpg" },
        { name: "Faizan", role: "Club Alumni", img: "faizanbhiya.jpg" },
        { name: "Kishlay", role: "Club Alumni", img: "kishlaybhiya.png" },
        { name: "Richa", role: "Club Alumni", img: "richadi.jpg" },
        { name: "Ankit", role: "Club Alumni", img: "Ankitbhiya.jpg" },
        { name: "Srikant", role: "Club Alumni", img: "srikant.jpg" },
        { name: "Sanket", role: "Club Alumni", img: "sanket.jpg" },
        { name: "samrat", role: "Club Alumni", img: "samrat.jpg" },
        { name: "Rupa", role: "Club Alumni", img: "rupa.jpg" }
    ];

    const [activeSection, setActiveSection] = useState('members'); // 'members' or 'alumni'

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-32">
                <h1 data-aos="fade-up" className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
                    OUR TEAM
                </h1>
                <p data-aos="fade-up" data-aos-delay="100" className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                    The visionaries and innovators behind Club Excel. From our dedicated advisors to our successful alumni network.
                </p>
            </div>

            {/* Advisors Section */}
            <section className="mb-40">
                <h2 data-aos="fade-right" className="text-sm font-mono text-blue-500 mb-16 uppercase tracking-widest flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span> Club Advisors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {advisors.map((advisor, idx) => (
                        <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}
                            className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500 tilt-card">
                            <div className="h-full bg-[#080808] rounded-[1.9rem] p-10 border border-white/5 relative overflow-hidden flex flex-col items-center">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-64 h-64 rounded-2xl overflow-hidden mb-10 border border-white/10 group-hover:border-blue-500/30 transition-all duration-700 bg-neutral-900 shadow-2xl">
                                    <img
                                        src={`/members/${advisor.img}`}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + advisor.name + "&background=111&color=fff"; }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{advisor.name}</h3>
                                <p className="text-blue-400 font-mono text-xs tracking-[0.2em] uppercase mb-1">Club Advisor</p>
                                <p className="text-neutral-500 font-mono text-[10px] tracking-[0.1em] uppercase mb-8">{advisor.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Toggle Buttons */}
            <div className="flex justify-center gap-6 mb-20" data-aos="fade-up">
                <button
                    onClick={() => setActiveSection('members')}
                    className={`px-8 py-3 rounded-full font-mono text-sm tracking-widest transition-all duration-300 border ${activeSection === 'members'
                        ? 'bg-purple-500 text-white border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                        : 'bg-transparent text-neutral-500 border-white/10 hover:border-white/20'
                        }`}
                >
                    CORE MEMBERS
                </button>
                <button
                    onClick={() => setActiveSection('alumni')}
                    className={`px-8 py-3 rounded-full font-mono text-sm tracking-widest transition-all duration-300 border ${activeSection === 'alumni'
                        ? 'bg-purple-500 text-white border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                        : 'bg-transparent text-neutral-500 border-white/10 hover:border-white/20'
                        }`}
                >
                    CLUB ALUMNI
                </button>
            </div>

            {/* Members Section */}
            {activeSection === 'members' && (
                <section className="mb-40 transition-all duration-500">
                    <h2 data-aos="fade-right" className="text-sm font-mono text-purple-500 mb-16 uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></span> Core Members
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {members.map((member, idx) => (
                            <div
                                key={idx}
                                data-aos="fade-up"
                                data-aos-delay={(idx % 4) * 50}
                                onClick={() => member.linkedin && window.open(member.linkedin, '_blank')}
                                className={`group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-500 tilt-card h-[480px] ${member.linkedin ? 'cursor-pointer' : ''}`}
                            >
                                <div className="h-full bg-[#080808] rounded-[2.4rem] p-10 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-40 h-40 rounded-3xl overflow-hidden mb-8 border border-white/5 group-hover:border-purple-500/20 transition-all duration-700 bg-neutral-900 shadow-2xl">
                                        <img
                                            src={`/members/${member.img}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=111&color=fff"; }}
                                        />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight">{member.name}</h4>
                                    <p className="text-[11px] text-purple-400/80 font-mono uppercase tracking-[0.25em]">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Alumni Section */}
            {activeSection === 'alumni' && (
                <section className="transition-all duration-500">
                    <h2 data-aos="fade-right" className="text-sm font-mono text-purple-500 mb-16 uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></span> Distinguished Alumni
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {alumni.map((member, idx) => (
                            <div
                                key={idx}
                                data-aos="fade-up"
                                data-aos-delay={(idx % 4) * 50}
                                onClick={() => member.linkedin && window.open(member.linkedin, '_blank')}
                                className={`group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-500 tilt-card h-[480px] ${member.linkedin ? 'cursor-pointer' : ''}`}
                            >
                                <div className="h-full bg-[#080808] rounded-[2.4rem] p-10 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-40 h-40 rounded-3xl overflow-hidden mb-8 border border-white/5 group-hover:border-purple-500/20 transition-all duration-700 bg-neutral-900 shadow-2xl">
                                        <img
                                            src={`/members/${member.img}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=111&color=fff"; }}
                                        />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight">{member.name}</h4>
                                    <p className="text-[11px] text-purple-400/80 font-mono uppercase tracking-[0.25em]">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default OurTeam;
