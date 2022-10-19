import { Pokemon } from "../../../src/application/model/pokemon";
import { PokemonResponse } from "../../../src/adapter/in/controller/model/pokemon.response";
import { PokemonRepository } from "../../../src/application/port/out/pokemon.repository";
import { Mock } from "moq.ts";
import { GetPokemonByNameUseCase } from "../../../src/application/usecase/get.pokemon.by.name.use.case";
import { NotAvailableException } from "../../../src/adapter/exception/not.available.exception";
import { ErrorDescription } from "../../../src/config/error.description";
import { NotFoundException } from "../../../src/adapter/exception/not.found.exception";

describe("GetPokemonByNameUseCase", () => {
  let getPokemonByNameUseCase: GetPokemonByNameUseCase;
  let pokemonRepository: PokemonRepository;

  it("GIVEN a name " +
    "WHEN GetPokemonByNameUseCase is executed " +
    "THEN the repository is called correctly and reponse is as expected", async () => {
    const responseMock = Promise.resolve(new Pokemon("pikachu", ["sarasa"], ["saraseador"]));
    const expected = new Pokemon("pikachu", ["sarasa"], ["saraseador"]);
    pokemonRepository = new Mock<PokemonRepository>()
      .setup((instance) => instance.get("pikachu"))
      .returns(responseMock)
      .object();
    getPokemonByNameUseCase = new GetPokemonByNameUseCase(pokemonRepository);
    const response = await getPokemonByNameUseCase.execute("pikachu");
    expect(response).toEqual(expected);
    expect(response instanceof Pokemon).toBeTruthy();
  });

describe('bubbles exceptions', () => {
  test.each`
    exception                                                 | expected
    ${new NotFoundException(ErrorDescription.NOT_FOUND)}      | ${new NotFoundException(ErrorDescription.NOT_FOUND)}
    ${new NotAvailableException(ErrorDescription.UNHANDLED)}  | ${new NotAvailableException(ErrorDescription.UNHANDLED)}
    `("GIVEN a name " +
    "WHEN GetPokemonByNameUseCase is executed " +
    "THEN the repository throws {exception} then {expected} is thrown", async ({exception, expected}) => {
    pokemonRepository = new Mock<PokemonRepository>()
      .setup((instance) => instance.get("sarasa"))
      .throws(exception)
      .object();
    getPokemonByNameUseCase = new GetPokemonByNameUseCase(pokemonRepository);
    try {
      await getPokemonByNameUseCase.execute("sarasa");
    } catch (e) {
      expect(e).toStrictEqual(expected);
    }
  })
})
});