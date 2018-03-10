/*!
 * RGB Hex <Converter>
 *
 * Author: MizoPro
 * License: the MIT License
 */

// Main
$(document).ready(function() {
    setupForm.hex($('.js-form-hex'));
    setupForm.rgb($('.js-form-rgb'));
});

/**
 * (Async) Convert a `RGB` color to `Hex`.
 *
 * @param {Array} rgb color to convert
 * @param {Function} cb callback with two parameters
 *                      `err` and `hex`
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
        err = new Error("All RGB Values must be integers between 0 and 255.");
    }
    cb(err, hex);
}

/**
 * (Async) Convert a `Hex` color to `RGB`.
 *
 * @param {String} hex color to convert
 * @param {Function} cb callback with two parameters
 *                      `err` and `rgb`
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
        err = new Error("All RGB Values must be integers between 0 and 255.");
    }
    cb(err, rgb);
}

/**
 *
 *
 *
 */
const setupForm = {
    /**
     *
     *
     *
     */
    hex: function($form) {
        const $ins = $form.find('.js-inputs');
        var $btn = $form.find('.js-button');
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
    /*
     *
     *
     *
     */
    rgb: function($form) {
        
    }
};

/**
 *
 *
 *
 *
 */
function ColorElement(color) {
    const d = $('<div></div>');
    const b = $('<div class="block"></div>')
    b.css('backgroundColor', color);
    d.append('<span>' + color + '</span>');
    d.append(b);
    return d;
}

/**
 *
 *
 *
 */
function WarningElement(msg) {
    const d = $('<div class="alert alert-warning"></div>');
    d.append('<i class="fa fa-warning"></i>');
    d.append('<span class="content">' +msg+ '</span>');
    return d;
}
