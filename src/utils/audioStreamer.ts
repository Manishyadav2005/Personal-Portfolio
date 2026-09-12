import { float32ToInt16PCM, arrayBufferToBase64, resampleTo16kHz, calculateAudioRMS } from './pcmUtils';

export class AudioStreamer {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private mediaSource: MediaStreamAudioSourceNode | null = null;
  private isStreaming: boolean = false;

  private onChunkCallback: ((base64Pcm: string) => void) | null = null;
  private onVolumeCallback: ((volume: number) => void) | null = null;

  public setOnChunk(callback: (base64Pcm: string) => void) {
    this.onChunkCallback = callback;
  }

  public setOnVolume(callback: (volume: number) => void) {
    this.onVolumeCallback = callback;
  }

  public async start(): Promise<void> {
    if (this.isStreaming) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });

      // Browser AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.mediaSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      // 4096 buffer size provides smooth PCM capture without stutter
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);

      const sampleRate = this.audioContext.sampleRate;

      this.scriptProcessor.onaudioprocess = (event: AudioProcessingEvent) => {
        if (!this.isStreaming) return;

        const inputBuffer = event.inputBuffer.getChannelData(0);

        // Calculate volume for reactive UI
        const volume = calculateAudioRMS(inputBuffer);
        if (this.onVolumeCallback) {
          this.onVolumeCallback(volume);
        }

        // Resample input to 16kHz for Gemini PCM requirement
        const resampled = resampleTo16kHz(inputBuffer, sampleRate);
        const pcm16Buffer = float32ToInt16PCM(resampled);
        const base64PCM = arrayBufferToBase64(pcm16Buffer);

        if (this.onChunkCallback && base64PCM) {
          this.onChunkCallback(base64PCM);
        }
      };

      this.mediaSource.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);

      this.isStreaming = true;
    } catch (error: any) {
      this.stop();
      throw new Error(`Microphone access error: ${error.message || 'Permission denied'}`);
    }
  }

  public stop(): void {
    this.isStreaming = false;

    if (this.scriptProcessor && this.mediaSource) {
      try {
        this.scriptProcessor.disconnect();
        this.mediaSource.disconnect();
      } catch (e) {
        // ignore
      }
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      if (this.audioContext.state !== 'closed') {
        this.audioContext.close().catch(() => {});
      }
      this.audioContext = null;
    }

    this.scriptProcessor = null;
    this.mediaSource = null;

    if (this.onVolumeCallback) {
      this.onVolumeCallback(0);
    }
  }

  public isActive(): boolean {
    return this.isStreaming;
  }
}

