import * as math from 'mathjs';

import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

function mathValidator(variables: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const scope: any = {};
    variables.forEach(v => scope[v] = 0);

    try {
      math.parse(control.value).eval(scope);
      return null;
    } catch (e) {
      return {'invalidExpression': {value: control.value}};
    }
  };
}

@Directive({
  selector: '[mathValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MathValidatorDirective, multi: true}]
})
export class MathValidatorDirective implements Validator {
  @Input('mathValidator') variables: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.variables ? mathValidator(this.variables.split(/\s*,\s*/))(control) : null;
  }
}
