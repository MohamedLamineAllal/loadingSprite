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

let loader = new LoadingSprite({
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
    loader.show();

    setTimeout(() => {
        loader.hide();

        setTimeout(() => {
            loader.show();
        }, 3000);
    }, 5000);
}, 3000);