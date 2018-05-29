import { Component, OnInit } from '@angular/core';
import { EditPointsComponent } from '../edit-points/edit-points.component';
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  constructor(public dialog: MdDialog,) { }

  editpoints(){
    let dialogRefAddProduct = this.dialog.open(EditPointsComponent, {

      width: '700px',
      data: ''
    });
    dialogRefAddProduct.afterClosed().subscribe(result => {
      //console.log(`Dialog closed: ${result}`);
      if (result == 'success') {


      }

    });
  }



  ngOnInit() {
  }

}
