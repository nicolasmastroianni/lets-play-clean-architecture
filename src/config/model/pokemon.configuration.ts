export class PokemonConfiguration {
  constructor(private readonly url: string) {}
  
  getUrl(): string {
    return this.url;
  }
}
