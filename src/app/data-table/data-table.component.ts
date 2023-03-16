import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { HttpClient } from '@angular/common/http';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatPaginator } from '@angular/material/paginator';
import { SlideInOutAnimation } from './animation';
import { QuestionModel } from './question-model';
import { ApiServicesService } from '../api-services.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { removeData } from 'jquery';
import { LocationStrategy } from '@angular/common';

import $ from 'jquery';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    SlideInOutAnimation,
  ],
})
export class DataTableComponent implements OnInit {
  @ViewChild('sectionNeedToScroll') sectionNeedToScroll!: ElementRef;
  @ViewChild('myTable') table: any;
  @ViewChild('paginatorPageSize')
  // showError: boolean = false;
  // private unsubscriber: Subject<void> = new Subject<void>();
  paginatorPageSize!: MatPaginator;
  animationState = 'out';
  questionModelObj: QuestionModel = new QuestionModel();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tableData: any = [];
  options = {};
  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  generalFormData: any = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  c: any[] = [];
  isTableExpanded = false;
  pageSizes = [5];
  updateForm!: FormGroup;
  formDataByID: any = [];
  questionId: any;
  dataValue: any = [];
  questionData: any = [];
  elementId: any;
  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = [
    'id',
    'question',
    'type',
    'actions',
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private api: ApiServicesService,
    private location: LocationStrategy
  ) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
    });
  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.getQuestionsData();

    this.updateForm = this.fb.group({
      id: [''],
      question: [''],
      type: [''],
      options: this.fb.array([]),
    });
    // directive('focus-scroll', function () {
    //   return {
    //     restrict: 'A',
    //     link: function (scope:any, element:any, attrs:any) {
    //       element.bind('focus', function () {
    //         console.log('focus triggered');
    //         element.scrollIntoView();
    //       });
    //     },
    //   };
    // });
    // history.pushState(null, '');

    // fromEvent(window, 'popstate')
    //   .pipe(takeUntil(this.unsubscriber))
    //   .subscribe((_) => {
    //     history.pushState(null, '');
    //     this.showError = true;
    //   });
  }
  // ngOnDestroy(): void {
  //   this.unsubscriber.next();
  //   this.unsubscriber.complete();
  // }
  get optionsValue(): FormGroup {
    return this.fb.group({
      id: '',
      option: '',
      recommendation: this.fb.array([]),
    });
  }
  get recommendationValue(): FormGroup {
    return this.fb.group({
      CMS: '',
      recommendation_value: '',
    });
  }
  loadForm(data: any) {
    for (
      let optionsValue = 0;
      optionsValue < data.options.length;
      optionsValue++
    ) {
      const optionsFormArray = this.updateForm.get('options') as FormArray;
      optionsFormArray.push(this.optionsValue);

      for (
        let recommendationValue = 0;
        recommendationValue < data.options[optionsValue].recommendation.length;
        recommendationValue++
      ) {
        const recommendationFormsArray = optionsFormArray
          .at(optionsValue)
          .get('recommendation') as FormArray;
        recommendationFormsArray.push(this.recommendationValue);
      }
    }

    this.updateForm.patchValue(data);
  }
  seedFormData(element: any) {
    for (let idMatch of this.formDataByID) {
      var id = idMatch.id;
      if (element == id) {
        this.questionData = idMatch;
        console.log(this.questionData);
      }
    }
    this.loadForm(this.questionData);
    // var modal = document.querySelector('.modal-body') as HTMLElement;
    // modal?.style.setProperty('display', 'block');
  }
  getAllQuestions() {
    this.http
      .get(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire'
      )
      .subscribe((dataMongo) => {
        this.generalFormData = dataMongo;
        // console.log(this.generalFormData);
      });
    let timerId = setInterval(() => {
      this.dataStudentsList.data = this.generalFormData;
    }, 2000);
    setTimeout(() => {
      clearInterval(timerId);
    }, 5000);
  }

  deleteQuestions(element: any) {
    this.api.deleteQuestion(element.id).subscribe((res) => {
      this.getAllQuestions();
    });
  }
  getQuestionsData() {
    this.api.getQuestion().subscribe((dataById) => {
      this.formDataByID = dataById;
    });
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataStudentsList.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataStudentsList.paginator = this.paginatorPageSize;
  }

  toggleShowDiv(divName: string) {
    if (divName === 'expandForm') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
  gotoSection(elem: any) {
    //this will provide smooth animation for the scroll
    // this.sectionNeedToScroll.nativeElement.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    // });
    document
      .querySelector(elem)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  close() {
    // window.location.reload();
    this.ngOnInit();
  }

  onSubmit() {
    console.log(this.updateForm.value);
    this.questionId = JSON.parse(JSON.stringify([this.updateForm.value]));
    for (let updateId of this.questionId) {
      var payloadId = updateId.id;
      console.log(payloadId);
    }
    setTimeout(() => {
      this.api.updateQuestion(this.updateForm.value, payloadId).subscribe(
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
