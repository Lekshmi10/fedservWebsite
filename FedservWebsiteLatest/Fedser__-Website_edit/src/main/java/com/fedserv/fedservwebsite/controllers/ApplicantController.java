package com.fedserv.fedservwebsite.controllers;

import com.fedserv.fedservwebsite.model.ApplicantDetails;
import com.fedserv.fedservwebsite.service.ApplicantService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApplicantController {

    @Autowired
   ApplicantService applicantService;

    @PostMapping("/addApplicantDetails")
    public String uploadDetails(@RequestParam("resume") MultipartFile file, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
                                @RequestParam("emailId") String emailId, @RequestParam("mobileNumber") String mobileNumber,@RequestParam("jobId") String jobId,@RequestParam("applicantId") String applicantId) {
        return applicantService.addApplicantDetails(file,firstName, lastName,emailId,mobileNumber,jobId,applicantId);
    }

    @GetMapping("/getApplicantId")
    public String getApplicantId() {
        return applicantService.getApplicantId();
    }

    @GetMapping("/getApplicantDetails")
    public List<ApplicantDetails> getApplicantDetails(@RequestParam String jobId) {
        return applicantService.getApplicantDetails(jobId);
    }
    @GetMapping("/getApplicantResume")
    public ResponseEntity<Resource> fetchPdf(@RequestParam String applicantId) {
        ApplicantDetails announcementFiles = applicantService.fetchPdf(applicantId);
        ByteArrayResource resource = new ByteArrayResource(announcementFiles.getResume());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename="+announcementFiles.getFirstName()+".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(announcementFiles.getResume().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

}
