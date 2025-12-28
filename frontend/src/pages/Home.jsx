import { Link } from 'react-router-dom';
import { Map, Zap, Shield, ArrowRight, Star, Check, Battery, Navigation, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen pt-24 bg-gradient-to-b from-aurora-bg via-purple-50/30 to-white">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[120px]"
                />

                <div className="relative z-10 text-center max-w-5xl mx-auto mt-[-50px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/70 border border-blue-100 mb-8 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-slate-600 tracking-wide uppercase">#1 Rated EV Journey Planner</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-8 text-slate-900 tracking-tighter leading-[1.1]"
                    >
                        Plan. Charge. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient-x">Live Electric.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Eliminate range anxiety forever. Our AI-driven route planner optimizes trips based on your vehicle's specific battery profile and real-time charger availability.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24"
                    >
                        <Link to="/map" className="btn-primary px-10 py-5 rounded-full font-bold text-xl flex items-center gap-3 w-full sm:w-auto justify-center min-w-[220px] shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all">
                            Start Planning <ArrowRight size={22} />
                        </Link>
                        <Link to="/register" className="glass-panel text-slate-700 px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition border-white/50 w-full sm:w-auto justify-center min-w-[220px] flex items-center gap-2 group">
                            Create Account <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>

                    {/* Hero Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200/60 pt-10 max-w-4xl mx-auto"
                    >
                        {[
                            { label: 'Active Users', value: '10K+' },
                            { label: 'Stations Mapped', value: '5,000+' },
                            { label: 'Routes Planned', value: '50K+' },
                            { label: 'CO2 Saved', value: '120T' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
                                <p className="text-slate-500 font-semibold uppercase text-xs tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Route Planning Preview Section (New) */}
            <section className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-10 rounded-full"></div>
                            <div className="relative glass-panel p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
                                <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-100">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">A</div>
                                        <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full w-1/2 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">B</div>
                                    </div>
                                    <div className="flex justify-between text-sm font-semibold text-slate-600">
                                        <span>Delhi, IN</span>
                                        <span>3h 45m</span>
                                        <span>Jaipur, RJ</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Best Route Found', sub: '2 Charging Stops • ₹450 Est. Cost', icon: <Check size={18} className="text-green-500" />, active: true },
                                        { title: 'Fastest Charger', sub: '150kW DC Fast Charging Available', icon: <Zap size={18} className="text-orange-500" />, active: false },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${item.active ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100'}`}>
                                            <div className={`p-2 rounded-full ${item.active ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className={`font-bold ${item.active ? 'text-blue-900' : 'text-slate-700'}`}>{item.title}</p>
                                                <p className="text-xs text-slate-500">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Seamless Journey</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Master Your <br />Route Planning.</h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Simply enter your destination and let our algorithms do the heavy lifting. We calculate battery consumption, elevation changes, and charger reliability to give you the perfect trip plan.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Real-time charger status availability',
                                    'Route optimization based on car model',
                                    'Reserve charging slots in advance',
                                    'Integrated payment gateway'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={14} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/map" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition text-lg group">
                                View Interactive Map <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Cards */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-black text-slate-900 mb-4"
                    >
                        Everything you need to charge.
                    </motion.h2>
                    <motion.p
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-xl"
                    >
                        Integrated features designed for the modern EV owner.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Navigation size={32} className="text-white" />, title: "Smart Routing", desc: "Optimized paths based on your vehicle's real-time range and battery health.", color: "from-blue-500 to-blue-600" },
                        { icon: <Zap size={32} className="text-white" />, title: "Live Availability", desc: "See real-time slot availability so you never wait at a charger again.", color: "from-green-400 to-emerald-600" },
                        { icon: <Shield size={32} className="text-white" />, title: "Secure Payments", desc: "Book and pay for your charging slot in advance with bank-grade security.", color: "from-violet-500 to-purple-600" }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section (New) */}
            <section className="py-24 px-6 bg-slate-900 mx-4 md:mx-10 rounded-[3rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">Community Love</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Driven by EV Enthusiasts</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Priya Sharma", role: "Tesla Model 3 Owner", text: "EV Route completely changed how I plan my weekend trips. No more range anxiety!", rating: 5 },
                            { name: "Rahul Verma", role: "Nexon EV Owner", text: "The booking feature is a lifesaver. I can reserve a slot while on the highway.", rating: 5 },
                            { name: "Amit Patel", role: "MG ZS EV Owner", text: "Clean interface, accurate data, and the route planning is spot on.", rating: 4 },
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                whileInView={{ opacity: 1, scale: 1 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, r) => (
                                        <Star key={r} size={16} className={`${r < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                                    ))}
                                </div>
                                <p className="text-lg font-medium leading-relaxed mb-8 text-slate-200">"{testimonial.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
