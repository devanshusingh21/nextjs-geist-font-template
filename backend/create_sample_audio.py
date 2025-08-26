import numpy as np
import wave
import os

def create_sample_bird_audio():
    """
    Create a synthetic bird-like audio sample for demonstration
    """
    # Audio parameters
    sample_rate = 22050
    duration = 3.0  # 3 seconds
    
    # Generate time array
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Create bird-like chirping sound with multiple frequencies
    # Simulate a bird call with frequency modulation
    base_freq = 2000  # Base frequency in Hz
    
    # Create multiple harmonics and frequency sweeps
    signal = np.zeros_like(t)
    
    # Add multiple chirp components
    for i in range(3):
        start_freq = base_freq + i * 500
        end_freq = start_freq + 800
        
        # Create frequency sweep (chirp)
        freq_sweep = np.linspace(start_freq, end_freq, len(t))
        phase = 2 * np.pi * np.cumsum(freq_sweep) / sample_rate
        
        # Add envelope to make it more bird-like
        envelope = np.exp(-3 * t) * np.sin(2 * np.pi * 5 * t)**2
        
        signal += 0.3 * envelope * np.sin(phase)
    
    # Add some noise for realism
    noise = 0.05 * np.random.normal(0, 1, len(t))
    signal += noise
    
    # Normalize
    signal = signal / np.max(np.abs(signal))
    
    # Convert to 16-bit integers
    signal_int = (signal * 32767).astype(np.int16)
    
    # Save as WAV file
    output_path = "backend/dataset/sample_bird.wav"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with wave.open(output_path, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 2 bytes per sample
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(signal_int.tobytes())
    
    print(f"Sample bird audio created: {output_path}")
    return output_path

if __name__ == "__main__":
    create_sample_bird_audio()
