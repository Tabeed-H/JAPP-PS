import React, { useEffect, useState } from "react";

const positions = [
  { top: "10px", left: "10px" },
  { top: "10px", right: "10px" },
  { bottom: "10px", left: "10px" },
  { bottom: "10px", right: "10px" },
];

export default function EasterEggCat() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({});
  const [clickMessage, setClickMessage] = useState("");

  // Function to show cat randomly
  const showCat = () => {
    const randomDelay = Math.floor(Math.random() * 20000) + 20000; // 20s–40s
    setTimeout(() => {
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      setPosition(randomPos);
      setVisible(true);
    }, randomDelay);
  };

  // Restart appearance after each hide
  useEffect(() => {
    if (!visible) {
      showCat();
    }
  }, [visible]);

  const handleClick = () => {
    setClickMessage("🐱 You found the hidden cat!");
    setVisible(false);
    setTimeout(() => setClickMessage(""), 3000);
  };

  return (
    <>
      {visible && (
        <div
          onClick={handleClick}
          className="fixed z-50 cursor-pointer transition-transform hover:scale-110"
          style={{ ...position }}
        >
          {/* Cat SVG */}
          <img
            src="/noun-cat-7843708.svg"
            alt="Easter Egg Cat"
            className="w-12 h-12"
          />
        </div>
      )}

      {clickMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-black px-4 py-2 rounded shadow font-medium text-sm">
          {clickMessage}
        </div>
      )}
    </>
  );
}
