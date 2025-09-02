import { Head, useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import Hero from "../../../public/assets/images/tlbg.jpg"
import Logo from "../../../public/assets/images/logo.png"


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    }, [post, reset]);

    return (
        <div className="flex h-3/4 items-center justify-center gap-4 overflow-hidden bg-black">
            <Head title="Judges Login" />

            <div className="bg- text-black/50 dark:bg-black dark:text-white/50">
                {/* Background decoration */}
                <img
                    id="background"
                    className="absolute h-screen object-cover top-0 left-0 w-screen opacity-20"
                    src={Hero}
                    alt="Background pattern"
                />

                <div className="relative flex  flex-col items-center justify-center overflow-hidden selection:bg-[#0097aa] selection:text-white">
                    <div className="relative w-full max-w-2xl overflow-hidden px-6 lg:max-w-7xl">
                        
                        {/* Header */}
                        <header className="flex flex-col items-center justify-center gap-3 py-10">
                            <img
                                src={Logo}
                                alt="Tililab Trophy Logo"
                                className="w-20 h-20 object-contain"
                            />
                            <h1 className="text-2xl font-bold text-white">
                                Tililab Trophy – Judges Dashboard
                            </h1>
                            <p className="text-sm text-gray-400">Morocco</p>
                        </header>

                        {/* Main content */}
                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                
                                {/* Left card - Trophy info */}
                                <div
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-[#18181b] p-6 shadow-lg ring-1 ring-white/[0.05] transition duration-300 hover:ring-[#0097aa] lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-[#0097aa]/60"
                                >
                                    <div className="relative flex w-full flex-1 items-stretch">
                                        <img
                                            src={Hero}
                                            alt="Tililab Trophy visual"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover drop-shadow-md"
                                        />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-black to-black opacity-70" />
                                    </div>

                                    <div className="relative flex items-center justify-between w-full">
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">
                                                Welcome, Judges
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                Access your dashboard to manage and evaluate.
                                            </p>
                                        </div>
                                        <svg
                                            className="size-6 shrink-0 stroke-[#0097aa]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Right card - Login form */}
                                <div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-lg bg-[#18181b] p-6 ring-1 ring-white/[0.05] transition duration-300 hover:ring-[#0097aa] lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                                    <form onSubmit={submit} className="w-[80%]">
                                        
                                        {/* Email */}
                                        <div>
                                            <label className="text-gray-200 text-sm" htmlFor="email">Email:</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData("email", e.target.value)}
                                                className="block mt-1 w-full rounded border border-gray-700 bg-black p-2 text-white focus:border-[#0097aa] focus:ring-[#0097aa]"
                                                required
                                                autoFocus
                                                autoComplete="username"
                                            />
                                            {errors.email && (
                                                <div className="mt-2 text-sm text-red-500">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div className="mt-4">
                                            <label className="text-gray-200 text-sm" htmlFor="password">Password:</label>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData("password", e.target.value)}
                                                className="block mt-1 w-full rounded border border-gray-700 bg-black p-2 text-white focus:border-[#0097aa] focus:ring-[#0097aa]"
                                                required
                                                autoComplete="current-password"
                                            />
                                            {errors.password && (
                                                <div className="mt-2 text-sm text-red-500">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>

                                        {/* Remember me */}
                                        <div className="mt-4 flex items-center">
                                            <input
                                                id="remember_me"
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(e) => setData("remember", e.target.checked)}
                                                className="rounded border-gray-300 text-[#0097aa] shadow-sm focus:ring-[#0097aa]"
                                            />
                                            <label htmlFor="remember_me" className="ms-2 text-sm text-gray-300">
                                                Remember me
                                            </label>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 flex items-center justify-between">
                                            <a
                                                href={route("password.request")}
                                                className="text-sm text-gray-400 hover:text-[#0097aa]"
                                            >
                                                Forgot your password?
                                            </a>
                                            <button
                                                type="submit"
                                                className="ms-3 rounded bg-[#0097aa] px-5 py-2 font-semibold text-white transition hover:bg-[#007c8a] disabled:opacity-50"
                                                disabled={processing}
                                            >
                                                Log in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="py-16 text-center text-sm text-white/70">
                            © {new Date().getFullYear()} Tililab Trophy – Judges Dashboard
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
