# LittleBigPrinter — Messenger

This is the website, creating the communication for [LittleBigPrinter](https://github.com/olivierbrcknr/LittleBigPrinter).

This is a [next.js](https://nextjs.org/) repository.

Visit this link to see it in action: http://little-big-printer-messenger-git.olivierbrcknr.now.sh/

## Characters

The printer only has a very limited character set. It is somehow an ASCII Extended, but an older variant and also not all of it.

The supported characters are:

```regex
# Regular
 !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~

# Extended
ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ£ƒáíóúñÑªº¿¬½¼¡«»░▒▓│┤╣║╗╝¢¥┐└┴┬├─┼╚╔╩╦╠═╬┘┌█▄▀ß²■
```


## Functionality

### Send

On hit ”send”, a new message is generated and added to the collection `"Messages"`.

One message is set up like this:

```js
{
	Date: <timestamp>,
	Message: <string>,
  Name: <string>
}
```

## Development

Run

```sh
yarn dev
```

### Firebase Integration

This project saves data to [Google's Firebase](https://firebase.google.com/). The credentials are handled within a `.env`, which should be set up like this:

```env
FIREBASE_MEASUREMENT_ID="value"
FIREBASE_APP_ID="value"
FIREBASE_MESSAGING_SENDER_ID="value"
FIREBASE_STORAGE_BUCKET="value"
FIREBASE_PROJECT_ID="value"
FIREBASE_DATABASE_URL="value"
FIREBASE_AUTH_DOMAIN="value"
FIREBASE_API_KEY="value"
````
