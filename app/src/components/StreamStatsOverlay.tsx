import { useEffect, useState } from "react";
import clsx from "clsx";
import { MiniLineChart } from "./MiniLineChart";
import { Icon } from "./Icon";
import {
  streamMetricsService,
  type StreamMetrics,
  type StreamAlert,
} from "../services/streamMetrics";
import styles from "./StreamStatsOverlay.module.css";
import glassStyles from "./Glass.module.css";

const MAX_DATA_POINTS = 30; // 30 seconds of data at 1Hz

interface MetricHistory {
  fps: number[];
  videoBitrate: number[];
  audioBitrate: number[];
}

interface StreamStatsOverlayProps {
  protocol?: 'srt' | 'rtmp' | 'webrtc';
}

export function StreamStatsOverlay({ protocol = 'webrtc' }: StreamStatsOverlayProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState<StreamMetrics | null>(
    null
  );
  const [metricHistory, setMetricHistory] = useState<MetricHistory>({
    fps: [],
    videoBitrate: [],
    audioBitrate: [],
  });
  const [alerts, setAlerts] = useState<StreamAlert[]>([]);

  useEffect(() => {
    // Set protocol in the service
    streamMetricsService.setProtocol(protocol);
  }, [protocol]);

  useEffect(() => {
    // Update metrics every second
    const interval = setInterval(() => {
      const metrics = streamMetricsService.generateMetrics();
      setCurrentMetrics(metrics);

      // Update history
      setMetricHistory((prev) => ({
        fps: [...prev.fps, metrics.fps].slice(-MAX_DATA_POINTS),
        videoBitrate: [...prev.videoBitrate, metrics.videoBitrate].slice(
          -MAX_DATA_POINTS
        ),
        audioBitrate: [...prev.audioBitrate, metrics.audioBitrate].slice(
          -MAX_DATA_POINTS
        ),
      }));

      // Check for alerts
      const newAlerts = streamMetricsService.checkAlerts(metrics);
      setAlerts(newAlerts);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentMetrics) {
    return null;
  }

  const targets = streamMetricsService.getTargets();

  return (
    <div className={clsx(styles.overlay, glassStyles._overlay)}>
      <div className={styles.header}>
        <div className={styles.title}>Stream Stats</div>
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          <Icon icon={isCollapsed ? "arrow_down" : "arrow_drop_up"} size={16} />
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Alerts Section */}
          {alerts.length > 0 && (
            <div className={styles.alerts}>
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={clsx(
                    styles.alert,
                    styles[`alert_${alert.severity}`]
                  )}
                >
                  <Icon icon="info" size={14} />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* Time Series Metrics */}
          <div className={styles.section}>
            <div className={styles.metric}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>FPS</span>
                <span className={styles.metricValue}>
                  {currentMetrics.fps}
                  <small className={styles.metricTarget}>
                    / {targets.targetFps}
                  </small>
                </span>
              </div>
              <MiniLineChart
                data={metricHistory.fps}
                max={targets.targetFps + 10}
                color="#00e2a1"
                showThreshold={targets.targetFps * 0.85}
              />
            </div>

            <div className={styles.metric}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Video Bitrate</span>
                <span className={styles.metricValue}>
                  {currentMetrics.videoBitrate}
                  <small className={styles.metricTarget}>
                    / {targets.targetVideoBitrate}
                  </small>
                  <small className={styles.metricUnit}>kbps</small>
                </span>
              </div>
              <MiniLineChart
                data={metricHistory.videoBitrate}
                max={targets.targetVideoBitrate + 500}
                color="#5b9aff"
                showThreshold={targets.targetVideoBitrate * 0.85}
              />
            </div>

            <div className={styles.metric}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Audio Bitrate</span>
                <span className={styles.metricValue}>
                  {currentMetrics.audioBitrate}
                  <small className={styles.metricTarget}>
                    / {targets.targetAudioBitrate}
                  </small>
                  <small className={styles.metricUnit}>kbps</small>
                </span>
              </div>
              <MiniLineChart
                data={metricHistory.audioBitrate}
                max={targets.targetAudioBitrate + 64}
                color="#a78bfa"
                showThreshold={targets.targetAudioBitrate * 0.85}
              />
            </div>
          </div>

          {/* Static Info */}
          <div className={clsx(styles.section, styles.staticInfo)}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Protocol</span>
              <span className={styles.infoValue}>
                {currentMetrics.protocol.toUpperCase()}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Resolution</span>
              <span className={styles.infoValue}>
                {currentMetrics.resolution.width}x
                {currentMetrics.resolution.height}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Codec</span>
              <span className={styles.infoValue}>{currentMetrics.codec}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
