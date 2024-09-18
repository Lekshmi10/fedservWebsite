package com.fedserv.fedservwebsite.controllers;
import com.fedserv.fedservwebsite.model.OtherApplicantDetails;
import com.fedserv.fedservwebsite.service.OtherApplicantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OthersController {

    @Autowired
    OtherApplicantService otherApplicantService;

    @PostMapping("/addOtherApplicantDetails")
    public String uploadDetails(@RequestParam("resume") MultipartFile file, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
                                @RequestParam("emailId") String emailId, @RequestParam("mobileNumber") String mobileNumber,  @RequestParam("applicantId") String applicantId) {
        return otherApplicantService.addOtherApplicantDetails(file,firstName, lastName,emailId,mobileNumber,applicantId);
    }

    @GetMapping("/getOtherApplicantId")
    public String getOtherApplicantId() {
        return otherApplicantService.getOtherApplicantId();
    }

    @GetMapping("/getOtherApplicantDetails")
    public List<OtherApplicantDetails> getApplicantDetails() {
        return otherApplicantService.getOtherApplicantDetails();
    }
    @GetMapping("/getOtherApplicantResume")
    public ResponseEntity<Resource> fetchPdf(@RequestParam String applicantId) {
        OtherApplicantDetails applicantDetails = otherApplicantService.fetchPdf(applicantId);
        ByteArrayResource resource = new ByteArrayResource(applicantDetails.getResume());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename="+applicantDetails.getFirstName()+".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(applicantDetails.getResume().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
    @GetMapping("/deleteOtherApplicantDetails")
    public String deleteOtherApplicantDetails(@RequestParam String applicantId) {
        return otherApplicantService.deleteOtherApplicantDetails(applicantId);
    }
    @GetMapping("/sendOtherMail")
    public String sendMailOthers(@RequestParam String toEmail, @RequestParam String subject, @RequestParam String message) throws MessagingException {
        return otherApplicantService.sendMailOthers(toEmail,subject,message);
    }
    @PostMapping("/updateOthersViewedDate")
    public String updateViewedDate(@RequestParam String applicantId,@RequestParam String viewedDate) {
        return otherApplicantService.updateViewedDate(applicantId,viewedDate);
    }
}
