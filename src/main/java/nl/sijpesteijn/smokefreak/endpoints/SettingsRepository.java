package nl.sijpesteijn.smokefreak.endpoints;

import nl.sijpesteijn.smokefreak.domain.Settings;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends ReactiveCrudRepository<Settings, String> {
}
