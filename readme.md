# body-mass-index [![Build Status](https://img.shields.io/travis/brh55/body-mass-index.svg?style=flat-square)](https://travis-ci.org/brh55/body-mass-index) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

> Calculate the body mass index (BMI) with the freedom of multiple units
>
> **bodyMassIndex('200 lb', '6ft 9in') => 21.4**


## Install

```
$ npm install --save body-mass-index
```

## Usage
#### Typical Usage
```js
const bodyMassIndex = require('body-mass-index');
bodyMassIndex('200 lb', '6ft 9in');
// => 21.4
```

#### Advance Usage

Interchangeable Imperial and Metric Units

```js
const bodyMassIndex = require('body-mass-index');
bodyMassIndex('90.17kg 1lb 100g', '145.27cm 1ft 0.30m');
// => 21.4
```

## API

### bodyMassIndex(weight, height [,options])

#### Weight

Type: `string` || `number`

A combination of multiple masses (*n* units(mc|mg|g|kg|oz|lb)). A sole number input shall cause the function to default to `kg`.

#### Height

Type: `string` || `number`

A combination of multiple lengths (*n* units(mm|cm|m|km|in|yd|ft|mi)). A sole number input shall cause the function to default to `m`.

#### options

##### round

Type: `number`<br>
Default: `1`

The decimal place for the returned BMI to be rounded to.

## License

MIT © [Brandon Him](https://github.com/brh55/body-mass-index)
