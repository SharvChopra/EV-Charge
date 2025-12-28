import { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import BookingModal from '../components/BookingModal';
import api from '../utils/api';
import { Search, MapPin, Navigation, Info, Zap, ArrowRight } from 'lucide-react';

const MapPage = () => {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [currentBattery, setCurrentBattery] = useState('');
    const [vehicleRange, setVehicleRange] = useState('');
    const [route, setRoute] = useState(null);
    const [routeStats, setRouteStats] = useState({ duration: 0, distance: 0 });
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // useEffect(() => {
    //     const fetchStations = async () => {
    //         try {
    //             const res = await api.get('/stations');
    //             setStations(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchStations();
    // }, []);

    const handlePlanRoute = async (e) => {
        e.preventDefault();
        if (!start || !destination) return;

        try {
            const res = await api.post('/route', { start, destination, currentBattery, vehicleRange });
            setRoute(res.data.route);
            setRouteStats({
                duration: res.data.duration,
                distance: res.data.distance
            });
            if (res.data.stationsAlongRoute.length > 0) {
                setStations(res.data.stationsAlongRoute);
            }
            // Auto-close sidebar on mobile to show map
            if (window.innerWidth < 768) setIsSidebarOpen(false);
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to calculate route');
        }
    };

    return (
        <div className="flex h-screen pt-[72px] bg-slate-50 overflow-hidden">

            {/* Sidebar Section - 35% width or fixed width */}
            <div className="w-full md:w-[400px] lg:w-[450px] h-full bg-white shadow-xl z-10 flex flex-col border-r border-slate-200">

                <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30"><Navigation size={20} /></div>
                        Route Planner
                    </h2>

                    <form onSubmit={handlePlanRoute} className="space-y-5 mb-8">
                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Start</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        value={start}
                                        onChange={(e) => setStart(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                                        placeholder="Enter start location"
                                    />
                                </div>
                            </div>
                            <div className="relative group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Destination</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
                                    <input
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                                        placeholder="Enter destination"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Details for Routing */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2"><Zap size={14} /> Vehicle Status</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative group">
                                    <Zap className="absolute left-3 top-3 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={16} />
                                    <input
                                        type="number"
                                        value={currentBattery}
                                        onChange={(e) => setCurrentBattery(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-800 outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-400 transition-all font-medium text-sm"
                                        placeholder="Battery %"
                                    />
                                </div>
                                <div className="relative group">
                                    <Navigation className="absolute left-3 top-3 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={16} />
                                    <input
                                        type="number"
                                        value={vehicleRange}
                                        onChange={(e) => setVehicleRange(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-800 outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all font-medium text-sm"
                                        placeholder="Range (km)"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-primary font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all text-white text-lg">
                            <Search size={20} /> Find Best Route
                        </button>
                    </form>

                    {route && !selectedStation && (
                        <div className="animate-fade-in mb-6">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Trip Summary</h3>
                            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                                <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-4">
                                    <div className="text-center flex-1 border-r border-white/20">
                                        <p className="text-blue-100 text-xs font-medium uppercase mb-1">Distance</p>
                                        <p className="text-2xl font-black">{(routeStats.distance / 1000).toFixed(0)} <span className="text-sm font-normal text-blue-100">km</span></p>
                                    </div>
                                    <div className="text-center flex-1">
                                        <p className="text-blue-100 text-xs font-medium uppercase mb-1">Duration</p>
                                        <p className="text-2xl font-black">{(routeStats.duration / 3600).toFixed(1)} <span className="text-sm font-normal text-blue-100">hrs</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-white/10 p-3 rounded-xl border border-white/10">
                                    <Info size={16} className="text-blue-200 min-w-[16px]" />
                                    <p className="leading-snug">
                                        Found <span className="font-bold text-white">{stations.length}</span> charging stations along your route.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedStation && (
                        <div className="animate-fade-in bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-6 ring-4 ring-slate-100">
                            <div className="bg-slate-900 p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-20 -mr-6 -mt-6"></div>
                                <div className="flex justify-between items-start text-white relative z-10">
                                    <div>
                                        <h3 className="font-bold text-xl leading-tight">{selectedStation.name}</h3>
                                        <p className="text-slate-400 text-sm mt-1.5 flex items-center gap-1.5"><MapPin size={14} /> {selectedStation.location?.address}</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10">
                                        <Zap size={24} className="text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex gap-4 mb-6">
                                    <div className="flex-1 bg-green-50 p-3 rounded-xl border border-green-100 text-center">
                                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Rate</p>
                                        <p className="font-black text-slate-900 text-2xl">₹{selectedStation.costPerKwh}</p>
                                    </div>
                                    <div className="flex-1 bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Slots</p>
                                        <p className="font-black text-slate-900 text-2xl">{selectedStation.availableSlots}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowBookingModal(true)}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg flex items-center justify-center gap-2"
                                >
                                    Book This Station <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => setSelectedStation(null)}
                                    className="w-full mt-3 text-slate-500 hover:text-slate-800 font-bold py-2 text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {!selectedStation && !route && (
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-center h-48">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-blue-500 border border-slate-100">
                                <Info size={32} />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">Ready to explore?</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">Enter details above optimally plan your EV journey.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Section - Flexible width */}
            <div className="flex-1 h-full z-0 relative">
                <MapComponent stations={stations} route={route} onStationSelect={(station) => {
                    setSelectedStation(station);
                }} />
            </div>

            {showBookingModal && selectedStation && (
                <BookingModal
                    station={selectedStation}
                    onClose={() => setShowBookingModal(false)}
                />
            )}
        </div>
    );
};

export default MapPage;
