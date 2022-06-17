import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({ selector: '[appSelectValidator]' })
export class SelectRequiredValidatorDirective implements Validator {
    constructor() { 

    }
    validate(control:AbstractControl): {
        [key: string] : any } | null {
            return control.value==='-1'? {'defaultSelected':true} : null
        }
    
    
}