var job_id=null;
window.addEventListener("load",function () {

    getApi("./api/getOtherApplicantDetails",function (response) {

        let value=JSON.parse(response);
      //  //console.log(response)

        if (value.length == 0) {
            var openings = document.getElementsByClassName("current-opening");
            if (openings.length > 0) {
                var opening = openings[0]; // Access the first element with the class "current-opening"
                var pCareer = document.createElement("p");
                pCareer.className = "pCareer";
                pCareer.innerHTML = "Currently, No Applicants are available!!!";
                opening.appendChild(pCareer);
            }

            var currentContainer = document.getElementById("current-container");
            currentContainer.style.visibility = "hidden";
        }

        else{
            applicantDetails(value);
        }
    });

})

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

function applicantDetails(response){

    var tbody=document.getElementById("applicant-details");
    for(let j=0;j<response.length;j++){

        var tr=document.createElement("tr");
        var td=document.createElement("td");
        td.id="applicantid_"+j;
        td.innerHTML=response[j].applicantId;

        var tdfname=document.createElement("td");
        // tdfname.className="fname";
        tdfname.innerHTML=(response[j].firstName)+" "+(response[j].lastName);

        var tdemail=document.createElement("td");
        //  tdemail.className="email";
        tdemail.id="email_"+j;
        tdemail.innerHTML=response[j].emailId;


        var tdmobile=document.createElement("td");
        // tdmobile.className="mobile";
        tdmobile.innerHTML=response[j].mobileNumber;

        var tdviewedDate=document.createElement("td");
        tdviewedDate.className="viewed_date";


        var tdviewedDate=document.createElement("td");
        tdviewedDate.className="viewed_date";
        tdviewedDate.id='viewedDate_' + j;

        var viewedDate = response[j].viewedDate;
        tdviewedDate.innerHTML = viewedDate;

        var tdButton=document.createElement("td");
        tdButton.className="actions";

        var a=document.createElement("a");
        a.className="view-btn";
        a.id="applicantview_"+j;
        a.innerText="View Resume";
        a.target="_blank";
        a.href = "./api/getOtherApplicantResume?applicantId=" + response[j].applicantId;


        a.addEventListener("click", function () {
            updateOthersViewedDate(this.id);

        });

        //reject code

        // Create a "Reject" button
        var tdRejectButton=document.createElement("td");
        tdRejectButton.className="actions";
        var rejectButton = document.createElement("button");
        rejectButton.className = "reject-btn";
        rejectButton.id = "applicantreject_" + j;
        rejectButton.innerText = "Reject";

        // Add event listener to the "Reject" button to handle rejection
        rejectButton.addEventListener("click", function () {
            // Log the email and applicant ID when the "Reject" button is clicked
            ApplicantRejection(this.id);
        });


        tdRejectButton.appendChild(rejectButton);
        //end


        tdButton.appendChild(a);
        tr.appendChild(td);
        tr.appendChild(tdfname);
        tr.appendChild(tdemail);
        tr.appendChild(tdmobile);
        tr.appendChild(tdviewedDate)
        tr.appendChild(tdButton);
        //reject code
        tr.appendChild(tdRejectButton);
        //end
        tbody.appendChild(tr);


    }
}

$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

});
//rejection code

