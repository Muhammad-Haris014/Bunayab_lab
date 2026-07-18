"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/immutability -- imperative three.js/r3f uniform mutation inside useFrame is the standard R3F pattern, not a bug */

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { HeroFuturistic } from "@/components/ui/hero-futuristic";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { AboutSection } from "@/components/ui/about-section";
import { ServicesSection } from "@/components/ui/services-section";
import { WorkSection } from "@/components/ui/work-section";
import { ContactSection } from "@/components/ui/contact-section";
import { SiteFooter } from "@/components/ui/site-footer";
import { Logomark } from "@/components/ui/logomark";

import * as THREE from "three";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const COMPANY_NAME = "Bunyad Lab";
const TAGLINE = "Websites, Marketing & Growth — Built to Perform.";

const LOADING_MESSAGES = [
  "Crafting websites",
  "Building web apps",
  "Growing social media",
  "Optimizing SEO",
  "Designing brands",
  "Boosting performance",
  "Scaling your business",
];

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

interface ShaderProps {
  source: string;
  uniforms: {
    [key: string]: {
      value: number[] | number[][] | number;
      type: string;
    };
  };
  maxFps?: number;
}

interface AgencyLoaderProps {
  className?: string;
}

export const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
  reverse?: boolean;
}) => {
  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            ${reverse ? 'u_reverse_active' : 'false'}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = React.useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
      u_reverse: {
        value: shader.includes("u_reverse_active") ? 1 : 0,
        type: "uniform1i",
      },
    };
  }, [colors, opacities, totalSize, dotSize, shader]);

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse;

        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5;
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);

            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }

            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  hovered?: boolean;
  maxFps?: number;
  uniforms: Uniforms;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();

    lastFrameTime = timestamp;

    const material: any = ref.current.material;
    const timeLocation = material.uniforms.u_time;
    timeLocation.value = timestamp;
  });

  const getUniforms = () => {
    const preparedUniforms: any = {};

    for (const uniformName in uniforms) {
      const uniform: any = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform1i":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1i" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
            type: "3f",
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map((v: number[]) =>
              new THREE.Vector3().fromArray(v)
            ),
            type: "3fv",
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
            type: "2f",
          };
          break;
        default:
          console.error(`Invalid uniform type for '${uniformName}'.`);
          break;
      }
    }

    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    };
    return preparedUniforms;
  };

  const material = useMemo(() => {
    const materialObject = new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    return materialObject;
  }, [size.width, size.height, source]);

  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

export const AgencyLoader = ({ className }: AgencyLoaderProps) => {
  const [step, setStep] = useState<"loading" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (step !== "loading") return;

    const id = setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100));
    }, 60);

    return () => clearInterval(id);
  }, [step]);

  // hand off to the hero once the bar is full; keep the state updater above pure
  useEffect(() => {
    if (step !== "loading" || progress < 100) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- timed handoff sequence: swap canvases, then leave the loading step
    setReverseCanvasVisible(true);
    const hideInitial = setTimeout(() => setInitialCanvasVisible(false), 50);
    const finish = setTimeout(() => setStep("done"), 900);

    return () => {
      clearTimeout(hideInitial);
      clearTimeout(finish);
    };
  }, [progress, step]);

  useEffect(() => {
    if (step !== "loading") return;

    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 450);

    return () => clearInterval(id);
  }, [step]);

  const slideDistance = prefersReducedMotion ? 0 : 40;

  return (
    <AnimatePresence mode="wait">
      {step === "loading" ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            spaceGrotesk.variable,
            dmSans.variable,
            "font-[family-name:var(--font-body)] flex w-full flex-col min-h-screen bg-black relative overflow-hidden",
            className
          )}
        >
          <div className="absolute inset-0 z-0">
            {initialCanvasVisible && (
              <div className="absolute inset-0">
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-black"
                  colors={[
                    [255, 0, 0],
                    [255, 0, 0],
                  ]}
                  dotSize={6}
                  reverse={false}
                />
              </div>
            )}

            {reverseCanvasVisible && (
              <div className="absolute inset-0">
                <CanvasRevealEffect
                  animationSpeed={4}
                  containerClassName="bg-black"
                  colors={[
                    [255, 0, 0],
                    [255, 0, 0],
                  ]}
                  dotSize={6}
                  reverse={true}
                />
              </div>
            )}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-5 py-3 rounded-full border border-[#333] bg-[#1f1f1f57] backdrop-blur-sm">
              <Logomark />
              <span className="font-[family-name:var(--font-heading)] text-xs sm:text-sm tracking-[0.25em] text-white uppercase">
                {COMPANY_NAME}
              </span>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: slideDistance }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md text-center"
              >
                <p className="font-[family-name:var(--font-body)] uppercase tracking-[0.3em] text-xs text-white/40 mb-3">
                  Digital Agency
                </p>
                <h1 className="font-[family-name:var(--font-heading)] text-[2.75rem] sm:text-[3.5rem] leading-[1.05] font-bold text-white">
                  {COMPANY_NAME}
                </h1>
                <p className="font-[family-name:var(--font-body)] text-base sm:text-lg text-white/60 mt-3">
                  {TAGLINE}
                </p>

                <div className="mt-12 space-y-3">
                  <div
                    role="progressbar"
                    aria-label={`Loading ${COMPANY_NAME}`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"
                  >
                    <motion.div
                      className="h-full w-full origin-left rounded-full bg-white"
                      animate={{ scaleX: progress / 100 }}
                      transition={{ ease: "linear", duration: 0.06 }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-[family-name:var(--font-body)] text-sm text-white/50">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={messageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {LOADING_MESSAGES[messageIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="tabular-nums">{progress}%</span>
                  </div>
                </div>
              </motion.div>
            </main>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <SiteNavbar />
          <HeroFuturistic />
          <AboutSection />
          <ServicesSection />
          <WorkSection />
          <ContactSection />
          <SiteFooter />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
