import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryListService} from "../services/country-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {startWith} from "rxjs/internal/operators";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: boolean = false;
  countryList = [];
  states = [];
  userData;
  imageUrl: string;
  userId;
  selectedCountry = 'Please select country';
  selectedState = 'Please select state';
  invalidCountry = false;
  invalidState = false;
  age;
  constructor(private fb: FormBuilder, private countryListservice: CountryListService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      age: [0, Validators.required],
      email: ['', [Validators.required ,Validators.email]],
      phoneNumber: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      addressType: [null, Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      interest: ['', Validators.required],
    });
  }
  get f(){
    return this.registrationForm.controls;
  }
  getSelectedCountryIndx(item){
   let index= this.countryList.findIndex( (obj)=> {
       return item.id === obj.id;
    })
    return index;
  }
  getSelectedStateIndx(item){
    let index= this.states.findIndex( (obj)=> {
      return item.id === obj.id;
    })
    return index;
  }
  ngOnInit() {
      this.f['age'].valueChanges.subscribe(data =>{
        this.age = data
     });
    this.userData = JSON.parse(localStorage.getItem("userProfile"))||null;
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.countryList = this.countryListservice.counrytList;
    if (this.userData == null){
       this.f['country'].setValue("Please select country");
       this.f['state'].setValue("Please select state");
       this.router.navigate(['registration']);
     }

    if (localStorage.getItem("userProfile")){
       console.log(this.userData['age'])
       this.f['firstName'].setValue( this.userData['firstName']);
       this.f['lastName'].setValue( this.userData['lastName']);
       this.f['age'].setValue( this.userData['age']);
       this.age = this.userData['age'];
       this.f['email'].setValue( this.userData['email']);
       this.f['phoneNumber'].setValue( this.userData['phoneNumber']);
       let countryIndex = this.getSelectedCountryIndx(this.userData['country']);
       this.selectedCountry = this.countryList[countryIndex];
       this.onCountrySelect();
       let stateIndex = this.getSelectedStateIndx(this.userData['state'])
       this.selectedState = this.states[stateIndex];
       this.f['addressType'].setValue( this.userData['addressType']);
       this.f['address1'].setValue( this.userData['address1']);
       this.f['address2'].setValue( this.userData['address2']);
       this.f['interest'].setValue( this.userData['interest']);
       this.imageUrl = this.userData['imageUrl'];
     }
     console.log(this.f['firstName'])
  }
  onCountrySelect(){
    if(this.f['country'].value ||this.selectedCountry){
      this.states = this.countryListservice.getStatesOfCountry(this.selectedCountry['id']);

    }

  }
  handleFileInput(file){
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.imageUrl = event.target['result'];
    };

  }
  onSubmit() {
    this.submitted = true;
    this.invalidCountry = false;
    this.invalidState = false;
    let id =this.userData ? this.userData.length : 0
    const obj = Object.assign(this.registrationForm.getRawValue(),{id:id, imageUrl:this.imageUrl})
    this.userData = obj;
    if ( this.f['country'].value === 'Please select country') {
      this.invalidCountry =true;
    }
    if( this.f['state'].value === 'Please select state') {
      this.invalidState =true;
    }
    if (this.registrationForm.invalid ||this.invalidCountry || this.invalidState) {
      return;
    }
    localStorage.removeItem("userProfile");
    localStorage.setItem('userProfile', JSON.stringify(this.userData))
    this.router.navigate(['profile']);
  }
}
