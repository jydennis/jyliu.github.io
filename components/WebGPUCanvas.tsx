
import React, { useEffect, useRef, useState } from 'react';

const SHADER_CODE = `
struct Uniforms {
  time: f32,
  width: f32,
  height: f32,
  padding: f32,
};

@group(0) @binding(0) var<uniform> ui: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var pos = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0)
  );

  var output: VertexOutput;
  output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
  output.uv = pos[vertexIndex];
  return output;
}

fn get_environment(dir: vec3<f32>) -> vec3<f32> {
    let horizon = smoothstep(-0.2, 0.2, dir.y);
    let sky = mix(vec3<f32>(0.02, 0.05, 0.1), vec3<f32>(0.2, 0.3, 0.5), pow(max(0.0, dir.y), 1.2));
    let ground = vec3<f32>(0.005, 0.005, 0.01);
    return mix(ground, sky, horizon);
}

fn get_wobble(p: vec2<f32>, t: f32) -> f32 {
    let angle = atan2(p.y, p.x);
    let dist = length(p);
    
    var w = sin(angle * 2.0 + t * 0.8) * 0.012;
    w += sin(angle * 3.0 - t * 1.2) * 0.008;
    
    return w * smoothstep(0.0, 0.1, dist);
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
  let aspect = ui.width / ui.height;
  var uv = input.uv;
  uv.x *= aspect;

  // FIXED CENTER FOR SOLAR LIGHT RAYS
  let fixed_center = vec2<f32>(0.0, 0.0);
  let dist_to_fixed_center = length(uv - fixed_center);
  let angle_fixed = atan2(uv.y - fixed_center.y, uv.x - fixed_center.x);

  // SOLAR WHITE RADIATING RAYS
  var rays1 = sin(angle_fixed * 8.0 + ui.time * 0.25) * 0.5 + 0.5;
  var rays2 = sin(angle_fixed * 15.0 - ui.time * 0.4) * 0.5 + 0.5;
  var rays3 = sin(angle_fixed * 4.0 + ui.time * 0.1) * 0.5 + 0.5;
  
  let ray_pattern = pow(rays1 * rays2 * rays3, 2.0);
  let ray_falloff = smoothstep(2.0, 0.0, dist_to_fixed_center);
  let ray_intensity = ray_pattern * 0.6 * ray_falloff;
  let solar_core_glow = 0.25 * smoothstep(1.0, 0.0, dist_to_fixed_center);
  // CHANGED FROM YELLOW TO WHITE
  let sunlight_color = vec3<f32>(1.0, 1.0, 1.0) * (ray_intensity + solar_core_glow);

  // BUBBLE MOVEMENT LOGIC
  let jump_speed = 1.4;
  let t = ui.time * jump_speed;
  let sin_val = abs(sin(t));
  let bounce = pow(sin_val, 0.7); 
  let velocity = cos(t);
  let stretch_factor = 0.1 * abs(velocity) * sin_val; 
  let impact_squash = 0.12 * pow(1.0 - sin_val, 4.0);
  let stretch = 1.0 + stretch_factor - impact_squash;
  let squash = 1.0 / stretch;
  
  let jump_height = 0.45;
  let y_offset = (bounce * jump_height) - 0.22;
  let bubble_center = vec2<f32>(0.0, y_offset);
  
  var p_local = (uv - bubble_center);
  let dist_to_bubble = length(p_local); 
  
  // Outer glow emitted by the bubble itself
  let emission_glow = vec3<f32>(0.0, 0.4, 0.8) * 0.25 * smoothstep(0.8, 0.0, dist_to_bubble);

  p_local.y /= stretch;
  p_local.x /= squash;
  
  let dist_raw = length(p_local);
  let base_radius = 0.35;
  let wobble = get_wobble(p_local, ui.time);
  let deformed_radius = base_radius + wobble;
  
  // Background with sunlight and bubble's own emission glow
  var final_color = vec3<f32>(0.01, 0.01, 0.012) + sunlight_color + emission_glow;

  // BUBBLE RENDERING
  if (dist_raw < deformed_radius) {
    let p_norm = p_local / deformed_radius;
    let z_base = sqrt(max(0.0, 1.0 - dot(p_norm, p_norm)));
    
    let eps = 0.015;
    let w_current = get_wobble(p_local, ui.time);
    let wobble_dx = (get_wobble(p_local + vec2<f32>(eps, 0.0), ui.time) - w_current) / eps;
    let wobble_dy = (get_wobble(p_local + vec2<f32>(0.0, eps), ui.time) - w_current) / eps;
    
    var normal = normalize(vec3<f32>(p_norm.x + wobble_dx * 0.05, p_norm.y + wobble_dy * 0.05, z_base));
    
    let view = vec3<f32>(0.0, 0.0, 1.0);
    let reflect_dir = reflect(-view, normal);
    let env_reflection = get_environment(reflect_dir);
    
    let fresnel = pow(1.0 - max(0.0, dot(normal, view)), 2.5);
    let diffuse = max(0.0, dot(normal, normalize(vec3<f32>(0.5, 1.0, 0.5))));
    
    // LIGHTER SUBMARINE BLUE (BIOLUMINESCENT)
    let submarine_blue = vec3<f32>(0.0, 0.35, 0.55);
    // Base color now includes a self-illumination component
    let bubble_base = submarine_blue * (diffuse * 0.3 + 0.4); 
    
    let irid_freq = 4.0;
    let irid = vec3<f32>(
        0.5 + 0.4 * cos(fresnel * irid_freq + ui.time * 0.4),
        0.5 + 0.4 * cos(fresnel * irid_freq + 2.0 + ui.time * 0.4),
        0.5 + 0.4 * cos(fresnel * irid_freq + 4.0 + ui.time * 0.4)
    );
    
    // Self-emission peak at the edges (Fresnel glow)
    let edge_glow = vec3<f32>(0.4, 0.8, 1.0) * fresnel * 0.8;
    
    // Final bubble color without specular light for a cleaner bioluminescent effect
    let bubble_color = mix(bubble_base, env_reflection, 0.3 + fresnel * 0.4) 
                     + (irid * fresnel * 0.3)
                     + edge_glow;
    
    let edge_mask = smoothstep(deformed_radius, deformed_radius - 0.008, dist_raw);
    // Dark background used as the occlusion floor
    final_color = mix(vec3<f32>(0.01, 0.01, 0.012), bubble_color, edge_mask);
  }
  
  return vec4<f32>(final_color, 1.0);
}
`;

const WebGPUCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initWebGPU = async () => {
      if (!(navigator as any).gpu) {
        setError("WebGPU is not supported in your browser.");
        return;
      }

      const adapter = await (navigator as any).gpu.requestAdapter();
      if (!adapter) {
        setError("No appropriate GPUAdapter found.");
        return;
      }

      const device = await adapter.requestDevice();
      if (!canvasRef.current) return;

      const context = canvasRef.current.getContext('webgpu') as any;
      if (!context) {
        setError("Could not get WebGPU context.");
        return;
      }

      const presentationFormat = (navigator as any).gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });

      const shaderModule = device.createShaderModule({
        code: SHADER_CODE,
      });

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{ format: presentationFormat }],
        },
        primitive: {
          topology: 'triangle-list',
        },
      });

      const uniformBufferSize = 16; 
      const uniformBuffer = device.createBuffer({
        size: uniformBufferSize,
        usage: 0x0040 | 0x0008, 
      });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
        ],
      });

      const render = (time: number) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        if (canvasRef.current.width !== rect.width * dpr || canvasRef.current.height !== rect.height * dpr) {
            canvasRef.current.width = rect.width * dpr;
            canvasRef.current.height = rect.height * dpr;
        }

        const uniformData = new Float32Array([
          time / 1000, 
          canvasRef.current.width, 
          canvasRef.current.height, 
          0
        ]);
        device.queue.writeBuffer(uniformBuffer, 0, uniformData);

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const renderPassDescriptor: any = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.01, g: 0.01, b: 0.012, a: 1.0 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.draw(6);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    };

    initWebGPU();
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent p-8 text-center">
        <div className="max-w-md">
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">WebGPU rendering disabled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default WebGPUCanvas;
