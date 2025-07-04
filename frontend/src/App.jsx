import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Tagline from "./components/Tagline";
import UploadButton from "./components/UploadButton";
import ChatBox from "./components/Chatbox";
import EasterEggCat from "./components/EasterEggCat";

import "./App.css";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [boxedImage, setBoxedImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const canvasRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResponse(null);
    setBoxedImage(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://japp-ps.onrender.com/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.predictions);
    } catch (error) {
      console.error("Prediction error:", error);
      setError("Oops! Something went wrong while analyzing the image.");
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!preview || !response || loading || response.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      response.forEach((pred) => {
        let [x1, y1, x2, y2] = pred.bbox;

        // If the coords are normalized (0-1), scale them
        if (x1 < 1 && y1 < 1 && x2 <= 1 && y2 <= 1) {
          x1 *= img.width;
          x2 *= img.width;
          y1 *= img.height;
          y2 *= img.height;
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.fillStyle = "red";
        ctx.font = "14px sans-serif";
        ctx.fillText(pred.class_name, x1, y1 > 10 ? y1 - 5 : y1 + 15);
      });

      const boxedDataUrl = canvas.toDataURL("image/png");
      setBoxedImage(boxedDataUrl);
    };

    img.src = preview;
  }, [preview, response, loading]);

  return (
    <div className="min-h-screen bg-white bg-dot-pattern text-black p-4">
      <EasterEggCat />
      <canvas ref={canvasRef} className="hidden" />
      <Header />
      <Tagline />
      <div className="flex flex-col items-center space-y-4 mt-8">
        {(preview || boxedImage) && (
          <ChatBox
            preview={preview}
            boxedImage={boxedImage}
            response={response}
            loading={loading}
          />
        )}
        <UploadButton onUpload={handleUpload} loading={loading} />
      </div>
      {error && (
        <div className="mt-4">
          <ErrorBox message={error} onClose={() => setError(null)} />
        </div>
      )}
    </div>
  );
}
