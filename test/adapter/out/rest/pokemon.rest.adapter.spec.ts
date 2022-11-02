import { Pokemon } from "../../../../src/application/model/pokemon";
import { Mock } from "moq.ts";
import { HttpService } from "@nestjs/axios";
import { PokemonRestAdapter } from "../../../../src/adapter/out/rest/pokemon.rest.adapter";
import { ConfigurationProperties } from "../../../../src/config/configuration.properties";
import { NotFoundException } from "../../../../src/adapter/exception/not.found.exception";
import { ErrorDescription } from "../../../../src/config/error.description";
import { NotAvailableException } from "../../../../src/adapter/exception/not.available.exception";
import { AxiosError } from "../../../resources/providers.exceptions.mock/rest/axios.error";

describe("PokemonRestAdapter", () => {
  let adapter: PokemonRestAdapter;
  let configurationProperties: ConfigurationProperties;
  let httpService: HttpService;
  const NAME = "pikachu";
  const TYPE = "sarasa";
  const ABILITY = "saraseador";
  const EXPECTED_TYPES = [TYPE];
  const EXPECTED_ABILITIES = [ABILITY];
  const TYPES_MOCK = [{ type: { name: TYPE } }];
  const ABILITIES_MOCK = [{ ability: { name: ABILITY } }];
  const URL = "test.com/pokemons/";

  it("GIVEN a name " +
    "WHEN finding pokemon and it is returned " +
    "THEN should return that Pokemon", async () => {
    const expected = new Pokemon(NAME, EXPECTED_TYPES, EXPECTED_ABILITIES);
    configurationProperties = new Mock<ConfigurationProperties>()
      .setup((instance) => instance.getPokemonConfiguration().getUrl())
      .returns(URL)
      .object();
    httpService = new Mock<HttpService>()
      .setup((instance) => instance.axiosRef.get(URL + NAME))
      .returns(Promise.resolve({
        data: {
          types: TYPES_MOCK,
          abilities: ABILITIES_MOCK
        },
        status: 1,
        statusText: "",
        headers: {},
        config: {},
        request: {}
      }))
      .object();
    adapter = new PokemonRestAdapter(httpService, configurationProperties);
    const response = await adapter.get(NAME);
    expect(response).toEqual(expected);
    expect(response instanceof Pokemon).toBeTruthy();
  });

  it("GIVEN a name " +
    "WHEN finding pokemon and it is not returned " +
    "THEN should throw NotFoundException", async () => {
    const expected = new NotFoundException(ErrorDescription.NOT_FOUND);
    configurationProperties = new Mock<ConfigurationProperties>()
      .setup((instance) => instance.getPokemonConfiguration().getUrl())
      .returns(URL)
      .object();
    httpService = new Mock<HttpService>()
      .setup((instance) => instance.axiosRef.get(URL + NAME))
      .throws(new AxiosError(404))
      .object();
    adapter = new PokemonRestAdapter(httpService, configurationProperties);
    try {
      await adapter.get(NAME);
    } catch (e) {
      expect(e).toStrictEqual(expected);
    }
  });

  it("GIVEN a name " +
    "WHEN finding pokemon and appear an unhandled error " +
    "THEN should throw NotAvailableException", async () => {
    const expected = new NotAvailableException(ErrorDescription.UNHANDLED);
    configurationProperties = new Mock<ConfigurationProperties>()
      .setup((instance) => instance.getPokemonConfiguration().getUrl())
      .returns(URL)
      .object();
    httpService = new Mock<HttpService>()
      .setup((instance) => instance.axiosRef.get(URL + NAME))
      .throws(new Error('generic_error'))
      .object();
    adapter = new PokemonRestAdapter(httpService, configurationProperties);
    try {
      await adapter.get(NAME);
    } catch (e) {
      expect(e).toStrictEqual(expected);
    }
  });

});