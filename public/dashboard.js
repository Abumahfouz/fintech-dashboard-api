        // Fetch user details from dashboard API
        fetch('/api/dashboard/summary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Retrieve JWT token from cookieStore after login
                'Authorization': `Bearer ${cookieStore.get('token').value}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dashboard data:', data);
            // Populate dashboard with user data
            document.getElementById('username').textContent = data.user.username;
            document.getElementById('fullname').textContent = data.user.username || 'N/A';
            document.getElementById('email').textContent = data.user.email;
            document.getElementById('balance').textContent = '$' + data.summary.balance.toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
        });