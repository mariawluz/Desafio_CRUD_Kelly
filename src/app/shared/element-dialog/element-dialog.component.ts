import { Component, OnInit, Inject } from '@angular/core';
import { EmpresaElement } from 'src/app/models/empresaelements';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: EmpresaElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: EmpresaElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,) {}

    ngOnInit(): void {
      if (this.data.cnpj != null) {
        this.isChange = true;
      } else {
        this.isChange = false;
      }
    }

    onCancel(): void {
    this.dialogRef.close();
}

}
