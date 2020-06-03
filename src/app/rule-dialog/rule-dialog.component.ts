import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public ruleData: RuleDialogData,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onClickDownload() {
    const ruleFileBlob = new Blob([this.ruleData.rule], { type: 'text/plain' });
    saveAs(ruleFileBlob, this.ruleData.fileName);
  }

  onClickClose() {
    this.dialog.closeAll();
  }

  onClickCopy() {
    this.clipboard.copy(this.ruleData.rule);
    this.snackbar.open('Rule copied to clipboard!', 'Dismiss');
  }

}
