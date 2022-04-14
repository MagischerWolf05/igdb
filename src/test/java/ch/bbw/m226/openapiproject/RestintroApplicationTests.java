package ch.bbw.m226.openapiproject;

import java.math.BigDecimal;
import java.sql.Array;
import java.time.LocalDate;
import java.util.*;

import ch.bbw.m226.openapi.generated.dto.Category;
import ch.bbw.m226.openapi.generated.dto.Game;
import ch.bbw.m226.openapi.generated.dto.Platform;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest
@ExtendWith(SpringExtension.class)
class RestintroApplicationTests implements WithAssertions {

	@Autowired
	private WebTestClient webClient;

	Game testGame(){
		var toCreate =  new Game().name("Willy" + UUID.randomUUID());
		toCreate.setCategory(Category.ACTION);
		toCreate.setPlatformIDs(List.of(718719273));
		toCreate.setImage("test");
		toCreate.setDownloads(120000);
		toCreate.setPrice(BigDecimal.valueOf(12.5));
		toCreate.setRating(5);
		toCreate.setSize(BigDecimal.valueOf(24.5));
		toCreate.setReleaseDate("07-08-2022");
		toCreate.setPublisherID(617759365);
		toCreate.setPlatforms(List.of());
		return toCreate;
	}

	@Test
	void getPonies() {
		var ponies = webClient.get()
				.uri("/ponies")
				.exchange()
				.expectStatus()
				.isOk()
				.expectBodyList(PonyDto.class)
				.returnResult()
				.getResponseBody();
		assertThat(ponies).hasSizeGreaterThanOrEqualTo(3);
	}

	@Test
	void addPony() {
		var toCreate = new PonyDto().name("Willy" + UUID.randomUUID())
				.birthday(LocalDate.now());
		var created = webClient.post()
				.uri("/ponies")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(PonyDto.class)
				.returnResult()
				.getResponseBody();
		assertThat(created).usingRecursiveComparison()
				.ignoringFields("id")
				.isEqualTo(toCreate);
	}

	@Test
	void addGame() {
		var toCreate = testGame();
		var created = webClient.post()
				.uri("/games")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(Game.class)
				.returnResult()
				.getResponseBody();
		assertThat(created).usingRecursiveComparison()
				.ignoringFields("id").ignoringFields("platforms")
				.isEqualTo(toCreate);
	}

	@Test
	void removeGame(){
		var toCreate = testGame();
		var created = webClient.post()
				.uri("/games")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(Game.class)
				.returnResult()
				.getResponseBody();
		webClient.delete().uri("/games/" + created.getId()).exchange().expectStatus().isOk();
		var allGamesBytes = webClient.get().
				uri("/games")
				.exchange()
				.expectBody()
				.returnResult()
				.getResponseBody();
		String str = new String(allGamesBytes);
		ArrayList<Game> games = null;
		try {
			games = new ObjectMapper().readValue(str, new TypeReference<ArrayList<Game>>(){});
		}
		catch (Exception e){}

		var deletedGame = games.stream()
				.filter(x -> Objects.equals(x.getId(), created.getId())).toList();
		assertThat(deletedGame.isEmpty()).isTrue();
	}

	@Test
	void editGame(){
		var toCreate = testGame();
		//create game
		var created = webClient.post()
				.uri("/games")
				.bodyValue(toCreate)
				.exchange()
				.expectStatus()
				.isCreated()
				.expectBody(Game.class)
				.returnResult()
				.getResponseBody();
		//edit game
		created.setName(UUID.randomUUID().toString());
		var edited = webClient.put().uri("/games")
				.bodyValue(created)
				.exchange()
				.expectStatus()
				.isOk()
				.expectBody(Game.class)
				.returnResult()
				.getResponseBody();
		assertThat(edited.getName()).isEqualTo(created.getName());
		//get all games
		var allGamesBytes = webClient.get().
				uri("/games")
				.exchange()
				.expectBody()
				.returnResult()
				.getResponseBody();
		String str = new String(allGamesBytes);
		ArrayList<Game> games = null;
		try {
			games = new ObjectMapper().readValue(str, new TypeReference<ArrayList<Game>>(){});
		}
		catch (Exception e){}

		var editedGame = games.stream().filter(x -> x.getId().equals(created.getId())).findFirst();
		assertThat(editedGame.get().getName()).isEqualTo(created.getName());

		webClient.delete().uri("/games/" + created.getId()).exchange().expectStatus().isOk();
	}
}
