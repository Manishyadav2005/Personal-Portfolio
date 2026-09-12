import { base64ToFloat32PCM, calculateAudioRMS } from './pcmUtils';

export class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private nextStartTime: number = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private onVolumeCallback: ((volume: number) => void) | null = null;
  private isPlaying: boolean = false;

  private onEndCallback: (() => void) | null = null;

  constructor() {
    // Lazy audio context creation
  }

  public setOnVolume(callback: (volume: number) => void) {
    this.onVolumeCallback = callback;
  }

  public setOnEnded(callback: () => void) {
    this.onEndCallback = callback;
  }

  private initAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      // Gemini Live output is 24kHz mono PCM
      this.audioContext = new AudioContextClass({ sampleRate: 24000 });
    }
  }

  public async playChunk(base64Pcm: string): Promise<void> {
    this.initAudioContext();
    if (!this.audioContext) return;

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const float32Samples = base64ToFloat32PCM(base64Pcm);
    if (float32Samples.length === 0) return;

    // Calculate volume
    const currentRms = calculateAudioRMS(float32Samples);
    if (this.onVolumeCallback) {
      this.onVolumeCallback(currentRms);
    }

    const audioBuffer = this.audioContext.createBuffer(1, float32Samples.length, 24000);
    audioBuffer.getChannelData(0).set(float32Samples);

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    if (this.nextStartTime < now) {
      this.nextStartTime = now + 0.02; // Tiny buffer delay to prevent click/gap
    }

    source.start(this.nextStartTime);
    this.nextStartTime += audioBuffer.duration;

    this.activeSources.push(source);
    this.isPlaying = true;

    source.onended = () => {
      const index = this.activeSources.indexOf(source);
      if (index > -1) {
        this.activeSources.splice(index, 1);
      }
      if (this.activeSources.length === 0) {
        this.isPlaying = false;
        if (this.onVolumeCallback) {
          this.onVolumeCallback(0);
        }
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      }
    };
  }

  public stop(): void {
    // Stop all scheduled/active audio sources immediately for barge-in / interruption
    for (const source of this.activeSources) {
      try {
        source.stop(0);
        source.disconnect();
      } catch (e) {
        // ignore
      }
    }
    this.activeSources = [];
    if (this.audioContext) {
      this.nextStartTime = this.audioContext.currentTime;
    }
    this.isPlaying = false;
    if (this.onVolumeCallback) {
      this.onVolumeCallback(0);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public close(): void {
    this.stop();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
  }
}

