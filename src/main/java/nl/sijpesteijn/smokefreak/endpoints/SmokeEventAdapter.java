package nl.sijpesteijn.smokefreak.endpoints;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.sijpesteijn.smokefreak.domain.SmokeEvent;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.security.user.User;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.client.RestHighLevelClient;
import reactor.core.publisher.MonoSink;

import java.io.IOException;
import java.util.UUID;

@Component
public class SmokeEventAdapter {

    private final RestHighLevelClient client;
    private final ObjectMapper objectMapper;
    private String index;
    private String type;

    public SmokeEventAdapter(RestHighLevelClient client,
                             ObjectMapper objectMapper,
                             @Value("${es.index}") String index,
                             @Value("${es.type}") String type) {
        this.client = client;
        this.objectMapper = objectMapper;
        this.index = index;
        this.type = type;
    }

    Mono<SmokeEvent> findById(String id) {
        return Mono .<GetResponse>create(sink ->
                client.getAsync(new GetRequest(index, type, id), RequestOptions.DEFAULT, listenerToMonoSink(sink))
        )
                .filter(GetResponse::isExists)
                .map(GetResponse::getSource)
                .map(map -> objectMapper.convertValue(map, SmokeEvent.class));
    }

    public Flux<SmokeEvent> find() {
        SearchRequest request = new SearchRequest("smokefreak");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.from(0);
        searchSourceBuilder.size(15);
        searchSourceBuilder.sort(new FieldSortBuilder("timestamp").order(SortOrder.DESC));

        request.source(searchSourceBuilder);
        return Flux.create(sink ->
                client.searchAsync(request, RequestOptions.DEFAULT, new ActionListener<SearchResponse> () {
                    @Override
                    public void onResponse(SearchResponse searchResponse) {
                        SearchHit[] hits = searchResponse.getHits().getHits();
                        for (int i = 0; i < hits.length; i++) {
                            sink.next(translate(hits[i]));
                        }
                        sink.complete();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        sink.error(e);
                    }
                }) );
    }

    private SmokeEvent translate(SearchHit hit) {
        try {
            return this.objectMapper.readValue(hit.getSourceAsString(), SmokeEvent.class);
        } catch (IOException e) {
            return null;
        }
    }


    Mono<IndexResponse> index(SmokeEvent event) {
        if (event.getId() == null) {
            event.setId(UUID.randomUUID().toString());
        }
        Mono<IndexResponse> objectMono = Mono.create(sink -> {
            try {
                System.out.println(event);

                final IndexRequest indexRequest = new IndexRequest(index, type, event.getId());
                indexRequest.source(objectMapper.writeValueAsString(event), XContentType.JSON);
                client.indexAsync(indexRequest, RequestOptions.DEFAULT, listenerToMonoSink(sink));

                find().subscribe(se -> System.out.println(se.getTimestamp()));

            } catch (JsonProcessingException e) {
                sink.error(e);
            }
        });
        return objectMono;
    }

    private <T> ActionListener<T> listenerToMonoSink(MonoSink<T> sink) {
        return new ActionListener<T>() {
            @Override
            public void onResponse(T response) {
                sink.success(response);
            }

            @Override
            public void onFailure(Exception e) {
                sink.error(e);
            }
        };
    }

}
