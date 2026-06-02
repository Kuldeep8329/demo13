import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles({ biome }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Classes
    class RainforestRain {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.length = 15 + Math.random() * 20;
        this.speed = 10 + Math.random() * 8;
        this.opacity = 0.15 + Math.random() * 0.25;
        this.angle = -2 - Math.random() * 2; // slant left
      }
      update() {
        this.y += this.speed;
        this.x += this.angle;
        if (this.y > height || this.x < 0) {
          this.reset();
        }
      }
      draw() {
        ctx.strokeStyle = `rgba(16, 185, 129, ${this.opacity})`; // emerald green tinted rain
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.angle, this.y + this.length);
        ctx.stroke();
      }
    }

    class MeadowPetal {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // distribute initial petals
      }
      reset() {
        this.x = -20;
        this.y = Math.random() * height - 50;
        this.size = 6 + Math.random() * 8;
        this.speedX = 1 + Math.random() * 2;
        this.speedY = -0.5 + Math.random() * 1.5;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.rotation = Math.random() * Math.PI;
        this.spin = -0.02 + Math.random() * 0.04;
        // Petal colors: soft pinks and sky blues
        const colors = ['rgba(244, 143, 177, opacity)', 'rgba(144, 202, 249, opacity)', 'rgba(255, 235, 204, opacity)'];
        this.colorStr = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.spin;
        if (this.x > width + 20 || this.y > height + 20 || this.y < -20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.colorStr.replace('opacity', this.opacity.toString());
        ctx.beginPath();
        // Draw an organic petal shape
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class RedwoodLeaf {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = 8 + Math.random() * 10;
        this.speedY = 1.2 + Math.random() * 1.8;
        this.speedX = -0.6 + Math.random() * 1.2;
        this.opacity = 0.2 + Math.random() * 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = -0.01 + Math.random() * 0.02;
        // Redwood leaf colors: amber, ochre, forest green, warm brown
        const colors = [
          'rgba(245, 158, 11, opacity)', // amber
          'rgba(163, 230, 53, opacity)', // moss green
          'rgba(217, 119, 6, opacity)',  // dark gold
          'rgba(120, 53, 4, opacity)',   // dark redwood brown
        ];
        this.colorStr = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4; // sway gently
        this.rotation += this.spin;
        if (this.y > height + 20 || this.x > width + 20 || this.x < -20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.colorStr.replace('opacity', this.opacity.toString());
        ctx.beginPath();
        // Leaf shape
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size / 2, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size / 2, 0, 0, -this.size);
        ctx.fill();
        ctx.restore();
      }
    }

    class GlenFirefly {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 2 + Math.random() * 3;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.3 + Math.random() * 0.5;
        this.opacity = 0.1 + Math.random() * 0.8;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        // Random walk
        this.angle += -0.15 + Math.random() * 0.3;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Glow pulse
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity >= 0.9) {
          this.pulseDir = -1;
        } else if (this.opacity <= 0.05) {
          this.pulseDir = 1;
        }

        // Screen boundary check
        if (this.x < -20) this.x = width + 10;
        if (this.x > width + 20) this.x = -10;
        if (this.y < -20) this.y = height + 10;
        if (this.y > height + 20) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        // Bioluminescent gold-lavender glow
        const glowGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3.5
        );
        glowGradient.addColorStop(0, `rgba(253, 230, 138, ${this.opacity})`); // bright yellow center
        glowGradient.addColorStop(0.3, `rgba(217, 70, 239, ${this.opacity * 0.4})`); // purplish aura
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize Particles based on Biome
    const initParticles = () => {
      particles = [];
      let count = 60;
      
      if (biome === 'rainforest') {
        count = 120;
        for (let i = 0; i < count; i++) particles.push(new RainforestRain());
      } else if (biome === 'meadow') {
        count = 45;
        for (let i = 0; i < count; i++) particles.push(new MeadowPetal());
      } else if (biome === 'redwood') {
        count = 40;
        for (let i = 0; i < count; i++) particles.push(new RedwoodLeaf());
      } else if (biome === 'glen') {
        count = 50;
        for (let i = 0; i < count; i++) particles.push(new GlenFirefly());
      }
    };

    initParticles();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & Update particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [biome]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
