package com.maestro.app.sample1.ms.service2.clients;

import com.maestro.app.utils.Response;
import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;


@FeignClient(name = "service-1", url = "http://service1:8812", fallbackFactory = ServiceClientFallbackFactory.class)
public interface Service1Client {
    @GetMapping(value = "/svc1")
    Response callService1();
}

@Slf4j
@Component
class ServiceClientFallbackFactory implements FallbackFactory<Service1Client> {
    private static final Logger LOGGER = LoggerFactory.getLogger(ServiceClientFallbackFactory.class);

    @Override
    public Service1Client create(Throwable cause) {
        ServiceClientFallbackFactory.LOGGER.info("fallback; reason was: {}, {}", cause.getMessage(), cause);
        return new Service1Client() {
            @Override
            public Response callService1() {
                return null;
            }
        };
    }
}
