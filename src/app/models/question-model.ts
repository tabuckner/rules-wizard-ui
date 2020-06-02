import { QuestionTypes } from '../enums/question-types.enum';

export interface QuestionModel {
  type: QuestionTypes;
  title: string;
}
