import { PokemonControllerAdapter } from "../../../../src/adapter/in/controller/pokemon.controller.adapter";
import { GetPokemonByNameQuery } from "../../../../src/application/port/in/get.pokemon.by.name.query";
import { Pokemon } from "../../../../src/application/model/pokemon";
import { PokemonResponse } from "../../../../src/adapter/in/controller/model/pokemon.response";
import { Mock } from "moq.ts";
import { ErrorDescription } from "../../../../src/config/error.description";
import { BusinessException } from "../../../../src/application/exception/business.exception";
import { NotAvailableException } from "../../../../src/adapter/exception/not.available.exception";
import { NotFoundException } from "../../../../src/adapter/exception/not.found.exception";

describe("PokemonControllerAdapter", () => {
  let pokemonController: PokemonControllerAdapter;
  let getPokemonByNameQuery: GetPokemonByNameQuery;

  it("GIVEN a name " +
    "WHEN a GET is performed to /pokemons/{name} then GetPokemonByNameQuery is executed correctly and the response content is as expected " +
    "THEN the response content is as expected and the response status is 200", async () => {
    const responseMock = Promise.resolve(new Pokemon("pikachu", ["sarasa"], ["saraseador"]));
    const expected = new PokemonResponse("pikachu", ["sarasa"], ["saraseador"]);
    getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
      .setup((instance) => instance.execute("pikachu"))
      .returns(responseMock)
      .object();
    pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
    const response = await pokemonController.get("pikachu");
    expect(response).toEqual(expected);
    expect(response instanceof PokemonResponse).toBeTruthy();
  });

  describe("exceptions bubbling", () => {
    test.each`
    exception                                                         | expected
    ${new NotFoundException(ErrorDescription.NOT_FOUND)}              | ${new NotFoundException(ErrorDescription.NOT_FOUND)}
    ${new BusinessException(ErrorDescription.INCONSISTENCY_DIGIMON)}  | ${new BusinessException(ErrorDescription.INCONSISTENCY_DIGIMON)}
    ${new NotAvailableException(ErrorDescription.UNHANDLED)}          | ${new NotAvailableException(ErrorDescription.UNHANDLED)}
    ${new Error("")}                                                  | ${new Error("")} 
    `("GIVEN a name " +
      "WHEN a GET is performed to /pokemons/{name} and the GetPokemonByNameQuery throws {exception} " +
      "THEN {expected} is thrown", async ({ exception, expected }) => {
      getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
        .setup((instance) => instance.execute("sarasa"))
        .throws(exception)
        .object();
      pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
      try {
        await pokemonController.get("sarasa");
      } catch (e) {
        expect(e).toStrictEqual(expected);
      }
    });
  });
});