import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LevelTypes } from '../enums/level-types.enum';
import { RuleTypes } from '../enums/rule-types.enum';
import { WizardFormModelDefinition } from '../models/wizard-form-model-definition';
import { QuestionTypes } from '../enums/question-types.enum';
import { ApiService } from '../core/services/api.service';
import { MatDialog } from '@angular/material/dialog'
import { RuleDialogComponent, RuleDialogData } from '../rule-dialog/rule-dialog.component';
import { FormDefinitionService } from '../core/services/form-definition.service';
import { MatStepper } from '@angular/material/stepper';
import { RuleExample } from '../models/rule-example';
import { RuleDto } from '../models/rule-dto';

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
  formDefinition: WizardFormModelDefinition = this.formDefinitionService.getWizardFormDefinition();
  @ViewChild('stepper') public stepper: MatStepper;
  examples$ = this.api.getRuleExamples();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogController: MatDialog,
    private formDefinitionService: FormDefinitionService
  ) { }

  ngOnInit(): void {
    this.initializeWizardForm();
    this.wizardForm.valueChanges.subscribe(console.warn);
  }

  private initializeWizardForm() {
    this.wizardForm = this.formBuilder.group({
      ruleType: [undefined, Validators.required],
      ruleName: ['', Validators.required],
      sql: ['', Validators.required],
      message: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  public onCreateRule() {
    const formValue = this.wizardForm.value;
    const ruleFileName = this.getRuleFileName();
    this.api.createRule(formValue).subscribe(data => {
      const ruleDialogData: RuleDialogData = { rule: data.rule, fileName: ruleFileName };
      this.dialogController.open(RuleDialogComponent, { data: ruleDialogData });
    });
  }

  public onClickStartOver() {
    this.wizardForm.reset();
    this.stepper.reset();
  }

  public onClickExampleChip(example: RuleExample) {
    const ruleFileName = this.ruleNameToRuleFileName(example.ruleName);
    const mockFormValue: RuleDto = {
      level: example.level,
      message: example.message,
      ruleName: example.ruleName,
      ruleType: RuleTypes.sqlRule, // FIXME: This is a hack.
      sql: example.sql,
    };

    this.api.createRule(mockFormValue).subscribe(data => {
      const ruleDialogData: RuleDialogData = { rule: data.rule, fileName: ruleFileName };
      this.dialogController.open(RuleDialogComponent, { data: ruleDialogData });
    });
  }

  private getRuleFileName(): string {
    let fileName = this.wizardForm.get('ruleName').value || 'MyRule';
    return fileName += '.drl';
  }

  private ruleNameToRuleFileName(ruleName: string): string {
    let nameWithoutWhitespace = ruleName.replace(/ +?/g, '');
    if (nameWithoutWhitespace.length < 1) {
      nameWithoutWhitespace = 'Example';
    }
    return `${nameWithoutWhitespace}.drl`;
  }
}
