cp = ColorPicker(document.getElementById('pcr'), document.getElementById('picker'),
    function(hex, hsv, rgb, mousePicker, mousepcr) {
        currentColor = hex;
        ColorPicker.positionIndicators(
            document.getElementById('pcr-indicator'),
            document.getElementById('picker-indicator'),
            mousepcr, mousePicker);

        document.getElementById('hex').innerHTML = hex;
        document.getElementById('pcr-hex').style.backgroundColor = hex;
    });
cp.setHex('#5cdc5c');