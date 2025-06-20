import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.height = "100vh";
    document.body.style.backgroundColor = "#0a0a12"; // slightly lighter than pure black
    document.body.style.overflow = "hidden";
   
    // Set loaded after a slight delay to trigger animations
    setTimeout(() => setLoaded(true), 300);
   
    return () => {
      document.body.style = {};
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  // Array of features for the animated list
  const features = [
    "Smart Goal Tracking",
    "Daily Habit Streaks",
    "Personalized Insights",
    "Focus Timer",
    "Mood Tracking"
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px #00ffcc, 0 0 20px rgba(0, 255, 204, 0.3); }
          50% { box-shadow: 0 0 20px #00ffcc, 0 0 40px rgba(0, 255, 204, 0.5); }
          100% { box-shadow: 0 0 10px #00ffcc, 0 0 20px rgba(0, 255, 204, 0.3); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes rotateIn {
          0% { transform: rotate(-10deg) scale(0.9); opacity: 0; }
          100% { transform: rotate(0) scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes blink {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 5px #00ffcc, 0 0 15px #00ffcc, 0 0 20px #00ffcc, 0 0 40px #00ffcc, 0 0 60px #00ffcc; }
          20%, 24%, 55% { text-shadow: none; }
        }

        @keyframes moveAround {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        .landing-container {
          font-family: 'Poppins', sans-serif;
          height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #00ffcc;
          position: relative;
          overflow: hidden;
        }

        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(0, 255, 204, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 204, 0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          perspective: 500px;
          transform-style: preserve-3d;
          animation: float 15s infinite ease-in-out;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-container {
          margin-bottom: 20px;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(-20px)'};
          transition: all 1s ease;
        }

        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 3px;
          color: white;
          padding: 8px 16px;
          border: 2px solid #00ffcc;
          border-radius: 6px;
          animation: pulseGlow 4s infinite ease-in-out;
        }

        .landing-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 0 10px #00ffcc, 0 0 30px rgba(0, 255, 204, 0.5);
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'scale(1)' : 'scale(0.9)'};
          transition: all 1s ease 0.2s;
          animation: blink 5s infinite;
        }

        .landing-description {
          font-size: 1.3rem;
          color: #ccc;
          max-width: 600px;
          margin-bottom: 40px;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 1s ease 0.4s;
        }

        .features-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 40px;
          width: 100%;
        }

        .feature-item {
          background: rgba(0, 255, 204, 0.1);
          border: 1px solid rgba(0, 255, 204, 0.3);
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 1rem;
          color: white;
          backdrop-filter: blur(5px);
          opacity: 0;
          animation: rotateIn 0.6s forwards;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .glow-button {
          padding: 15px 40px;
          font-size: 1.2rem;
          font-weight: 700;
          border: 2px solid #00ffcc;
          border-radius: 30px;
          background: transparent;
          color: #00ffcc;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: pulseGlow 3s infinite ease-in-out;
          position: relative;
          overflow: hidden;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 1s ease 0.6s;
        }

        .glow-button:before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 204, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          z-index: -1;
        }

        .glow-button:hover {
          transform: scale(1.05);
          background-color: rgba(0, 255, 204, 0.15);
          letter-spacing: 1px;
        }

        .glow-button:active {
          transform: scale(0.98);
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(0, 255, 204, 0.6);
          border-radius: 50%;
          z-index: 1;
        }

        .orbital {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 1px solid rgba(0, 255, 204, 0.2);
          border-radius: 50%;
          top: 10%;
          right: 10%;
          animation: float 20s linear infinite;
        }

        .orbital:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #00ffcc;
          border-radius: 50%;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc;
          animation: moveAround 10s linear infinite;
        }

        @media (max-width: 768px) {
          .landing-title {
            font-size: 2.5rem;
          }
          .landing-description {
            font-size: 1.1rem;
            padding: 0 20px;
          }
          .features-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="landing-container">
        <div className="bg-grid"></div>

        {loaded && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
            }}
          ></div>
        ))}

        <div className="orbital"></div>

        <div className="content-wrapper">
          <div className="logo-container">
            <div className="logo">SYNAPSE</div>
          </div>
          <div className="landing-title">Welcome to the Future of Productivity</div>
          <div className="landing-description">
            Stay focused, track your goals, and achieve greatness with our personalized tools.
          </div>
         
          <div className="features-container">
            {features.map((feature, index) => (
              <div
                className="feature-item"
                key={index}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {feature}
              </div>
            ))}
          </div>

          <button className="glow-button" onClick={handleGetStarted}>
            BEGIN YOUR EVOLUTION
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;