
var imagesMap = {};

var images = document.querySelectorAll('.product-image');

console.log(images);

images.forEach(img => {

    if(!imagesMap[img.title]) {
        imagesMap[img.title] = [];
        imagesMap[img.title].push(img.src);
    } else {
        imagesMap[img.title].push(img.src);
    }

});

for (let key in imagesMap) {

    if(imagesMap[key].length === 0) {
        delete imagesMap[key];
    }

    if(!imagesMap[key][0]) {
        imagesMap[key].splice(0,1);
    }


}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

brand
var phones = Object.keys(imagesMap).reduce((acc, key , i) => {

    if(imagesMap[key].length !== 0) {
        var newPhone = {
            price: getRandomArbitrary(1500, 10000),
            cpu: "1.3GHz Apple A6",
            camera: "8mp (3264x2448)",
            size: "124.4mm x 59.2mm x 8.97mm (4.9 x 2.33 x 0.35)",
            weight: "132 grams (4.7 ounces) with battery",
            display: "4.0 326 pixel density",
            battery: "1480 mAh",
            memory: "16GB, 32GB and RAM 1 GB"
        };
        newPhone.title = key;
        newPhone.brand = key.split(' ')[0].toLowerCase();
        newPhone.category = 'phone';
        newPhone.images = imagesMap[key];

        acc.push(newPhone);
    }

    return acc;
}, []);

console.log(JSON.stringify(phones));