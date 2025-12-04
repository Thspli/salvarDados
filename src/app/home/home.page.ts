import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface RankingEntry {
  name: string;
  score: number;
  date: string;
  time: string;
}

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.page.html',
  styleUrls: ['./quiz-game.page.scss'],
})
export class QuizGamePage implements OnInit {
  screen: 'home' | 'game' | 'ranking' | 'result' = 'home';
  currentQuestion = 0;
  score = 0;
  selectedAnswer: number | null = null;
  showResult = false;
  ranking: RankingEntry[] = [];
  playerName = '';

  questions: Question[] = [
    {
      question: "Qual é a capital do Brasil?",
      options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
      correct: 2
    },
    {
      question: "Quanto é 5 x 8?",
      options: ["35", "40", "45", "50"],
      correct: 1
    },
    {
      question: "Qual é o maior planeta do sistema solar?",
      options: ["Terra", "Marte", "Júpiter", "Saturno"],
      correct: 2
    },
    {
      question: "Em que ano o homem pisou na Lua?",
      options: ["1965", "1969", "1972", "1975"],
      correct: 1
    },
    {
      question: "Quem pintou a Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Donatello"],
      correct: 1
    }
  ];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    await this.loadRanking();
  }

  async loadRanking() {
    const stored = await this.storage.get('quiz_ranking');
    if (stored) {
      this.ranking = stored;
    }
  }

  async saveScore(finalScore: number) {
    if (!this.playerName.trim()) return;

    const newEntry: RankingEntry = {
      name: this.playerName,
      score: finalScore,
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR')
    };

    const updatedRanking = [...this.ranking, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    await this.storage.set('quiz_ranking', updatedRanking);
    this.ranking = updatedRanking;
  }

  handleAnswer(index: number) {
    if (this.selectedAnswer !== null) return;

    this.selectedAnswer = index;
    const isCorrect = index === this.questions[this.currentQuestion].correct;
    
    if (isCorrect) {
      this.score += 10;
    }

    setTimeout(() => {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
        this.selectedAnswer = null;
      } else {
        this.showResult = true;
        this.screen = 'result';
        this.saveScore(this.score + (isCorrect ? 10 : 0));
      }
    }, 1500);
  }

  resetGame() {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.showResult = false;
    this.screen = 'home';
    this.playerName = '';
  }

  startGame() {
    if (this.playerName.trim()) {
      this.screen = 'game';
      this.currentQuestion = 0;
      this.score = 0;
      this.selectedAnswer = null;
    }
  }

  async clearRanking() {
    await this.storage.remove('quiz_ranking');
    this.ranking = [];
  }

  goToRanking() {
    this.screen = 'ranking';
  }

  goToHome() {
    this.screen = 'home';
  }

  get currentQuestionData() {
    return this.questions[this.currentQuestion];
  }

  get finalScore() {
    return this.score;
  }

  get percentage() {
    return (this.finalScore / (this.questions.length * 10)) * 100;
  }

  get progressPercentage() {
    return Math.round(((this.currentQuestion + 1) / this.questions.length) * 100);
  }

  getOptionClass(index: number): string {
    if (this.selectedAnswer === null) {
      return 'option-btn';
    }
    
    if (index === this.currentQuestionData.correct) {
      return 'option-btn option-correct';
    } else if (index === this.selectedAnswer) {
      return 'option-btn option-wrong';
    }
    
    return 'option-btn option-disabled';
  }

  getRankClass(index: number): string {
    if (index === 0) return 'ranking-item rank-1';
    if (index === 1) return 'ranking-item rank-2';
    if (index === 2) return 'ranking-item rank-3';
    return 'ranking-item rank-other';
  }

  showAward(index: number): boolean {
    return index < 3;
  }

  padNumber(num: number): string {
    return String(num).padStart(2, '0');
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}