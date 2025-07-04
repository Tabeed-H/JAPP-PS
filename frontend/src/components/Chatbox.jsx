import React from "react";

export default function ChatBox({ preview, boxedImage, response, loading }) {
  return (
    <div className="w-full max-w-xl space-y-4">
      {/* User message: original image */}
      {preview && (
        <div className="flex justify-end">
          <div className="bg-blue-100 p-3 rounded-lg shadow-md max-w-full">
            <p className="text-sm text-gray-600 mb-2">You uploaded:</p>
            <img
              src={preview}
              alt="Uploaded"
              className="rounded-md max-w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Model message: boxed image */}
      {!loading && boxedImage && (
        <div className="flex justify-start">
          <div className="bg-green-100 p-3 rounded-lg shadow-md max-w-full">
            <p className="text-sm text-gray-600 mb-2">Prediction:</p>
            <img
              src={boxedImage}
              alt="Prediction"
              className="rounded-md max-w-full h-auto"
            />
          </div>
        </div>
      )}

      {!loading && response && response.length > 0 && (
        <div className="flex justify-start">
          <div className="bg-green-50 px-3 py-2 rounded-md text-sm max-w-xs">
            <ul className="list-disc list-inside text-gray-800">
              {!loading && response && response.length > 0 && (
                <div className="flex justify-start">
                  <div className="bg-green-50 px-3 py-2 rounded-md text-sm max-w-xs font-sans">
                    <>
                      {response.length === 1 && (
                        <div className="text-left">
                          I think I spotted a{" "}
                          <strong>{response[0].class_name}</strong> — about{" "}
                          <strong>
                            {(response[0].confidence * 100).toFixed(1)}%
                          </strong>{" "}
                          sure.
                        </div>
                      )}

                      {response.length > 1 && (
                        <>
                          I think I spotted{" "}
                          {response.map((pred, index) => {
                            const confidence = (pred.confidence * 100).toFixed(
                              1
                            );
                            const isLast = index === response.length - 1;
                            const isSecondLast = index === response.length - 2;

                            return (
                              <span key={index}>
                                {index > 0 && (isLast ? " and " : ", ")}a{" "}
                                <strong>{pred.class_name}</strong> (
                                <strong>{confidence}%</strong> sure)
                              </span>
                            );
                          })}
                          .
                        </>
                      )}
                    </>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
      {!loading && response && response.length === 0 && (
        <div className="flex justify-start">
          <div className="bg-red-100 p-3 rounded-lg shadow-md max-w-xs text-sm font-sans">
            <p className="text-red-800">
              Oops! Couldn't find anything in that image.
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-lg shadow-md max-w-xs">
            <p className="text-gray-500 italic">Analyzing image...</p>
          </div>
        </div>
      )}
    </div>
  );
}
