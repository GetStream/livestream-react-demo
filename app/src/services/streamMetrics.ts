/**
 * Mock streaming metrics service
 * Provides simulated real-time streaming statistics
 */

export interface StreamMetrics {
  fps: number;
  videoBitrate: number; // in kbps
  audioBitrate: number; // in kbps
  resolution: { width: number; height: number };
  codec: string;
  protocol: 'srt' | 'rtmp' | 'webrtc';
  timestamp: number;
}

export interface StreamTargets {
  targetFps: number;
  targetVideoBitrate: number;
  targetAudioBitrate: number;
}

export interface StreamAlert {
  type: 'fps' | 'bitrate';
  severity: 'warning' | 'critical';
  message: string;
  timestamp: number;
}

class StreamMetricsService {
  private baseMetrics: StreamMetrics = {
    fps: 30,
    videoBitrate: 2500,
    audioBitrate: 128,
    resolution: { width: 1920, height: 1080 },
    codec: 'H264',
    protocol: 'webrtc',
    timestamp: Date.now(),
  };

  private targets: StreamTargets = {
    targetFps: 30,
    targetVideoBitrate: 2500,
    targetAudioBitrate: 128,
  };

  private variance = {
    fps: 0.15, // 15% variance
    bitrate: 0.2, // 20% variance
  };

  /**
   * Set the protocol type (updates based on broadcast method)
   */
  setProtocol(protocol: 'srt' | 'rtmp' | 'webrtc') {
    this.baseMetrics.protocol = protocol;
  }

  /**
   * Generate realistic mock metrics with some variance
   */
  generateMetrics(): StreamMetrics {
    // Simulate network fluctuations
    const fpsVariance = (Math.random() - 0.5) * 2 * this.variance.fps;
    const bitrateVariance = (Math.random() - 0.5) * 2 * this.variance.bitrate;

    // Occasionally simulate more severe drops (5% chance)
    const severeDrop = Math.random() < 0.05;
    const dropMultiplier = severeDrop ? 0.6 : 1;

    const fps = Math.max(
      1,
      Math.round(this.baseMetrics.fps * (1 + fpsVariance) * dropMultiplier)
    );

    const videoBitrate = Math.max(
      100,
      Math.round(this.baseMetrics.videoBitrate * (1 + bitrateVariance) * dropMultiplier)
    );

    // Audio bitrate is more stable
    const audioBitrate = Math.max(
      64,
      Math.round(this.baseMetrics.audioBitrate * (1 + (Math.random() - 0.5) * 0.1))
    );

    return {
      fps,
      videoBitrate,
      audioBitrate,
      resolution: { ...this.baseMetrics.resolution },
      codec: this.baseMetrics.codec,
      protocol: this.baseMetrics.protocol,
      timestamp: Date.now(),
    };
  }

  /**
   * Check if current metrics are below targets
   */
  checkAlerts(metrics: StreamMetrics): StreamAlert[] {
    const alerts: StreamAlert[] = [];

    // FPS alerts
    const fpsRatio = metrics.fps / this.targets.targetFps;
    if (fpsRatio < 0.7) {
      alerts.push({
        type: 'fps',
        severity: 'critical',
        message: `FPS critically low: ${metrics.fps}/${this.targets.targetFps}`,
        timestamp: Date.now(),
      });
    } else if (fpsRatio < 0.85) {
      alerts.push({
        type: 'fps',
        severity: 'warning',
        message: `FPS below target: ${metrics.fps}/${this.targets.targetFps}`,
        timestamp: Date.now(),
      });
    }

    // Bitrate alerts
    const bitrateRatio = metrics.videoBitrate / this.targets.targetVideoBitrate;
    if (bitrateRatio < 0.7) {
      alerts.push({
        type: 'bitrate',
        severity: 'critical',
        message: `Bitrate critically low: ${metrics.videoBitrate}/${this.targets.targetVideoBitrate} kbps`,
        timestamp: Date.now(),
      });
    } else if (bitrateRatio < 0.85) {
      alerts.push({
        type: 'bitrate',
        severity: 'warning',
        message: `Bitrate below target: ${metrics.videoBitrate}/${this.targets.targetVideoBitrate} kbps`,
        timestamp: Date.now(),
      });
    }

    return alerts;
  }

  /**
   * Get current target values
   */
  getTargets(): StreamTargets {
    return { ...this.targets };
  }

  /**
   * Update target values
   */
  setTargets(targets: Partial<StreamTargets>) {
    this.targets = { ...this.targets, ...targets };
  }
}

export const streamMetricsService = new StreamMetricsService();
