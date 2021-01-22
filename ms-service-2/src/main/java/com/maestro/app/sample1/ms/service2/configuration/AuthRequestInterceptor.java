package com.maestro.app.sample1.ms.service2.configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthRequestInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        Authentication _auth = SecurityContextHolder.getContext().getAuthentication();
        if (_auth != null) {
            if (_auth.getDetails() instanceof  OAuth2AuthenticationDetails) {
                String _token = ((OAuth2AuthenticationDetails) _auth.getDetails()).getTokenValue();
                requestTemplate.header("Authorization", String.format("Bearer %s", _token));
            }
        }
    }
}
