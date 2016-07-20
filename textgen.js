/**
 * Created by wathmal on 7/20/16.
 */

var Canvas = require('canvas');
var fs = require('fs');
var path = require('path');


/*ctx.font = '25px Noto Sans Sinhala';
// ctx.rotate(.1);

var str ="ම";
str += "ී";
str += "ේ";
ctx.fillText(str, 0, 50);*/

// canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'font.png')))


var constants= ["ඬ", "ඳ", "ඟ", "ථ", "ධ", "ඝ", "ඡ", "ඵ", "භ", "ශ", "ෂ", "ඥ", "ඤ", "ළු", "ද", "ච", "ඛ", "ත", "ට", "ක", "ඩ", "න", "ප", "බ", "ම", "‍ය", "‍ය", "ය", "ජ", "ල", "ව", "ව", "ස", "හ", "ණ", "ළ", "ඛ", "ඝ", "ඨ", "ඪ", "ඵ", "ඹ", "ෆ", "ඣ", "ග", "ර"];
var vovel_modifiers = ["ූ", "ෝ", "ෝ", "ා", "ා", "ෑ", "ෑ", "ෑ", "ී", "ී", "ී", "ී", "ේ", "ේ", "ේ", "ූ", "ූ", "ෞ", "ැ", "", "ැ", "ි", "ෙ", "ු", "ො", "ෛ"];


for(var i=0 ;i < constants.length; i++){
    for(var j=0; j<vovel_modifiers.length; j++){
        var canvas1 = new Canvas(70, 70);
        var ctx1 = canvas1.getContext('2d');
        ctx1.font = '25px Noto Sans Sinhala';

        var txt = constants[i]+vovel_modifiers[j];

        ctx1.fillText(txt, 10, 35);
        canvas1.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, '/imgs/text-'+ txt+'-.png')))

    }
}