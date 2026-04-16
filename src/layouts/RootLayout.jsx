import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
