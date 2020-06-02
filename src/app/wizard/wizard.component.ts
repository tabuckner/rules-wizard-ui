import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LevelTypes } from '../enums/level-types.enum';
import { RuleTypes } from '../enums/rule-types.enum';
import { WizardFormModelDefinition } from '../models/wizard-form-model-definition';
import { QuestionTypes } from '../enums/question-types.enum';

interface WizardFormModel {
  ruleType: RuleTypes;
  ruleName: string;
  sql: string;
  message: string;
  level: LevelTypes;
}

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  QUESTION_TYPES = QuestionTypes;
  wizardForm: FormGroup;
  formDefinition: WizardFormModelDefinition = {
    steps: [
      {
        title: 'Choose Your Path',
        questions: [
          {
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
            type: QuestionTypes.longText,
            title: 'What is the message to display to the end user?',
            label: 'Message'
          },
          {
            type: QuestionTypes.radio,
            title: 'Rule level (ERROR = Stop, WARN = notify and continue)?',
            options: [
              { label: 'Warn', value: LevelTypes.warn },
              { label: 'Error', value: LevelTypes.fail },
            ]
          },
          {
            type: QuestionTypes.shortText,
            title: 'What will this rule be called?',
            label: 'Rule Name'
          },
        ]
      },
      {
        title: 'Confirm Your Rule',
        questions: []
      }
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.wizardForm = this.formBuilder.group({
      ruleType: ['', Validators.required],
      ruleName: ['', Validators.required],
      sql: ['', Validators.required],
      message: ['', Validators.required],
      level: ['', Validators.required],
    });
  }
}
