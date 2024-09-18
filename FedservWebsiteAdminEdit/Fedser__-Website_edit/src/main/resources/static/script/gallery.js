var index;
$(document).ready(function () {
    //Hamburger
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

    // $('.gallery-row').masonry({
    //    // itemSelector: '.grid-item',
    //     columnWidth: '.grid-item',
    //     percentPosition: true
    // });

});
// JavaScript
// Function to make the API call to upload the file
function uploadPhotoToServer(file,index) {
    var data = new FormData();
    data.append("photo", file, file.name); // Use file.name to preserve the original filename

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            //console.log(this.responseText);
        }
    });

    xhr.open("POST", "./api/addGallery?index="+index);
    xhr.send(data);
}

// Function to validate the file and call the API if it's a PDF
// Function to validate the file and call the API if it's an allowed image format
function validateFile(inputElement) {
    const file = inputElement.files[0];

    // Check if a file was selected
    if (file) {
        const fileType = file.type;
        const allowedTypes = ['image/jpeg', 'image/png'];

        // Check if the selected file type is allowed (JPEG or PNG)
        if (!allowedTypes.includes(fileType)) {
            const errorMessage = document.getElementById('photoerror-message');
            errorMessage.style.display = 'block';

            // Clear the file input value to allow selecting another file
            inputElement.value = '';

            // Prevent form submission if you are using this input in a form
            // e.g., Uncomment the following line if it's inside a form:
            // event.preventDefault();
        } else {
            // If the file type is valid, hide the error message (if previously shown)
            const errorMessage = document.getElementById('photoerror-message');
            errorMessage.style.display = 'none';

            // Call the API function to upload the file
            getApi("./api/fetchGalleryIndex", function (response) {
                uploadPhotoToServer(file,response);
            });

            alert("Photo was uploaded sucessfull!...");
            window.location.reload();
        }
    }
}

function createPhotoGallery(photoBase64List) {
    const br = document.createElement('br');
    const populatePhotosDiv = document.getElementById('populate_photos');
    populatePhotosDiv.innerHTML = '';

    // Create the initial photo row
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('photo-row');
    populatePhotosDiv.appendChild(rowDiv);

    for (let i = 0; i < photoBase64List.length; i++) {
        // Create a new div for each photo
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo-item');
        photoDiv.id="photo_"+(i + 1);

        try {
            // Create an image element and set the source to the Base64 URL
            const img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + photoBase64List[i].data; // Assuming the photos are JPEG format
            // img.alt = 'Photo ' + (i + 1);

            // Append the image to the photo div
            photoDiv.appendChild(img);

            // Create the SVG element
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.id="delete_"+photoBase64List[i].indexNumber;
            svg.addEventListener("click",function (response) {

                deletePhoto(this.id);

            })
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("viewBox", "0 0 50 50");
            svg.setAttribute("width", "50px");
            svg.setAttribute("height", "50px");
            svg.classList.add('svg-overlay');

            // Create the path element inside the SVG
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z");
            svg.appendChild(path);

            // Append the SVG to the photo div
            photoDiv.appendChild(svg);

            // Create the delete button element


            // Append the photo div to the current row
            rowDiv.appendChild(photoDiv);

            // Check if we have added 3 photos to the current row
            if ((i + 1) % 3 === 0 && i !== photoBase64List.length - 1) {
                // Create a new row for the next set of photos
                rowDiv = document.createElement('div');
                rowDiv.classList.add('photo-row');
                populatePhotosDiv.appendChild(rowDiv);
                populatePhotosDiv.appendChild(br);
            }
        } catch (error) {
            //console.error('Error creating photo:', error);
        }
    }
}


function fetchGalleryDetails() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // Parse the response as JSON
                const response = JSON.parse(this.responseText);

                // Assuming the response is an array of photo Base64 strings, pass it to the createPhotoGallery function
                createPhotoGallery(response);
            } else {
                //console.error('Error fetching gallery details:', this.status);
            }
        }
    });

    xhr.open("POST", "./api/fetchGalleryDetails");
    xhr.send();
}

// The rest of your code remains unchanged

// Call the function to fetch gallery details and populate the photos on window.onload
window.onload = function() {
    fetchGalleryDetails();
};


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
function deletePhoto(id) {

    var split=id.split("_");
    var index=split[1];

    deleteApi("./api/deletePhoto?index="+index,function (response) {
        if(response === "true"){
           alert("Photo was deleted");
           window.location.reload();
        }else {
            alert("Event failed!! Try after sometime.")
        }
    });

    function deleteApi(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(this.responseText);
            }
        }
        xhr.open('POST', url, true);
        xhr.send('');
    }



}
