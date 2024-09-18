package com.fedserv.fedservwebsite.model;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Job_Openings")
@Table(name = "Job_Openings")

public class JobOpenings {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_openings_generator")
    @SequenceGenerator(name = "job_openings_generator", sequenceName = "job_openings_generator_seq", allocationSize = 1)
    int id;
    @Column(name = "JOB_ID",unique = true,nullable = false)
    private String jobId;
    @Column(name = "JOB_TYPE")
    private String jobType;
    @Column(name = "JOB_TITLE")
    private String jobTitle;
    @Lob
    @Column(name = "KEY_REQUIREMENTS")
    private String keyRequirements;
    @Column(name = "EXPERIENCE")
    private String experience;
    @Column(name = "QUALIFICATION")
    private String qualification;
    @Column(name = "LOCATION")
    private String location;
    @Column(name = "OPENING_STATUS")
    private String openingStatus;
    @Column(name = "ENTRY_DATE")
    private Date entryDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getKeyRequirements() {
        return keyRequirements;
    }

    public void setKeyRequirements(String keyRequirements) {
        this.keyRequirements = keyRequirements;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getOpeningStatus() {
        return openingStatus;
    }

    public void setOpeningStatus(String openingStatus) {
        this.openingStatus = openingStatus;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
