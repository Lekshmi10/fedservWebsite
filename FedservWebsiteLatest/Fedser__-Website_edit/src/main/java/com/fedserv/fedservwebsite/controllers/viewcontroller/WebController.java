package com.fedserv.fedservwebsite.controllers.viewcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    @GetMapping("/")
    public String getHomePage(){
        return "index.html";
    }

    @GetMapping("/career")
    public String getCareerPage(){
        return "career.html";
    }

    @GetMapping("/opening")
    public String getOpeningPage(){
        return "opening.html";
    }

    @GetMapping("/about")
    public String getAboutPage(){
        return "about.html";
    }

    @GetMapping("/gallery")
    public String getGalleryPage(){
        return "photos.html";
    }

    @GetMapping("/contact")

    public String getContactPage(){
        return "contact.html";
    }

    @GetMapping("/download")
    public String getDownloadPage(){
        return "download.html";
    }

}
