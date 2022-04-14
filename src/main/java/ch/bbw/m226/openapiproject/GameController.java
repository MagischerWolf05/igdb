package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.GamesApi;
import ch.bbw.m226.openapi.generated.dto.Game;
import ch.bbw.m226.openapi.generated.dto.Platform;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import ch.bbw.m226.openapi.generated.dto.Publisher;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Validated
@RestController
public class GameController implements GamesApi {

    private ArrayList<Game> Games = new ArrayList<>();
    private ArrayList<Platform> Platforms = new ArrayList<>();

    private final Random random = new Random();

    private final File gameFile = new File("Data/Games.json");
    public GameController(){
        try {
            Games = new ObjectMapper().readValue(gameFile, new TypeReference<ArrayList<Game>>(){});

            var platformFile = new File("Data/Platforms.json");
            Platforms = new ObjectMapper().readValue(platformFile, new TypeReference<ArrayList<Platform>>(){});

            for (int i = 0; i < Games.size(); i++) {
                var game = Games.get(i);
                var gamePlatforms = getPlatforms(game.getPlatformIDs());
                game.setPlatforms(gamePlatforms);
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
    }

    private ArrayList<Platform> getPlatforms(List<Integer> ids){
        var gamePlatforms = new ArrayList<Platform>();
        for (int j = 0; j < ids.size(); j++) {
            var id = ids.get(j);
            var platformFound = Platforms.stream().filter(x -> x.getId().equals(id)).toList().get(0);
            gamePlatforms.add(platformFound);
        }
        return gamePlatforms;
    }

    private void save(){
        //set PlatformIDs and delete Platforms awayy

        //var allPlatforms = Games.stream().flatMap(x -> x.getPlatforms().stream()).toList();
        //Remove
        var gameSave = Games;
        HashMap<Integer, List<Platform>> platforms = new HashMap<>();

        for (int i = 0; i < gameSave.size(); i++) {
            var game = gameSave.get(i);
            platforms.put(game.getId(), game.getPlatforms());
            game.setPlatformIDs(game.getPlatforms().stream().map(Platform::getId).toList());
            game.setPlatforms(List.of());
        }
        try {
            new ObjectMapper().writerWithDefaultPrettyPrinter().writeValue(gameFile, gameSave);
            for (int i = 0; i < Games.size(); i++) {
                var game = Games.get(i);
                game.setPlatforms(platforms.get(game.getId()));
            }
        }
        catch (Exception e){
            System.out.println("Could not save Games");
        }


    }


    @Override
    public ResponseEntity<Game> addGame(Game game) {

        game.setId(random.nextInt(Integer.MAX_VALUE));
        //sets platform objects
        var gamePlatforms = getPlatforms(game.getPlatformIDs());
        game.setPlatforms(gamePlatforms);

        Games.add(game); // yolo ignoring conflicts
        save();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(game);
        //return null;
    }

    @Override
    public ResponseEntity<Void> deleteGame(Integer id) {
        for (int i = 0; i< Games.size(); i++ ) {
            if(Objects.equals(Games.get(i).getId(), id)){
                Games.remove(i);
                save();
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
        for (int i = 0; i < Games.size(); i++) {
            var possibleGame = Games.get(i);
            if(possibleGame.getId().equals(game.getId())){
                var id = possibleGame.getId();
                possibleGame = game;
                possibleGame.setId(id);
                //save
                possibleGame.setPlatformIDs(possibleGame.getPlatforms().stream().map(Platform::getId).toList());
                possibleGame.setPlatforms(List.of());
                save();
                return ResponseEntity.status(HttpStatus.OK)
                        .body(possibleGame);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
