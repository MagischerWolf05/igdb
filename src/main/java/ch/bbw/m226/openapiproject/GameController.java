package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.GamesApi;
import ch.bbw.m226.openapi.generated.dto.Game;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Validated
@RestController
public class GameController implements GamesApi {
    private final ArrayList<Game> Games = new ArrayList<>();

    private final Random random = new Random();

    @Override
    public ResponseEntity<Game> addGame(Game game) {
        game.setId(random.nextInt(Integer.MAX_VALUE));
        Games.add(game); // yolo ignoring conflicts
        return ResponseEntity.status(HttpStatus.OK)
                .body(game);
        //return null;
    }

    @Override
    public ResponseEntity<Void> deleteGame(Integer id) {
        for (int i = 0; i< Games.size(); i++ ) {
            if(Games.get(i).getId() == id){
                Games.remove(i);
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Override
    public ResponseEntity<List<Game>> getGames() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(Games);
    }

    @Override
    public ResponseEntity<Game> updateGame(Game game) {
        for (int i = 0; i > Games.size(); i++) {
            var possibleGame = Games.get(i);
            if(possibleGame.getId().equals(game.getId())){
                var id = possibleGame.getId();
                possibleGame = game;
                possibleGame.setId(id);
                //save
                return ResponseEntity.status(HttpStatus.OK)
                        .body(possibleGame);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
