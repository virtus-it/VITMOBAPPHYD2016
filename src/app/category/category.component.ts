import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { DistributorServiceService } from '../distributor/distributor-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private distributorService: DistributorServiceService,) { }

  categoryList :any =[];




  // getProductByCategory(){
  //   let input={"root":{"userid":this.authenticationService.loggedInUserId(),"usertype":"dealer","loginid":this.authenticationService.loggedInUserId(),"apptype":this.authenticationService.appType()}};
  //   console.log(input);

  //   this.distributorService.getDistbutorsProducts(input)
  //   .subscribe(
  //   output => this.getProductsCategoryResult(output),
  //   error => {
  //     console.log("error in products category list");
  //   });
  // }
  // getProductsCategoryResult(result){
  //   console.log(result);
  //   if (result.result == "success") {
  //   }
  // }

  ngOnInit() {
    // this.getProductByCategory();

  }

}
