# Lamello Choreography Generator

This project has been developed for an art project by [Alexander Deubl](http://www.alexanderdeubl.com).

It is used to create a choreography or looping code that then emulates a Somfy remote to control a motorized rollo or lamello curtain.

## Hardware Setup

### Components

* [ESP 32](https://www.az-delivery.com/en/products/esp32-developmentboard?_pos=3&_sid=e6a053933&_ss=r)
* [CC1101 transceiver module](https://www.amazon.de/-/en/Neuftech-CC1101-Wireless-Module-Transceiver-387-464-MHz/dp/B01CI01F94/ref=sr_1_6?dchild=1&keywords=433mhz+Arduino&qid=1623850090&sr=8-6) (Antenna)


### Libraries

* [ESP32 Library](https://github.com/espressif/arduino-esp32): "DOIT ESP32 DevKit V1"
* Ground `G0` during flashing process.
* [Somfy remote library](https://github.com/Legion2/Somfy_Remote_Lib)
* [SmartRC CC1101 Driver Library](https://github.com/LSatan/SmartRC-CC1101-Driver-Lib)


### Wiring

Based on [this repo](https://github.com/LSatan/SmartRC-CC1101-Driver-Lib). [ESP32 Pinout](pinout.pdf).

|ESP32 |CC1101|Color  |
|------|------|-------|
|GND   |GND   |Gray   |
|3V3   |VCC   |Red    |
|GPIO23|SI    |Yellow|
|GPIO18|SCK   |Green  |
|GPIO19|SO    |Purple |
|GPIO5 |CSN   |Blue   |
|GPIO2 |GD0   |Orange |
|GPIO4 |GD2   |White |


## Usage

### Pairing

To pair the motor with the controller, [this YouTube video](https://www.youtube.com/watch?v=NflF7aYC0R0) helps a lot. For the emulated remote, we follow the same steps, but instead of pressing the "prog" button we use the `Prog` command in the [Somfy library](https://github.com/Legion2/Somfy_Remote_Lib#available-commands).