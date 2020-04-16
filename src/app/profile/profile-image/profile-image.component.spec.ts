import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SharedModule } from '../../shared/shared.module';
import { ProfileImageComponent } from './profile-image.component';
import { BroadcastService } from '../../core/broadcast.service';
import { Observable } from 'rxjs';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;
  let broadcastService: BroadcastService;

  beforeEach(async(() => {
    const broadcastServiceStub: any = {
      profileUpdated$: Observable.create(o => o.next({}))
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ImageCropperModule
      ],
      declarations: [ProfileImageComponent],
      providers: [
        { provide: BroadcastService, useValue: broadcastServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    broadcastService = TestBed.inject(BroadcastService);
    broadcastService.profileUpdated$ = Observable.create(o => o.next({}));
    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('initFileUpload()', () => {
    it('should click native upload element', () => {
      component.uploaderInput = { nativeElement: { click: () => { } } };
      spyOn(component.uploaderInput.nativeElement, 'click');
      component.initFileUpload();
      expect(component.uploaderInput.nativeElement.click).toHaveBeenCalled();
    });
  });

  describe('onCropped()', () => {
    it('should emit imageChanged event', () => {
      let expectedImg = {};
      let actualImg: any;
      component.data.image = expectedImg;
      component.imageChanged.subscribe((value) => actualImg = value);
      component.onCropped(null);
      expect(actualImg).toBe(expectedImg);
    });
  });

  describe('onFileChanged()', () => {
    it('should emit imageChanged event', () => {
      let evt = { target: { files: [new File([''], '', null)] } };
      spyOn<any>(window, 'FileReader').and.returnValue({
        addEventListener: function () { },
        readAsDataURL: function () {
          if (this.onloadend) {
            let loadEvent = { target: { result: null } };
            this.onloadend(loadEvent);
          }
        },
        result: 'xxx'
      });
      spyOn(component.imageChanged, 'emit');
      component.onFileChanged(evt);
      expect(window['FileReader']).toHaveBeenCalled();
      expect(component.imageChanged.emit).toHaveBeenCalledWith('xxx')
    });
  });
});
