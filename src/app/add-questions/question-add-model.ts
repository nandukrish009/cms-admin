export interface QuestionAddModel {
  id: string;
  question: string;
  type: string;
  options: Options[];
}
export interface Options {
  id: string;
  option: string;
  recommendation: Recommendation[];
}
export interface Recommendation {
  CMS: string;
  recommendation_value: any;
  image: string;
}
