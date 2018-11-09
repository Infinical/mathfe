import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Course } from '../models/course';
import { House } from '../models/house';
import { Skill } from '../models/skill';
import {Observable} from 'rxjs/Observable';

import { ModalService } from '../services/modal.service';
import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ag-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  selectedHouse: House;

  dashboard: any;

  houses: any;

  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  videolink:any;
  user: Observable<any>;
  modalRadio
  isModal: boolean;

  public payPalConfig?: PayPalConfig;

  constructor(private dashboardService: DashboardService, private modalService: ModalService, public http: HttpClient) { }

  currency_value = "USD";
  price_value = 100;
  houseObj = JSON.parse(localStorage.getItem('house'));
  description = this.houseObj.description;
  
  ngOnInit() {
    if (localStorage.getItem('house')) {
      this.isModal = true;
    } else {
      this.isModal = false;
    }
    this.dashboardService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error =>  console.log(<any>error));
    this.initConfig();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.isModal = false;
    // this.modalService.close(id);
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.selectedTeach = null;
    this.selectedHouse = null;
  }

  selectHouse(house: House) {
    this.selectedHouse = house;
    this.selectedTeach = null;
    this.selectedCourse = null;
  }

  selectTeach(house: House) {
    this.selectedTeach = house;
    this.selectedCourse = null;
    this.selectedHouse = null;
  }

  selectSkill(skill: Skill) {
    this.selectedVideo = skill;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
        },
        button: {
          label: 'paypal',
          layout: 'vertical'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          console.log('OnPaymentComplete');
          console.log("data", data);
          console.log("accesstoken", localStorage.getItem('access_token'));
          var httpOptions = {
            headers: new HttpHeaders (
              {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access_token')
              }
            )
          };
          var param = {
            role: 0,
            user_id: this.houseObj.user_id,
            transaction_id: data.paymentID,
            places_alloted: 123,
            amount_paid: this.price_value,
            currency_code: "USD",
            house_id: this.houseObj.id
          };
          this.http.post(
            'http://devapi.pamelalim.me/enrolments', 
            param,
            httpOptions
          ).subscribe(data => {
              console.log("response", data);
          });
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: 'PayPal'
        },
        transactions: [
          {
            amount: {
              total: this.price_value,
              currency: this.currency_value,
            },
            // custom: 'Custom value',
            item_list: {
            //   items: [
            //     {
            //       name: 'hat',
            //       description: 'Brown hat.',
            //       quantity: 5,
            //       price: 3,
            //       tax: 0.01,
            //       sku: '1',
            //       currency: 'USD'
            //     },
            //     {
            //       name: 'handbag',
            //       description: 'Black handbag.',
            //       quantity: 1,
            //       price: 15,
            //       tax: 0.02,
            //       sku: 'product34',
            //       currency: 'USD'
            //     }],
              shipping_address: {
                recipient_name: 'Brian Robinson',
                line1: '4th Floor',
                line2: 'Unit #34',
                city: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA'
              },
            },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }

}
