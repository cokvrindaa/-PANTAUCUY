// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Konfigurasi Firebase (ISI DENGAN DATA KALIAN)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRefLed1 = ref(db, "toggleState");
const dbRefLed2 = ref(db, "toggleState2");
const dhtRef = ref(db, "dht");
const kelembapanRef = ref(db, "kelembapan");
const cahayaRef = ref(db, "cahaya");
const apiRef = ref(db, "api");
// Ambil elemen yang sesuai dengan HTML
const button1 = document.getElementById("toggleBtn");
const led1gam = document.getElementById("ledgamsatu");
const button2 = document.getElementById("toggleBtn2");
const led2gam = document.getElementById("ledgamdua");
const suhu = document.getElementById("suhu");
const kelembapan = document.getElementById("kelembapan");
const cahaya = document.getElementById("cahaya");
const api = document.getElementById("api");
const statuscahaya = document.getElementById("statuscahaya");
// Ambil data dari Firebase saat halaman dimuat
get(dbRefLed1)
  .then((snapshot) => {
    let state = snapshot.exists() ? snapshot.val() : 1;

    button1.textContent = `Hidupkan`;

    // Update tampilan awal berdasarkan state dari Firebase
    if (state === 1) {
      button1.style.backgroundColor = "red";
      led1gam.src = "./image/led-on.png";

      button1.textContent = `Matikan`;
    } else {
      button1.style.backgroundColor = "";
      led1gam.src = "./image/led-off.png";
      button1.textContent = `Hidupkan`;
    }

    // Event Klik untuk mengubah angka
    button1.addEventListener("click", () => {
      if (state === 1) {
        state = 0;
        button1.style.backgroundColor = "";
        led1gam.src = "./image/led-off.png";
        button1.textContent = `Hidupkan`;
      } else {
        state = 1;
        button1.style.backgroundColor = "red";
        led1gam.src = "./image/led-on.png";
        button1.textContent = `Matikan`;
      }

      // Simpan ke Firebase
      set(dbRefLed1, state)
        .then(() => {
          console.log("Data berhasil diperbarui:", state);
        })
        .catch((error) => console.error("Gagal mengupdate data:", error));
    });
  })
  .catch((error) => {
    console.error("Error mengambil data dari Firebase:", error);
    button.textContent = "Error!";
  });

// Ambil data dari Firebase saat halaman dimuat
get(dbRefLed2)
  .then((snapshot) => {
    let state = snapshot.exists() ? snapshot.val() : 1;

    button2.textContent = `Hidupkan`;

    // Update tampilan awal berdasarkan state dari Firebase
    if (state === 1) {
      button2.style.backgroundColor = "red";
      led2gam.src = "./image/led-on.png";

      button2.textContent = `Matikan`;
    } else {
      button2.style.backgroundColor = "";
      led2gam.src = "./image/led-off.png";
      button2.textContent = `Hidupkan`;
    }

    // Event Klik untuk mengubah angka
    button2.addEventListener("click", () => {
      if (state === 1) {
        state = 0;
        button2.style.backgroundColor = "";
        led2gam.src = "./image/led-off.png";
        button2.textContent = `Hidupkan`;
      } else {
        state = 1;
        button2.style.backgroundColor = "red";
        led2gam.src = "./image/led-on.png";
        button2.textContent = `Matikan`;
      }

      // Simpan ke Firebase
      set(dbRefLed2, state)
        .then(() => {
          console.log("Data berhasil diperbarui:", state);
        })
        .catch((error) => console.error("Gagal mengupdate data:", error));
    });
  })
  .catch((error) => {
    console.error("Error mengambil data dari Firebase:", error);
    button.textContent = "Error!";
  });
onValue(dhtRef, (snapshot) => {
  let value = snapshot.val();
  console.log(`Suhu: ${value}`);
  suhu.innerText = `${value} %`;
});
onValue(kelembapanRef, (snapshot) => {
  let value = snapshot.val();
  console.log(`Kelembapan: ${value}`);
  kelembapan.innerText = `${value} %`;
});
onValue(cahayaRef, (snapshot) => {
  let value = snapshot.val();
  if (value <= 40) {
    statuscahaya.innerText = "Gelap";
  }
  if (value >= 40 && value <= 180) {
    statuscahaya.innerText = "Sedang";
  }
  if (value >= 180) {
    statuscahaya.innerText = "Terang";
  }
  console.log(`cahaya: ${value}`);
  cahaya.innerText = `${value} R`;
});
onValue(apiRef, (snapshot) => {
  let value = snapshot.val();
  console.log(`api: ${value}`);
  api.innerText = `${value} %`;
});
