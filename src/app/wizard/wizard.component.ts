import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LevelTypes } from '../enums/level-types.enum';
import { RuleTypes } from '../enums/rule-types.enum';
import { WizardFormModelDefinition } from '../models/wizard-form-model-definition';
import { QuestionTypes } from '../enums/question-types.enum';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { RuleResponse } from '../models/rule-response';

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
  newRule$: Observable<RuleResponse>;
  wizardForm: FormGroup;
  formDefinition: WizardFormModelDefinition = {
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

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.wizardForm = this.formBuilder.group({
      ruleType: [undefined, Validators.required],
      ruleName: ['', Validators.required],
      sql: ['', Validators.required],
      message: ['', Validators.required],
      level: ['', Validators.required],
    });

    this.wizardForm.valueChanges.subscribe(console.warn);
  }

  public onCreateRule() {
    const formValue = this.wizardForm.value;
    console.warn('Would Submit', formValue);
    this.newRule$ = this.api.createRule(formValue);
  }
}
