import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import './index.css';

// Cat illustrations for UI states
import HAPPY_CAT from './assets/cat_happy.png';
import SAD_CAT from './assets/cat_sad.png';

// User provided partner images from src/assets/images for the selection grid
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.png';
import image3 from './assets/images/image3.png';
import image4 from './assets/images/image4.jpg';
import image5 from './assets/images/image5.png';
import image6 from './assets/images/image6.png';
import image7 from './assets/images/image7.jpg';
import valentinesImage from './assets/images/image.png';

const App = () => {
  const [view, setView] = useState('passcode'); // passcode, error, success, selection
  const [pin, setPin] = useState('');
  const passcode = '0618';

  const handlePin = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === passcode) {
            setView('success');
          } else {
            setView('error');
          }
        }, 300);
      }
    }
  };

  const clearPin = () => setPin('');

  const renderView = () => {
    switch (view) {
      case 'passcode':
        return <Passcode pin={pin} onNumPress={handlePin} onClear={clearPin} />;
      case 'error':
        return <ErrorScreen onRetry={() => { setView('passcode'); setPin(''); }} />;
      case 'success':
        return <SuccessScreen onNext={() => setView('selection')} onBack={() => setView('passcode')} />;
      case 'selection':
        return <SelectionScreen onBack={() => setView('success')} />;
      default:
        return <Passcode pin={pin} onNumPress={handlePin} onClear={clearPin} />;
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Passcode = ({ pin, onNumPress, onClear }) => (
  <div className="passcode-container">
    <motion.img
      src={HAPPY_CAT}
      className="cat-img"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
    />
    <h1>For your eyes only</h1>
    <p>Enter our anniversary to continue</p>

    <div className="dots-container">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`dot ${i < pin.length ? 'filled' : ''}`} />
      ))}
    </div>

    <div className="password-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button key={num} onClick={() => onNumPress(num.toString())} className="pin-btn">
          {num}
        </button>
      ))}
      <div />
      <button onClick={() => onNumPress('0')} className="pin-btn">0</button>
      <button onClick={onClear} className="pin-btn" style={{ border: 'none' }}>
        <RefreshCcw size={24} />
      </button>
    </div>
  </div>
);

const ErrorScreen = ({ onRetry }) => (
  <div className="error-container">
    <motion.img
      src={SAD_CAT}
      className="cat-img"
      animate={{ x: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 0.1 }}
    />
    <h1 style={{ color: '#d00000' }}>Wrong password, you sure you're my baby?</h1>
    <button onClick={onRetry} className="pin-btn" style={{ margin: '2rem auto', width: 'auto', padding: '0 2rem', borderRadius: '30px' }}>
      Try Again
    </button>
  </div>
);

const SuccessScreen = ({ onNext, onBack }) => (
  <div className="content-page">
    <motion.button
      onClick={onBack}
      className="back-btn"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowLeft size={20} /> Back
    </motion.button>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <img src={HAPPY_CAT} className="cat-img" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
        <span className="romantic-text">06-18-24</span>
        <Heart fill="#ff4d6d" color="#ff4d6d" />
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="message-box">
        Even though I may not have an expensive bouquet of flowers like others might, I wanted to create something unique and special just for you and Chuchu. I poured my heart into this code to build a little digital space where our memories can always stay.
        <br /><br />
        You make my heart lighter, my days brighter, and my world so much more magical every single day. Happy Anniversary! ❤️
      </div>
      <button
        onClick={onNext}
        className="pin-btn"
        style={{ marginTop: '2rem', width: 'auto', padding: '0 2rem', borderRadius: '30px', background: '#ff4d6d', color: 'white', border: 'none' }}
      >
        Click to Begin <ArrowRight size={20} style={{ marginLeft: '10px' }} />
      </button>
    </motion.div>
  </div>
);

const SelectionScreen = ({ onBack }) => {
  const memories = [
    { img: valentinesImage, text: "Our latest Valentine's Day together—a day filled with so much love and laughter. Every moment with you is a gift I'll treasure forever." },
    { img: image1, text: "Every moment we've shared is a treasure to me. Looking at this picture reminds me of just how lucky I am to have you in my life." },
    { img: image2, text: "You make my world a little more magical. I carry your love with me everywhere, like a secret treasure no one else knows." },
    { img: image3, text: "Your smile is my favorite view. Even the distance can’t take away the joy you bring into my life." },
    { img: image4, text: "Every adventure with you is a memory I’ll cherish forever. I can’t wait for our next one." },
    { img: image5, text: "Distance means so little when someone means so much. You’re my home, no matter where we are." },
    { img: image6, text: "Even though life gets complicated, knowing you’re there gives me strength. You understand me in ways no one else does." },
    { img: image7, text: "I dream about all the moments we’ll share together, the memories we’ll make, and the love that will keep growing between us." },
  ];

  return (
    <div className="scrapbook-container">
      <motion.button
        onClick={onBack}
        className="back-btn"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.9 }}
        style={{ position: 'fixed', top: '2rem', left: '2rem' }}
      >
        <ArrowLeft size={20} /> Back
      </motion.button>
      <h1 className="romantic-text" style={{ fontSize: '2.5rem', textAlign: 'center' }}>Our Beautiful Journey</h1>
      {memories.map((m, i) => (
        <motion.div
          key={i}
          className="scrapbook-row"
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <div className="polaroid-frame">
            <img src={m.img} alt={`memory-${i}`} />
            {i % 3 === 0 && <Heart className="doodle" size={40} color="#ff85a1" style={{ top: -20, right: -20, transform: 'rotate(15deg)' }} />}
            {i % 3 === 1 && <div className="doodle" style={{ top: -10, left: -10, fontSize: '2rem', transform: 'rotate(-15deg)' }}>✨</div>}
          </div>
          <div className="memory-text">
            <p>{m.text}</p>
            <div style={{ height: '2px', width: '50px', background: '#ff85a1', marginTop: '10px' }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default App;
