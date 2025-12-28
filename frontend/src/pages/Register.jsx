import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };
            const res = await register(payload);
            if (res.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 pb-20 pt-28">
            <div className="glass-panel p-8 rounded-3xl shadow-xl w-full max-w-2xl relative">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                        <Car size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Create EV Profile</h2>
                    <p className="text-slate-500 mt-2">Join the smartest EV network today</p>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-600 font-medium mb-1.5 text-sm">Full Name</label>
                            <input name="name" onChange={handleChange} className="input-field w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" required />
                        </div>
                        <div>
                            <label className="block text-slate-600 font-medium mb-1.5 text-sm">Email Address</label>
                            <input name="email" type="email" onChange={handleChange} className="input-field w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-slate-600 font-medium mb-1.5 text-sm">Password</label>
                        <input name="password" type="password" onChange={handleChange} className="input-field w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition" required />
                    </div>

                    <div>
                        <label className="block text-slate-600 font-medium mb-1.5 text-sm">Account Type</label>
                        <select name="role" onChange={handleChange} className="input-field w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition">
                            <option value="user">EV Driver (User)</option>
                            <option value="admin">Station Manager (Admin)</option>
                        </select>
                    </div>



                    <button type="submit" className="w-full btn-primary font-bold py-4 rounded-xl transition shadow-xl shadow-green-500/20 text-lg">
                        Complete Registration
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
