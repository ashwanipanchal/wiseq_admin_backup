
  // Scripts for firebase and firebase messaging
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
 
  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: "AIzaSyA8Pxoag7noGLcWTwGDPl8H3-kGMyz_nXg",
    authDomain: "wiseq-abfae.firebaseapp.com",
    projectId: "wiseq-abfae",
    storageBucket: "wiseq-abfae.appspot.com",
    messagingSenderId: "943921110152",
    appId: "1:943921110152:web:23cc371de361a8e15a133d",
    measurementId: "G-72BMLW09E6"
};
 
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});