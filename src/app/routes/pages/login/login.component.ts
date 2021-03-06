import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    errorLogin: string;

    constructor(public settings: SettingsService, 
        fb: FormBuilder, private route:Router,
        private authService:AuthService) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log(value);
            this.authService.login(value.email,value.password,false).subscribe(ok=>{
                this.route.navigate(["home"]);
            },error =>{
                console.error("Error login", error);
                this.errorLogin = error.message;
            })            
        }
    }

    ngOnInit() {

    }

}
