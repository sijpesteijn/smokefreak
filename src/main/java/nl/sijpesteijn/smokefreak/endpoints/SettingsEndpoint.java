package nl.sijpesteijn.smokefreak.endpoints;

import nl.sijpesteijn.smokefreak.domain.Settings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/api/settings")
public class SettingsEndpoint {
  Logger logger = LoggerFactory.getLogger(SettingsEndpoint.class);
  private final Mono<SecurityContext> context = ReactiveSecurityContextHolder.getContext();

  private SettingsRepository settingsRepository;

  public SettingsEndpoint(SettingsRepository settingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  @GetMapping()
  private Mono<ResponseEntity<Settings>> getSettings() {
    return extractUserSeqIdFromJwtToken(context).flatMap(jwt ->
    {
      String username = (String) jwt.getClaims().get("preferred_username");
      logger.debug("Getting settings for user {}", username);
      return settingsRepository
          .findById(username)
          .map(settings -> ResponseEntity.ok(settings))
          .defaultIfEmpty(ResponseEntity.notFound().build());
    });
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  private Mono<ResponseEntity<Settings>> save(@Valid @RequestBody Settings settings) {
    return extractUserSeqIdFromJwtToken(context).flatMap(jwt ->
    {
      settings.setUsername((String) jwt.getClaims().get("preferred_username"));
      logger.debug("Saving settings for user {}", settings.getUsername());
      return settingsRepository.save(settings).map(saved -> ResponseEntity.ok(saved));
    });
  }

  private Mono<Jwt> extractUserSeqIdFromJwtToken(Mono<SecurityContext> context) {
    return context.filter(c -> Objects.nonNull(c.getAuthentication()))
        .map(s -> s.getAuthentication().getPrincipal())
        .cast(Jwt.class);
  }

}
