export class CreateDigimonRequest {
  constructor(private readonly name : string) {
  }

  getName() : string {
    return this.name;
  }
}