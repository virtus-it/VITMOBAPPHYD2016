import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';
import { ReportsService } from '../reports/reports.service';
import * as _ from 'underscore';
import { DistributorServiceService } from '../distributor/distributor-service.service'



@Component({
  selector: 'app-sales-team-assign',
  templateUrl: './sales-team-assign.component.html',
  styleUrls: ['./sales-team-assign.component.css']
})
export class SalesTeamAssignComponent implements OnInit {

  salesTeamCtrl: FormControl;
  filteredsalesteam: Observable<any[]>;

  constructor(@Inject(MD_DIALOG_DATA) public Details: any, public thisDialogRef: MdDialogRef<SalesTeamAssignComponent>, private authenticationService: AuthenticationService, private reportservice: ReportsService, private distributorService : DistributorServiceService) {


    this.salesTeamCtrl = new FormControl();
    this.filteredsalesteam = this.salesTeamCtrl.valueChanges
      .startWith(null)
      .map(salesteam => salesteam ? this.findSalesTeam(salesteam) : this.allSalesTeam.slice());

  }

  allSalesTeam: any = [];
  salesTeamId: any = '';
  LastfilterRecords = false;



  findSalesTeam(name: string) {
    let finalSalesTeam: any = [];
    finalSalesTeam = this.allSalesTeam.filter(salesteam =>
      salesteam.fullname.toLowerCase().indexOf(name.toLowerCase()) === 0);

    if (finalSalesTeam && finalSalesTeam.length > 0) {
      let findSalesTeam: any = {};

      findSalesTeam = _.find(finalSalesTeam, function (k, l) {
        let salesteam: any = k;
        return salesteam.fullname == name;
      });

      if (findSalesTeam) {
        this.salesTeamId = findSalesTeam.userid;
        //  this.filterTypeModel.categoryname = findCategory.category;
      }
    }
    else {
      if (name.length >= 3 && !this.LastfilterRecords) {
        this.salesTeamUsers();
      }
    }
    return finalSalesTeam;
  }

  salesTeamUsers() {
    let input = { "root": { "userid": this.authenticationService.loggedInUserId(), "transtype": "getsalesteam" } };
    this.reportservice.changeAssociation(input)
      .subscribe(
        output => this.salesTeamUsersResult(output),
        error => {
        });
  }
  salesTeamUsersResult(result) {
    if (result.result == 'success') {
      this.allSalesTeam = result.data;
    }
  }

  assign(){
    let input = {"root":{"dealerid":this.Details.userid ,"userid": this.salesTeamId,"transtype":"associatedealer"}}
    this.distributorService.associateDistributorToSales(input)
    .subscribe(
      output => this.assignToSalesTeamResult(output),
      error => {
      });
  }
  assignToSalesTeamResult(result){
    if(result.result == 'success'){
      this.thisDialogRef.close('success');
    }
  }






  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  ngOnInit() {
    console.log(this.Details);
    this.salesTeamUsers();

  }

}
