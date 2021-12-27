import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import { User } from '../entities/user.entity';
import { ValidationErrorI, ValidationResponse } from '../types/validation.types';
import { UserInputError } from 'apollo-server';

class Validation {
  target: any;

  validationCandidate: any;

  validationOpts: ValidatorOptions;

  constructor(candidate, target, partial?: boolean) {
    this.target = target;
    this.validationOpts = { whitelist: true };
    if (partial) this.validationOpts.skipMissingProperties = true;
    this.validationCandidate = plainToClass(this.target, candidate);
  }

  public async validate(): Promise<ValidationResponse> {
    const errors: ValidationError[] = await validate(
      this.validationCandidate,
      this.validationOpts,
    );

    if (errors.length) {
      const foundErrors: ValidationErrorI[] = errors.map(
        (err: ValidationError): ValidationErrorI => {
          return {
            validationProperty: err.property,
            validationErrors: Object.values(err.constraints),
          };
        },
      );

      return Validation.validationFail(foundErrors);
    }

    return Validation.validationSuccess();
  }

  private static validationSuccess(): ValidationResponse {
    return {
      status: 'success'
    }
  }

  private static validationFail(errors: ValidationErrorI[]): ValidationResponse {
    return {
      status: 'fail',
      msg: 'Incorrect input data',
      errors,
    }
  }
}

export function userPartialValidate(userInput: Partial<User>) {
  return new Validation(userInput, User, true).validate();
}

export function userFullValidate(userInput: Partial<User>) {
  return new Validation(userInput, User).validate();
}
