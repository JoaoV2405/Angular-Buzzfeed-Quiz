import { Component, OnInit } from '@angular/core';
import questions from '../../data/questions.json';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  title:string = ""

  options:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""
  answerPhoto:string =""
  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  ngOnInit(): void {
    if(questions){
      this.finished = false
      this.title = questions.title

      this.options = questions.questions
      this.questionSelected = this.options[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.options.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }
  constructor(private router: Router) { }


  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }
  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.options[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = questions.results[finalAnswer as keyof typeof questions.results ]
      this.answerPhoto = questions.images[finalAnswer as keyof typeof questions.images ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

  refreshPage() {
    window.location.reload();
  }
}
