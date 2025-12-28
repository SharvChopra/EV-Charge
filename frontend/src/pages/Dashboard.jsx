import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Settings as SettingsIcon, Map, History, Calendar, Battery, ArrowRight, Zap, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get('/bookings');
                setBookings(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchBookings();
    }, [user]);

    // Placeholder stats
    const stats = [
        { label: 'Total Distance', value: '1,240 km', icon: <Map className="text-blue-500" size={24} />, color: 'bg-blue-50' },
        { label: 'Energy Saved', value: '450 kWh', icon: <Zap className="text-green-500" size={24} />, color: 'bg-green-50' },
        { label: 'C02 Reduced', value: '120 kg', icon: <Battery className="text-teal-500" size={24} />, color: 'bg-teal-50' },
    ];

    if (!user) return <div className="text-center mt-20 text-slate-500">Loading...</div>;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">
                            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">{user.name.split(' ')[0]}</span> 👋
                        </h1>
                        <p className="text-slate-500 font-medium">Welcome back to your EV command center.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/settings" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm">
                            <SettingsIcon size={18} /> Settings
                        </Link>
                        <Link to="/map" className="btn-primary px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2">
                            <Map size={18} /> Plan New Trip
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-panel p-6 rounded-3xl flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
                            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Booking History */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <History className="text-purple-500" /> Recent Activity
                        </h2>

                        {bookings.length === 0 ? (
                            <div className="bg-white p-12 rounded-[2rem] border border-dashed border-slate-300 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">No bookings yet</h3>
                                <p className="text-slate-500 mb-6">Start planning your first trip to see history here.</p>
                                <Link to="/map" className="text-blue-600 font-bold hover:underline">Plan a route now &rarr;</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                                                    {booking.stationName || 'Unknown Station'}
                                                </h3>
                                                <p className="text-slate-500 text-sm">
                                                    {new Date(booking.startTime).toLocaleDateString()} • {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(new Date(booking.startTime).getTime() + (booking.duration * 3600000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {booking.status}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex gap-4 text-sm font-medium text-slate-600">
                                                <span>₹{booking.totalCost}</span>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    <span>{booking.stationAddress || 'Location N/A'}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Profile / Vehicle Card */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <SettingsIcon className="text-orange-500" /> Vehicle Profile
                        </h2>
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

                            <div className="relative z-10">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">My Vehicle</p>
                                <h3 className="text-3xl font-black mb-6">{user?.vehicle?.model || 'No Model Set'}</h3>

                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Battery</p>
                                        <p className="font-bold text-xl">{user?.vehicle?.batteryCapacity || '--'} <span className="text-sm font-normal text-slate-500">kWh</span></p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Range</p>
                                        <p className="font-bold text-xl">{user?.vehicle?.averageRange || '--'} <span className="text-sm font-normal text-slate-500">km</span></p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-500 text-xs mb-2">Current Charge</p>
                                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                                style={{ width: `${user?.vehicle?.currentBattery || 0}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-1.5 text-xs text-slate-400 font-medium">
                                            <span>{user?.vehicle?.currentBattery || 0}%</span>
                                            <span>Ready</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/settings" className="mt-8 w-full bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm">
                                    Update Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
