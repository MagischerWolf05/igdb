package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.PublishersApi;
import ch.bbw.m226.openapi.generated.dto.Game;
import ch.bbw.m226.openapi.generated.dto.Platform;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import ch.bbw.m226.openapi.generated.dto.Publisher;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import io.swagger.v3.core.util.Json;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@Validated
@RestController
public class PublisherController implements PublishersApi {

    private final File publisherFile =  new File("Data/Publishers.json");

    private ArrayList<Publisher> Publishers = new ArrayList<>();

    private final Random random = new Random();

    PublisherController() {
        try{
            Publishers = new ObjectMapper().readValue(publisherFile, new TypeReference<ArrayList<Publisher>>(){});
        }
        catch (Exception e){}
    }

    private void save(){
        try {
            new ObjectMapper().writerWithDefaultPrettyPrinter().writeValue(publisherFile, Publishers);
        }
        catch (Exception e){
            System.out.println("Could not save Games");
        }
    }


    @Override
    public ResponseEntity<Publisher> addPublisher(Publisher publisher) {
        publisher.setId(random.nextInt(Integer.MAX_VALUE));
        Publishers.add(publisher); // yolo ignoring conflicts
        save();
        return ResponseEntity.status(HttpStatus.OK)
                .body(publisher);
    }

    @Override
    public ResponseEntity<Void> deletePublisher(Integer id) {
        for (int i = 0; i< Publishers.size(); i++ ) {
            if(Objects.equals(Publishers.get(i).getId(), id)){
                Publishers.remove(i);
                save();
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Override
    public ResponseEntity<Publisher> getPublisherById(Integer id) {
        for (int i = 0; i< Publishers.size(); i++ ) {
            var publisher = Publishers.get(i);
            if(publisher.getId() == id){
                return ResponseEntity.status(HttpStatus.OK).body(publisher);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Override
    public ResponseEntity<List<Publisher>> getPublishers() {
        return ResponseEntity.status(HttpStatus.OK).body(Publishers);
    }

    @Override
    public ResponseEntity<Publisher> updatePublisher(Publisher publisher) {
        for (int i = 0; i < Publishers.size(); i++) {
            var possiblePublisher = Publishers.get(i);
            if(possiblePublisher.getId().equals(publisher.getId())){
                var id = possiblePublisher.getId();
                possiblePublisher = publisher;
                possiblePublisher.setId(id);
                //save
                save();
                return ResponseEntity.status(HttpStatus.OK)
                        .body(possiblePublisher);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
