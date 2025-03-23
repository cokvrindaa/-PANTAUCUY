#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Samsung Galaxy A55"
#define WIFI_PASSWORD "123456789"
// ISI DENGAN DATA KALIAN
#define API_KEY ""
#define DATABASE_URL ""

const int lampu = D6;
const int lampu2 = D7;
const int lampu3 = D8;
int ldr = A0;
FirebaseData fbdo;
FirebaseAuth auth;

FirebaseConfig config;
bool signupOK = false;



String sValue;
void setup() {
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
}


void loop() {
  String s1, s2;
  int bacaldr = analogRead(ldr);
  if (Firebase.ready() && signupOK) {
    Serial.print("connected to Firebase:");
    if (Firebase.RTDB.setInt(&fbdo, "cahaya", bacaldr)) {
      Serial.print("ldr: ");
      Serial.println(bacaldr);
    }



    if (Firebase.RTDB.getInt(&fbdo, "toggleState")) {
      int b = fbdo.intData();
      Serial.println(b);
      analogWrite(lampu2, b);
      if (b == 1) {
        digitalWrite(lampu2, HIGH);
      } else if (b == 0) {
        digitalWrite(lampu2, LOW);
      }
    }

    if (Firebase.RTDB.getInt(&fbdo, "toggleState2")) {
      int c = fbdo.intData();
      Serial.println(c);
      analogWrite(lampu, c);
      if (c == 1) {
        digitalWrite(lampu, HIGH);
      } else if (c == 0) {
        digitalWrite(lampu, LOW);
      }

    }








    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    Serial.println("______________________________");
  }
}
