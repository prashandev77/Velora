'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError('Invalid email or password.');
            setLoading(false);
            return;
        }

        router.push('/admin');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-deep flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-deep via-deep to-ocean/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="font-heading text-2xl font-bold text-white tracking-wider">
                        VELORA
                    </span>
                    <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-1">
                        Admin Panel
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h1 className="text-white font-semibold text-lg mb-1">Welcome back</h1>
                    <p className="text-white/40 text-sm mb-7">Sign in to manage your journeys</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-white/60 text-xs font-medium mb-1.5 block uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-white/60 text-xs font-medium mb-1.5 block uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm pl-10 pr-10 py-3 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold hover:bg-gold/90 text-deep font-semibold text-sm py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    Velora Journeys Admin · Authorised users only
                </p>
            </div>
        </div>
    );
}
