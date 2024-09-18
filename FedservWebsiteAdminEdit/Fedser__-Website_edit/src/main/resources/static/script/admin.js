var job_id;
var job_type;
$(document).ready(function () {

    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

});

function jobDetails(jobType) {
    job_type = jobType;
    var main = document.getElementById("current-container");
    main.style.display = "none";
    var temp = document.getElementById("widget");
    temp.style.display = "flex";
}

function viewJobDetails(jobType) {
    //console.log(jobType);
    window.location.href = "/viewJobs?jobType=" + encodeURIComponent(jobType);
}

function submit() {
    getApi("/api/getJobId", function (response) {
        job_id = parseInt(response) + 1;
        postData(job_id);
        document.getElementById("job_title").value = "";
        document.getElementById("job_location").value = "";
        document.getElementById("experience").value = "";
        document.getElementById("qualification").value = "";
        document.getElementById("key_req").value = "";
    });

}

function postData(job_id) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var date = yyyy + '-' + mm + '-' + dd;
    //console.log("date", date);


    const job_title = document.getElementById("job_title").value;
    const job_location = document.getElementById("job_location").value;
    const experience = document.getElementById("experience").value;
    const qualification = document.getElementById("qualification").value;
    const key_req = document.getElementById("key_req").value;


    //console.log(job_title);
    var data = JSON.stringify({
        "jobId": "FS" + job_id,
        "jobType": job_type,
        "jobTitle": job_title,
        "keyRequirements": key_req,
        "experience": experience,
        "qualification": qualification,
        "openingStatus": "ACTIVE",
        "entryDate": date,
        "location": job_location
    });

    postApi("/api/addJobOpenings", data, function (response, status) {

        if (status == 200) {
            alert("Job Details added Successfully")
        } else {
            alert("Please check all details")
        }
    });


}

// GET
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

//POST
function postApi(url, reqBody, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(this.responseText, this.status);
        }
    }

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(reqBody);
}


function validation() {

    $('.validate-text').remove();

    var title = document.getElementById("job_title").value;
    var location = document.getElementById("job_location").value;
    var experience = document.getElementById("experience").value;
    var qualification = document.getElementById("qualification").value;
    var requirements = document.getElementById("key_req").value;

    if (title === "" || location === "" || experience === "" || qualification === "" || requirements === "") {
        if (title === "") {
            createValidationMessage("first_row", "Please enter Job Title", "job_title");
        } else if (!/^[A-Za-z]+$/.test(title)) {
            createValidationMessage("first_row", "Job Title should contain only alphabetic characters", "job_title");
        }
        if (location === "") {
            createValidationMessage("second_row", "Please enter Job Location", "job_location");
        } else if (!/^[A-Za-z]+$/.test(location)) {
            createValidationMessage("second_row", "Job Location should contain only alphabetic characters", "job_location");
        }
        if (experience === "") {
            createValidationMessage("third_row", "Please enter Job Experience", "experience");
        } else if (!/^\d+$/.test(experience)) {
            createValidationMessage("third_row", "Job Experience should contain only numbers", "experience");
        }
        if (qualification === "") {
            createValidationMessage("fourth_row", "Please enter Job Qualification", "qualification");
        }
        if (requirements === "") {
            createValidationMessage("fifth_row", "Please enter Job Requirements", "key_req");
        }
    } else {
        submit();
    }
}


function createValidationMessage(containerId, errorMessage, inputId) {
    var container = document.getElementById(containerId);

    var existingMessage = container.querySelector('.validate-text');
    if (existingMessage) {
        container.removeChild(existingMessage);
    }

    var span = document.createElement("span");
    span.className = "validate-text";
    span.innerHTML = errorMessage;

    container.appendChild(span);

    var inputElement = document.getElementById(inputId);
    inputElement.addEventListener("input", function () {
        var existingMessage = container.querySelector('.validate-text');
        if (existingMessage) {
            container.removeChild(existingMessage);
        }
    });
}

function viewOtherApplicants() {
    window.location.href = "/viewOtherApplicants";
}