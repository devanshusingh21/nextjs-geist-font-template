Below is a detailed plan outlining every change and new file needed for the Acoustic Bird Classification project. This plan is structured into sections covering the backend machine learning API (using FastAPI, TensorFlow, and librosa), the integration of a Next.js–based frontend UI, dataset management, error handling, and best practices.

---

## Project Structure

The updated project tree will look like this:

```
/project/sandbox/user-workspace

├── backend/
│   ├── app.py                 # FastAPI application with API endpoints
│   ├── model.py               # Model loading and prediction logic
│   ├── dataset/               # Folder to store or serve sample audio files
│   │    └── sample_bird.wav   # Sample file for testing/demonstration
│   └── requirements.txt       # Python dependencies list
├── .env.local                 # Environment variables (e.g. BACKEND_API_URL)
├── package.json               # Frontend dependencies (Next.js)
└── src/
    ├── app/
    │   ├── bird-classification/
    │   │   └── page.tsx       # New page for audio upload and classification
    │   └── dataset/
    │       └── page.tsx       # Page to display details about the dataset
    └── components/ui/         # (Existing UI components for consistent styling)
```

---

## Backend Implementation (FastAPI)

### 1. File: backend/requirements.txt

List all Python dependencies:
```plaintext
fastapi
uvicorn
tensorflow
librosa
numpy
python-multipart
aiofiles
```

*Note: These libraries are required for serving the API, loading an ML model, and processing audio.*

### 2. File: backend/app.py

Implement the FastAPI server with endpoints.

```python
from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
from model import predict_audio  # Import prediction function from model.py

app = FastAPI(title="Acoustic Bird Classification API")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Ensure the file is an audio file (basic mime type check)
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid file type. An audio file is expected.")
    try:
        file_content = await file.read()
        prediction = predict_audio(file_content)
        return {"prediction": prediction}
    except Exception as e:
        # Log error (in production, use proper logging)
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "Healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

*Key Points:*  
- Endpoint `/predict` accepts a file upload and validates the content type.  
- Proper error handling with HTTPException is used if an error occurs during prediction.

### 3. File: backend/model.py

Implement the ML model–related functions:

```python
import numpy as np
import librosa
import tensorflow as tf
from io import BytesIO

# Load a pre-trained model (for demonstration, we assume a model file exists)
# In production, replace 'path/to/model.h5' with your actual model file path.
try:
    model = tf.keras.models.load_model("backend/model.h5")
except Exception:
    model = None
    print("Warning: Model not loaded. Prediction will fail.")

def predict_audio(file_bytes: bytes) -> dict:
    try:
        # Load audio from byte stream using BytesIO and librosa
        audio_stream = BytesIO(file_bytes)
        # Sample rate is set to 22050 Hz; adjust if necessary.
        y, sr = librosa.load(audio_stream, sr=22050)
        # Compute MFCCs
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
        # Resize or process the mfcc to match model input dimensions
        mfcc = np.mean(mfcc.T, axis=0)
        input_data = np.expand_dims(mfcc, axis=0)  # Shape (1, features)
        
        # Check if model is loaded
        if model is None:
            raise ValueError("Model not available for prediction.")
            
        # Use the model to predict
        prediction = model.predict(input_data)
        # Post-process the prediction (e.g., softmax output) to get label and confidence
        predicted_index = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))
        
        # Map predicted_index to a bird species label
        # For demonstration, use a static mapping. Replace with your actual mapping.
        bird_species = {0: "Sparrow", 1: "Robin", 2: "Blue Jay"}
        label = bird_species.get(predicted_index, "Unknown")
        
        return {"label": label, "confidence": confidence}
    except Exception as e:
        raise Exception(f"Audio processing or prediction error: {str(e)}")
```

*Key Points:*  
- Uses librosa to load and preprocess the audio (computing MFCC).  
- Model prediction uses TensorFlow and processes output with basic mapping.  
- In case of errors, exceptions are raised to be caught in the API.

---

## Frontend Implementation (Next.js)

### 4. File: .env.local

Define the backend API URL:
```dotenv
BACKEND_API_URL=http://localhost:8000
```

*This file makes it easy to switch backend endpoints without hard coding URLs.*

### 5. File: src/app/bird-classification/page.tsx

Create a new page for audio classification with a modern, user-friendly interface.

```tsx
"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function BirdClassificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setResult(null);
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload an audio file.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Server error during classification.");
      }
      const data = await res.json();
      setResult(data.prediction);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Acoustic Bird Classification</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Upload an audio recording to detect bird species. The system uses a deep learning model to identify and return the bird species along with a confidence score.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="file" accept="audio/*" onChange={handleFileChange} style={{ padding: "0.5rem" }} />
        <button type="submit" style={{ background: "#0070f3", color: "#fff", padding: "0.75rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Classifying..." : "Upload and Classify"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "2rem", border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Result</h2>
          <p>Bird Species: {result.label}</p>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
```

*Key Points:*  
- Uses a simple modern layout with consistent spacing and typography.  
- Provides file validation, clear error messages, and a loading indicator.  
- Environment variable NEXT_PUBLIC_BACKEND_API_URL is used for the API endpoint.

### 6. File: src/app/dataset/page.tsx

Create a page to display dataset details with a modern design.

```tsx
"use client";
export default function DatasetPage() {
  return (
    <div style={{ margin: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Bird Audio Dataset</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        This dataset comprises sample audio recordings of various bird species. These recordings are used for training and evaluating the acoustic classification model.
      </p>
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Sample Record</h2>
        <p>File: sample_bird.wav</p>
        <audio controls style={{ width: "100%" }}>
          <source src="/backend/dataset/sample_bird.wav" type="audio/wav" onError="this.onerror=null; this.style.display='none'" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
```

*Key Points:*  
- Provides users with an overview of the dataset and a sample audio playback option.  
- Uses HTML5 audio controls with graceful error handling (hides the player if the audio fails to load).

---

## Integration & Deployment

- **Environment Configuration:**  
  Create a `.env.local` file in the project root with:  
  `BACKEND_API_URL=http://localhost:8000`  
  In Next.js, expose it as `NEXT_PUBLIC_BACKEND_API_URL` so the frontend fetches the correct API endpoint.

- **Running the Backend:**  
  Navigate to the `backend` folder and install dependencies with `pip install -r requirements.txt`. Then start the API using:  
  `uvicorn app:app --reload`

- **Running the Frontend:**  
  Run the Next.js application (typically with `npm run dev`) to view the UI at the designated port.

- **Testing:**  
  Verify the `/predict` endpoint using curl:  
  ```bash
  curl -X POST http://localhost:8000/predict -F "file=@path/to/sample_bird.wav"
  ```
  Use browser dev tools to ensure the UI correctly displays results or error messages when uploading a file.

---

## Summary

- A new FastAPI backend (in the folder “backend”) is created to handle audio uploads, process audio using librosa, and classify bird species with a TensorFlow model.  
- The backend provides endpoints `/predict` and `/health` with proper file and error handling.  
- The Next.js frontend has been updated with a modern, stylistic page (src/app/bird-classification/page.tsx) for audio uploads and real-time classification, and a dataset page (src/app/dataset/page.tsx) to view sample audio.  
- Environment variables (.env.local) store the backend API URL, enabling seamless integration.  
- Both components implement best practices regarding error handling, asynchronous operations, and clear user feedback.
