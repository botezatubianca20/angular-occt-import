import { Injectable } from '@angular/core';
import occtimportjs from 'occt-import-js';

@Injectable({
  providedIn: 'root'
})
export class OcctImportService {

  private occt: any;

  constructor() {
    this.initializeOcct();
  }

  private async initializeOcct() {
    this.occt = await (occtimportjs as any)({
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return `/assets/occt-import-js/${path}`;
        }
        return path;
      }
    });
  }

  async readStepFile(fileContent: Uint8Array) {
    return this.occt.ReadStepFile(fileContent, null);
  }

  async readIgesFile(fileContent: Uint8Array) {
    return this.occt.ReadIgesFile(fileContent, null);
  }

  async readBrepFile(fileContent: Uint8Array) {
    return this.occt.ReadBrepFile(fileContent, null);
  }

}
