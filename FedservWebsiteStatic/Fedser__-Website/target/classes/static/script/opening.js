var applicant_id;
var depArray = [];

$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });
});

window.onload = function () {


    var dept_name = localStorage.getItem("DEPT");
    console.log("dept", dept_name);

    if (localStorage.getItem("DEPT") === null) {
        window.location.href = "/career";
    } else {
        if (dept_name == "CONTACT_CENTER") {

            dept_name = "CONTACT_CENTER";
        }
        getApi("./api/getJobOpenings?department=" + dept_name, function (response) {
            depArray = JSON.parse(response);
            document.getElementById("dept_heading").innerText = dept_name + " Department";
            document.getElementById("active_dept").innerText = dept_name + "Department";

            if(depArray.length==0){

                let career_display=document.getElementById("career_display");
                let pCareer=document.createElement("p");
                pCareer.className="pCareer"
                pCareer.innerHTML="Currently,No jobs are available!!!"
                career_display.append(pCareer);

            }else{

                console.log("deptArray", depArray)
                populateJobs(depArray, dept_name);
            }



        })
    }

};


function populateJobs(depArray, dept_name) {
    var split_key = [];
    var main = document.getElementById("career_display")


    for (let j = 0; j < depArray.length; j++) {
        console.log("depArray", depArray)


        var career_div = document.createElement("div");
        career_div.className = "career-opening";
        career_div.id="career_"+j;
        var container = document.createElement("div");
        container.className = "container";

        var jobTitle = document.createElement("h2");
        jobTitle.className = "template-title"
        jobTitle.innerHTML = depArray[j].jobTitle;

        var pJob=document.createElement("p");
        pJob.innerText="jobID";
        pJob.id="job_ID";
        var paraJobID = document.createElement("p");

        paraJobID.innerHTML=depArray[j].jobId;
        paraJobID.id="mainJobId_"+j;
        paraJobID.style.display="none"

        var mainID = document.createElement("p");
        mainID.id = "idJob";
        mainID.appendChild(pJob);
        mainID.appendChild(paraJobID);

        var strong = document.createElement("strong");
        strong.innerHTML = "KEY REQUIREMENTS";
        var ul = document.createElement("ul");

        var key_req = depArray[j].keyRequirements;
        split_key = key_req.split(".");
        for (let k = 0; k < split_key.length - 1; k++) {
            var li = document.createElement("li");
            li.innerHTML = split_key[k];
            ul.appendChild(li)
        }
        var job_exp = document.createElement("p");
        job_exp.innerText = "EXPERIENCE :";
        job_exp.id = "job_experience";

        var p = document.createElement("p");
        p.innerHTML = depArray[j].experience;

        var para = document.createElement("p");
        para.id = "exp";
        para.appendChild(job_exp);
        para.appendChild(p);

        /* var p1=document.createElement("p");
         p1.innerHTML="QUALIFICATION :"+depArray[j].qualification;*/

        var job_quali = document.createElement("p");
        job_quali.innerText = "QUALIFICATION :";
        job_quali.id = "job_qualification";

        var p1 = document.createElement("p");
        p1.innerHTML = depArray[j].qualification;

        var para1 = document.createElement("p");
        para1.id = "qua";

        var button = document.createElement("button");
        button.className = "apply_btn";
        button.id="jobapply_"+j;
        button.addEventListener("click",function () {

            PopulateApply(this.id);

        })
        button.innerHTML="Apply now";

        para1.appendChild(job_quali);
        para1.appendChild(p1)

        container.appendChild(jobTitle);
        container.appendChild(strong);
        container.appendChild(ul);
        container.appendChild(paraJobID);
        container.appendChild(para);
        container.appendChild(para1);
        career_div.appendChild(container)

        main.appendChild(career_div);
        main.appendChild(button);



    }


}

