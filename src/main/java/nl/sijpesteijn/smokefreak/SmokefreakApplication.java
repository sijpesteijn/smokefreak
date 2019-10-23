package nl.sijpesteijn.smokefreak;

import ch.qos.logback.access.servlet.TeeFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import java.util.Collection;
import java.util.Collections;

@SpringBootApplication
public class SmokefreakApplication {

	@Bean
	RouterFunction<ServerResponse> staticResourceRouter(){
		return RouterFunctions.resources("/**", new ClassPathResource("smokefreak-app/public/"));
	}

	public static void main(String[] args) {
		SpringApplication.run(SmokefreakApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean requestResponseFilter() {

		TeeFilter filter = new TeeFilter();
		final FilterRegistrationBean filterRegBean = new FilterRegistrationBean();
		filterRegBean.setFilter(filter);
		Collection<String> urls = Collections.singleton("/api/");
		filterRegBean.setUrlPatterns(urls);
		filterRegBean.setName("Request Response Filter");
		filterRegBean.setAsyncSupported(Boolean.TRUE);
		return filterRegBean;
	}
}
