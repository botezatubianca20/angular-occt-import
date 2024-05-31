declare module 'occt-import-js' {
    interface TriangulationParams {
      linearUnit?: 'millimeter' | 'centimeter' | 'meter' | 'inch' | 'foot';
      linearDeflectionType?: 'bounding_box_ratio' | 'absolute_value';
      linearDeflection?: number;
      angularDeflection?: number;
    }
  
    interface ImportResult {
      success: boolean;
      root: {
        name: string;
        meshes: number[];
        children: any[];
      };
      meshes: {
        name: string;
        color?: [number, number, number];
        brep_faces: {
          first: number;
          last: number;
          color: [number, number, number] | null;
        }[];
        attributes: {
          position: {
            array: number[];
          };
          normal?: {
            array: number[];
          };
          index: {
            array: number[];
          };
        };
      }[];
    }
  
    export function ReadBrepFile(content: Uint8Array, params?: TriangulationParams): ImportResult;
    export function ReadStepFile(content: Uint8Array, params?: TriangulationParams): ImportResult;
    export function ReadIgesFile(content: Uint8Array, params?: TriangulationParams): ImportResult;
  
    export default function (): Promise<{
      ReadBrepFile: typeof ReadBrepFile;
      ReadStepFile: typeof ReadStepFile;
      ReadIgesFile: typeof ReadIgesFile;
    }>;
  }
  