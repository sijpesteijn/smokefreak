package nl.sijpesteijn.smokefreak.endpoints;

import nl.sijpesteijn.smokefreak.domain.SmokeEvent;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/smoke-events")
public class SmokeEventEndpoint {
    private final Mono<SecurityContext> context = ReactiveSecurityContextHolder.getContext();

    private SmokeEventAdapter smokeEventAdapter;
    private static final Mono<ResponseEntity<SmokeEvent>> NOT_FOUND = Mono.just(ResponseEntity.notFound().build());

    public SmokeEventEndpoint(SmokeEventAdapter smokeEventAdapter) {
        this.smokeEventAdapter = smokeEventAdapter;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private Flux<SmokeEvent> getSmokeEvents() {
        return smokeEventAdapter.find();
    }

    @GetMapping("/{id}")
    private Mono<ResponseEntity<SmokeEvent>> getSmokeEventById(@PathVariable String id) {
        return smokeEventAdapter.findById(id).map(ResponseEntity::ok)
                .switchIfEmpty(NOT_FOUND);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    private Mono<ResponseEntity<String>> save(@Valid @RequestBody SmokeEvent event) {
        return extractUserSeqIdFromJwtToken(context).flatMap(jwt ->
        {
            event.setUserName((String) jwt.getClaims().get("preferred_username"));
            return smokeEventAdapter
                    .index(event)
                    .map(m -> m.getId())
                    .map(m -> ResponseEntity.status(HttpStatus.CREATED).body(m));
        });
    }

    private Mono<Jwt> extractUserSeqIdFromJwtToken(Mono<SecurityContext> context) {
        return context.filter(c -> Objects.nonNull(c.getAuthentication()))
                .map(s -> s.getAuthentication().getPrincipal())
                .cast(Jwt.class);
    }

}
