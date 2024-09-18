var job_type = null;

$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

});


window.addEventListener("load", function () {
    job_type = getAllUrlParams(window.location.href)["jobtype"];
    //console.log("type is", job_type);
    var split=job_type.split("-");
    var job=split[1];
    showJobDetails(job);
    // Perform further actions or make an API request with the job_type value



    getApi("./api/getJobOpenings?department="+job.toUpperCase(),function (response) {
        //console.log("response",response);
        let parseValue=JSON.parse(response)

        if(parseValue.length==0){
            let opening=document.getElementById("opening");
            let pCareer=document.createElement("p");
            pCareer.className="pCareer"
            pCareer.innerHTML="Currently,No jobs are available!!!";
            opening.append(pCareer);
            var current_container=document.getElementById("current-container");
            current_container.style.visibility="hidden";

        }
        else{
            populateAllJobs(parseValue);
        }
    });

});

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};

    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramName = a[0];
            var paramValue = typeof a[1] === 'undefined' ? true : a[1];

            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            if (paramName.match(/\[(\d+)?\]$/)) {
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
function showJobDetails(job) {
    //console.log("job details",job);
}

function getApi(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(this.responseText);
        }
    }
    xhr.open('GET', url, false);
    xhr.send('');
}
function populateAllJobs(response) {
    var tbody = document.getElementById("job_details");

    for (let i = 0; i < response.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.id = "jobid_" + i;
        td.innerHTML = response[i].jobId;
        var tdTitle = document.createElement("td");
        tdTitle.className = "title";
        tdTitle.innerHTML = response[i].jobTitle;
        var tdButton = document.createElement("td");
        tdButton.className = "actions";
        var b1 = document.createElement("button");
        b1.className = "view-btn";
        b1.id = "view_" + i;
        b1.addEventListener("click", function () {
            viewApplicants(this.id);
        });
        b1.innerText = "View";

        // Check if the openingStatus is 'ACTIVE' and create the "Close" button if it is
        if (response[i].openingStatus === 'ACTIVE') {
            var b2 = document.createElement("button");
            b2.className = "close-btn";
            b2.id = "close_" + i;
            b2.addEventListener("click", function () {
                closeJob(this.id);
            });
            b2.innerText = "Close";
            tdButton.appendChild(b1);
            tdButton.appendChild(b2);
        } else {
            tdButton.appendChild(b1);
        }

        tr.appendChild(td);
        tr.appendChild(tdTitle);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    }
}



function viewApplicants(id){
    var split=id.split("_");
    var idNum=split[1];
    var jobid=document.getElementById("jobid_"+idNum).innerHTML;

    window.location.href="/viewApplicants?jobId="+jobid;


}
function closeJob(id){

    var split=id.split("_");
    var idNum=split[1];
    var jobid=document.getElementById("jobid_"+idNum).innerHTML;
    getApi("./api/changeJobStatus?jobId="+jobid+"&openingStatus=",function (response) {
        location.reload();
        alert("Job closed successfully");

    });



}