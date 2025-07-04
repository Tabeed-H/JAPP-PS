from ultralytics import YOLO
from PIL import Image
import numpy as np
import io

# Load Model
model = YOLO('model/best.pt')

# Labels
CLASS = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5']

# define function
def predictPS(inputImage,  conf: float = 0.4):
    image = Image.open(io.BytesIO(inputImage)).convert("RGB")
    npImage = np.array(image)
    results = model.predict(source=npImage, conf=conf, save=True, save_txt=False)
    prediction = []
    for box in results[0].boxes:
        prediction.append({
            "class_id": int(box.cls),
            "class_name": CLASS[int(box.cls)],
            "confidence": float(box.conf),
            "bbox": [float(x) for x in box.xyxy[0]]
        })
    
    return prediction