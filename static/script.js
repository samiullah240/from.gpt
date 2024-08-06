document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('download-form');
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      
      const url = document.getElementById('video-url').value;
      console.log('URL:', url); // Debug: Log URL to console
      
      fetch('/download', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
      })
      .then(response => {
          if (response.ok) {
              return response.blob();
          }
          return response.json().then(data => { throw new Error(data.error); });
      })
      .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'video.mp4';
          document.body.appendChild(link); // Append link to body
          link.click(); // Trigger the download
          link.remove(); // Remove the link after download
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('message').innerText = `Error: ${error.message}`;
      });
  });
});
