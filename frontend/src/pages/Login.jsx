import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            if (res.user.role === 'admin') {
                navigate('/');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 pt-28">
            <div className="glass-panel p-10 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>

                <div className="flex justify-center mb-6">
                    <div className="bg-blue-50 p-3 rounded-full">
                        <Zap className="text-blue-500" size={32} />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Welcome Back</h2>
                <p className="text-slate-500 text-center mb-8">Please enter your details to sign in</p>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center text-sm border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-slate-600 font-medium mb-1.5 text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-600 font-medium mb-1.5 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-500/30 mt-2">
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
