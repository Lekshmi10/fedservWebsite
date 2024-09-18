package com.fedserv.fedservwebsite.dao;

import com.fedserv.fedservwebsite.model.ApplicantDetails;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ApplicantDao {

    @Autowired
    EntityManager entityManager;


    public String addApplicantDetails(MultipartFile file,String firstName, String lastName,String emailId, String mobileNumber,String jobId,String applicantId) {
        try {
            ApplicantDetails applicantDetails = new ApplicantDetails();
            applicantDetails.setResume(file.getBytes());
            applicantDetails.setMobileNumber(mobileNumber);
            applicantDetails.setLastName(lastName);
            applicantDetails.setFirstName(firstName);
            applicantDetails.setEmailId(emailId);
            applicantDetails.setApplicantId(applicantId);
            applicantDetails.setJobId(jobId);
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
        try{
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("From Applicant_Details as a ORDER BY a.id desc",
                    ApplicantDetails.class);
            List<ApplicantDetails> list = query.getResultList();
            if (!list.isEmpty()) {
                String id=list.get(0).getApplicantId();
                String[] results = id.split("AP");
                currentSession.close();
                return results[1];
            } else {
                return "0";
            }
        }catch (Exception e) {
            return "0";
        }

    }

    public List<ApplicantDetails> getApplicantDetails(String jobId) {

        try {
            Session currentSession = entityManager.unwrap(Session.class);

            Query query = currentSession.createQuery("From Applicant_Details as a WHERE a.jobId=:jobId",
                    ApplicantDetails.class);
            query.setParameter("jobId",jobId);
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


    public ApplicantDetails fetchPdf(String applicantId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Applicant_Details as a WHERE a.applicantId=:announcementHeadline",
                ApplicantDetails.class);
        query.setParameter("announcementHeadline", applicantId.toUpperCase());
        List<ApplicantDetails> announcementFiles = query.getResultList();
        currentSession.close();
        return announcementFiles.get(0);
    }
    }


