import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User as UserIcon, Mail, Car, Battery, Navigation, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Settings = () => {
    const { user, login } = useAuth(); // Re-fetch user or use context to update local state if needed
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        model: '',
        batteryCapacity: '',
        currentBattery: '',
        averageRange: ''
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                model: user.vehicle?.model || '',
                batteryCapacity: user.vehicle?.batteryCapacity || '',
                currentBattery: user.vehicle?.currentBattery || '',
                averageRange: user.vehicle?.averageRange || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                vehicle: {
                    model: formData.model,
                    batteryCapacity: Number(formData.batteryCapacity),
                    currentBattery: Number(formData.currentBattery),
                    averageRange: Number(formData.averageRange)
                }
            };
            if (formData.password) payload.password = formData.password;

            const res = await api.put('/auth/profile', payload);
            setMessage('Profile updated successfully! Refreshing...');

            // Optionally update context if you had a clear method, but reload works for now or re-login simulation
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen pt-32 text-center text-slate-500">Loading user data...</div>;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50 flex justify-center">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-black text-slate-900 mb-8">Account Settings</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation (Optional future expansion) */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-3xl text-center shadow-xl border border-slate-100">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg">
                                {user?.name?.[0]}
                            </div>
                            <h2 className="font-bold text-slate-800 text-lg">{user?.name}</h2>
                            <p className="text-slate-500 text-sm">{user?.email}</p>
                            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                                {user?.role}
                            </div>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Profile Section */}
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <UserIcon className="text-blue-500" /> Personal Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-500 text-sm font-medium mb-1.5">Full Name</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                                <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-slate-500 text-sm font-medium mb-1.5">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                                <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-slate-500 text-sm font-medium mb-1.5">New Password <span className="text-xs font-normal text-slate-400">(Leave blank to keep current)</span></label>
                                        <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition" placeholder="••••••••" />
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Section */}
                            {user?.role === 'user' && (
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        <Car className="text-green-500" /> Vehicle Profile
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-slate-500 text-sm font-medium mb-1.5">Vehicle Model</label>
                                            <input name="model" value={formData.model} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition" placeholder="e.g. Tata Nexon EV" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1.5">Battery (kWh)</label>
                                                <div className="relative">
                                                    <Battery className="absolute left-3 top-3 text-slate-400" size={16} />
                                                    <input name="batteryCapacity" type="number" value={formData.batteryCapacity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1.5">Current %</label>
                                                <div className="relative">
                                                    <Save className="absolute left-3 top-3 text-slate-400" size={16} /> {/* Using Save icon for now as a generic one if Zap is standard */}
                                                    <input name="currentBattery" type="number" value={formData.currentBattery} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1.5">Range (km)</label>
                                                <div className="relative">
                                                    <Navigation className="absolute left-3 top-3 text-slate-400" size={16} />
                                                    <input name="averageRange" type="number" value={formData.averageRange} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3">
                                    <AlertCircle size={20} /> {error}
                                </div>
                            )}

                            {message && (
                                <div className="bg-green-50 text-green-600 p-4 rounded-xl flex items-center gap-3">
                                    <CheckCircle size={20} /> {message}
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={loading} className="btn-primary px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
