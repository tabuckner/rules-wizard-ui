import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

export interface RuleDialogData {
  rule: string;
  fileName: string;
}

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.scss']
})
export class RuleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public ruleData: RuleDialogData,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClickDownload() {
    console.warn('should download')
    const ruleFileBlob = new Blob([this.ruleData.rule], { type: 'text/plain' });
    saveAs(ruleFileBlob, this.ruleData.fileName);
  }

  onClickClose() {
    this.dialog.closeAll();
  }

}
