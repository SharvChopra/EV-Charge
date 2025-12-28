import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, Trash, MapPin, Zap, Shield, User, BarChart3, Calendar, DollarSign, Activity, Ban, Pencil } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ users: 0, stations: 0, bookings: 0, revenue: 0 });
    const [analytics, setAnalytics] = useState([]);

    // Station State
    const [stations, setStations] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newStation, setNewStation] = useState({
        name: '', lat: '', lng: '', address: '', costPerKwh: '', availableSlots: 4
    });
    const [editingStation, setEditingStation] = useState(null);

    // User State
    const [users, setUsers] = useState([]);
    // Booking State
    const [bookings, setBookings] = useState([]);
    // Transaction State
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchAnalytics();
        fetchStations();
        fetchUsers();
        fetchBookings();
        fetchTransactions();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (err) {
            console.error("Error fetching stats:", err);
            alert("Failed to fetch admin stats: " + (err.response?.data?.msg || err.message));
        }
    };

    const fetchAnalytics = async () => {
        try {
            const res = await api.get('/admin/analytics');
            setAnalytics(res.data?.dailyBookings || []);
        } catch (err) { console.error("Error fetching analytics:", err); }
    };

    const fetchStations = async () => {
        try {
            const res = await api.get('/stations');
            setStations(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/auth/users');
            setUsers(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchBookings = async () => {
        try {
            const res = await api.get('/admin/bookings');
            setBookings(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/admin/transactions');
            setTransactions(res.data);
        } catch (err) { console.error(err); }
    };

    const handleAddStation = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...newStation,
                location: { lat: Number(newStation.lat), lng: Number(newStation.lng), address: newStation.address },
                costPerKwh: Number(newStation.costPerKwh),
                chargerType: ['Type2', 'DC Fast']
            };

            if (editingStation) {
                await api.put(`/stations/${editingStation._id}`, payload);
                alert('Station Updated');
            } else {
                await api.post('/stations', payload);
                alert('Station Added');
            }

            setShowAddForm(false);
            setEditingStation(null);
            setNewStation({ name: '', lat: '', lng: '', address: '', costPerKwh: '', availableSlots: 4 });
            fetchStations();
            fetchStats();
        } catch (err) { alert(`Failed to ${editingStation ? 'update' : 'add'} station`); }
    };

    const handleEditStation = (station) => {
        setEditingStation(station);
        setNewStation({
            name: station.name,
            address: station.location.address,
            lat: station.location.lat,
            lng: station.location.lng,
            costPerKwh: station.costPerKwh,
            availableSlots: station.availableSlots
        });
        setShowAddForm(true);
    };

    const handleDeleteStation = async (id) => {
        if (confirm('Are you sure you want to delete this station?')) {
            try {
                await api.delete(`/stations/${id}`);
                alert('Station deleted');
                setStations(stations.filter(s => s._id !== id));
                fetchStats();
            } catch (err) { alert('Failed to delete'); }
        }
    };

    const handleDeleteUser = async (id) => {
        if (confirm('Delete this user?')) {
            try {
                await api.delete(`/auth/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
                fetchStats();
            } catch (err) { alert('Failed to delete user'); }
        }
    };

    const handleBlockUser = async (id, currentStatus) => {
        const action = currentStatus ? 'Unblock' : 'Block';
        if (confirm(`${action} this user?`)) {
            try {
                const res = await api.put(`/admin/users/${id}/block`);
                setUsers(users.map(u => u._id === id ? { ...u, isBlocked: res.data.isBlocked } : u));
                alert(`User ${action}ed`);
            } catch (err) {
                console.error(err);
                alert(`Failed to ${action} user: ${err.response?.data?.msg || err.message}`);
            }
        }
    };

    const handleCancelBooking = async (id) => {
        if (confirm('Cancel this booking?')) {
            try {
                await api.put(`/admin/bookings/${id}/cancel`);
                setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
                fetchStats();
                fetchAnalytics();
            } catch (err) { alert('Failed to cancel booking'); }
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 flex items-center mb-2">
                        <Shield className="mr-3 text-purple-600 fill-purple-100" size={40} /> Admin Portal
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Manage entire platform from one place</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><User size={28} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                        <p className="text-3xl font-black text-slate-800">{stats.users}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
                    <div className="bg-purple-100 p-4 rounded-2xl text-purple-600"><Zap size={28} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Stations</p>
                        <p className="text-3xl font-black text-slate-800">{stats.stations}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
                    <div className="bg-green-100 p-4 rounded-2xl text-green-600"><DollarSign size={28} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
                        <p className="text-3xl font-black text-slate-800">₹{stats.revenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4">
                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Activity size={28} /></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
                        <p className="text-3xl font-black text-slate-800">{stats.bookings}</p>
                    </div>
                </div>
            </div>

            {/* Custom Tabs */}
            <div className="flex gap-2 mb-8 bg-slate-100/70 p-1.5 rounded-2xl w-fit backdrop-blur-md">
                <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                    <BarChart3 size={18} /> Analytics
                </button>
                <button onClick={() => setActiveTab('stations')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'stations' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Zap size={18} /> Stations
                </button>
                <button onClick={() => setActiveTab('users')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <User size={18} /> Users
                </button>
                <button onClick={() => setActiveTab('bookings')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'bookings' ? 'bg-white shadow-md text-orange-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Calendar size={18} /> Bookings
                </button>
                <button onClick={() => setActiveTab('transactions')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'transactions' ? 'bg-white shadow-md text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <DollarSign size={18} /> Transactions
                </button>
            </div>

            {/* Dynamic Content */}
            <div className="animate-fade-in pb-10">
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <Activity className="mr-2 text-blue-500" /> Booking Trends (Last 7 Days)
                            </h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={analytics}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <DollarSign className="mr-2 text-green-500" /> Revenue vs. Bookings
                            </h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stations' && (
                    <>
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => {
                                    setEditingStation(null);
                                    setNewStation({ name: '', lat: '', lng: '', address: '', costPerKwh: '', availableSlots: 4 });
                                    setShowAddForm(!showAddForm);
                                }}
                                className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold flex items-center hover:bg-black transition shadow-xl shadow-slate-900/20 active:scale-95"
                            >
                                <Plus size={20} className="mr-2" /> Add New Station
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-12 animate-scale-in relative z-10">
                                <h3 className="text-xl font-bold mb-6 text-slate-800">{editingStation ? 'Edit Station Details' : 'New Station Details'}</h3>
                                <form onSubmit={handleAddStation} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input placeholder="Station Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, name: e.target.value })} />
                                    <input placeholder="Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, address: e.target.value })} />
                                    <input placeholder="Latitude" type="number" step="any" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, lat: e.target.value })} />
                                    <input placeholder="Longitude" type="number" step="any" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, lng: e.target.value })} />
                                    <input placeholder="Cost (₹/kWh)" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, costPerKwh: e.target.value })} />
                                    <input placeholder="Available Slots" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-purple-400" required onChange={e => setNewStation({ ...newStation, availableSlots: e.target.value })} />
                                    <button type="submit" className="md:col-span-2 bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-700 transition">{editingStation ? 'Update Station' : 'Save Charge Point'}</button>
                                </form>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {stations.map(station => (
                                <div key={station._id} className="bg-white p-6 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm hover:shadow-md transition group">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 p-3 rounded-full text-green-600 group-hover:scale-110 transition"><Zap size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800">{station.name}</h4>
                                            <p className="text-slate-400 text-sm flex items-center mt-1"><MapPin size={14} className="mr-1" /> {station.location?.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-slate-900 font-bold">₹{station.costPerKwh}/kWh</p>
                                            <p className="text-slate-400 text-xs font-bold uppercase">{station.availableSlots} Slots</p>
                                        </div>
                                        <button onClick={() => handleEditStation(station)} className="text-slate-300 hover:text-blue-500 p-3 hover:bg-blue-50 rounded-xl transition">
                                            <Pencil size={20} />
                                        </button>
                                        <button onClick={() => handleDeleteStation(station._id)} className="text-slate-300 hover:text-red-500 p-3 hover:bg-red-50 rounded-xl transition">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'users' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">User</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Role</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Vehicle</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map(u => (
                                    <tr key={u._id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-5">
                                            <p className="font-bold text-slate-800">{u.name}</p>
                                            <p className="text-slate-400 text-sm">{u.email}</p>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${u.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {u.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-slate-600 text-sm">
                                            {u.vehicle?.model ? `${u.vehicle.model} (${u.vehicle.plateNumber})` : 'No Vehicle'}
                                        </td>
                                        <td className="p-5 text-right flex justify-end gap-2">
                                            <button
                                                onClick={() => handleBlockUser(u._id, u.isBlocked)}
                                                className={`p-2 rounded-lg transition ${u.isBlocked ? 'text-green-500 hover:bg-green-50' : 'text-orange-500 hover:bg-orange-50'}`}
                                                title={u.isBlocked ? "Unblock User" : "Block User"}
                                            >
                                                <Ban size={18} />
                                            </button>
                                            <button onClick={() => handleDeleteUser(u._id)} className="text-slate-300 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg" title="Delete User">
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Booking ID</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">User</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Station</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {bookings.map(b => (
                                    <tr key={b._id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-5 font-mono text-xs text-slate-400">{b._id.slice(-6).toUpperCase()}</td>
                                        <td className="p-5">
                                            <p className="font-bold text-slate-800">{b.user?.name || 'Unknown'}</p>
                                            <p className="text-xs text-slate-400">{b.user?.email}</p>
                                        </td>
                                        <td className="p-5">
                                            <p className="font-medium text-slate-800">{b.stationName}</p>
                                            <p className="text-xs text-slate-400 truncate max-w-[150px]">{b.stationAddress}</p>
                                        </td>
                                        <td className="p-5 font-bold text-slate-700">₹{b.totalCost}</td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            {b.status !== 'cancelled' && (
                                                <button onClick={() => handleCancelBooking(b._id)} className="text-red-400 hover:text-red-600 transition font-medium text-sm">
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'transactions' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Transaction Hash</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">User</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Date</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {transactions.map(t => (
                                    <tr key={t._id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-5 font-mono text-xs text-slate-400 max-w-[150px] truncate" title={t.transactionHash}>{t.transactionHash || 'Pending...'}</td>
                                        <td className="p-5">
                                            <p className="font-bold text-slate-800">{t.user?.name || 'Unknown'}</p>
                                        </td>
                                        <td className="p-5 text-sm text-slate-600">
                                            {new Date(t.createdAt).toLocaleDateString()} <span className="text-slate-400 text-xs">{new Date(t.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="p-5 font-bold text-green-600">₹{t.totalCost}</td>
                                        <td className="p-5 text-right">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">SUCCESS</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
