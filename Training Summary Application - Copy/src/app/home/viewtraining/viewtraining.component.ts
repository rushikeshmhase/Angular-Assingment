import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtil } from 'src/app/model/tableutil';
import { TrainingDetails } from 'src/app/model/training-details';
import { TrainingServiceService } from 'src/app/shared/training-service.service';
import { TrainingService } from 'src/app/shared/training.service';
import { TrainingComponent } from '../training/training.component';

@Component({
  selector: 'app-viewtraining',
  templateUrl: './viewtraining.component.html',
  styleUrls: ['./viewtraining.component.css']
})
export class ViewtrainingComponent {
  trainingdetails: TrainingDetails[] = [];

  displayedColumns: string[] = ['trainingName', 'modeOfTraining', 'plannedHeadCount', 'actualHeadCount', 'technologies', 'trainingPattern', 'durationInDays', 'trainerName', 'startDate', 'endDate', 'timing', 'status', 'action'];

  public dataSource = new MatTableDataSource<TrainingDetails>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private trainingDetailsService: TrainingServiceService, private _dialog:MatDialog, private trainingservice:TrainingService) { }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  openEditForm(data:any){
    const dialogRef=this._dialog.open(TrainingComponent,{
      data,
    });

   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getTrainingList();
      }
    }
   })

    
  }

  ngOnInit() {
    this.getTrainingList();
  }
  getTrainingList(){
    this.trainingservice.getTrainingList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        

      },
     error:console.log,
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  getTraining() {
    this.trainingDetailsService.getTraining()
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
      })
  }


}
