import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuizGamePageRoutingModule } from './quiz-game-routing.module';
import { QuizGamePage } from './quiz-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizGamePageRoutingModule
  ],
  declarations: [QuizGamePage]
})
export class QuizGamePageModule {}