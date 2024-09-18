package com.fedserv.fedservwebsite.controllers.viewcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    @GetMapping("/")
    public String adminPage() {
        return "admin.html";
    }

    @GetMapping("/career")
    public String getCareerPage() {
        return "career.html";
    }

    @GetMapping("/opening")
    public String getOpeningPage() {
        return "opening.html";
    }

    @GetMapping("/gallery")
    public String getGalleryPage() {
        return "photos.html";
    }

    @GetMapping("/adminControl")
    public String adminControlPage() {
        return "adminControl.html";
    }

    @GetMapping("/editCareer")
    public String editCareerPage() {
        return "addJob.html";
    }

    @GetMapping("/viewJobs")
    public String viewJobsPage(@RequestParam(value = "jobType") String jobType) {
        return "viewjobs.html";
    }

    @GetMapping("/viewApplicants")
    public String viewApplicantsPage(@RequestParam(value = "jobId") String jobId) {
        return "viewApplicants.html";
    }

    @GetMapping("/editGallery")
    public String editGallery() {
        return "editGallery.html";
    }

    @GetMapping("/editVideo")
    public String editVideo() {
        return "editVedio.html";
    }

    @GetMapping("/viewOtherApplicants")
    public String viewOtherApplicantsPage() {
        return "others.html";
    }
}
