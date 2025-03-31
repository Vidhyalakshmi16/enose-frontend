import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCgvb-15AvSmci1ENMmh7vv8GlCthMxKak",
    authDomain: "e-nose-notifications.firebaseapp.com",
    projectId: "e-nose-notifications",
    storageBucket: "e-nose-notifications.firebasestorage.app",
    messagingSenderId: "947630755141",
    appId: "1:947630755141:web:9e7828ab9c9f390298022c",
    measurementId: "G-45RQ7XRCQZ"
  };

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Function to request FCM Token
export const requestForToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, { vapidKey: "BHCx6Kops5Vow3qTpPvkZWgxCL1ZvjeOyNAikrw_bJ6x73L-lwwabING6aGIwqnOrj7d9HR5tkFNrHsBOaNoNqk" });
            if (token) {
                console.log("✅ FCM Token:", token);
                return token;
            } else {
                console.error("❌ Failed to get FCM Token");
                return null;
            }
        } else {
            console.error("❌ Notification permission denied");
            return null;
        }
    } catch (error) {
        console.error("❌ Error getting FCM token:", error);
        return null;
    }
};

// ✅ Listen for incoming messages (foreground notifications)
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("🔔 Notification received:", payload);
            resolve(payload);
        });
    });
