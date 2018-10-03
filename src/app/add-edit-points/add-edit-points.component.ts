import { Component, OnInit , Inject} from '@angular/core';
import { DistributorServiceService } from '../distributor/distributor-service.service';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-edit-points',
  templateUrl: './add-edit-points.component.html',
  styleUrls: ['./add-edit-points.component.css']
})
export class AddEditPointsComponent implements OnInit {

  constructor(private distributorService: DistributorServiceService, public thisDialogRef: MdDialogRef<AddEditPointsComponent> , @Inject(MD_DIALOG_DATA) public Details: any, ) { }

  addpointsInput = {"points":"" , "description":"" , "type":"" , "feature":"" };
  validateMessage:string = '';

  addPoints(){
    let input = {"User":{"points":this.addpointsInput.points , "TransType":"addpoints",
    "type":this.addpointsInput.feature , subtype: this.addpointsInput.type ,"description": this.addpointsInput.description }};
    console.log(input);
    if(this.validatePoints()){
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.addPointsResult(output),
    error => {      
    });
  }
}
  addPointsResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }

  }




  updatePoints(){
    let input = {"User":{"points":this.addpointsInput.points , "TransType":"editpoints",
    "type":this.addpointsInput.feature , subtype: this.addpointsInput.type ,"description": this.addpointsInput.description }};
    console.log(input);
    if(this.validatePoints()){
    this.distributorService.getPoints(input)
    .subscribe(
    output => this.updatePointsResult(output),
    error => {      
    });
  }
}

  updatePointsResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }

  }

  addandUpdatePoints(){
    if(this.Details){
      this.updatePoints();
    }
    else{
      this.addPoints();
    }
  }
  


  getPointsDetails(){
    if(this.Details){
      this.addpointsInput.points = this.Details.points;
      this.addpointsInput.description = this.Details.description;
      this.addpointsInput.feature = this.Details.type;
      this.addpointsInput.type = this.Details.subtype;
    }

  }

  onCloseModal(){
    this.thisDialogRef.close('cancel');
  }


  validatePoints(){
    var validate : string = '1';
      switch(validate){
          case "1" : {
            if(!this.addpointsInput.description){
              this.validateMessage = 'Enter Description';
            }
      }
          case '2' : {
            if(!this.addpointsInput.type){
              this.validateMessage = 'Enter Type';
            }   
      }
          case '3' : {
            if(!this.addpointsInput.points){
              this.validateMessage = "Enter points";
          }  
      }

      case '4' : {
        if(!this.addpointsInput.feature){
          this.validateMessage = "Enter feature";
      }  
  }
        case '5' : {
          if(this.addpointsInput.points && this.addpointsInput.type && this.addpointsInput.feature){
            this.validateMessage = '';
            return true;
          }
        }
  }
  }

  numberEvent(e:any){
    if (isNaN(e.key) || e.key == '' || e.keyCode == 32 || (e.keyCode > 64 && e.keyCode < 91)) {
      e.preventDefault();
    }
  }

  ngOnInit() {
    console.log(this.Details);
    this.getPointsDetails();

  }

}
