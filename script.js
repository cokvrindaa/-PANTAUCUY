// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6mnO53Cl1rOGQJIIh-sUUxqM8ScDHPYo",
  authDomain: "myfirebase-ed97c.firebaseapp.com",
  databaseURL: "https://myfirebase-ed97c-default-rtdb.firebaseio.com",
  projectId: "myfirebase-ed97c",
  storageBucket: "myfirebase-ed97c.firebasestorage.app",
  messagingSenderId: "747578865161",
  appId: "1:747578865161:web:10321b582cd0c4ffc8ead8",
  measurementId: "G-8H0TSWB0X0",
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
const slidersatuRef = ref(db, "slidersatu");
const sliderduaRef = ref(db, "sliderdua");
const pompasatuRef = ref(db, "pompasatu");
const pompaduaRef = ref(db, "pompadua");
const autohidupLed1 = ref(db, "autohidupled1");
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
const buttonpompa1 = document.getElementById("togglePomp1");
const buttonpompa2 = document.getElementById("togglePomp2");
const gampompa1 = document.getElementById("pompgam1");
const gampompa2 = document.getElementById("pompgam2");

let slidersatu = document.getElementById("slidersatu");
let tampilslider = document.getElementById("tampilslider");
tampilslider.innerHTML = slidersatu.value;