function ApplicantRejection(id) {
    var splitId = id.split("_");
    var idNum = splitId[1];
    var subject = "Regarding Your Recent Job Application at Fedserv";
    var applicatId = document.getElementById("applicantid_" + idNum).innerText;
    var mailId = document.getElementById("email_" + idNum).innerText;
    var message = document.getElementById("mail").innerHTML; // Assuming you have an element with id "mail"

    //console.log("applicatId", applicatId);
    //console.log("mailId", mailId);

    getApi("./api/deleteOtherApplicantDetails?applicantId=" + applicatId, function (response) {
        //console.log("response is", response);
    });

    getApi("./api/sendOtherMail?toEmail=" + mailId + "&subject=" + subject + "&message=" + encodeURIComponent(message), function (response) {
        //console.log("response is", response);
        if (response == "Success") {
            alert("Rejection mail Sent");
        } else {
            alert("Technical Error, please try again");
        }
    });
    window.location.reload();
}
function exportTableToExcel(data,deploymentUrl) {
    if (data.length === 0) {
        var openings = document.getElementsByClassName("current-opening");
        if (openings.length > 0) {
            var opening = openings[0];
            var pCareer = document.createElement("p");
            pCareer.className = "pCareer";
            pCareer.innerHTML = "Currently, No Applicants are available!!!";
            opening.appendChild(pCareer);
        }

        var currentContainer = document.getElementById("current-container");
        currentContainer.style.visibility = "hidden";
    } else {
        // Create a new workbook
        var wb = XLSX.utils.book_new();

        var worksheetData = data.map(function (applicant, index) {
            var rowKey = 'viewedDate_' + index;
            var viewedDate = localStorage.getItem(rowKey);
            var formattedDate = '';

            if (viewedDate) {
                // Parse and format the date as needed
                var date = new Date(viewedDate);
                formattedDate = (date.getDate() < 10 ? '0' : '') + date.getDate() + '/' +
                    ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
            }

            return {
                "Applicant ID": applicant.applicantId,
                "Name": applicant.firstName + " " + applicant.lastName,
                "Email ID": applicant.emailId,
                "Mobile Number": applicant.mobileNumber,
                "Viewed Date": formattedDate,
                "Resume": {
                    t: "s",
                    v: "View Resume",
                    l: {
                        Target: deploymentUrl+"/api/getOtherApplicantResume?applicantId=" + applicant.applicantId,
                        Tooltip: "Click to view resume"
                    }
                }
            };
        });
        var worksheet = XLSX.utils.json_to_sheet(worksheetData);

        var styles = {
            header: {
                font: { bold: true, color: { rgb: 'FFFFFF' } },
                fill: { fgColor: { rgb: '2E75B6' } },
                alignment: { horizontal: 'center' },
            },
            cell: {
                font: { size: 12 },
                alignment: { horizontal: 'left' },
                fill: { fgColor: { rgb: 'FFFFFF' } },
                border: { top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } },
            },
        };
        worksheet["!cols"] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 20 },
            { wch: 30 },
        ];

        var headers = Object.keys(worksheetData[0]);
        headers.forEach(function (header, colIndex) {
            var cellAddress = { c: colIndex, r: 1 };
            worksheet[cellAddress] = { v: header, s: styles.header };
        });

        worksheetData.forEach(function (row, rowIndex) {
            Object.keys(row).forEach(function (colName, colIndex) {
                var cellAddress = { c: colIndex, r: rowIndex + 2 };
                var cellValue = row[colName];
                worksheet[cellAddress] = { v: cellValue, s: styles.cell };
            });
        });

        XLSX.utils.book_append_sheet(wb, worksheet, "Applicant Data");

        XLSX.writeFile(wb, "Other Applicants Data.xlsx");
    }
}
function exportAllData() {

    getApi("./api/getDeploymentUrl", function (response) {
        const deploymentUrl = response;
        getApi(`./api/getOtherApplicantDetails`, function (response) {
            const value = JSON.parse(response);
            exportTableToExcel(value, deploymentUrl);
        });
    });
}
function updateOthersViewedDate(id){
    var splitId=id.split("_")
    var num=splitId[1];
    var viewapplicantId=document.getElementById("applicantid_"+num).innerText;
    var currentDate = new Date();
    var day = currentDate.getDate().toString().padStart(2, '0');
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var year = currentDate.getFullYear();
    var dateString = day + '/' + month + '/' + year;
    postApi("./api/updateOthersViewedDate?applicantId="+viewapplicantId+"&viewedDate="+dateString,function (response) {
        console.log("repsonse is",response)
        window.location.reload();
    })
}
function postApi(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(this.responseText);
        }
    }
    xhr.open('POST', url, true);
    xhr.send('');
}