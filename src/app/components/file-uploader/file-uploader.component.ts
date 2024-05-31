import { Component } from '@angular/core';
import { OcctImportService } from '../../services/occt-import.service';
import { ModelViewerComponent } from '../model-viewer/model-viewer.component';
import { CommonModule } from '@angular/common';
import { Node } from "../../types/Node.type";

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule,ModelViewerComponent],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {
  modelData: any;
  constructor(private occtImportService: OcctImportService) { }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileContent = new Uint8Array(await file.arrayBuffer());
      let result;

      if (file.name.endsWith('.stp') || file.name.endsWith('.step')) {
        result = await this.occtImportService.readStepFile(fileContent);
      } else if (file.name.endsWith('.iges') || file.name.endsWith('.igs')) {
        result = await this.occtImportService.readIgesFile(fileContent);
      } else if (file.name.endsWith('.brep')) {
        result = await this.occtImportService.readBrepFile(fileContent);
      }

      this.modelData = result;
      console.log(this.modelData);

      this.startExtraction();
    }
  }


 

  extractInformation(node: Node) {
    const name = node.name;
    console.log("name", name);
    const meshes = node.meshes || [];
    console.log("meshes", meshes)
    const children = node.children || [];
    console.log("children", children);

    children.forEach((child) => {
      this.extractInformation(child);
    });
  }

  startExtraction() {
    if (this.modelData && this.modelData.success) {
      const rootNode = this.modelData.root;
      this.extractInformation(rootNode);
    } else {
      console.error('Invalid JSON data');
    }
  }
}
// extract  Technology, Material, Finish, Color, Part markings, General tolerance, Tightest linear tolerance, Engineering fits	, Has threads	, Internal corners, Technical drawing