package com.fedserv.fedservwebsite.controllers;

import com.fedserv.fedservwebsite.model.JobOpenings;
import com.fedserv.fedservwebsite.service.JobOpeningsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JobOpeningsController {

    @Autowired
    JobOpeningsService jobOpeningsService;

    @PostMapping("/addJobOpenings")
    public String addJobOpenings(@RequestBody JobOpenings jobOpenings) {
        return jobOpeningsService.addJobOpenings(jobOpenings);
    }

    @GetMapping("/getJobId")
    public String getJobId() {
        return jobOpeningsService.getJobId();
    }

    @GetMapping("/getJobOpenings")
    public List<JobOpenings> getJobOpenings(@RequestParam String department) {
        return jobOpeningsService.getJobOpenings(department);
    }

    @GetMapping("/changeJobStatus")
    public String changeJobStatus(@RequestParam String jobId) {
        return jobOpeningsService.changeJobStatus(jobId);
    }

}


