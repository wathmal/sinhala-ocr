/**
 * Created by wathmal on 7/20/16.
 */

var Canvas = require('canvas');
var fs = require('fs');
var path = require('path');
var snakeCase = require('snake-case');
var im = require('imagemagick');



/*ctx.font = '25px Noto Sans Sinhala';
// ctx.rotate(.1);

var str ="ම";
str += "ී";
str += "ේ";
ctx.fillText(str, 0, 50);*/

// canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'font.png')))

var MAX_WIDTH = 70;
var MAX_HEIGHT = 70;

var original_images = [];

// not unicode
var transliterated_fonts = [ 'aKandyNew','aKandyNewSupplement', 'Anuradhapura', 'Anuradhapura Supplement', 'Asgiriya', 'Asgiriya Supplement', 'kaputadotcom', 'Lankadveepa', 'LankadveepaSupplement', 'Lankanatha', 'Lankanatha Suppliment', 'Lankapura', 'LankapuraSupplement', 'Lankatilaka', 'Lankatilaka Suppliment', 'Mahanuwara', 'Mahanuwara Supplement', 'Matara', 'Matara Supplement', 'Thissamaharama', 'Thissamaharama Supplement'
];

// unicode keymap fonts
var unicode_mapped_fonts = [
'AMALEE', 'Ananda', 'INFOTECH-ANURA', 'DS-anuradhi', 'Mi-Aradhana','DL-Araliya','FS-Araliya-Shatter', 'Ds-Araliya-AT-Stripe', 'FS-Araliya-Warp', 'DL-Biso', 'Br-Ridhma', 'DS-bursh', 'CHAMARA', 'FS-Chami', 'Ds-Chamika', 'Mi_Damindu_Tall', 'Mi_Damindu_Hollow_96', 'Mi_Dasuni_Tall', 'Mi_Dasuni_96', 'Mi_Dasun_Tall', 'Mi_Dasun_Wide', 'DS-Dilki', 'DL-Anupama', 'DL-DIVANI-N', 'Dl-Dulackshi', 'Dl-HD', 'DL-KIDURU', 'DL-KUSUMI', 'DL-Priyanwada', 'FMAbhaya', 'FMArjunn', 'FMBasuru', 'FMBindumathi', 'FMDerana', 'FMEmanee', 'FMGemunu', 'FMRajantha', 'FMMalithi', 'FMSamantha', 'DS-GajabaA-Stripe', 'FMGanganee', 'Dl-Hansika', 'Dl-Hansika-Fill', 'DL-Harini', 'Mi_Harsha_Hollow_96',
    'Hela', 'Hemawathy', 'Dl-ice', 'Ds-kalani', 'FS-Kapila', 'DL-kotu', 'Lavanya', 'DL-Lihini', 'DL-Lihini-ex', 'DL-Madu-College', 'DL-Madu-Cactus', 'DS-malan', 'DL-Malathi', 'DL-Manel', 'DL-MANO', 'FS-MANOlt', 'DL-Makala', 'INFOTECH-MEN', 'Microsinhala', 'Mihiri', 'DL-Nelum', 'Ds-nilantha', 'NilanthiLT-PC', 'Bu_Nilmi', 'Mi_Nilu', 'Dl-Nirosha', 'Bu_Nisha', 'DL-Paras', 'Mi-Pathum', 'Radhika-PC', 'Ranasuru-PC', 'Ranaviru-PC', 'Ranmadu', 'Ds-Rasika', 'Ridi-15', 'Ds-Ruwani-PC', 'DL-Sada', 'Sandaya', 'SandayaBOI', 'DL-Sarala', 'FS-Sawana', 'Sepalika', 'aSinhalaApple', 'DL-Sumudu', 'Tipitaka_Sinhala1', 'Waartha', 'DS-waruni', 'WijesekaraLayout'
];

var unicode_fonts = ['NotoSansSinhala', 'NotoSansSinhala-Bold', 'LKLUG', 'IskoolaPota', 'NirmalaUI', 'BhashitaComplex'];

// label maps are corresponding to its own index+1

var label_map1 = ['k','š','g','}','<','c','','j','','t','d','n','z','w','{','q',']','p','','b','X','m','x','y','r','l','v','\\',';','s','h','[','f'];
var label_map2 = ['l','L','.','>','','p','P','c','}','g','v','k','K',';',':','o','O','m','M','n','N','u','','h','r',',','j','Y','I','i','y','<','*'];
var label_map3 = ['ක','ඛ', 'ග', 'ඝ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ට', 'ඩ', 'න', 'ණ', 'ත', 'ථ', 'ද', 'ධ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ව', 'ශ', 'ෂ', 'ස','හ','ළ', 'ෆ'];

/*
var constants= ["ඬ", "ඳ", "ඟ", "ථ", "ධ", "ඝ", "ඡ", "ඵ", "භ", "ශ", "ෂ", "ඥ", "ඤ", "ළු", "ද", "ච", "ඛ", "ත", "ට", "ක", "ඩ", "න", "ප", "බ", "ම", "‍ය", "‍ය", "ය", "ජ", "ල", "ව", "ව", "ස", "හ", "ණ", "ළ", "ඛ", "ඝ", "ඨ", "ඪ", "ඵ", "ඹ", "ෆ", "ඣ", "ග", "ර"];
var vovel_modifiers = ["ූ", "ෝ", "ෝ", "ා", "ා", "ෑ", "ෑ", "ෑ", "ී", "ී", "ී", "ී", "ේ", "ේ", "ේ", "ූ", "ූ", "ෞ", "ැ", "", "ැ", "ි", "ෙ", "ු", "ො", "ෛ"];

*/




