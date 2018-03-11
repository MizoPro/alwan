# RGB / Hex Converter

A website app to easily convert RGB color values to Hex and vice versa.

Website URL: https://mizopro.github.io/RGBHexConv

## About

Originally created for a [Coding Challenge] (named `RGB to Hex Converter`) in [SoloLearn]

*Note: The challenge url may be accessible only within SoloLearn's mobile app.*

## API

The two main functions responsible for conversions are:

```js
// RGB to Hex (async)
ConvertToHex(rgb, cb)
// rgb: Array  of the format [ `red`, `green`, `blue` ]
// cb: Function  callback to handle result with two parameters:
//  - err Error  in case of failing
//  - hex String  resulted Hex string (in case of success)

// ------

// Hex to RGB (async)
ConvertToRGB(hex, cb)
// hex: String  of the format `#rrggbb` or `#rgb` ('#' is optional)
// cb: Function  callback to handle result with two parameters:
//  - err Error  in case of failing
//  - rgb Array  resulted RGB values separated in an array (in case of success)
```

## Author

Hamza Belhadj (aka *MizoPro*)

Check out my SoloLearn [Profile] for more codes.

(C) Copyrights, 2018

## License

The MIT License.
Read the `LICENSE` file for more information.

[SoloLearn]: https://www.sololearn.com
[Profile]: https://www.sololearn.com/profile/4209959
[Coding Challenge]: https://www.sololearn.com/learn/5742/?ref=app
