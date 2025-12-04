import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizGamePage } from './quiz-game.page';

const routes: Routes = [
  {
    path: '',
    component: QuizGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizGamePageRoutingModule {}