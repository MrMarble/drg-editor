/// <reference types="vite/client" />

declare module "*&meta&imagetools" {
  export const width: number;
  export const height: number;
  export const src: string;
}
declare module "*&imagetools" {
  /**
   * actual types
   * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
   * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
   */
  const out: string;
  export default out;
}
