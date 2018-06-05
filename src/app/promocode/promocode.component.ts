import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AddPromocodeDialogComponent } from '../add-promocode-dialog/add-promocode-dialog.component';
import { PromocodeServiceService } from '../promocode/promocode-service.service';




@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor( public dialog: MdDialog, private promocodeservice: PromocodeServiceService ) { }


  addPromoCode(){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: ''
  });
  dialogRef.afterClosed().subscribe(result => {

  });
  }

  editPromoCode(data){
    let dialogRef = this.dialog.open(AddPromocodeDialogComponent, {
      width: '50%',
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'success'){

    }

  });

  }




  ngOnInit() {
  }

}
