import React, { useEffect } from 'react';
import "./DynamicLogo.css"

const getRandom = (begin, end) => Math.floor((end - begin) * Math.random() + begin);

function DynamicLogo() {

  useEffect(() => {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    for (let i = 0; i < 20; i++) {
      style.innerHTML += `
        @keyframes pointY${i + 1} {
          0% { transform: translateY(${getRandom(-100, 300)}px); }
          25% { transform: translateY(${getRandom(-100, 300)}px); }
          50% { transform: translateY(${getRandom(-100, 300)}px); }
          75% { transform: translateY(${getRandom(-100, 300)}px); }
          100% { transform: translateY(${getRandom(-100, 300)}px); }
        }
        @keyframes pointX${i + 1} {
          0% { transform: translateX(${getRandom(-100, 300)}px); }
          25% { transform: translateX(${getRandom(-100, 300)}px); }
          50% { transform: translateX(${getRandom(-100, 300)}px); }
          75% { transform: translateX(${getRandom(-100, 300)}px); }
          100% { transform: translateX(${getRandom(-100, 300)}px); }
        }
      `;
    }
    head.appendChild(style);
    return () => {
      head.removeChild(style);
    };
  }, []);

  const points = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className={`pointOut${i + 1}`} style={{
      animation: `pointX${i + 1} 8s linear infinite alternate`
    }}>
      <div className={`pointIn${i + 1}`} style={{
        width: '0px',
        height: '0px',
        boxShadow: `0 0 100px 100px rgba(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)}, ${Math.random() + 0.5})`,
        transform: `translate(${getRandom(0, 255)}px, ${getRandom(0, 255)}px)`,
        animation: `pointY${i + 1} 8s cubic-bezier(0.6, 0.0, 0.4, 1.0) infinite alternate`
      }} />
    </div>
  ));

  return (
    <div id="dynamic-logo">
      {points}
    </div>
  );
};

export default DynamicLogo;