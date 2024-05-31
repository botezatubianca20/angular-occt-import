import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-occt-import';
}
