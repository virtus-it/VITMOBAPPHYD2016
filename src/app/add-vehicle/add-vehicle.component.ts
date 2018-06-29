import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MdDialogRef } from '@angular/material';
import { SupplierService } from '../supplier/supplier.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService ,  public thisDialogRef: MdDialogRef<AddVehicleComponent>, private supplierservice: SupplierService,) { }


  vehicleInput = { "User" : { "vehhicleno":"" , "transtype":"createvehicle" , "make":"" , "model":"" , "vehicletype":"" , "fueltype":"" ,  "loginid": this.authenticationService.loggedInUserId(), "apptype": this.authenticationService.appType() , "capacity":"20" }};


  addVehicle(){
    let input =  this.vehicleInput;
    this.supplierservice.trackSupplier(input)
    .subscribe(
    output => this.addVehicleResult(output),
    error => {
      //console.log("error in supplier order list");
    });
  }
  addVehicleResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }


  onCloseCancel(){
    this.thisDialogRef.close('cancel');
  }

  ngOnInit() {
  }

}
