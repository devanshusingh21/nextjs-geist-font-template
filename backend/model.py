import numpy as np
import librosa
import tensorflow as tf
from io import BytesIO
import logging
from datetime import datetime
import os

logger = logging.getLogger(__name__)

# Bird species mapping (expandable)
BIRD_SPECIES = {
    0: "American Robin",
    1: "House Sparrow", 
    2: "Blue Jay",
    3: "Northern Cardinal",
    4: "Common Crow",
    5: "Mourning Dove",
    6: "Red-winged Blackbird",
    7: "European Starling"
}

class BirdClassificationModel:
    def __init__(self):
        self.model = None
        self.model_loaded = False
        self.load_timestamp = None
        self._create_demo_model()
    
    def _create_demo_model(self):
        """
        Create a demonstration model for bird classification
        In production, this would load a pre-trained model
        """
        try:
            # Create a simple CNN model for demonstration
            model = tf.keras.Sequential([
                tf.keras.layers.Dense(128, activation='relu', input_shape=(40,)),
                tf.keras.layers.Dropout(0.3),
                tf.keras.layers.Dense(64, activation='relu'),
                tf.keras.layers.Dropout(0.3),
                tf.keras.layers.Dense(len(BIRD_SPECIES), activation='softmax')
            ])
            
            model.compile(
                optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # Initialize with random weights (in production, load trained weights)
            dummy_input = np.random.random((1, 40))
            model.predict(dummy_input)  # Initialize the model
            
            self.model = model
            self.model_loaded = True
            self.load_timestamp = datetime.now().isoformat()
            
            logger.info("Demo model created successfully")
            
        except Exception as e:
            logger.error(f"Error creating demo model: {str(e)}")
            self.model_loaded = False

    def extract_features(self, audio_bytes):
        """
        Extract MFCC features from audio bytes
        """
        try:
            # Load audio from bytes
            audio_stream = BytesIO(audio_bytes)
            y, sr = librosa.load(audio_stream, sr=22050, duration=30)  # Limit to 30 seconds
            
            # Extract MFCC features
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
            
            # Take mean across time axis
            mfcc_mean = np.mean(mfcc.T, axis=0)
            
            return mfcc_mean
            
        except Exception as e:
            raise Exception(f"Feature extraction failed: {str(e)}")

    def predict(self, features):
        """
        Predict bird species from features
        """
        if not self.model_loaded or self.model is None:
            raise Exception("Model not loaded")
        
        try:
            # Reshape for model input
            input_data = np.expand_dims(features, axis=0)
            
            # Get prediction
            prediction = self.model.predict(input_data, verbose=0)
            
            # Get predicted class and confidence
            predicted_index = np.argmax(prediction, axis=1)[0]
            confidence = float(np.max(prediction))
            
            # Get species name
            species = BIRD_SPECIES.get(predicted_index, "Unknown Species")
            
            return {
                "species": species,
                "confidence": confidence,
                "species_id": int(predicted_index),
                "all_probabilities": {
                    BIRD_SPECIES[i]: float(prediction[0][i]) 
                    for i in range(len(BIRD_SPECIES))
                }
            }
            
        except Exception as e:
            raise Exception(f"Prediction failed: {str(e)}")

# Global model instance
bird_model = BirdClassificationModel()

def predict_audio(audio_bytes: bytes) -> dict:
    """
    Main prediction function called by the API
    """
    try:
        # Extract features from audio
        features = bird_model.extract_features(audio_bytes)
        
        # Get prediction
        result = bird_model.predict(features)
        
        return result
        
    except Exception as e:
        logger.error(f"Audio prediction error: {str(e)}")
        raise Exception(f"Audio processing or prediction error: {str(e)}")

def get_model_info() -> dict:
    """
    Get information about the current model
    """
    return {
        "loaded": bird_model.model_loaded,
        "timestamp": bird_model.load_timestamp,
        "species_count": len(BIRD_SPECIES),
        "supported_species": list(BIRD_SPECIES.values()),
        "model_type": "Demo Neural Network",
        "feature_type": "MFCC (40 coefficients)"
    }
