# Video Processing Pipeline

A scalable backend video processing pipeline built with **Node.js**, **Express**, **BullMQ**, **Redis**, **FFmpeg**, and **FFprobe**.

The application uploads videos, processes them asynchronously, generates metadata, thumbnails, multiple resolutions, HLS streaming files, and exposes APIs to monitor processing status.

---

 Features

- Upload MP4 videos
- Background processing using BullMQ
- Redis-based job queue
- FFprobe metadata extraction
- Thumbnail generation
- 360p transcoding
- 720p transcoding
- HLS streaming generation
- Job status tracking
- REST APIs
- Simple frontend demo

---

 Tech Stack

- Node.js
- Express.js
- Redis
- BullMQ
- FFmpeg
- FFprobe
- Multer
- UUID
- HTML / JavaScript

---

 Project Structure

src/
├── config/
├── controllers/
├── middleware/
├── queues/
├── routes/
├── services/
├── store/
├── utils/
├── app.js
└── server.js

---

 Installation

 Clone

git clone <repository>

cd Video-pipeline

 Install

npm install

 Start Redis

docker run -d --name redis -p 6379:6379 redis

 Start Backend

npm run dev

 Start Worker

node src/queues/videoWorker.js

To clear queue run this command on terminl once :  node clearQueue.js



 API Endpoints

POST /videos

Upload Video

GET /videos/:id/status

Get Processing Status

GET /videos/:id/metadata

Get Metadata

GET /videos/:id/thumbnail

Get Thumbnail

DELETE /videos/:id

Delete Processed Video



 Processing Flow

Upload Video

↓

Queue Job (BullMQ)

↓

Redis

↓

Worker

↓

Metadata

↓

Thumbnail

↓

360p

↓

720p

↓

HLS

↓

Completed


 Future Improvements

- MongoDB integration
- Authentication
- Multiple workers
- S3 Storage
- Progress via WebSockets
- Docker Compose

---

 Author

Ghulam Mohiuddin
