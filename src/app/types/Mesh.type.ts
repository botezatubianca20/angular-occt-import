export type Mesh = {
    name: string;
    color?: number[]; // Array of r, g, and b values
    brep_faces: { first: number; last: number; color: number[] }[];
    attributes: {
        position: { array: number[] };
        normal?: { array: number[] };
        index?: { array: number[] };
    };
    index?: { array: number[] };
}
