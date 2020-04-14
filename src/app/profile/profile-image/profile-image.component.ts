import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ngx-img-cropper';
import { BroadcastService } from '../../core/broadcast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit, OnDestroy {
  @Input() currentImage: any;
  @Output() imageChanged = new EventEmitter<any>();
  @ViewChild('uploaderInput', { static: true }) uploaderInput: any;
  @ViewChild('cropper', { static: true }) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  data: any;
  private broadcastWatcher: Subscription;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.initializeCropper();
    this.data = { image: this.currentImage };
    this.broadcastWatcher = this.broadcastService.profileUpdated$
      .subscribe(user => {
        this.currentImage = user.profileImage;
        this.data.image = null;
      });
  }

  ngOnDestroy() {
    this.broadcastWatcher.unsubscribe();
  }

  initFileUpload(): void {
    this.uploaderInput.nativeElement.click();
  }

  onCropped(bounds: Bounds): void {
    this.imageChanged.emit(this.data.image);
  }

  onFileChanged($event: any): void {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
      this.imageChanged.emit(myReader.result);
    };
    if (file != null) {
      myReader.readAsDataURL(file);
    }
  }

  private initializeCropper(): void {
    const cropperSettings = new CropperSettings();
    cropperSettings.width = 150;
    cropperSettings.height = 150;
    cropperSettings.croppedWidth = 150;
    cropperSettings.croppedHeight = 150;
    cropperSettings.canvasWidth = 250;
    cropperSettings.canvasHeight = 150;
    cropperSettings.minWidth = 10;
    cropperSettings.minHeight = 10;
    cropperSettings.rounded = false;
    cropperSettings.keepAspect = true;
    cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    cropperSettings.cropperDrawSettings.strokeWidth = 2;
    cropperSettings.noFileInput = true;
    this.cropperSettings = cropperSettings;
  }
}
