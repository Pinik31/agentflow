
import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const Particles: React.FC<ParticlesProps> = ({
  className = '',
  quantity = 50,
  color = "#ffffff",
  speed = 0.5,
  minSize = 1,
  maxSize = 3,
  opacity = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Adjust color based on theme
  useEffect(() => {
    let colorToUse = color;
    if (color === "auto") {
      colorToUse = theme === 'dark' ? '#ffffff' : '#000000';
    }
  }, [theme, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize for full coverage
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * opacity
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;
    let mouseEffect = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseEffect = true;
      
      // Disable mouse effect after 2 seconds of inactivity
      setTimeout(() => {
        mouseEffect = false;
      }, 2000);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply mouse interaction
        if (mouseEffect) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
          }
        }

        // Update particle position
        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary check with bounce
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1;
        }
        
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections with limited distance
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.3 * p.opacity * p2.opacity;
            ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [quantity, color, speed, minSize, maxSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

export default Particles;