function PopulateApply(jobapplyId) {

    var num=jobapplyId.split("_");
    var idNum=num[1];

   // console.log("id",id);
    var br = document.createElement("br");
    var main = document.getElementById("career_"+idNum);
    main.appendChild(br);

    var apply_div = document.createElement("div");
    apply_div.innerHTML = ' <div class="career-form" id="applyform_'+idNum+'" style="background-image: url(../images/upload-img.png);">\n' +
        '            <div class="container">\n' +
        '            <h2 class="template-title">Apply Now</h2>'+
        '           <div class="form-row">\n' +
        '            <div class="inpit-list" id="fname">\n' +
        '            <input class="input-ctrl" type="text" placeholder="First Name" id="firstName_'+idNum+'">\n' +
        '            </div>\n' +
        '            <div class="inpit-list" id="lname">\n' +
        '            <input class="input-ctrl" type="text" placeholder="Last Name" id="lastName_'+idNum+'">\n' +
        '            </div>\n' +
        '            <div class="inpit-list"id="email">\n' +
        '            <input class="input-ctrl" type="text" placeholder="Email Id" id="emailId_'+idNum+'">\n' +
        '            </div>\n' +
        '            <div class="inpit-list" id="number">\n' +
        '            <input class="input-ctrl" type="text" placeholder="Contact Number" id="contactNumber_'+idNum+'">\n' +
        '            </div>\n' +
        '            <div class="inpit-list" id="resume">\n' +
        '            <input class="input-ctrl upload-input" type="file" id="upload-cv_'+idNum+'" onchange="validateFile(this)">'+
        '            <span class="upload-label">Upload CV</span>'+
        '            <div id="pdferror-message">Please upload a PDF file.</div>'+
        '            </div>\n' +
        '            <br>\n'+
        '           <div class="sub_btn">\n' +
        '           <button type="submit" class="form-submit" id="send_'+idNum+'" onclick="sendApplicationValidation(this.id)">Send Application</button>\n' +
        '           <button type="submit" class="form-cancel" id="cancel_'+idNum+'" onclick="cancel(this.id)">Cancel</button>\n' +
        '           </div>\n' +
        '           </div>\n' +
        '           </div>\n' +
        '           </div>';


    // sendApplicationValidation(this.id)

    main.appendChild(apply_div);
    main.appendChild(br);
    main.appendChild(br);

    var applyid=document.getElementById(jobapplyId);
    applyid.style.display="none";

}

function send(idNum){
    getApi("/api/getApplicantId", function (response) {
        applicant_id=parseInt(response)+1;
        console.log("id",applicant_id)
        sendApplication(idNum,applicant_id);
        alert("Job Applied Successfully");
        clearFields(idNum);
    });

}

function clearFields(idNum) {
    var sendNum = idNum.split("_");
    var sendid = sendNum[1];
    var firstName = document.getElementById('firstName_' + sendid);
    var lastName = document.getElementById('lastName_' + sendid);
    var email = document.getElementById('emailId_' + sendid);
    var contactNum = document.getElementById('contactNumber_' + sendid);
    var resume = document.getElementById('upload-cv_' + sendid);

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    contactNum.value = "";
    resume.value = ""; // Assuming this is the file input element, setting value to an empty string will clear the selected file
}

function cancel(idNum) {


    var num=idNum.split("_");
    var appid=num[1];


    var id=document.getElementById('applyform_'+appid);
   if(id){
       id.remove();
   }
    var applyid = document.getElementById('jobapply_' + appid);
    applyid.style.display="block";

}

function sendApplication(idNum , applicant_id) {


    var sendNum=idNum.split("_");
    var sendid=sendNum[1];

    var firstName=document.getElementById('firstName_'+sendid);
    var lastName=document.getElementById('lastName_'+sendid);
    var email=document.getElementById('emailId_'+sendid);
    var contactNum=document.getElementById('contactNumber_'+sendid);
    var resume=document.getElementById('upload-cv_'+sendid);
   var jobId=document.getElementById("mainJobId_"+sendid).innerText;

   console.log("jobid",jobId);

    var formData = new FormData();

    formData.append("resume",resume.files[0]);
    var content = '<a id="a"><b id="b">hey!</b></a>';
    var blob = new Blob([content], {type: "multipart/form-data"});
    formData.append("resumefile", blob);
    var request = new XMLHttpRequest();

    request.open("POST", "/api/addApplicantDetails?firstName="+firstName.value+"&lastName="+lastName.value+"&emailId="+email.value+"&mobileNumber="+contactNum.value+"&jobId="+jobId+"&applicantId=AP"+applicant_id);
    request.send(formData);

}




