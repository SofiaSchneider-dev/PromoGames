import React, { useEffect, useState } from "react";
// import * as ml5 from "@tensorflow-models/mobilenet";

const ImageClassifier = ({ imageUrl }) => {
  const [result, setResult] = useState("Scanning...");

  useEffect(() => {
    const classifyImage = async () => {
      if (!imageUrl) return;

      const img = document.createElement("img");
      img.src = imageUrl;
      img.onload = async () => {
        const classifier = await img.imageClassifier("MobileNet");
        classifier.classify(img, (error, results) => {
          if (error) {
            setResult(error);
          } else {
            const { label, confidence } = results[0];
            const confidencePercentage = confidence * 100;
            setResult(
              `${label}<br>Confidence: ${confidencePercentage.toFixed(2)}%`
            );
          }
        });
      };
    };

    classifyImage();
  }, [imageUrl]);

  return (
    <div>
      <h1>Image Classification</h1>
      <div id="result">{result}</div>
      <img src={imageUrl} alt="Image to classify" width="100%" />
    </div>
  );
};

export default ImageClassifier;
