import { QuestionModel } from './question-model';
import { QuestionWithChoicesModel } from './question-with-choices-model';
import { QuestionWithTextModel } from './question-with-text-model';

export interface StepModel {
  title: string;
  questions: Array<QuestionModel | QuestionWithChoicesModel | QuestionWithTextModel>;
}
