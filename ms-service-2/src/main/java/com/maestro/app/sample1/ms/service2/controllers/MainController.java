package com.maestro.app.sample1.ms.service2.controllers;

import com.maestro.app.sample1.ms.service2.services.auth.IAuthenticationFacade;
import com.maestro.app.utils.auth.AuthUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/svc2")
public class MainController {
    private final IAuthenticationFacade authService;

    public MainController (IAuthenticationFacade authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(value = "")
    public String welcome() {
        AuthUser authUser = authService.getAuthUser();
        return "Hello " + authUser.getUsername() + " from service 1";
    }

}