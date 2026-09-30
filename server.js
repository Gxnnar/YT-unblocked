const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve your existing web app frontend files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// The endpoint your frontend script.js talks to
app.post('/api/resolve-google-link', async (req, res) => {
    const { googleUrl } = req.body;
    
    if (!googleUrl) {
        return res.status(400).json({ success: false, error: 'No URL provided' });
    }
    
    try {
        // Send a request to Google without automatically following the redirect chain
        const response = await fetch(googleUrl, {
            method: 'GET',
            redirect: 'manual', 
            headers: {
                'Referer': 'https://google.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Intercept the final location path from the HTTP redirect header
        const realUrl = response.headers.get('location');

        if (realUrl) {
            return res.json({ success: true, realUrl: realUrl });
        } else {
            return res.status(400).json({ success: false, error: 'Redirect location header missing' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// Run the web app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
