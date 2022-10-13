export class DigimonConfiguration {
  constructor(private readonly _url : string) {
  }
  get url() : string{
    return this._url
  }
}