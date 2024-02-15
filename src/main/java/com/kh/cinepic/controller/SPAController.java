package com.kh.cinepic.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@Slf4j
public class SPAController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String handleError() {
        return "forward:/index.html";
    }

}
