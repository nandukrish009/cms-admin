import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiServicesService } from '../api-services.service';
import { QuestionModel } from '../data-table/question-model';
import { QuestionAddModel } from './question-add-model';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css'],
})
export class AddQuestionsComponent implements OnInit {
  form!: FormGroup;

  // questionAddModelObj: QuestionAddModel = {
  //   id: '',
  //   question: '',
  //   type: '',
  //   options: [
  //     {
  //       id: '',
  //       option: '',
  //       recommendation: [
  //         {
  //           CMS: '',
  //           recommendation_value: '',
  //           image: '',
  //         },
  //       ],
  //     },
  //   ],
  // };
  formDataValue = new Object();
  dataFormValue!: FormGroup;
  sendDataDB: any;

  constructor(private fb: FormBuilder, private api: ApiServicesService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      questions: this.fb.array([this.initX()]),
    });
  }

  initX() {
    return this.fb.group({
      question: [''],
      id: [''],
      type: [''],
      formStepName: [''],
      options: this.fb.array([this.initY()]),
    });
  }

  initY() {
    return this.fb.group({
      option: [''],
      id: [''],
      recommendation: this.fb.array([this.initZ()]),
    });
  }

  initZ() {
    return this.fb.group({
      CMS: [''],
      recommendation_value: [''],
      image: [''],
    });
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }
  // get options() {
  //   return this.form.get('options') as FormArray;
  // }
  // get recommendation() {
  //   return this.form.get('recommendation') as FormArray;
  // }

  addX() {
    const control = <FormArray>this.form.controls['questions'];
    control.push(this.initX());
    const xValue = <HTMLElement>(
      document.getElementsByClassName('question_remove_cta')[0]
    );
    xValue.style.display = 'block';
  }

  addY(ix: number) {
    const control = (<FormArray>this.form.controls['questions'])
      .at(ix)
      .get('options') as FormArray;
    control.push(this.initY());
    // const yValue = <HTMLElement>(
    //   document.getElementsByClassName('option_remove_cta')[0]
    // );
    // yValue.style.display = 'block';
  }

  addZ(ix: number, iy: number) {
    const control = (
      (<FormArray>this.form.controls['questions'])
        .at(ix)
        .get('options') as FormArray
    )
      .at(iy)
      .get('recommendation') as FormArray;
    control.push(this.initZ());
    // const zValue = <HTMLElement>(
    //   document.getElementsByClassName('recom_remove_cta')[0]
    // );
    // zValue.style.display = 'block';
  }
  removeXs(ix: number) {
    this.questions.removeAt(ix);
  }
  removeYs(ix: number, iy: number) {
    const control = (<FormArray>this.form.controls['questions'])
      .at(ix)
      .get('options') as FormArray;
    control.removeAt(iy);
  }
  removeZs(ix: number, iy: number, iz: number) {
    const control = (
      (<FormArray>this.form.controls['questions'])
        .at(ix)
        .get('options') as FormArray
    )
      .at(iy)
      .get('recommendation') as FormArray;
    control.removeAt(iz);
  }

  onSubmit() {
    console.log(this.form.value);
    const v = this.form.value.questions;

    // this.sendDataDB = Object.assign({}, this.form.value.questions);
    // console.log(this.sendDataDB);
    let serializedForm = JSON.stringify(this.form.value.questions);
    console.log(serializedForm);

    // for (let a of this.form.value.questions) {
    //   for (let b of a.options) {
    //     for (let c of b.recommendation) {
    //       const questionAddModelObj: QuestionAddModel = {
    //         id: a.id,
    //         question: a.question,
    //         type: a.type,
    //         options: [
    //           {
    //             id: b.id,
    //             option: b.option,
    //             recommendation: [
    //               {
    //                 CMS: c.CMS,
    //                 recommendation_value: c.recommendation_value,
    //                 image: c.image,
    //               },
    //               {
    //                 CMS: c.CMS,
    //                 recommendation_value: c.recommendation_value,
    //                 image: c.image,
    //               },
    //             ],
    //           },
    //         ],
    //       };
    //       console.log(questionAddModelObj);
    //       this.api.postQuestion(questionAddModelObj).subscribe(
    //         (res) => {
    //           console.log(res);
    //         },
    //         (err) => {
    //           alert('something wrong');
    //         }
    //       );
    //     }
    //   }
    // }

    // console.log(questionAddModelObj);
    setTimeout(() => {
      this.api.postQuestion(serializedForm).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          alert('something wrong');
        }
      );
    }, 1000);
  }
}
