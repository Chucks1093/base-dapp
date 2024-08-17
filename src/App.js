import logo from './logo.svg';
import './App.css';
import Main from './main';
import Footer from './Footer';

function App() {
  return (
    <div className="bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-[#161820] text-white px-[3vw] text-center min-h-screen">
      <section className="max-w-[650px] mx-auto">
        <Main />
        <Footer />
      </section>
    </div>
  );
}

export default App;
