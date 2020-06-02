import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LevelTypes } from '../enums/level-types.enum';
import { RuleTypes } from '../enums/rule-types.enum';
import { WizardFormModelDefinition } from '../models/wizard-form-model-definition';
import { QuestionTypes } from '../enums/question-types.enum';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { RuleResponse } from '../models/rule-response';
import { MatDialog } from '@angular/material/dialog'
import { RuleDialogComponent, RuleDialogData } from '../rule-dialog/rule-dialog.component';
import { FormDefinitionService } from '../core/services/form-definition.service';

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
  formDefinition: WizardFormModelDefinition = this.formDefinitionService.getWizardFormDefinition();

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

  private getRuleFileName(): string {
    return this.wizardForm.get('ruleName').value || 'MyRule' + '.drl';
  }
}
