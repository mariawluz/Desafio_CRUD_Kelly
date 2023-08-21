import { EmpresaElementService } from './../../services/empresaElements.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { EmpresaElement } from 'src/app/models/empresaelements';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EmpresaElementService]

})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['cnpj', 'name', 'cep','actions'];
  dataSource!: EmpresaElement[];

  constructor(
    public dialog: MatDialog,
    public EmpresaElementService: EmpresaElementService
    ) {
      this.EmpresaElementService.getElements()
        .subscribe((data: EmpresaElement[]) => {
          console.log(data);
          this.dataSource = data;
        });
    }

  ngOnInit(): void {
  }

  openDialog(element: EmpresaElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        cnpj: null,
        name: '',
        cep: null
      } : {
        id: element.id,
        cnpj: element.cnpj,
        name: element.name,
        cep: element.cep,
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.EmpresaElementService.editElement(result)
            .subscribe((data: EmpresaElement) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.EmpresaElementService.createElements(result)
            .subscribe((data: EmpresaElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  editElement(element: EmpresaElement): void {
    this.openDialog(element);
  }

  deleteElement(cnpj: number): void {
    this.EmpresaElementService.deleteElement(cnpj)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== cnpj);
      });
  }
}
