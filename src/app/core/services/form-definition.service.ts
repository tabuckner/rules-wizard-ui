import { Injectable } from '@angular/core';
import { WizardFormModelDefinition } from 'src/app/models/wizard-form-model-definition';
import { QuestionTypes } from 'src/app/enums/question-types.enum';
import { LevelTypes } from 'src/app/enums/level-types.enum';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionService {

  constructor() { }

  public getWizardFormDefinition(): WizardFormModelDefinition {
    return {
      steps: [
        {
          title: 'Choose Your Path',
          questions: [
            {
              key: 'ruleType',
              type: QuestionTypes.radio,
              title: 'What are you looking to do?',
              options: [
                { label: 'Search for Certain SQL', value: 'SQLRule' },
                { label: 'Enforce a Convention', value: 'Conventional' },
              ]
            }
          ]
        },
        {
          title: 'SQL',
          questions: [
            {
              key: 'sql',
              type: QuestionTypes.longText,
              title: 'What SQL are we looking for?',
              label: 'SQL',
              placeholder: 'EXECUTE ANY'
            },
          ]
        },
        {
          title: 'Rule',
          questions: [
            {
              key: 'message',
              type: QuestionTypes.longText,
              title: 'What is the message to display to the end user?',
              label: 'Message'
            },
            {
              key: 'level',
              type: QuestionTypes.radio,
              title: 'Rule level (ERROR = Stop, WARN = notify and continue)?',
              options: [
                { label: 'Warn', value: LevelTypes.warn },
                { label: 'Error', value: LevelTypes.fail },
              ]
            },
            {
              key: 'ruleName',
              type: QuestionTypes.shortText,
              title: 'What will this rule be called?',
              label: 'Rule Name'
            },
          ]
        }
      ]
    };
  }
}
