
package com.fedserv.fedservwebsite.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.Serializable;


@Entity(name = "Applicant_Details")
@Table(name="Applicant_Details")
public class ApplicantDetails {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "applicant_generator")
    @SequenceGenerator(name = "applicant_generator", sequenceName = "applicant_generatorr_seq", allocationSize = 1)
    int id;
    @Column(name = "FIRSTNAME")
    private String firstName;
    @Column(name = "LASTNAME")
    private String lastName;

    @Column(name = "EMAILID")
    private String emailId;
    @Column(name = "MOBILENUMBER")
    private String mobileNumber;
    @Column(name = "RESUME")
    @Lob
    private byte[] resume;
    @Column(name = "JOBID")
    private String jobId;

    @Column(name = "ApplicantId")
    private String applicantId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public byte[] getResume() {
        return resume;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
    }

    public String getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(String applicantId) {
        this.applicantId = applicantId;
    }
}



