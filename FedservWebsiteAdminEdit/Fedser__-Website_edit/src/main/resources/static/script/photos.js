$(document).ready(function () {
    // Hamburger menu toggle
    $('.hamburger, .close-navigation').click(function (e) {
        e.preventDefault();
        $('#navigation-widget').slideToggle();
    });

    // Function to create a gallery item
    function createGalleryItem(imageData) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const link = document.createElement('a');
        link.setAttribute('data-fancybox', 'gallery');

        // Convert the byte array to a Base64 data URL for the image source
        const imageSrc = 'data:image/jpeg;base64,' + imageData.data;

        link.setAttribute('href', imageSrc);

        const image = document.createElement('img');
        image.classList.add('dep-img');
        image.setAttribute('src', imageSrc);
        image.setAttribute('alt', imageData.alt);

        link.appendChild(image);
        galleryItem.appendChild(link);

        return galleryItem;
    }

    // Function to populate the gallery with data
    function populateGallery(galleryData) {
        //console.log(galleryData[0].data);
        const populatePhotosDiv = document.getElementById('populate_photos');

        galleryData.forEach((imageData) => {
            const galleryItem = createGalleryItem(imageData);
            populatePhotosDiv.appendChild(galleryItem);
        });
    }

    // Function to fetch gallery details
    function fetchGalleryDetails() {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // Parse the response as JSON
                    const response = JSON.parse(this.responseText);

                    // Assuming the response is an array of objects with "data" and "indexNumber" properties,
                    // pass it to the populateGallery function
                    populateGallery(response);
                } else {
                    //console.error('Error fetching gallery details:', this.status);
                }
            }
        });

        xhr.open("POST", "./api/fetchGalleryDetails");
        xhr.send();
    }

    // Fetch gallery details when the page loads
    window.onload = function() {
        fetchGalleryDetails();
    };
});
