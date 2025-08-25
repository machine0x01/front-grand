# Lanyard Component

A 3D interactive lanyard component built with React Three Fiber and Rapier physics.

## Usage

```tsx
import Lanyard from './Lanyard'

<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
```

## Props

- `position?: [number, number, number]` - Camera position (default: `[0, 0, 30]`)
- `gravity?: [number, number, number]` - Physics gravity vector (default: `[0, -40, 0]`)
- `fov?: number` - Camera field of view (default: `20`)
- `transparent?: boolean` - Whether the background is transparent (default: `true`)

## Features

- **Interactive**: Click and drag the card to move it around
- **Physics-based**: Realistic physics simulation using Rapier
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Easy to modify textures and 3D models

## Required Setup

### 1. Type Declarations

Make sure you have the following in your `src/global.d.ts`:

```typescript
export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
```

### 2. Next.js Configuration

Add the following to your `next.config.ts`:

```typescript
webpack: (config) => {
  config.module.rules.push({
    test: /\.(glb|gltf)$/,
    type: 'asset/resource',
  });
  return config;
},
```

### 3. Dependencies

Make sure you have these dependencies installed:

```bash
npm install @react-three/drei @react-three/fiber @react-three/rapier meshline three
```

### 4. Assets

The component requires these files in the same directory:
- `card.glb` - 3D model of the card
- `lanyard.png` - Texture for the lanyard band

## Customization

### Editing the 3D Model

You can edit the `card.glb` file using the online GLB editor:
https://modelviewer.dev/editor/

### Editing the Texture

The `lanyard.png` file is the texture for the lanyard's band and can be edited in any image editor.

## Troubleshooting

1. **TypeScript errors**: Make sure the type declarations are properly set up
2. **GLB not loading**: Check that the webpack configuration is correct
3. **Physics not working**: Ensure all Rapier dependencies are installed
4. **Performance issues**: The component is optimized for modern browsers 