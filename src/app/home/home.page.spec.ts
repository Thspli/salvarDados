import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { QuizGamePage } from './home.page';

describe('QuizGamePage', () => {
  let component: QuizGamePage;
  let fixture: ComponentFixture<QuizGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizGamePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});