function sendApplicationValidation(idNum) {
    $('.validate-text').remove();

    var sendNum = idNum.split("_");
    var sendid = sendNum[1];
    var applicant_id= document.getElementById("mainJobId_"+sendid).innerText;
    var firstName = document.getElementById('firstName_' + sendid);
    var lastName = document.getElementById('lastName_' + sendid);
    var email = document.getElementById('emailId_' + sendid);
    var contactNum = document.getElementById('contactNumber_' + sendid);
    var resume = document.getElementById('upload-cv_' + sendid);

    firstName.addEventListener('input', removeErrorMessage);
    lastName.addEventListener('input', removeErrorMessage);
    email.addEventListener('input', removeErrorMessage);
    contactNum.addEventListener('input', removeErrorMessage);
    resume.addEventListener('input', removeErrorMessage);

    if (firstName.value === "" || lastName.value === "" || email.value === "" || contactNum.value === "" || resume.files.length === 0) {

        if (firstName.value === "") {
            displayErrorMessage("Please enter first Name", "fname");
        } else if (!isValidAlphabetic(firstName.value)) {
            displayErrorMessage("First Name should only contain alphabets", "fname");
        }
        if (lastName.value === "") {
            displayErrorMessage("Please enter last Name", "lname");
        }
        else if (!isValidAlphabetic(lastName.value)) {
            displayErrorMessage("Last Name should only contain alphabets", "lname");
        }
        if (email.value === "") {
            displayErrorMessage("Please enter Email id", "email");
        }
        if (contactNum.value === "") {
            displayErrorMessage("Please enter contact Number", "number");
        }
        if (resume.files.length === 0) {
            document.getElementById("pdferror-message").style.display="none";
            displayErrorMessage("Please upload Resume", "resume");
        }
    } else {
        if (!isValidContactNumber(contactNum.value)) {
            displayErrorMessage("Please enter a valid contact Number", "number");
        }else if(!isValidEmail(email.value)) {
            displayErrorMessage("Please enter a valid Email id", "email");
        }else{
            send(idNum);
        }
    }
}

function displayErrorMessage(message, elementId) {
    var span = document.createElement("span");
    span.id = "name_error";
    span.className = "validate-text";
    span.innerHTML = message;
    var main = document.getElementById(elementId);
    main.appendChild(span);
}

function removeErrorMessage(event) {
    var errorMessage = document.getElementById("name_error");
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidAlphabetic(value) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}
function isValidEmail(value) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
}

function isValidContactNumber(value) {
    var regex = /^\d{10}$/;
    return regex.test(value);
}

function getApi(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(this.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send('');
}
// JavaScript
function validateFile(inputElement) {
    const file = inputElement.files[0];

    // Check if a file was selected
    if (file) {
        const fileType = file.type;
        const allowedTypes = ['application/pdf'];

        // Check if the selected file type is allowed (PDF)
        if (!allowedTypes.includes(fileType)) {
            const errorMessage = document.getElementById('pdferror-message');
            errorMessage.style.display = 'block';

            // Clear the file input value to allow selecting another file
            inputElement.value = '';

            // Prevent form submission if you are using this input in a form
            // e.g., Uncomment the following line if it's inside a form:
            // event.preventDefault();
        } else {
            // If the file type is valid, hide the error message (if previously shown)
            const errorMessage = document.getElementById('pdferror-message');
            errorMessage.style.display = 'none';
        }
    }
}
