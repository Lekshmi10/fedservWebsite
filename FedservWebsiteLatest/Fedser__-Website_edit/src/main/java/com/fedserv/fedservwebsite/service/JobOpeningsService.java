package com.fedserv.fedservwebsite.service;

import com.fedserv.fedservwebsite.dao.JobOpeningsDao;
import com.fedserv.fedservwebsite.model.JobOpenings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobOpeningsService {

    @Autowired
    JobOpeningsDao jobOpeningsDao;
    @Transactional
    public String addJobOpenings(JobOpenings jobOpenings) {
        return jobOpeningsDao.addJobOpenings(jobOpenings);
    }


    public String getJobId() {
        return jobOpeningsDao.getJobId();

    }

    public List<JobOpenings> getJobOpenings(String department) {
        return jobOpeningsDao.getJobOpenings(department);
    }

    @Transactional
    public String changeJobStatus(String jobId) {

        return jobOpeningsDao.changeJobStatus(jobId);
    }
}
