/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_KEY: "AIzaSyAvrGbTRIwENljxLTuMwnxp4mCe8T1V3tQ",
    AUTH_DOMAIN: "leave-management-d9a73.firebaseapp.com",
    PROJECT_ID: "leave-management-d9a73",
    STORAGE_BUCKET: "leave-management-d9a73.appspot.com",
    MESSAGING_SENDER_ID: "104996124804",
    APP_ID: "1:104996124804:web:d1a717a46defd8405fead1",
    MEASUREMENT_ID: "G-5RXZJWSKTE",
  },
};

module.exports = nextConfig