/*for(var font=10; font < transliterated_fonts.length; font++){
    for(var i=0 ;i < label_map1.length; i++){
        /!*    for(var j=0; j<vovel_modifiers.length; j++){

         }*!/
        var canvas1 = new Canvas(MAX_WIDTH, MAX_HEIGHT);
        var ctx1 = canvas1.getContext('2d');

        ctx1.fillStyle = '#ffffff';
        ctx1.fillRect(0,0, MAX_WIDTH, MAX_HEIGHT);

        ctx1.fillStyle = '#000000';

        ctx1.font = '50px '+ transliterated_fonts[font];

        var txt = label_map1[i];
        if(txt != '') {
            var measure = ctx1.measureText(txt);

            var width = measure.width;
            var height = measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent;

            var x = Math.floor((MAX_WIDTH - width) / 2);
            var y = Math.floor((MAX_WIDTH - height) / 2 + height);

            ctx1.fillText(txt, x, y);
            // console.log(measure);
            var name_only = snakeCase(unicode_mapped_fonts[font]) + '_' + (i + 1);
            var name = name_only + '.png';

            var filename = '/imgs/train/' + name;
            original_images.push({name: name_only, label: (i+1)});
            // canvas1.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, filename)))
            fs.appendFile('labels.txt', name+ ' '+ (i+1)+'\n', function (err) {

            });
        }
    }
}

// wijesekara keymap fonts
for(var font=10; font < unicode_mapped_fonts.length; font++){
    for(var i=0 ;i < label_map2.length; i++){
        /!*    for(var j=0; j<vovel_modifiers.length; j++){

         }*!/
        var canvas1 = new Canvas(MAX_WIDTH, MAX_HEIGHT);
        var ctx1 = canvas1.getContext('2d');
        ctx1.font = '50px '+ unicode_mapped_fonts[font];
        ctx1.fillStyle = '#ffffff';
        ctx1.fillRect(0,0, MAX_WIDTH, MAX_HEIGHT);

        ctx1.fillStyle = '#000000';

        var txt = label_map2[i];
        if(txt != '') {
            var measure = ctx1.measureText(txt);

            var width = measure.width;
            var height = measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent;

            var x = Math.floor((MAX_WIDTH - width) / 2);
            var y = Math.floor((MAX_WIDTH - height) / 2 + height);

            ctx1.fillText(txt, x, y);
            // console.log(measure);
            var name_only = snakeCase(unicode_mapped_fonts[font]) + '_' + (i + 1);
            var name = name_only + '.png';

            var filename = '/imgs/train/' + name;
            original_images.push({name: name_only, label: (i+1)});
            // canvas1.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, filename)))
            fs.appendFile('labels.txt', name+ ' '+ (i+1)+'\n', function (err) {
            });
        }
    }
}*/

// unicode font generator
for(var font=0; font < unicode_fonts.length; font++) {

    for (var i = 0; i < label_map3.length; i++) {
        /*    for(var j=0; j<vovel_modifiers.length; j++){

         }*/
        var canvas1 = new Canvas(MAX_WIDTH, MAX_HEIGHT);
        var ctx1 = canvas1.getContext('2d');
        ctx1.font = '50px '+ unicode_fonts[font];
        ctx1.fillStyle = '#ffffff';
        ctx1.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

        ctx1.fillStyle = '#000000';

        var txt = label_map3[i];
        if (txt != '') {
            var measure = ctx1.measureText(txt);

            var width = measure.width;
            var height = measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent;

            var x = Math.floor((MAX_WIDTH - width) / 2);
            var y = Math.floor((MAX_WIDTH - height) / 2 + height);

            ctx1.fillText(txt, x, y);
            // console.log(measure);
            var name_only = snakeCase(unicode_fonts[font]) + '_' + (i);
            var name = name_only + '.png';

            var filename = '/imgs/unicode/' + name;
            original_images.push({name: name_only, label: (i)});
            // canvas1.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, filename)))
            fs.appendFile('labels_unicode.txt', name+ ' '+ (i)+'\n', function (err) {
                if(err){
                    console.log(err);
                }
            });
        }
    }
}
/*

console.log('adding noise');

// now add noise to images
for(var i=0; i< original_images.length; i++){

    var fname = original_images[i].name;
    var label = original_images[i].label;

    var img_path = 'imgs/'+fname+'.png';

    var dest_name = 'impulse_'+fname+'.png';
    var img_dest_path = 'imgs/'+ dest_name;
    im.convert([img_path, '+noise', 'Impulse', img_dest_path],
        function(err, stdout){
            fs.appendFile('labels.txt', dest_name+ ' '+ label+'\n', function (err) {

            });
            if (err) {}
            else{

            }
        });


}
*/
