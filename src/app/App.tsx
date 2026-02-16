import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Industries } from "./components/Industries";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Industries />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
