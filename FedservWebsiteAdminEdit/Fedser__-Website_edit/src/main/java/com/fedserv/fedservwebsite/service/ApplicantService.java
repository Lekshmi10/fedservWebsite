package com.fedserv.fedservwebsite.service;

import com.fedserv.fedservwebsite.dao.ApplicantDao;
import com.fedserv.fedservwebsite.model.ApplicantDetails;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.persistence.Query;
import java.util.List;

@Service
public class ApplicantService {


    @Autowired
    ApplicantDao applicantDao;

    @Transactional
    public String addApplicantDetails(MultipartFile file,String firstName, String lastName,String emailId,String mobileNumber,String jobId,String applicantId) {
        return applicantDao.addApplicantDetails(file,firstName, lastName,emailId,mobileNumber,jobId,applicantId);
    }


    public String getApplicantId() {
        return applicantDao.getApplicantId();

    }

    public List<ApplicantDetails> getApplicantDetails(String jobId) {
        return applicantDao.getApplicantDetails(jobId);
    }

    public ApplicantDetails fetchPdf(String applicantId) {
        return applicantDao.fetchPdf(applicantId);

    }
    @Transactional
    public String deleteApplicantDetails(String applicantId) {
        return applicantDao.deleteApplicantDetails(applicantId);
    }
    public String sendMail(String toEmail, String subject, String message) throws MessagingException {
        return applicantDao.sendMail(toEmail,subject,message);
    }
    @Transactional
    public String updateViewedDate(String applicantId,String viewedDate) {
        return applicantDao.updateViewedDate(applicantId,viewedDate);
    }

}
