importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js");

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgvb-15AvSmci1ENMmh7vv8GlCthMxKak",
    authDomain: "e-nose-notifications.firebaseapp.com",
    projectId: "e-nose-notifications",
    storageBucket: "e-nose-notifications.firebasestorage.app",
    messagingSenderId: "947630755141",
    appId: "1:947630755141:web:9e7828ab9c9f390298022c",
    measurementId: "G-45RQ7XRCQZ"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    });
});
