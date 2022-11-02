export class DigimonConfiguration {
  constructor(private readonly url : string) {
  }
  getUrl() : string{
    return this.url
  }
}