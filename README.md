# LoadingSprite

You are searching for a good library that offer beautiful spinner|loader|sprites. Easy to use. A consise API, to manipulate different aspects of personalisation (show, hide, back black or not black background, precise container you want to show the spinner on, possibility for precising your own loader dom, classes names ...). Very personalisable. 

LoadingSprite is simple and offer that (very small as for the objective we don't need a lot of things). 

It laverage for you some spinners by default. Of wich the Popular cool work SpinKit (that offer 11 spinner).

# API:

I'M PUBLISHING FIRST FOR MY CONVENIENCE. 

I WILL UPDATE THIS SECTION WHEN I GET TIME. BOTH THE API AS SOME LIVE EXAMPLE

Here a quick overview (that i already wrote):
```javascript

/**
 * loaderClass :
 * 
 * sk-cube-grid
 * sk-folding-cube
 * sk-fading-circle
 * sk-circle
 * sk-three-bounce
 * sk-chasing-dots
 * sk-wandering-cubes
 * sk-wave
 * sk-double-bounce
 * sk-rotating-plane
 * sk-spinner sk-spinner-pulse
 */

let loader = new LoadingSprite({ // <---------------------!!!!!!
    // loaderDOM: ,
    loaderClass: 'sk-cube-grid',
    // zIndex: 1000000000,
    blackBack: true,
    // backBackground: 'rgba(0,0,0,0.2)',
    // holderStyle: {
    //     // any style here
    // },
    // container: someComponent,    // loaderWidth: '100px',
    // loaderHeight: '100px',
    // loaderWidth: '100px',
    // loaderHeight: '100px',
});

let counterDOM = document.getElementById('counter');
let count = 1;
let interval = setInterval(() => {
  counterDOM.innerHTML = count * 500 / 1000;
  count++;
}, 500);


setTimeout(() => {
    clearInterval(interval);
    loader.show(); /// <-------------------

    setTimeout(() => {
        loader.hide(); /// <----------------------------

        setTimeout(() => {
            loader.show();
        }, 3000);
    }, 5000);
}, 3000);


```



You can check the test here: https://github.com/MohamedLamineAllal/loadingSprite/tree/master/test

# NOTE
[
    This micro library is just a small work. And for the spinners it use the great work from the spinKIT project.  It's too simple.  I may add more features along the days. If you have any feature in mind, fill an issue. Any suggestion and recomendation are appreciated. 
]

