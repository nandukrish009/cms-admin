import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  recommendationValue: any = [];
  cmsName: any;
  cmsValue: any;
  chart: any = [];
  cmsSortValue: any;

  constructor(private router: Router, public http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getRecommendationValue();
  }
  public signIn(): void {
    this.router.navigate(['/data-table']);
  }
  getRecommendationValue() {
    this.http
      .get(
        'https://ap-south-1.aws.data.mongodb-api.com/app/rage-api-ewhwq/endpoint/recommendation_value'
      )
      .subscribe((recommendation) => {
        this.recommendationValue = recommendation;
        console.log(this.recommendationValue);

        const res = Array.from(
          this.recommendationValue.reduce(
            (
              m: {
                set: (arg0: any, arg1: any) => any;
                get: (arg0: any) => any;
              },
              { CMS, recommendation_value }: any
            ) => m.set(CMS, (m.get(CMS) || 0) + parseInt(recommendation_value)),
            new Map()
          ),
          ([CMS, recommendation_value]) => ({
            CMS,
            recommendation_value,
          })
        );
        console.log(res);
        this.cmsSortValue = res.sort(
          (
            a: { recommendation_value: string },
            b: { recommendation_value: string }
          ) =>
            parseInt(b.recommendation_value) - parseInt(a.recommendation_value)
        );
        console.log(this.cmsSortValue);

        this.cmsName = res.map((name: any) => name.CMS);
        this.cmsValue = res.map((value: any) => value.recommendation_value);
        console.log(this.cmsName, this.cmsValue);

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.cmsName,
            datasets: [
              {
                data: this.cmsValue,
                label: 'CMS Value',
                backgroundColor: [
                  '#fcba03',
                  '#fc6703',
                  '#fcc203',
                  '#22a314',
                  '#14a360',
                  '#14a1a3',
                  '#1452a3',
                  '#6c14a3',
                  '#a3147f',
                  '#d92372',
                  '#ab1126',
                  '#6df2a2',
                  '#7e7aeb',
                  '#f5897d',
                ],
              },
            ],
          },
        });
      });
  }
}
