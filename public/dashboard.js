        // Fetch user details from dashboard API

        document.addEventListener('DOMContentLoaded', async () => {
        const res = await fetch('/api/dashboard/summary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Retrieve JWT token from cookieStore after login
                'Authorization': `Bearer ${cookieStore.get('token').value}`
            }
        });
        const data = await res.json();
        const image = data.user.profileImage ? `<img src="${data.user.profileImage}" alt="Profile Image" width="150">` : '<div style="width:150px; height:150px; background-color:#ccc; display:flex; align-items:center; justify-content:center; border-radius:50%;">No profile image</div>';
        document.getElementById('profileImg').innerHTML = image;
        console.log('Dashboard data:', data);
        // Populate dashboard with user data
        document.getElementById('username').textContent = data.user.username;
        document.getElementById('fullname').textContent = data.user.username || 'N/A';
        document.getElementById('email').textContent = data.user.email;
        document.getElementById('balance').textContent = '$' + data.summary.balance.toFixed(2);

        const logout = () => {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = '/login.html';
        };
    });
