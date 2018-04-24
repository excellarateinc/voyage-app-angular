import { Directive, ElementRef, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appProfileImage]'
})
export class ProfileImageDirective implements OnChanges {
  @Input() image: any;
  @Input() preview: any;
  @Output() dataUrlReady = new EventEmitter<any>();

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {

    const reader = new FileReader();
    const element = this.element;

    if (this.image) {
      element.nativeElement.style.backgroundImage = `url('${this.image}')`;
    }

    reader.onloadend = (e) => {
      element.nativeElement.style.backgroundImage = `url('${reader.result}')`;
      this.dataUrlReady.emit(reader.result);
    };

    if (this.preview) {
      return reader.readAsDataURL(this.preview);
    }

    if (!this.image && !this.preview) {
      element.nativeElement.style.backgroundImage = `url('/assets/images/stock-profile.jpg')`;
    }
  }
}
