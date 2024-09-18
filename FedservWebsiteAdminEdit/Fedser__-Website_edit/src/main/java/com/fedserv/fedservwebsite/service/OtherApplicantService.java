package com.fedserv.fedservwebsite.service;

import com.fedserv.fedservwebsite.dao.OthersDao;
import com.fedserv.fedservwebsite.model.OtherApplicantDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.List;

@Service
public class OtherApplicantService {

    @Autowired
    OthersDao othersDao;

    @Transactional
    public String addOtherApplicantDetails(MultipartFile file, String firstName, String lastName, String emailId, String mobileNumber, String applicantId) {
        return othersDao.addOtherApplicantDetails(file,firstName, lastName,emailId,mobileNumber,applicantId);
    }


    public String getOtherApplicantId() {
        return othersDao.getOtherApplicantId();

    }

    public List<OtherApplicantDetails> getOtherApplicantDetails() {
        return othersDao.getOtherApplicantDetails();
    }

    public OtherApplicantDetails fetchPdf(String applicantId) {
        return othersDao.fetchPdf(applicantId);

    }

    @Transactional
    public String deleteOtherApplicantDetails(String applicantId) {
        return othersDao.deleteOtherApplicantDetails(applicantId);
    }
    public String sendMailOthers(String toEmail, String subject, String message) throws MessagingException {
        return othersDao.sendMailOthers(toEmail,subject,message);
    }

    @Transactional
    public String updateViewedDate(String applicantId,String viewedDate) {
        return othersDao.updateViewedDate(applicantId,viewedDate);
    }

}
