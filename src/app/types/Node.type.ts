import { Mesh } from "./Mesh.type";

export type Node = {
    name: string;
    meshes?: Mesh[];
    children?: Node[];
}
