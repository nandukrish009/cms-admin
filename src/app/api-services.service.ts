import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  constructor(private http: HttpClient) {}

  postQuestion(data: any) {
    return this.http
      .post<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire/add_question',
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getQuestion() {
    return this.http
      .get<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire'
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getById(id: any) {
    return this.http
      .get<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/find/cms_questionnaire?id=' +
          id
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateQuestion(data: any, id: any) {
    return this.http
      .put<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire?id=' +
          id,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteQuestion(id: any) {
    return this.http
      .delete<any>(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/cms_questionnaire?id=' +
          id
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
