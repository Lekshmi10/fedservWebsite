package com.fedserv.fedservwebsite.dao;

import com.fedserv.fedservwebsite.model.ApplicantDetails;
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
public class ApplicantDao {

    @Autowired
    EntityManager entityManager;
    @Value("${email.from.address}")
    private String fromAddress;
    @Autowired
    private JavaMailSender javaMailSender;

    public String addApplicantDetails(MultipartFile file, String firstName, String lastName, String emailId, String mobileNumber, String jobId, String applicantId) {
        try {
            ApplicantDetails applicantDetails = new ApplicantDetails();
            applicantDetails.setResume(file.getBytes());
            applicantDetails.setMobileNumber(mobileNumber);
            applicantDetails.setLastName(lastName);
            applicantDetails.setFirstName(firstName);
            applicantDetails.setEmailId(emailId);
            applicantDetails.setApplicantId(applicantId);
            applicantDetails.setJobId(jobId);
            applicantDetails.setViewedDate("No Views Yet");
            Session currentSession = entityManager.unwrap(Session.class);
            currentSession.clear();
            currentSession.saveOrUpdate(applicantDetails);
            currentSession.close();
            return "File Uploaded Successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong";
        }
    }

    public String getApplicantId() {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("From Applicant_Details as a ORDER BY a.id desc",
                    ApplicantDetails.class);
            List<ApplicantDetails> list = query.getResultList();
            if (!list.isEmpty()) {
                String id = list.get(0).getApplicantId();
                String[] results = id.split("AP");
                currentSession.close();
                return results[1];
            } else {
                return "0";
            }
        } catch (Exception e) {
            return "0";
        }

    }

    public List<ApplicantDetails> getApplicantDetails(String jobId) {

        try {
            Session currentSession = entityManager.unwrap(Session.class);

            Query query = currentSession.createQuery("From Applicant_Details as a WHERE a.jobId=:jobId",
                    ApplicantDetails.class);
            query.setParameter("jobId", jobId);
            List<ApplicantDetails> list = query.getResultList();

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

    public ApplicantDetails fetchPdf(String applicantId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Applicant_Details as a WHERE a.applicantId=:announcementHeadline",
                ApplicantDetails.class);
        query.setParameter("announcementHeadline", applicantId.toUpperCase());
        List<ApplicantDetails> announcementFiles = query.getResultList();
        currentSession.close();
        return announcementFiles.get(0);
    }

    public String deleteApplicantDetails(String applicantId) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);

            // Find the ApplicantDetails entity by applicantId
            Query deleteQuery = currentSession.createQuery("DELETE Applicant_Details as q WHERE q.applicantId=:applicantId");
            deleteQuery.setParameter("applicantId", applicantId);
            deleteQuery.executeUpdate();
            currentSession.close();
            return "true";
        } catch (Exception e) {
            // Handle any exceptions or errors
            return "false";
        }
    }

    public String sendMail(String toEmail, String subject, String message) throws MessagingException {
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
            Query query = currentSession.createQuery("UPDATE Applicant_Details AS a set a.viewedDate=:viewedDate WHERE a.applicantId=:applicantId");
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


