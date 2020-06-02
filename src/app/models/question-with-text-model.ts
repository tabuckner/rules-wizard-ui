import { QuestionModel } from './question-model';

export interface QuestionWithTextModel extends QuestionModel {
  label: string;
  placeholder?: string;
}
