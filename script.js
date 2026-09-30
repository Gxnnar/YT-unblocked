submit.onclick = () => {
    link = url.value.trim();

    // 1. Regular expression to look for a valid 11-character YouTube ID
    // It scans for v=ID, shorts/ID, embed/ID, youtu.be/ID, or just a raw ID string
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = link.match(regExp);
    
    var finalId = '';
    
    if (match && match[2].length === 11) {
        finalId = match[2];
    } else if (link.length === 11) {
        // Fallback for raw 11-character IDs
        finalId = link;
    }

    // 2. Build and mount the player only if we successfully found a real 11-char ID
    if (finalId) {
        if (document.getElementById('instructions')) {
            document.getElementById('instructions').remove();
        }
        
        video_holder = document.getElementById('video-holder').cloneNode(true);
        video_holder.style.display = 'block';
        video_holder.children[1].src = base + finalId + end;
        video_holder_holder.appendChild(video_holder);
    } else {
        // If it's a google.com/goto link or any other invalid format, show a clean message
        alert('❌ Invalid Link! If you copied this from Google Search results, please click open the video first, then copy the URL directly from the address bar.');
    }
}
