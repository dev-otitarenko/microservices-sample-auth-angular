package com.maestro.app.sample1.ms.service2.controllers;

import com.maestro.app.sample1.ms.service2.clients.Service1Client;
import com.maestro.app.sample1.ms.service2.services.auth.IAuthenticationFacade;
import com.maestro.app.utils.Response;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/svc2")
public class MainController {
    private final IAuthenticationFacade authService;
    private final Service1Client service;

    public MainController (IAuthenticationFacade authService,
                           Service1Client service) {
        this.service = service;
        this.authService = authService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(value = "")
    public Response welcome() {
        //AuthUser authUser = authService.getAuthUser();

        return new Response(1, "Call service1 from service 2: " + service.callService1().getMessage());
    }
}