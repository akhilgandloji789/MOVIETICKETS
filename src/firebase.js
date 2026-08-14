import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6qBwPzuJiCmuiECR-2KnUSkv6NxGlPUQ",
  authDomain: "cinenoir-17497.firebaseapp.com",
  projectId: "cinenoir-17497",
  storageBucket: "cinenoir-17497.firebasestorage.app",
  messagingSenderId: "920862476890",
  appId: "1:920862476890:web:6e3ba4942bb5e8195de663",
  measurementId: "G-3HR2E1E883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, analytics };
