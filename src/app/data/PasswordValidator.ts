import { AbstractControl,FormControl,ValidatorFn  } from "@angular/forms";

export function passValidation(control:AbstractControl) {
    const password = control.get('pass');
    const confirmPassword = control.get('confirmPass');

   
    return password && confirmPassword && password.value !== confirmPassword.value ?{'misMatch': true} :null;


    
}
