submit.onclick = async () => {
    link = url.value.trim();

    // 1. Automatically handle Google links by sending them to your backend proxy
    if (link.includes('google.com/goto')) {
        try {
            // Send the link to your own backend API endpoint
            const response = await fetch('/api/resolve-google-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ googleUrl: link })
            });
            const data = await response.json();
            
            if (data.success && data.realUrl) {
                link = data.realUrl; // Overwrite the input link with the resolved YouTube URL!
            } else {
                alert('Could not resolve the Google link automatically.');
                return;
            }
        } catch (error) {
            alert('Server error resolving the link.');
            return;
        }
    }

    // 2. Your regular extraction pattern (Regex or String Splitting)
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = link.match(regExp);
    var finalId = '';
    
    if (match && match[2].length === 11) {
        finalId = match[2];
    } else if (link.length === 11) {
        finalId = link;
    }

    // 3. Mount Player
    if (finalId) {
        if (document.getElementById('instructions')) {
            document.getElementById('instructions').remove();
        }
        video_holder = document.getElementById('video-holder').cloneNode(true);
        video_holder.style.display = 'block';
        video_holder.children[1].src = base + finalId + end;
        video_holder_holder.appendChild(video_holder);
    } else {
        alert('Please enter a valid YouTube link.');
    }
}
