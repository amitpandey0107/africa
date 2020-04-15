// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
firebase.initializeApp({
  apiKey: "AIzaSyA59tYpK8vsvHhd2v_1446_OGlcreNP52o",
  authDomain: "africa-smb.firebaseapp.com",
  databaseURL: "https://africa-smb.firebaseio.com",
  projectId: "africa-smb",
  storageBucket: "africa-smb.appspot.com",
  messagingSenderId: "849601472659",
  appId: "1:849601472659:web:4be93f2a1fea731eac0566",
  measurementId: "G-PNQK1E4T40"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const sender = JSON.parse(payload.data.message);
  const notificationTitle = 'New CometChat message';
  const notificationOptions = {
    body: payload.data.alert,
    icon: sender.data.entities.sender.entity.avatar, 
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
