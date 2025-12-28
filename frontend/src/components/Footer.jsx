import { Zap, Facebook, Twitter, Instagram, Linkedin, Mail, Map, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 rounded-t-[3rem] mt-20 relative overflow-hidden">
            {/* Background/Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-6 group">
                        <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <span className="font-bold text-2xl text-white">EV<span className="text-blue-500">Route</span></span>
                    </Link>
                    <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                        Empowering the electric future with intelligent route planning and seamless charging experiences.
                    </p>
                    <div className="flex gap-4">
                        {[<Facebook />, <Twitter />, <Instagram />, <Linkedin />].map((icon, i) => (
                            <a key={i} href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/map" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Find Stations</Link></li>
                        <li><Link to="/register" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Plan a Trip</Link></li>
                        <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> User Dashboard</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Business API</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Company</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Stay Connected</h4>
                    <p className="text-sm text-slate-400 mb-4">Get the latest station updates and EV news.</p>
                    <form className="flex flex-col gap-3">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <Mail className="absolute right-3 top-3.5 text-slate-500" size={18} />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/50">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 pb-4 text-center">
                <p className="text-slate-500 text-sm">© {new Date().getFullYear()} EV Route Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
