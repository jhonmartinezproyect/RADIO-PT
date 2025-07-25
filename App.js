import React, { useState, useEffect, useRef } from 'react';
import RadioHeader from './components/RadioHeader';
import RadioHero from './components/RadioHero';
import RadioPopup from './components/RadioPopup';
import RadioNowPlaying from './components/RadioNowPlaying';
import RadioWeatherSection from './components/RadioWeatherSection';
import RadioControls from './components/RadioControls';
import RadioFooter from './components/RadioFooter';
import RadioThemeToggle from './components/RadioThemeToggle';
import RadioMarquee from './components/RadioMarquee';
import RadioLiveStreamPopup from './components/RadioLiveStreamPopup';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5); // Estado para el volumen del audio
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const audioRef = useRef(null);

  const handleToggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleAudioVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setAudioVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleToggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light-mode', !isLightMode);
    document.body.classList.toggle('dark-mode', isLightMode);
  };

  const handleToggleLiveStream = () => {
    setIsLiveStreamOpen(!isLiveStreamOpen);
  };

  useEffect(() => {
    const hora = new Date().getHours();
    const esDia = hora >= 6 && hora < 18;
    setIsLightMode(esDia);
    document.body.classList.toggle('light-mode', esDia);
    document.body.classList.toggle('dark-mode', !esDia);
  }, []);

  useEffect(() => {
    // Asegurarse de que el volumen inicial se aplique al cargar el componente
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
    }
  }, [audioVolume]); // Dependencia para que se actualice si audioVolume cambia

  return (
    <div className={`min-h-screen flex flex-col ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'}`}
         style={{ backgroundImage: `url(${isLightMode ? 'https://via.placeholder.com/1920x1080/F0F0F0/333333?text=Light+Background' : 'https://via.placeholder.com/1920x1080/1A1A1A/FFFFFF?text=Dark+Background'})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <RadioMarquee />
      <RadioHeader onNavigate={setCurrentPage} onToggleLiveStream={handleToggleLiveStream} />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <RadioHero onToggleAudio={handleToggleAudio} isPlaying={isAudioPlaying} onVolumeChange={handleAudioVolumeChange} volume={audioVolume} />
            <audio ref={audioRef} src="http://cdn.instream.audio:9288/stream" preload="auto" />
            <RadioNowPlaying title="Club Night" artist="DJ Ross" timeRange="2:30 AM - 6:00 AM" />
            <RadioWeatherSection />
            <RadioControls />
          </>
        )}

        {currentPage === 'inicio' && (
          <RadioPopup title="Inicio - Radio Potosí" onClose={() => setCurrentPage('home')} isOpen={true}>
            <p className="mb-4">¡Bienvenido a Radio Potosí! Síguenos en nuestras redes sociales:</p>
            <p className="flex items-center space-x-4 text-gray-300">
              <img src="https://via.placeholder.com/30x30/007bff/ffffff?text=FB" alt="Facebook" className="rounded-full" />
              <img src="https://via.placeholder.com/30x30/E1306C/ffffff?text=IG" alt="Instagram" className="rounded-full" />
              <img src="https://via.placeholder.com/30x30/1DA1F2/ffffff?text=TW" alt="Twitter" className="rounded-full" />
            </p>
          </RadioPopup>
        )}

        {currentPage === 'programacion' && (
          <RadioPopup title="Programación" onClose={() => setCurrentPage('home')} isOpen={true}>
            <p className="mb-2">🎧 6:00 AM - Noticias</p>
            <p className="mb-2">🎶 8:00 AM - Música variada</p>
            <p className="mb-2">🗣️ 10:00 AM - Entrevistas</p>
            <p>🎤 12:00 PM - Programas en vivo</p>
          </RadioPopup>
        )}

        {currentPage === 'contacto' && (
          <RadioPopup title="Contacto" onClose={() => setCurrentPage('home')} isOpen={true}>
            <p className="mb-2">📧 Email: contacto@radiopotosi.bo</p>
            <p className="mb-2">📞 Teléfono: +591 2 1234567</p>
            <p>🏢 Dirección: Av. La Paz #123, Potosí, Bolivia</p>
          </RadioPopup>
        )}

        <RadioLiveStreamPopup isOpen={isLiveStreamOpen} onClose={handleToggleLiveStream} youtubeUrl="https://www.youtube.com/live/jfKfPfyJRdk?si=cU894M_gkaLvOz4i" />
      </main>

      <RadioFooter />
      <RadioThemeToggle onToggleTheme={handleToggleTheme} isLightMode={isLightMode} />
    </div>
  );
};

export default App;