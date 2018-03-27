/*!
 * RGB - Hex Converter
 * Color converter tool
 *
 * Author: MizoPro
 * License: MIT <https://github.com/mizopro/RGBHexConv/blob/master/LICENSE>
 */

// Main
$(document).ready(function() {
    setupForm.hex($('.js-form-hex'));
    setupForm.rgb($('.js-form-rgb'));
});

/**
 * (Async) Convert a `RGB` color to `Hex`
 *
 * @param {Array} rgb color to convert
 * @param {Function} cb callback with two parameters `err` (failure) and `hex` (success)
 */
function ConvertToHex(rgb, cb) {
    var err, hex;
    rgb = rgb
        .map(function(color, i) {
            return parseInt(color);
        })
        .filter(function(color) {
            return (!isNaN(color) && color >= 0 && color < 256);
        });
    if (rgb.length === 3) {
        hex = rgb
            .map(function(c, i) {
                var v = c.toString(16);
                return (v.length === 1) ? "0" + v : v;
            })
            .join("");
    } else {
        err = new Error("All RGB Values must be integers in range 0 to 255.");
    }
    cb(err, hex);
}

/**
 * (Async) Convert a `Hex` color to `RGB`
 *
 * @param {String} hex color to convert
 * @param {Function} cb callback with two parameter `err` (failure) and `rgb` (success)
 */
function ConvertToRGB(hex, cb) {
    var err, rgb, syntxErr = false;
    if (hex.charAt(0) === '#') hex = hex.substring(1);
    const values = [];
    const inc = (hex.length === 3) ? 1 : 2;
    for (var i = 0; i < hex.length; i += inc) {
        values.push(hex.substr(i, inc));
    }
    values = values
        .filter(function(color) {
            return (color.length === 1 || color.length === 2);
        });
    if (values.length === 3) {
        rgb = values
            .map(function(c, i) {
                if (c.length === 1)
                    c += c;
                return parseInt(c, 16);
            })
            .join("");
    } else {
        err = new Error("Invalid Hex value!");
    }
    cb(err, rgb);
}

/**
 * Setting-up functions holder
 */
const setupForm = {
    /**
     * Setup the 'To Hex' Converter
     *
     * @param {jQuery} $form form element
     */
    hex: function($form) {
        const $ins = $form.find('.js-inputs');
        const $btn = $form.find('.js-button');
        const $out = $form.find('.js-output');
        $btn.click(function(e) {
            const rgb = [];
            $ins
                .children()
                .each(function(i) {
                    rgb.push($(this).val() || 0);
                });
            ConvertToHex(rgb, function(err, hex) {
                if (err) {
                    $out.html(WarningElement(err.message));
                    return;
                }
                $out.html(ColorElement('#' + hex));
            });
        });
    },
    /**
     * Setup the 'To RGB' Converter
     *
     * @param {jQuery} $form form element
     */
    rgb: function($form) {
        const $ins = $form.find('.js-inputs');
        const $btn = $form.find('.js-button');
        const $out = $form.find('.js-output');
        $btn.click(function(e) {
            const hex = $ins.find('input[name="hex"]').val() || "000";
            ConvertToRGB(hex, function(err, rgb) {
                if (err) {
                    $out.html(WarningElement(err.message));
                    return;
                }
                $out.html(ColorElement("rgb(" + rgb.join(",") + ")"));
            });
        });
    }
};

/**
 * A color block HTML Element
 *
 * @param {String} color Hex or RGB Color value
 * @return {jQuery} resulted element
 */
function ColorElement(color) {
    const d = $('<div></div>');
    const b = $('<div class="block"></div>');
    b.css('backgroundColor', color);
    d.append('<div>' + color + '</div>');
    d.append(b);
    return d;
}

/**
 * A warning box HTML Element
 *
 * @param {String} msg warning message
 * @return {jQuery} resulted element
 */
function WarningElement(msg) {
    const d = $('<div class="alert alert-warning"></div>');
    d.append('<i class="fa fa-warning"></i>');
    d.append('<span class="content">' +msg+ '</span>');
    return d;
}
