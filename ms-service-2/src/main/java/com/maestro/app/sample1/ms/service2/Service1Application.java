package com.maestro.app.sample1.ms.service2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

@SpringBootApplication
@EnableOAuth2Client
@EnableFeignClients
public class Service1Application {
	public static void main(String[] args) {
		SpringApplication.run(Service1Application.class, args);
	}
}