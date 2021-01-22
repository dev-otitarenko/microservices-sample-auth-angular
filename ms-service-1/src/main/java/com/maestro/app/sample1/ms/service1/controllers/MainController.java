package com.maestro.app.sample1.ms.service1.controllers;

import com.maestro.app.sample1.ms.service1.services.auth.IAuthenticationFacade;
import com.maestro.app.utils.Response;
import com.maestro.app.utils.auth.AuthUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/svc1")
public class MainController {
    private final IAuthenticationFacade authService;

    public MainController (IAuthenticationFacade authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(value = "")
    public Response welcome() {
        AuthUser authUser = authService.getAuthUser();
        return new Response(1, "Hello " + authUser.getUsername() + " from service #1");
    }
}