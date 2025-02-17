

export class NotPastDate {
  validate(value: Date) {
    return value >= new Date(); 
  }

  defaultMessage() {
    return 'Due date cannot be in the past';
  }
}
