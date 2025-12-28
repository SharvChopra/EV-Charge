import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Map, User, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center w-full">
            <div className="glass-panel rounded-full px-8 py-3 flex justify-between items-center w-full max-w-7xl shadow-lg">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-full text-white group-hover:scale-110 transition-transform">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
                        EV<span className="text-blue-600">Route</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                            {user.role === 'admin' ? (
                                <>
                                    <Link to="/admin" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">
                                        <Shield size={16} />
                                        <span>Admin</span>
                                    </Link>
                                    <Link to="/settings" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                        <User size={16} />
                                        <span>Settings</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/map" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                        <Map size={16} />
                                        <span>Map</span>
                                    </Link>
                                    <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                        <User size={16} />
                                        <span>Dashboard</span>
                                    </Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-2">
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Log In</Link>
                            <Link to="/register" className="btn-primary px-5 py-2 rounded-full text-sm font-bold">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
