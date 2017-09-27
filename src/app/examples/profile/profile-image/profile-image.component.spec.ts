import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileImageComponent } from './profile-image.component';
import { BroadcastService } from '../../../core/broadcast.service';
import { Observable } from 'rxjs/Observable';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;
  let broadcastService: BroadcastService;

  beforeEach(async(() => {

    const broadcastServiceStub: any = {
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ImageCropperModule
      ],
      declarations: [ ProfileImageComponent ],
      providers: [
        { provide: BroadcastService, useValue: broadcastServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    broadcastService = TestBed.get(BroadcastService);
    broadcastService.profileUpdated$ = Observable.create(o => o.next({}));
    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
