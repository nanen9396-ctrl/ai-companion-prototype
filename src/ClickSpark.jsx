import { useEffect, useRef } from "react";

export function ClickSpark({ children, color = "#f6d7a7" }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width));
      canvas.height = Math.max(1, Math.round(bounds.height));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function draw(timestamp) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const progress = (timestamp - spark.startedAt) / 320;
      if (progress >= 1) return false;
      const eased = 1 - (1 - progress) ** 2;
      const distance = eased * 22;
      const length = 8 * (1 - eased);
      const x = spark.x + Math.cos(spark.angle) * distance;
      const y = spark.y + Math.sin(spark.angle) * distance;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + Math.cos(spark.angle) * length, y + Math.sin(spark.angle) * length);
      context.strokeStyle = color;
      context.lineWidth = 1.8;
      context.stroke();
      return true;
    });

    frameRef.current = sparksRef.current.length ? requestAnimationFrame(draw) : null;
  }

  function handleClick(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const startedAt = performance.now();
    sparksRef.current.push(
      ...Array.from({ length: 8 }, (_, index) => ({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        angle: (Math.PI * 2 * index) / 8,
        startedAt,
      })),
    );
    if (!frameRef.current) frameRef.current = requestAnimationFrame(draw);
  }

  return (
    <div className="click-spark" onClick={handleClick}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {children}
    </div>
  );
}
