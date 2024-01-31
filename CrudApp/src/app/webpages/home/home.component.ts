import { Component } from '@angular/core';
import { StudentManagemetService } from 'src/app/services/student-managemet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  studentObj:any={
    id:"",
    studentName:"",
    studentClass:"",
    studentRollNo:""
  }

  submitBtn:boolean = true;
  updateBtn:boolean = false;
  progressBarSataus:boolean = false;

  studentList:any;
  totalRecordsOfStudent:any;
  //constructor
  constructor(private studentService : StudentManagemetService,
    private _snackBar: MatSnackBar
    ){}


  ngOnInit(){

    // get data
    this.getData();
    
  }

  getData(){
    this.studentService.getData().subscribe(
      (data:any)=>{
        this.studentList = data;
        this.totalRecordsOfStudent = this.studentList.length;
      },
      (error:any)=>{
        console.log(error);
      }
    )

  }

  submitRecord(){
    this.progressBarSataus = true;
    setTimeout(()=>{
      console.log(this.studentObj);
      this.studentService.postData(this.studentObj).subscribe(
        (data)=>{
          this.progressBarSataus = false;
          console.log(data)
          
          this.clearForm()
          this._snackBar.open("Student Record Submitted SuccessFully","Ok",{
            duration:3000
          })
          this.getData();
        },
        (error)=>{
          console.log(error);
          this.progressBarSataus = false;
          this.clearForm();
          this._snackBar.open("Internal Server Error !","Ok",{
            duration:3000
          })
        }
      )
    },3000)
    
  }

  clearForm(){
    this.studentObj={
      id:"",
      studentName:"",
      studentClass:"",
      studentRollNo:""
    }
  }


  // delete data

  deleteData(id:any){
    this.studentService.deleteStudentData(id).subscribe(
      (data:any)=>{
        console.log(data)
        this._snackBar.open("Record Deleted SuccessFully","Ok",{
          duration:3000
        })
        this.getData();
      },
      (error:any)=>{
        console.log(error);
        this._snackBar.open("Internal Server Error !","Ok",{
          duration:3000
        })
      }
    )
  }

  updateData(data:any){
    this.submitBtn = false;
    this.updateBtn = true;
    this.studentObj={
      id: data.id,
      studentName:data.studentName,
      studentClass:data.studentClass,
      studentRollNo:data.studentRollNo
    }
  }


  updateRecords(){
    this.studentService.updateRecord(this.studentObj, this.studentObj.id).subscribe(
      (data:any)=>{
        this.submitBtn = true;
         this.updateBtn = false;
         this.getData();
         this._snackBar.open("Record Updated SuccessFully","Ok",{
          duration:3000
        })
        this.clearForm();
      },
      (error:any)=>{
        console.log(error);
        this._snackBar.open("Internal Server Error !","Ok",{
          duration:3000
        })
        this.clearForm();
      }
    )
  }

}
