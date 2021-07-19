

/* 
Board: DOIT ESP32 DevKit V1
Upload Speed: 921600

G0 on GND during flashing process!!
*/

#include <NVSRollingCodeStorage.h>
#include <ELECHOUSE_CC1101_SRC_DRV.h>
#include <SomfyRemote.h>

#define EMITTER_GPIO 2
#define NVS_NAME "somfy"
#define NVS_KEY "remote_1"
#define REMOTE 0x5184c8

#define ONBOARD_LED  2


#define CC1101_FREQUENCY 433.42

NVSRollingCodeStorage rollingCodeStorage(NVS_NAME, NVS_KEY);
SomfyRemote somfyRemote(EMITTER_GPIO, REMOTE, &rollingCodeStorage);

void setup() {
  Serial.begin(115200);

  pinMode(ONBOARD_LED,OUTPUT);

  somfyRemote.setup();

  ELECHOUSE_cc1101.Init();
  ELECHOUSE_cc1101.setMHZ(CC1101_FREQUENCY);

  Serial.println("Start Remote");
}

void sendCC1101Command(Command command) {
  digitalWrite(ONBOARD_LED,HIGH);

  ELECHOUSE_cc1101.SetTx();
  // for(int i = 0; i < 50; i++){
    somfyRemote.sendCommand(command, 1);
    delay(500);
  // }
  ELECHOUSE_cc1101.setSidle();
  
  digitalWrite(ONBOARD_LED,LOW);

}

void loop() {
  if (Serial.available() > 0) {
    const String string = Serial.readStringUntil('\n');
    const Command command = getSomfyCommand(string);
    sendCC1101Command(command);
    Serial.print("Sent command: ");
    Serial.println(string);
  }
}
