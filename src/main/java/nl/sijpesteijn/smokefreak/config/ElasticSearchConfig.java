package nl.sijpesteijn.smokefreak.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Configuration
public class ElasticSearchConfig {

    @Bean
    public RestClientBuilder lowLevelRestClientBuilder(@Value("${es.nodes}") String[] esNodes,
                                                       @Value("${es.port}") int esPort,
                                                       @Value("${es.scheme}") String esScheme) throws UnknownHostException {
        HttpHost[] hosts = new HttpHost[esNodes.length];
        for (int i = 0; i < esNodes.length; i++) {
            hosts[i] = new HttpHost(InetAddress.getByName(esNodes[i]), esPort, esScheme);
        }
        return RestClient.builder(hosts);
    }

    @Bean(destroyMethod = "close")
    public RestHighLevelClient esClient(RestClientBuilder lowLevelRestClientBuilder) {
        return new RestHighLevelClient(lowLevelRestClientBuilder);
    }

}
