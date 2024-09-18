$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });
});
function validateVideo(inputElement) {
    const file = inputElement.files[0];
    const errorMessageElement = document.getElementById('errorMessage');


    if (file) {
        const fileType = file.type;
        const allowedTypes = ['video/mp4']; // Add other allowed video formats as needed
        const maxSize = 1 * 1024 * 1024; // 1 MB in bytes

        if (!allowedTypes.includes(fileType)) {
            errorMessageElement.textContent = 'Invalid file type. Please select a valid video file.';
            errorMessageElement.style.display = 'block';


            inputElement.value = '';
        } else if (file.size > maxSize) {
            errorMessageElement.textContent = 'File size exceeds the maximum allowed size (1 MB).';
            errorMessageElement.style.display = 'block';


            inputElement.value = '';
        } else {

            errorMessageElement.style.display = 'none';


            uploadVideoToServer(file);


            alert("Video was uploaded successfully!...");
            window.location.reload();
        }
    } else {

        errorMessageElement.textContent = 'Please select a video file.';
        errorMessageElement.style.display = 'block';
    }
}

window.onload = function() {
    fetchVideoDetails();
};

function uploadVideoToServer(file, index) {
    var data = new FormData();
    data.append("video", file, file.name); // Use file.name to preserve the original filename

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                //console.log("Video uploaded successfully.");
            } else {
                //console.error("Video upload failed with status code: " + this.status);
            }
        }
    });


    xhr.open("POST", "./api/addVideo?" + index);
    xhr.send(data);
}
function createVideoGallery(videoBase64) {
    const br = document.createElement('br');
    const populateVideoDiv = document.getElementById('populate_video');
    populateVideoDiv.innerHTML = '';

    // Create a row for the video
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('video-row');
    populateVideoDiv.appendChild(rowDiv);

    // Create a new div for the video
    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video-item');

    try {
        // Create a video element and set the source to the Base64 URL
        const video = document.createElement('video');
        video.src = 'data:video/mp4;base64,' + videoBase64.data; // Assuming the video is in MP4 format
        video.controls = true; // Add video controls (play, pause, etc.)

        // Append the video to the video div
        videoDiv.appendChild(video);

        // Append the video div to the current row
        rowDiv.appendChild(videoDiv);

            populateVideoDiv.appendChild(br);

    } catch (error) {
        //console.error('Error creating video:', error);
    }
}

function fetchVideoDetails() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Parse the response as JSON
                const response = JSON.parse(this.responseText);

                // Assuming the response is an array of photo Base64 strings, pass it to the createPhotoGallery function
                createVideoGallery(response);
            } else {
                //console.error('Error fetching  details:', this.status);
            }
        }
    });

    xhr.open("POST", "./api/fetchVideoDetails");
    xhr.send();
}

function getApi(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            index=this.responseText
            callback(index);
        }
    }

    xhr.open('GET', url, true);
    xhr.send('');
}