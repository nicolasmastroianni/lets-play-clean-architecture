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

  it("GIVEN a name " +
    "WHEN a GET is performed to /pokemons/{name} then GetPokemonByNameQuery throws NotFoundException " +
    "THEN the exception response is NotFoundException", async () => {
    const exceptionMock = new NotFoundException(ErrorDescription.NOT_FOUND);
    getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
      .setup((instance) => instance.execute("sarasa"))
      .throws(exceptionMock)
      .object();
    pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
    try {
      await pokemonController.get("sarasa");
    } catch (e) {
      expect(e).toBe(exceptionMock);
    }
  });

  it("GIVEN a name " +
    "WHEN a GET is performed to /pokemons/{name} then GetPokemonByNameQuery throws BusinessException " +
    "THEN the exception response is BusinessException", async () => {
    const exceptionMock = new BusinessException(ErrorDescription.INCONSISTENCY_DIGIMON);
    getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
      .setup((instance) => instance.execute("agumon"))
      .throws(exceptionMock)
      .object();
    pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
    try {
      await pokemonController.get("agumon");
    } catch (e) {
      expect(e).toBe(exceptionMock);
    }
  });

  it("GIVEN a name " +
    "WHEN a GET is performed to /pokemons/{name} then GetPokemonByNameQuery throws Error " +
    "THEN the exception response is Error", async () => {
    const exceptionMock = new Error("");
    getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
      .setup((instance) => instance.execute("sarasa"))
      .throws(exceptionMock)
      .object();
    pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
    try {
      await pokemonController.get("sarasa");
    } catch (e) {
      expect(e).toBe(exceptionMock);
    }
  });

  it("GIVEN a name " +
    "WHEN a GET is performed to /pokemons/{name} then GetPokemonByNameQuery throws NotAvailableException " +
    "THEN the exception response is NotAvailableException", async () => {
    const exceptionMock = new NotAvailableException(ErrorDescription.UNHANDLED);
    getPokemonByNameQuery = new Mock<GetPokemonByNameQuery>()
      .setup((instance) => instance.execute("sarasa"))
      .throws(exceptionMock)
      .object();
    pokemonController = new PokemonControllerAdapter(getPokemonByNameQuery);
    try {
      await pokemonController.get("sarasa");
    } catch (e) {
      expect(e).toBe(exceptionMock);
    }
  });
});