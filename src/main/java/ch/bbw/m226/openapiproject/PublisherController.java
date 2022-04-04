package ch.bbw.m226.openapiproject;

import ch.bbw.m226.openapi.generated.controller.PublishersApi;
import ch.bbw.m226.openapi.generated.dto.PonyDto;
import ch.bbw.m226.openapi.generated.dto.Publisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Validated
@RestController
public class PublisherController implements PublishersApi {

    private ArrayList<Publisher> Publishers = new ArrayList<>();

    private final Random random = new Random();

    @Override
    public ResponseEntity<Publisher> addPublisher(Publisher publisher) {
        publisher.setId(random.nextInt(Integer.MAX_VALUE));
        Publishers.add(publisher); // yolo ignoring conflicts
        return ResponseEntity.status(HttpStatus.OK)
                .body(publisher);
    }

    @Override
    public ResponseEntity<Void> deletePublisher(Integer id) {
        for (int i = 0; i< Publishers.size(); i++ ) {
            if(Publishers.get(i).getId() == id){
                Publishers.remove(i);
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
        for (int i = 0; i > Publishers.size(); i++) {
            var possiblePublisher = Publishers.get(i);
            if(possiblePublisher.getId().equals(publisher.getId())){
                var id = possiblePublisher.getId();
                possiblePublisher = publisher;
                possiblePublisher.setId(id);
                //save
                return ResponseEntity.status(HttpStatus.OK)
                        .body(possiblePublisher);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
