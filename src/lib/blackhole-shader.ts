// Shader del "agujero negro" del hero. Compartido entre la landing y el blog.

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_intensity;

out vec4 fragColor;

void main() {
    fragColor = vec4(0.0);
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y / 1.0;
    vec2 d = vec2(-1.0, 1.0);
    vec2 c = p * mat2(1.0, 1.0, d / (0.1 + 5.0 / dot(5.0 * p - d, 5.0 * p - d)));
    vec2 v = c;

    float angle = log(length(v)) + u_time * 0.2;
    float ca = cos(angle);
    float sa = sin(angle + 0.33);
    float sb = sin(angle + 0.11);
    v = v * mat2(ca, ca, sa, sb) * 5.0;

    for(float i = 1.0; i <= 9.0; i += 1.0) {
        fragColor += sin(v.xyyx) + 1.0;
        v += 0.7 * sin(v.yx * i + u_time) / i + 0.5;
    }

    float term1 = exp(c.x * 0.3) / fragColor.r;
    float term2 = exp(-c.x * 0.2) / fragColor.g;
    float term3 = exp(-c.x * 0.8) / fragColor.b;

    float denom = (0.1 + 0.1 * pow(length(sin(v / 0.3) * 0.2 + c * vec2(1.0, 2.0)) - 1.0, 2.0));
    denom *= (1.0 + 7.0 * exp(0.3 * c.y - dot(c, c)));
    denom *= (0.03 + abs(length(p) - 0.7));

    fragColor = 1.0 - exp(-vec4(term1 * 0.3, term2 * 1.2, term3 * 1.0, 0.0) / denom * 0.2);
    fragColor.rgb *= u_intensity;
    fragColor.a = 1.0;
}
`;

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export interface BlackholeOptions {
  /** Multiplicador de brillo (1 = hero) */
  intensity?: number;
  /** Momento del frame estático cuando hay reduced motion */
  staticTime?: number;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[blackhole] shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Monta el shader en un canvas. Si no hay WebGL2 marca el canvas con
 * `data-fallback` (el CSS muestra un gradiente con la paleta) y no rompe nada.
 */
export function mountBlackhole(canvas: HTMLCanvasElement, options: BlackholeOptions = {}) {
  const { intensity = 1, staticTime = 6 } = options;
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  const fallback = () => canvas.setAttribute('data-fallback', '');
  if (!gl) return fallback();

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return fallback();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return fallback();

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uResolution = gl.getUniformLocation(program, 'u_resolution');
  gl.uniform1f(gl.getUniformLocation(program, 'u_intensity'), intensity);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  let visible = true;
  let rafId = 0;

  function draw(time: number) {
    gl!.uniform1f(uTime, time);
    gl!.uniform2f(uResolution, canvas.width, canvas.height);
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
  }

  function frame() {
    draw((performance.now() - start) / 1000);
    rafId = visible && !reducedMotion.matches && !document.hidden ? requestAnimationFrame(frame) : 0;
  }

  function play() {
    if (reducedMotion.matches) return draw(staticTime);
    if (!rafId && visible && !document.hidden) rafId = requestAnimationFrame(frame);
  }

  // Es un fondo difuso: a densidad 1 se ve igual y la GPU trabaja hasta 4x menos.
  // ResizeObserver en vez de window.resize: no dispara de más con la barra del navegador mobile.
  new ResizeObserver(() => {
    const w = Math.max(1, Math.round(canvas.clientWidth));
    const h = Math.max(1, Math.round(canvas.clientHeight));
    if (w === canvas.width && h === canvas.height) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    if (reducedMotion.matches || !rafId) draw(reducedMotion.matches ? staticTime : (performance.now() - start) / 1000);
  }).observe(canvas);

  // Pausar fuera de pantalla o con la pestaña oculta (GPU y batería)
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
  }).observe(canvas);
  document.addEventListener('visibilitychange', play);
  reducedMotion.addEventListener('change', play);

  play();
}
