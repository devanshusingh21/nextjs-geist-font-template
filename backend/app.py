from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import predict_audio, get_model_info
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Acoustic Bird Classification API",
    description="API for classifying bird species from audio recordings",
    version="1.0.0"
)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "message": "Acoustic Bird Classification API",
        "version": "1.0.0",
        "endpoints": {
            "predict": "/predict - POST audio file for classification",
            "health": "/health - GET health status",
            "model-info": "/model-info - GET model information"
        }
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict bird species from uploaded audio file
    """
    logger.info(f"Received file: {file.filename}, content_type: {file.content_type}")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Please upload an audio file (wav, mp3, etc.)"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        logger.info(f"File size: {len(file_content)} bytes")
        
        # Get prediction
        prediction = predict_audio(file_content)
        
        logger.info(f"Prediction successful: {prediction}")
        return {
            "success": True,
            "prediction": prediction,
            "filename": file.filename
        }
        
    except Exception as e:
        logger.error(f"Error processing file {file.filename}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing audio file: {str(e)}"
        )

@app.get("/health")
def health_check():
    """Health check endpoint"""
    model_status = get_model_info()
    return {
        "status": "healthy",
        "model_loaded": model_status["loaded"],
        "timestamp": model_status["timestamp"]
    }

@app.get("/model-info")
def model_info():
    """Get information about the loaded model"""
    return get_model_info()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
