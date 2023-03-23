import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/shared/training.service';
import { TrainingComponent } from '../training/training.component';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  displayedColumns: string[] = ['trainingName','modeOfTraining','plannedHeadCount','actualHeadCount','technologies','trainingPattern','startDate','endDate','durationInDays','trainerName','timing','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _trainingService:TrainingService,private  _router:Router,private _dialog:MatDialog) { }

  openAddEditTrainingForm(){
   const dialogRef= this._dialog.open(TrainingComponent);
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getTrainingList();
      }
    }
   })

   
   
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

  ngOnInit(): void {
    this.getTrainingList();
    this

  }

  getTrainingList(){
    this._trainingService.getTrainingList().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        

      },
     error:console.log,
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTraining(id:number){
    this._trainingService.deleteTraining(id).subscribe({
       next:(res)=>{
        alert("Training Deleted Successfully");
        this.getTrainingList();

       },
       error:console.log,

    })
  }

}

