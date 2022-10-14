export class RestClientConfiguration {
  constructor(private readonly _timeout : number) {
  }
  get timeout() : number{
    return this._timeout
  }
}