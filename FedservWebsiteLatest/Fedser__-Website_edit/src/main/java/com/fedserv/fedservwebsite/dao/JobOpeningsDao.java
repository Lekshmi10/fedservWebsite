package com.fedserv.fedservwebsite.dao;

import com.fedserv.fedservwebsite.model.JobOpenings;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JobOpeningsDao {
    @Autowired
    EntityManager entityManager;

    public String addJobOpenings(JobOpenings jobOpenings) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            currentSession.saveOrUpdate(jobOpenings);
            currentSession.close();
            return "true";
        } catch (Exception e) {
            return "false";
        }
    }

    public String getJobId() {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("From Job_Openings as j ORDER BY j.id desc",
                    JobOpenings.class);
            List<JobOpenings> list = query.getResultList();
            if (!list.isEmpty()) {
                String id = list.get(0).getJobId();
                String[] results = id.split("FS");
                currentSession.close();
                return results[1];
            } else {
                return "0";
            }
        } catch (Exception e) {
            return "0";
        }
    }

    public List<JobOpenings> getJobOpenings(String department) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);

            Query query = currentSession.createQuery("From Job_Openings as j WHERE j.jobType=:jobType AND j.openingStatus=:openingStatus",
                    JobOpenings.class);
            query.setParameter("jobType", department);
            query.setParameter("openingStatus", "ACTIVE");
            List<JobOpenings> list = query.getResultList();

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

    public String changeJobStatus(String jobId) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("UPDATE Job_Openings AS g set g.openingStatus=:openingStatus WHERE g.jobId=:jobId");
            query.setParameter("openingStatus", "CLOSED");
            query.setParameter("jobId", jobId);
            query.executeUpdate();

            currentSession.close();
            return "true";
        } catch (Exception e) {
            return "false";
        }

    }


}
