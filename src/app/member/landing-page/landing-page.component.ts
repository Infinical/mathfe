import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Course } from '../../models/course';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
import { Observable } from 'rxjs/Observable';

import { ModalService } from '../../services/modal.service';
import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ag-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Input() activeTab: any;
  selectedHouse: House;

  dashboard: any;

  houses: any;

  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  videolink: any;
  user: Observable<any>;
  modalRadio
  isModal: boolean;
  email_value = [];
  place_value;
  amount_due;
  numbers;
  price_value;
  currency_value;

  public payPalConfig?: PayPalConfig;

  constructor(private dashboardService: DashboardService, private modalService: ModalService, public http: HttpClient) { }

  houseObj = JSON.parse(localStorage.getItem('house'));
  description = this.houseObj ? this.houseObj.description : '';
  emails = [];
  ngOnInit() {
    if (localStorage.getItem('house')) {
      this.isModal = true;
      this.price_value = this.houseObj.price;
      this.currency_value = this.houseObj.currency;
    } else {
      this.isModal = false;
    }
    this.dashboardService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => console.log(<any>error));
    if (this.price_value != 0) {
      this.initConfig();
    }
  }

  onChange(event: any) {
    this.place_value = event.target.value;
    if (this.place_value > 10) {
      alert("Value can be not more than 10");
    } else {
      this.amount_due = this.price_value * this.place_value;
      this.numbers = Array(Number(this.place_value)).fill(0).map((x, i) => i);
    }
  }


  emailChange(index, event: any) {
    this.email_value[index] = event.target.value;
  }

  openModal(id: string) {
    // this.modalService.open(id);
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
          var httpOptions = {
            headers: new HttpHeaders(
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
            currency_code: this.currency_value,
            house_id: this.houseObj.id
          };
          for (let index in this.email_value) {
            param['student_email' + index] = this.email_value[index];
          }
          console.log("newparam", param);
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
          const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (this.modalRadio == 'parent') {
            if (this.email_value.length == this.place_value) {
              for (let index in this.email_value) {
                if (!validEmailRegEx.test(this.email_value[index])) {
                  alert(parseInt(index) + 1 + 'rd' + ' email is invalid');
                }
              }
            } else {
              alert('All email is required');
            }
          }
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
