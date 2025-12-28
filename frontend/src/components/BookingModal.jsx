import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { X, Clock, HelpCircle } from 'lucide-react';

const BookingModal = ({ station, onClose }) => {
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/bookings', {
                stationId: station._id,
                stationName: station.name,
                stationAddress: station.location?.address,
                stationCost: station.costPerKwh,
                startTime,
                duration: Number(duration)
            });
            alert('Booking Confirmed! Payment simulation: Success.');
            onClose();
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
            {/* Added max-h and overflow for scrolling on smaller screens */}
            <div className="bg-white p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={onClose} className="absolute top-5 right-5 text-slate-300 hover:text-slate-500 transition z-10">
                    <X size={24} />
                </button>

                <div className="mb-6 mt-2">
                    <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Clock size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Review Booking</h2>
                    <p className="text-slate-500">{station.name}</p>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="mb-4">
                            <label className="block text-slate-500 mb-1.5 text-xs font-bold uppercase">Date & Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-500 mb-1.5 text-xs font-bold uppercase">Duration (Hours)</label>
                            <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-2 px-1">
                        <p className="text-slate-500 font-medium">Total Cost</p>
                        <p className="text-2xl font-bold text-slate-800">₹{(station.costPerKwh * duration).toFixed(2)}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <label className="block text-slate-500 mb-4 text-xs font-bold uppercase tracking-wider">Payment Method</label>

                        {/* Interactive Card UI */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl relative overflow-hidden shadow-xl mb-6 text-white">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-10 h-6 bg-yellow-400/20 backdrop-blur-md rounded border border-yellow-400/30"></div>
                                    <span className="font-mono text-xs opacity-50">DEBIT</span>
                                </div>

                                <label className="block text-xs opacity-50 mb-1 uppercase tracking-wider">Card Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/20 text-xl font-mono placeholder:text-white/20 outline-none focus:border-white transition-colors py-1 mb-6"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength="19"
                                    required
                                />

                                <div className="flex gap-6">
                                    <div className="flex-1">
                                        <label className="block text-xs opacity-50 mb-1 uppercase tracking-wider">Expiry</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b border-white/20 text-lg font-mono placeholder:text-white/20 outline-none focus:border-white transition-colors py-1"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                    </div>
                                    <div className="w-20">
                                        <label className="block text-xs opacity-50 mb-1 uppercase tracking-wider">CVC</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b border-white/20 text-lg font-mono placeholder:text-white/20 outline-none focus:border-white transition-colors py-1"
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 justify-center">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">SECURE</span>
                            <span>Encrypted Payment Processing</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] btn-primary font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 text-lg transition disabled:opacity-70"
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