let sliderdua = document.getElementById("sliderdua");
let tampilsliderdua = document.getElementById("tampilsliderdua");
tampilsliderdua.innerHTML = sliderdua.value;

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
  suhu.innerText = `${value} °C`;
});
onValue(kelembapanRef, (snapshot) => {
  let value = snapshot.val();
  console.log(`Kelembapan: ${value}`);
  kelembapan.innerText = `${value} %`;
});
onValue(cahayaRef, (snapshot) => {
  let value = snapshot.val();
  if (value <10) {
    statuscahaya.innerText = "Gelap ++";
  }
  if ( value > 10 && value <= 40 ) {
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
// Ambil data dari Firebase untuk slider satu saat halaman dimuat
get(slidersatuRef).then((snapshot) => {
  let value = snapshot.exists() ? snapshot.val() : 50;
  slidersatu.value = value;
  tampilslider.innerHTML = value;

  // Update nilai slider di Firebase setiap kali slider digeser
  slidersatu.oninput = function () {
    tampilslider.innerHTML = this.value;

    // Simpan nilai slider ke Firebase
    set(slidersatuRef, parseInt(this.value, 10))
      .then(() => {
        console.log("Data slider berhasil diperbarui:", this.value);
      })
      .catch((error) => console.error("Gagal mengupdate data slider:", error));
  };
});

// Sinkronisasi real-time slider satu dengan Firebase
onValue(slidersatuRef, (snapshot) => {
  let value = snapshot.val();
  slidersatu.value = value;
  tampilslider.innerHTML = value + " R";
  console.log("Slider diperbarui secara real-time:", value);
});

// Ambil data dari Firebase untuk slider dua saat halaman dimuat
get(sliderduaRef).then((snapshot) => {
  let value = snapshot.exists() ? snapshot.val() : 50;
  sliderdua.value = value;
  tampilsliderdua.innerHTML = value;

  // Update nilai slider di Firebase setiap kali slider digeser
  sliderdua.oninput = function () {
    tampilsliderdua.innerHTML = this.value;

    // Simpan nilai slider ke Firebase
    set(sliderduaRef, parseInt(this.value, 10))
      .then(() => {
        console.log("Data slider berhasil diperbarui:", this.value);
      })
      .catch((error) => console.error("Gagal mengupdate data slider:", error));
  };
});

// Sinkronisasi real-time slider satu dengan Firebase
onValue(sliderduaRef, (snapshot) => {
  let value = snapshot.val();
  sliderdua.value = value;
  tampilsliderdua.innerHTML = value + " R";
  console.log("Slider diperbarui secara real-time:", value);
});

get(pompasatuRef)
  .then((snapshot) => {
    let state = snapshot.exists() ? snapshot.val() : 1;

    buttonpompa1.textContent = `Hidupkan`;

    // Update tampilan awal berdasarkan state dari Firebase
    if (state === 1) {
      buttonpompa1.style.backgroundColor = "red";
      gampompa1.src = "./image/water-pump-on.png";

      buttonpompa1.textContent = `Matikan`;
    } else {
      buttonpompa1.style.backgroundColor = "";
      gampompa1.src = "./image/water-pump-off.png";
      buttonpompa1.textContent = `Hidupkan`;
    }

    // Event Klik untuk mengubah angka
    buttonpompa1.addEventListener("click", () => {
      if (state === 1) {
        state = 0;
        buttonpompa1.style.backgroundColor = "";
        gampompa1.src = "./image/water-pump-off.png";
        buttonpompa1.textContent = `Hidupkan`;
      } else {
        state = 1;
        buttonpompa1.style.backgroundColor = "red";
        gampompa1.src = "./image/water-pump-on.png";
        buttonpompa1.textContent = `Matikan`;
      }

      // Simpan ke Firebase
      set(pompasatuRef, state)
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

// POMPA 2
get(pompaduaRef)
  .then((snapshot) => {
    let state = snapshot.exists() ? snapshot.val() : 1;

    buttonpompa2.textContent = `Hidupkan`;

    // Update tampilan awal berdasarkan state dari Firebase
    if (state === 1) {
      buttonpompa2.style.backgroundColor = "red";
      gampompa2.src = "./image/water-pump-on.png";

      buttonpompa2.textContent = `Matikan`;
    } else {
      buttonpompa2.style.backgroundColor = "";
      gampompa2.src = "./image/water-pump-off.png";
      buttonpompa2.textContent = `Hidupkan`;
    }

    // Event Klik untuk mengubah angka
    buttonpompa2.addEventListener("click", () => {
      if (state === 1) {
        state = 0;
        buttonpompa2.style.backgroundColor = "";
        gampompa2.src = "./image/water-pump-off.png";
        buttonpompa2.textContent = `Hidupkan`;
      } else {
        state = 1;
        buttonpompa2.style.backgroundColor = "red";
        gampompa2.src = "./image/water-pump-on.png";
        buttonpompa2.textContent = `Matikan`;
      }

      // Simpan ke Firebase
      set(pompaduaRef, state)
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

const indukpompa = document.getElementById("indukpompa");
const selengkapnyapompa = document.getElementById("selengkapnyapompa");
const selengkapnya = document.getElementById("selengkapnya");

selengkapnya.addEventListener("click", function () {
  if (selengkapnyapompa.classList.contains("hidden")) {
    selengkapnyapompa.classList.remove("hidden");
    indukpompa.classList.remove("h-20");
    indukpompa.classList.add("h-40");
    selengkapnya.textContent = "Sembunyikan";
  } else {
    selengkapnyapompa.classList.add("hidden");
    indukpompa.classList.remove("h-40");
    indukpompa.classList.add("h-20");
    selengkapnya.textContent = "Selengkapnya..";
  }
});
const indukled = document.getElementById("indukled");
const selengkapnyaled = document.getElementById("selengkapnyaled");
const selengkapnyaledbtn = document.getElementById("selengkapnyaledbtn");

selengkapnyaledbtn.addEventListener("click", function () {
  if (selengkapnyaled.classList.contains("hidden")) {
    selengkapnyaled.classList.remove("hidden");
    indukled.classList.remove("h-20");
    indukled.classList.add("h-40");
    selengkapnyaledbtn.textContent = "Sembunyikan";
  } else {
    selengkapnyaled.classList.add("hidden");
    indukled.classList.remove("h-40");
    indukled.classList.add("h-20");
    selengkapnyaledbtn.textContent = "Selengkapnya..";
  }
});

// AUTOMATISASI TUGAS
const aotomatisled1cek = document.getElementById("otomatisled1");

get(autohidupLed1)
  .then((snapshot) => {
    let state = 1;
    if (snapshot.exists()) {
      state = snapshot.val();
    }

    // Update tampilan awal berdasarkan state dari Firebase
    if (state === 1) {
      aotomatisled1cek.checked = true;
    } else {
      aotomatisled1cek.checked = false;
    }

    // Event Klik untuk mengubah angka
    aotomatisled1cek.addEventListener("change", () => {
      if (aotomatisled1cek.checked) {
        state = 1;
      } else {
        state = 0;
      }

      // Simpan ke Firebase
      set(autohidupLed1, state)
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
