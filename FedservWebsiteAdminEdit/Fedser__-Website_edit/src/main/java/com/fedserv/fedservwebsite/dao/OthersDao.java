package com.fedserv.fedservwebsite.dao;

import com.fedserv.fedservwebsite.model.OtherApplicantDetails;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OthersDao {

    @Autowired
    EntityManager entityManager;
    @Value("${email.from.address}")
    private String fromAddress;
    @Autowired
    private JavaMailSender javaMailSender;

    public String addOtherApplicantDetails(MultipartFile file, String firstName, String lastName, String emailId, String mobileNumber, String applicantId) {
        try {
            OtherApplicantDetails otherDetails = new OtherApplicantDetails();
            otherDetails.setResume(file.getBytes());
            otherDetails.setMobileNumber(mobileNumber);
            otherDetails.setLastName(lastName);
            otherDetails.setFirstName(firstName);
            otherDetails.setEmailId(emailId);
            otherDetails.setApplicantId(applicantId);
            otherDetails.setViewedDate("No Views Yet");
            Session currentSession = entityManager.unwrap(Session.class);
            currentSession.clear();
            currentSession.saveOrUpdate(otherDetails);
            currentSession.close();
            return "File Uploaded Successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong";
        }
    }

    public String getOtherApplicantId() {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("From Other_Applicant_Details as a ORDER BY a.id desc",
                    OtherApplicantDetails.class);
            List<OtherApplicantDetails> list = query.getResultList();
            if (!list.isEmpty()) {
                String id = list.get(0).getApplicantId();
                String[] results = id.split("OT");
                currentSession.close();
                return results[1];
            } else {
                return "0";
            }
        } catch (Exception e) {
            return "0";
        }

    }

    public List<OtherApplicantDetails> getOtherApplicantDetails() {

        try {
            Session currentSession = entityManager.unwrap(Session.class);

            Query query = currentSession.createQuery("FROM Other_Applicant_Details",
                    OtherApplicantDetails.class);
            List<OtherApplicantDetails> list = query.getResultList();

            currentSession.close();
            if (!list.isEmpty()) {

                return list;

            } else {
                return new ArrayList<>();
            }


        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    //Email sending

    public OtherApplicantDetails fetchPdf(String applicantId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Other_Applicant_Details as a WHERE a.applicantId=:applicantId",
                OtherApplicantDetails.class);
        query.setParameter("applicantId", applicantId.toUpperCase());
        List<OtherApplicantDetails> applicantDetails = query.getResultList();
        currentSession.close();
        return applicantDetails.get(0);
    }

    public String deleteOtherApplicantDetails(String applicantId) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);

            // Find the ApplicantDetails entity by applicantId
            Query deleteQuery = currentSession.createQuery("DELETE Other_Applicant_Details as q WHERE q.applicantId=:applicantId");
            deleteQuery.setParameter("applicantId", applicantId);
            deleteQuery.executeUpdate();
            currentSession.close();
            return "true";
        } catch (Exception e) {
            // Handle any exceptions or errors
            return "false";
        }
    }

    public String sendMailOthers(String toEmail, String subject, String message) throws MessagingException {
        System.out.println("sending mail");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        mimeMessage.setContent(message, "text/html");
        helper.setFrom(fromAddress);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(message);
        try {
            javaMailSender.send(mimeMessage);
            return "Success";
        } catch (Exception e) {
            return "Failure";
        }


    }

    public String updateViewedDate(String applicantId, String viewedDate) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("UPDATE Other_Applicant_Details AS a set a.viewedDate=:viewedDate WHERE a.applicantId=:applicantId");
            query.setParameter("applicantId", applicantId);
            query.setParameter("viewedDate", viewedDate);
            query.executeUpdate();
            currentSession.close();
            return "true";
        } catch (Exception e) {
            return "false";
        }
    }
}
