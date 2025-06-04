import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
varying vec2 vUv;
void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
  uv += (uMouse - vec2(0.5)) * uAmplitude;
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function createIridescenceEffect({
  container,
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = false,
}) {
  if (!container) return;
  let renderer, program, mesh, animateId;
  let mouse = { x: 0.5, y: 0.5 };
  let targetMouse = { x: 0.5, y: 0.5 };
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpFactor = 0.12;

  renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), antialias: true });
  const gl = renderer.gl;
  gl.clearColor(1, 1, 1, 1);

  function resize() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    if (program) {
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
  }
  window.addEventListener('resize', resize);

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(...color) },
      uResolution: {
        value: new Color(
          container.offsetWidth,
          container.offsetHeight,
          container.offsetWidth / container.offsetHeight
        ),
      },
      uMouse: { value: new Float32Array([mouse.x, mouse.y]) },
      uAmplitude: { value: amplitude },
      uSpeed: { value: speed },
    },
  });
  resize();

  mesh = new Mesh(gl, { geometry, program });

  function update(t) {
    animateId = requestAnimationFrame(update);
    program.uniforms.uTime.value = t * 0.001;
    if (mouseReact) {
      mouse.x = lerp(mouse.x, targetMouse.x, lerpFactor);
      mouse.y = lerp(mouse.y, targetMouse.y, lerpFactor);
      program.uniforms.uMouse.value[0] = mouse.x;
      program.uniforms.uMouse.value[1] = mouse.y;
    } else {
      program.uniforms.uMouse.value[0] = 0.5;
      program.uniforms.uMouse.value[1] = 0.5;
    }
    renderer.render({ scene: mesh });
  }
  animateId = requestAnimationFrame(update);
  container.appendChild(gl.canvas);

  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
  }
  if (mouseReact) {
    container.addEventListener('mousemove', handleMouseMove);
  }

  // Cleanup function (call if you remove the card)
  function destroy() {
    cancelAnimationFrame(animateId);
    window.removeEventListener('resize', resize);
    if (mouseReact) container.removeEventListener('mousemove', handleMouseMove);
    if (gl && gl.canvas && container.contains(gl.canvas)) {
      container.removeChild(gl.canvas);
    }
    const loseContextExtension = gl.getExtension('WEBGL_lose_context');
    if (loseContextExtension) loseContextExtension.loseContext();
  }

  return { destroy };
} 