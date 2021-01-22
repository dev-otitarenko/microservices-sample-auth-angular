package com.maestro.app.sample1.ms.service2.services.auth;

import com.maestro.app.utils.auth.AuthUser;

public interface IAuthenticationFacade {
    AuthUser getAuthUser();

    boolean hasRole (String roleName);

    boolean hasAnyRoles (String roleNames);
}
