package com.maestro.app.sample1.ms.service1.configuration;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

@Profile("!test")
@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	@Value("${auth-server.url}")
	private String authEndpoint;
	@Value("${auth-server.user}")
	private String authUserName;
	@Value("${auth-server.secret}")
	private String authUserPass;

	@Bean
	public JdbcTokenStore tokenStore() {
		return new JdbcTokenStore(dataSource);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/actuator/**",
						"/swagger-resources/**",
						"/swagger-ui.html",
						"/v2/api-docs",
						"/webjars/**").permitAll()
				.anyRequest()
				.authenticated()
				.and()
				.httpBasic().disable()
				.exceptionHandling()
				.authenticationEntryPoint(
						(request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
				.accessDeniedHandler(
						(request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED));
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.resourceId("mw/adminapp").tokenStore(tokenStore());
	}

	@Bean
	public ResourceServerTokenServices tokenService() {
		RemoteTokenServices tokenServices = new RemoteTokenServices();
		tokenServices.setClientId(this.authUserName);
		tokenServices.setClientSecret(this.authUserPass);
		tokenServices.setCheckTokenEndpointUrl(authEndpoint + "/oauth/check_token");
		return tokenServices;
	}
}
