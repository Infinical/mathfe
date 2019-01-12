import { Component, OnInit } from '@angular/core';
import { HouseService } from 'app/services/house.service';
import { Router } from '@angular/router';
import { House } from 'app/models/house';

@Component({
  selector: 'ag-admin-house-create',
  templateUrl: './admin-house-create.component.html',
  styleUrls: ['./admin-house-create.component.css']
})
export class AdminHouseCreateComponent implements OnInit {
  public status: string;
  public message: string;
  // public selectedFile: File = null;
  // public imgURL: string = 'images/upload.png';
  courses = [];
  currencies = [];

  constructor(
    private houseService: HouseService,
    private router: Router) { }

  ngOnInit() {
    this.houseService.createHouse().subscribe(
      data => {
        this.courses = data['courses'];
        this.currencies = data['currency'];
      },
      error => console.log(<any>error));
  }

  public createHouse(house): void {
    const formData: FormData = new FormData();

    // formData.append('image', this.selectedFile);
    formData.append('house', house.house);
    formData.append('description', house.description);
    formData.append('start_date', house.start_date);
    formData.append('end_date', house.end_date);
    formData.append('currency', house.currency);
    formData.append('course_id', house.course_id);
    formData.append('price', house.price);
    this.houseService.addHouse(formData)
      .subscribe(
        house => {
          this.houseService.updateStatus = house['message'];
          setTimeout(() => this.houseService.updateStatus = '', 2000);
          this.router.navigate(['/admin/houses']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.log(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  }

  // public onFileSelected(files: FileList): void {
  //   this.selectedFile = files.item(0);
  //   let reader = new FileReader();
  //   reader.onload = (event:any)=>{
  //     this.imgURL = event.target.result;
  //   }
  //   reader.readAsDataURL(this.selectedFile);
  // }
}
