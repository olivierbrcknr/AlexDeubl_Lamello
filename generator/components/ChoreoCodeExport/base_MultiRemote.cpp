#include <EEPROM.h>
#include <EEPROMRollingCodeStorage.h>
#include <ELECHOUSE_CC1101_SRC_DRV.h>
#include <SomfyRemote.h>

#define EMITTER_GPIO 2
#define REMOTE1 0x65dc00
#define REMOTE2 0x25b5d5
#define REMOTE3 0xc6c78f
#define REMOTE4 0x59714b

#define CC1101_FREQUENCY 433.42

EEPROMRollingCodeStorage rollingCodeStorage1(0);
EEPROMRollingCodeStorage rollingCodeStorage2(2);
EEPROMRollingCodeStorage rollingCodeStorage3(4);
EEPROMRollingCodeStorage rollingCodeStorage4(6);
SomfyRemote somfyRemote1(EMITTER_GPIO, REMOTE1, &rollingCodeStorage1);
SomfyRemote somfyRemote2(EMITTER_GPIO, REMOTE2, &rollingCodeStorage2);
SomfyRemote somfyRemote3(EMITTER_GPIO, REMOTE3, &rollingCodeStorage3);
SomfyRemote somfyRemote4(EMITTER_GPIO, REMOTE4, &rollingCodeStorage4);

void setup() {
  // initiate command log
  Serial.begin(115200);

  // initiate the antenna
  ELECHOUSE_cc1101.Init();
  ELECHOUSE_cc1101.setMHZ(CC1101_FREQUENCY);

  // setup done
  delay(1000);
  Serial.println("Start Lamello Choreographer");
}

// the function to send a command
void sendCommand(String string, int remotesArray[], int numOfRemotes) {

  // add "new line" symbol to make command work
  String commandWithNewLine = string + "\n";
  const Command command = getSomfyCommand(commandWithNewLine);

  ELECHOUSE_cc1101.SetTx();

  // send actual commands to all remotes
  for ( int i = 0 ; i < numOfRemotes ; ++i ){
    switch( remotesArray[i] ){
      case 1 : somfyRemote1.sendCommand(command, 1);
      case 2 : somfyRemote2.sendCommand(command, 1);
      case 3 : somfyRemote3.sendCommand(command, 1);
      case 4 : somfyRemote4.sendCommand(command, 1);
    }
  }

  ELECHOUSE_cc1101.setSidle();

  Serial.print("Sent command: ");
  Serial.println(string);
}

// the acutal choreography —————————————————————————————————————————
void loop() {
  {{choreography}}
}
