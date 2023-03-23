import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  constructor(private _fb:FormBuilder,private _http:HttpClient,private router:Router,private activatedRoute:ActivatedRoute,private _trainingService:TrainingService,private _dialog:MatDialogRef<TrainingComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  public trainingForm!:FormGroup;

  modeOfTraining:string[]=[
    'Online',
    'Offline',
  ];

  trainingPattern:string[]=[
    'Theory',
    'Theory/Practical',
  ];

  status:string[]=[
    'Planned',
    'Inprogress',
    'Completed'
  ]


  ngOnInit(): void {

    this.trainingForm=this._fb.group({
      trainingName:['',Validators.required],
      modeOfTraining:['',Validators.required],
      plannedHeadCount:['',Validators.required],
      actualHeadCount:['',Validators.required],
      technologies:['',Validators.required],
      trainingPattern:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      durationInDays:['',Validators.required],
      trainerName:['',Validators.required],
      timing:['',Validators.required],
      status:['',Validators.required],
    })

    this.trainingForm.patchValue(this.data);

  }

  onSubmit(){

    if(this.trainingForm.value){
      if(this.data){
        this._trainingService.updateTraining(this.data.id,this.trainingForm.value)
        .subscribe({
          next:(val:any)=>{
           alert('Training Details Updated!');
           this._dialog.close(true);
 
         },
         error:(err:any)=>{
           console.error(err);
 
         },
       });



      }
      else{

        this._trainingService.addTraining(this.trainingForm.value).subscribe({
          next:(val:any)=>{
           alert('Training Added Successfully');
           this._dialog.close(true);
 
         },
         error:(err:any)=>{
           console.error(err);
 
         },
       });
      }
    }
   }

}
