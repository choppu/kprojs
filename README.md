## KProJS

Keycard Pro Library based on [@ledgerhq/hw-app-eth](@ledgerhq/hw-app-eth) and [@ledgerhq/hw-transport](@ledgerhq/hw-transport).

***

## Who should use KProJS?

KProJS permits you to communicate with Keycard Pro through websites and through nodejs-based native applications.

***

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Eth](#eth)
    *   [Parameters](#parameters)
    *   [Examples](#examples)
    *   [getAddress](#getaddress)
        *   [Parameters](#parameters-1)
        *   [Examples](#examples-1)
    *   [signTransaction](#signtransaction)
        *   [Parameters](#parameters-2)
        *   [Examples](#examples-2)
    *   [getAppConfiguration](#getappconfiguration)
    *   [signPersonalMessage](#signpersonalmessage)
        *   [Parameters](#parameters-4)
        *   [Examples](#examples-4)
    *   [signEIP712Message](#signeip712message)
        *   [Parameters](#parameters-6)
        *   [Examples](#examples-6)
    *   [loadFirmware](#loadfirmware)
        *   [Parameters](#parameters-7)
        *   [Examples](#examples-7)
    *   [loadERC20DB](#loaderc20db)
        *   [Parameters](#parameters-8)
        *   [Examples](#examples-8)


### Eth

Ethereum API

#### Parameters

*   `transport` **Transport**

#### Examples

```javascript
import KProJS from "kprojs";
const eth = new KProJS.Eth(transport)
```

#### getAddress

get Ethereum address for a given BIP 32 path.

##### Parameters

*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a path in BIP 32 format
*   `boolDisplay` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?**
*   `boolChaincode` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?**

##### Examples

```javascript
const resp = await eth.getAddress("44'/60'/0'/0/0");
console.log(resp.address);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{publicKey: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), address: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), chainCode: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?}>** an object with a publicKey, address and (optionally) chainCode

#### signTransaction

sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign.

##### Parameters

*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** : the BIP32 path to sign the transaction on
*   `rawTxHex` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** : the raw ethereum transaction in hexadecimal to sign

##### Examples

```javascript
const tx = "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080"; // raw tx to sign
const resp = eth.signTransaction("44'/60'/0'/0/0", tx);
console.log(resp);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{s: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), v: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), r: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}>**

#### getAppConfiguration

get firmware and ERC20 DB version installed on the Keycard Pro device.

##### Examples

```javascript
const {fwVersion, erc20Version} = await eth.getAppConfiguration();
console.log(fwVersion);
console.log(erc20Version);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{fwVersion: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), erc20Version: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)}>**

#### signPersonalMessage

sign a personal message and retrieve v, r, s given the message and the BIP 32 path of the account to sign.

##### Parameters

*   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
*   `pMessage` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**
*   `enc` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** : buffer encoding, optional parameter, default: "utf-8"

##### Examples

```javascript
const resp = await eth.signPersonalMessage("44'/60'/0'/0/0", "Hello world!");
let v = resp['v'] - 27;
v = v.toString(16);
if (v.length < 2) {
  v = "0" + v;
}
console.log("Signature 0x" + resp['r'] + resp['s'] + v);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{v: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), s: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), r: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}>**

#### signEIP712Message

sign an EIP-712 formatted message

##### Parameters

*   `path` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** derivationPath
*   `jsonMessage` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** message to sign

##### Examples

```javascript
const resp = await eth.signEIP721Message("44'/60'/0'/0/0", {
domain: {
chainId: 69,
name: "Da Domain",
verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
version: "1"
},
types: {
"EIP712Domain": [
{ name: "name", type: "string" },
{ name: "version", type: "string" },
{ name: "chainId", type: "uint256" },
{ name: "verifyingContract", type: "address" }
],
"Test": [
{ name: "contents", type: "string" }
]
},
primaryType: "Test",
message: {contents: "Hello, Bob!"},
});
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<{v: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), s: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), r: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}>**

#### loadFirmware

load Keycard Pro firmware

##### Parameters

*   `fw` **[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)** firmware


##### Examples

```javascript
const fs = require('fs'),
let f = fs.readFileSync('./firmware.bin');
let fw = new Uint8Array(f);
await eth.loadFirmware(fw);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>**

#### loadERC20DB

load ERC20 & chain database

##### Parameters

*   `db` **[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)** ERC20 & Chain DB


##### Examples

```javascript
const fs = require('fs'),
let f = fs.readFileSync('./erc20db.bin');
let db = new Uint8Array(f);
await eth.loadERC20DB(db);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>**

## Live Demo

You can check a demo at [KPro Web HID Example Page](https://choppu.github.io/kprojs-example/).



