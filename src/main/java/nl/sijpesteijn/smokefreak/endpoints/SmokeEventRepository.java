package nl.sijpesteijn.smokefreak.endpoints;

import nl.sijpesteijn.smokefreak.domain.SmokeEvent;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmokeEventRepository extends ReactiveCrudRepository<SmokeEvent, String> {

//    Flux<SmokeEvent> findAllSmokeEventsForUser(Mono<String> username);
}
