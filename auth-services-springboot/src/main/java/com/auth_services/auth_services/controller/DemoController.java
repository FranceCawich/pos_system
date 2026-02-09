package com.auth_services.auth_services.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class DemoController {
    
    private static final Logger logger = LoggerFactory.getLogger(DemoController.class);

    @GetMapping("/")
    public String welcome() {
        logger.info("Welcome endpoint was called");
        logger.debug("Debug message");
        logger.error("Error message example");
        return "Welcome to Spring Bootssss222";
    }
    
}
