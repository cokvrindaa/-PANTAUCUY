#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "DHT.h"

// Insert your network credentials
#define WIFI_SSID "Samsung Galaxy A55"
#define WIFI_PASSWORD "123456789"

#define API_KEY "AIzaSyA6mnO53Cl1rOGQJIIh-sUUxqM8ScDHPYo"
#define DATABASE_URL "https://myfirebase-ed97c-default-rtdb.firebaseio.com//"
#define DHTPIN D5
#define DHTTYPE DHT11
#define pompa D4
const int lampu = D6;
const int lampu2 = D7;
const int lampu3 = D8;
int ldr = A0;

// JIKA MENGGUNAKAN ESP 32




FirebaseData fbdo;
FirebaseAuth auth;

FirebaseConfig config;
bool signupOK = false;


DHT dht(DHTPIN, DHTTYPE);

String sValue;
void setup() {
  pinMode(pompa, OUTPUT);
  pinMode(lampu, OUTPUT);
  pinMode(lampu2, OUTPUT);
  pinMode(ldr, INPUT);
  delay(1000);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println(DATABASE_URL);
    signupOK = true;
  } else {

    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  dht.begin();
}


void loop() {


  float hum = dht.readHumidity();
  float temp = dht.readTemperature();
  String s1, s2;
  int bacaldr = analogRead(ldr);
  if (Firebase.ready() && signupOK) {
    Serial.print("connected to Firebase:");
    if (Firebase.RTDB.setInt(&fbdo, "cahaya", bacaldr)) {
      Serial.print("ldr: ");
      Serial.println(bacaldr);
    }

    
    if (Firebase.RTDB.getInt(&fbdo, "autohidupled1")) {
      int datalampu = fbdo.intData();
      Serial.print("data lampu: ");
      Serial.println(datalampu);
      if (datalampu == 0) {
        if (Firebase.RTDB.getInt(&fbdo, "toggleState")) {
          int b = fbdo.intData();
          Serial.println(b);
          if (b == 1) {
            if (Firebase.RTDB.getInt(&fbdo, "sliderdua")) {
              int b = fbdo.intData();
              Serial.println(b);
              analogWrite(lampu2, b);
            }

          } else if (b == 0) {
            digitalWrite(lampu2, LOW);
          }
        }

        if (Firebase.RTDB.getInt(&fbdo, "toggleState2")) {
          int c = fbdo.intData();
          Serial.println(c);
          if (c == 1) {
            if (Firebase.RTDB.getInt(&fbdo, "slidersatu")) {
              int a = fbdo.intData();
              Serial.println(a);
              analogWrite(lampu, a);
            }

          } else if (c == 0) {
            digitalWrite(lampu, LOW);
          }
        }
      } else if (datalampu == 1) {
        if (bacaldr < 10) {
          digitalWrite(lampu, HIGH);
          digitalWrite(lampu2, HIGH);
        } else {
          digitalWrite(lampu, LOW);
          digitalWrite(lampu2, LOW);
        }
      }
    }



    if (Firebase.RTDB.getInt(&fbdo, "pompasatu")) {
      int d = fbdo.intData();
      Serial.println(d);
      if (d == 0) {
        digitalWrite(pompa, HIGH);

      } else if (d == 1) {
        digitalWrite(pompa, LOW);
      }
    }


    if (Firebase.RTDB.setFloat(&fbdo, "kelembapan", hum)) {
      Serial.print("hum: ");
      Serial.println(hum);
    }


    if (Firebase.RTDB.setFloat(&fbdo, "dht", temp)) {
      Serial.print("suhu: ");
      Serial.println(temp);
    }


    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    Serial.println("______________________________");
  }
}
