'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AVELORA_LOGO_PATH } from '@/lib/brand';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const sessionError = searchParams.get('error');
    const initialError =
        sessionError === 'session_expired'
            ? 'Your admin session timed out. Please sign in again.'
            : sessionError === 'forbidden'
                ? 'Admin access is required for this area.'
                : '';
    const [error, setError] = useState(initialError);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setError(initialError);
        setLoading(false);
    }, [initialError]);

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
        <div className="min-h-screen bg-gray-50 flex flex-col pt-32 pb-12 px-4 items-center sm:px-6 lg:px-8">
            <div className="relative w-full max-w-md">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <Image
                        src={AVELORA_LOGO_PATH}
                        alt="Avelora Travel"
                        width={210}
                        height={64}
                        className="h-12 w-auto object-contain mb-3"
                        priority
                        unoptimized
                    />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] bg-gray-200/50 px-3 py-1 rounded-full border border-gray-200">
                        Admin Portal
                    </span>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-3xl p-8 sm:p-10">
                    <div className="mb-8">
                        <h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-gray-500 text-sm">Please sign in to manage your journeys.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-gray-600 text-[11px] font-bold mb-2 block uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm pl-11 pr-4 py-3.5 focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-gray-600 text-[11px] font-bold mb-2 block uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm pl-11 pr-11 py-3.5 focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
                                <p className="text-red-600 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            disabled={loading}
                            className="w-full mt-2 h-12 rounded-xl shadow-lg"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</>
                            ) : (
                                'Sign In Securely'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 font-medium text-xs mt-8">
                    Avelora Travel Admin &middot; Authorised users only
                </p>
            </div>
        </div>
    );
}
