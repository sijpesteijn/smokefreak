package nl.sijpesteijn.smokefreak.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Settings {

    @Id
    private String username;
    private String email;
    private Long timeBetweenSmokes = 3612L;
    private TabacBrand tabacBrand;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTimeBetweenSmokes() {
        return timeBetweenSmokes;
    }

    public void setTimeBetweenSmokes(Long timeBetweenSmokes) {
        this.timeBetweenSmokes = timeBetweenSmokes;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public TabacBrand getTabacBrand() {
        return tabacBrand;
    }

    public void setTabacBrand(TabacBrand tabacBrand) {
        this.tabacBrand = tabacBrand;
    }
}
