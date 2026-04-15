import { Link } from '@tanstack/react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-black text-daystar-blue mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page not found</h2>
      <p className="text-slate-500 mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-daystar-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-daystar-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
