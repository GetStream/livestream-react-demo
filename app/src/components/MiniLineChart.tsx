import { useEffect, useRef } from "react";
import styles from "./MiniLineChart.module.css";

interface MiniLineChartProps {
  data: number[];
  max?: number;
  color?: string;
  width?: number;
  height?: number;
  showThreshold?: number;
  thresholdColor?: string;
}

export function MiniLineChart({
  data,
  max,
  color = "#00e2a1",
  width = 120,
  height = 40,
  showThreshold,
  thresholdColor = "#ff6b6b",
}: MiniLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get device pixel ratio for high DPI rendering
    const dpr = window.devicePixelRatio || 1;

    // Set actual canvas size (accounting for DPI)
    const scaledWidth = width * dpr;
    const scaledHeight = height * dpr;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    // Scale context to match DPI
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    // Calculate max value
    const maxValue = max ?? Math.max(...data, 1);
    const minValue = 0;
    const range = maxValue - minValue;

    // Draw threshold line if specified
    if (showThreshold !== undefined) {
      const thresholdY = height - ((showThreshold - minValue) / range) * height;
      ctx.strokeStyle = thresholdColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(0, thresholdY);
      ctx.lineTo(width, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw line chart
    const stepX = width / (data.length - 1);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + "40");

    // Draw filled area
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);

    data.forEach((value, index) => {
      const x = index * stepX;
      const y = height - ((value - minValue) / range) * height;
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();

    data.forEach((value, index) => {
      const x = index * stepX;
      const y = height - ((value - minValue) / range) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data, max, color, width, height, showThreshold, thresholdColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={styles.canvas}
    />
  );
}
