package com.kh.cinepic.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class SPAController implements ErrorController {

    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String forward(HttpServletRequest request) {
        String requestURI = request.getRequestURI();

        String[] swaggerPaths = new String[] {
                "/v2/api-docs",
                "/swagger-resources/**",
                "/swagger-ui/**",
                "/webjars/**",
                "/swagger-ui.html"
        };

        for (String swaggerPath : swaggerPaths) {
            if(requestURI.startsWith(swaggerPath)) {
                return "forward:" + request.getRequestURI();
            }
        }

        return "forward:/index.html";
    }

    @RequestMapping("/error")
    public String handleError() {
        return "forward:/index.html";
    }

}
