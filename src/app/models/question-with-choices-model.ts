import { QuestionModel } from './question-model';

export interface QuestionWithChoicesModel extends QuestionModel {
  options: Array<{ label: string, value: any }>;
}
