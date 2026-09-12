// 🎵 PCM Audio utilities for Gemini Live (24kHz playback, 16kHz capture)

export function base64ToFloat32PCM(base64Pcm: string): Float32Array {
  if (!base64Pcm) return new Float32Array(0);

  try {
    const binaryString = window.atob(base64Pcm);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }
    return float32Array;
  } catch (err) {
    console.error('Error decoding base64 PCM:', err);
    return new Float32Array(0);
  }
}

export function calculateAudioRMS(samples: Float32Array): number {
  if (!samples || samples.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < samples.length; i++) {
    sum += samples[i] * samples[i];
  }
  return Math.min(1, Math.sqrt(sum / samples.length) * 4);
}

export function float32ToInt16PCM(samples: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(samples.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function resampleTo16kHz(inputBuffer: Float32Array, inputSampleRate: number): Float32Array {
  if (inputSampleRate === 16000) return inputBuffer;
  const targetSampleRate = 16000;
  const ratio = inputSampleRate / targetSampleRate;
  const newLength = Math.round(inputBuffer.length / ratio);
  const result = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const originalIndex = Math.min(Math.floor(i * ratio), inputBuffer.length - 1);
    result[i] = inputBuffer[originalIndex];
  }
  return result;
}

