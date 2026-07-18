import Header from './Header';
import Footer from './Footer';
import SmartBanner from './SmartBanner';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SmartBanner />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
