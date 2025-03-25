import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1"> {/* This ensures content takes remaining space */}
        <Hero />
        {/* Other content */}
      </main>
      
      <Footer />
    </div>
  );
}