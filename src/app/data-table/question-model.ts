export class QuestionModel {
  id!: string;
  question!: string;
  type!: string;
  options!: [
    {
      id: string;
      option: string;
      recommendation: [
        {
          CMS: string;
          recommendation_value: string;
          image: string;
        }
      ];
    }
  ];
}
