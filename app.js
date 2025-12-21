// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDArQkJaFoPMQeOoHi1LQPB2Umm4LS8oK8",
  authDomain: "to-1-chat-a9582.firebaseapp.com",
  databaseURL: "https://to-1-chat-a9582-default-rtdb.firebaseio.com",
  projectId: "to-1-chat-a9582",
  storageBucket: "to-1-chat-a9582.appspot.com",
  messagingSenderId: "382335872296",
  appId: "1:382335872296:web:7f7d13223f1787118df41d"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

// LOGIN
window.login = function () {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  ).catch(err => alert(err.message));
};

// LOGOUT
window.logout = function () {
  auth.signOut();
};

// AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    loginBox.style.display = "none";
    chatBox.style.display = "block";

    messages.innerHTML = "";
    db.ref("chat").limitToLast(50).on("child_added", snap => {
      const p = document.createElement("div");
      p.className = "msg " + (snap.val().uid === user.uid ? "my" : "other");
      p.innerText = snap.val().text;
      messages.appendChild(p);
      messages.scrollTop = messages.scrollHeight;
    });
  } else {
    loginBox.style.display = "block";
    chatBox.style.display = "none";
  }
});

// SEND MESSAGE
window.sendMsg = function () {
  if (msg.value.trim() !== "") {
    db.ref("chat").push({
      text: msg.value,
      uid: auth.currentUser.uid
    });
    msg.value = "";
  }
};
