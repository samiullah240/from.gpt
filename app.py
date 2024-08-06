from flask import Flask, request, send_file, render_template, jsonify
from pytube import YouTube
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data['url']
    try:
        yt = YouTube(url)
        stream = yt.streams.get_highest_resolution()
        stream.download(filename='video.mp4')
        return send_file('video.mp4', as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
