const API = '/api/profile/upload-profile';

document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    
    if (!uploadForm) {
        console.error('uploadForm element not found');
        return;
    }
    
    uploadForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.getElementById('profileImage');
        formData.append('profileImage', fileInput.files[0]);

        try {
            const response = await fetch(API, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${cookieStore.get('token')}`
                }
            });

            const result = await response.json();
            if (response.ok) {
                alert('Profile image uploaded successfully!');
            } else {
                alert('Error uploading image: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the image.');
        }
    });
});
