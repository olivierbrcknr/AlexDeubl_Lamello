/*
 * This code works with an ESP32
 * it uses NVS
 */

// Include required libraries
#include <NVSRollingCodeStorage.h>
#include <ELECHOUSE_CC1101_SRC_DRV.h>
#include <SomfyRemote.h>

#define EMITTER_GPIO 2
#define NVS_NAME "somfy"
#define NVS_KEY "{{remoteName}}" // the name of the remote
#define REMOTE 0x5184c8

#define CC1101_FREQUENCY 433.42

NVSRollingCodeStorage rollingCodeStorage(NVS_NAME, NVS_KEY);
SomfyRemote somfyRemote(EMITTER_GPIO, REMOTE, &rollingCodeStorage);

void setup() {
  // initiate command log
  Serial.begin(115200);

  // initiate the remote
  somfyRemote.setup();

  // initiate the antenna
  ELECHOUSE_cc1101.Init();
  ELECHOUSE_cc1101.setMHZ(CC1101_FREQUENCY);

  Serial.println("Start Remote");
}

// the function to send a command
void sendCommand(String string) {
  const Command command = getSomfyCommand(string);

  ELECHOUSE_cc1101.SetTx();
  somfyRemote.sendCommand(command, 1);
  ELECHOUSE_cc1101.setSidle();

  Serial.print("Sent command: ");
  Serial.println(string);
}

void loop() {

  // the acutal choreography —————————
  {{choreography}}
}
