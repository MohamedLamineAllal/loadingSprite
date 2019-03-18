var LoadingSpring = (function () {
    'use strict';

    //loaderClass, container, blackBack, zIndex, backBackground 

    function LoadingSprite(options) {
        if (!options) options = {};

        this.loaderClass = options.loaderClass ? options.loaderClass : 'sk-cube-grid';
        this.loaderHolder = document.createElement('div');
        this.lhstyl = new EasyStyle(this.loaderHolder);
        this.zIndex = options.zIndex;
        if (!options.zIndex) {
            this.zIndex = 10000000;
        }

        this.backBackground = options.backBackground ? options.backBackground : 'rgba(0,0,0,0.2)';

        this.blackBack = options.blackBack ? true : false;
        this.holderStyle = options.holderStyle;
        this.lhstyl.style(Object.assign({}, {
            'display': 'none',
            // 'align-items': 'center',
            // 'justify-content': 'center',
            'width': '100%',
            'height': '100%',
            "zIndex": this.zIndex,
            "position": 'absolute',
            'top': 0,
            'left': 0,
            'background': this.blackBack ? this.backBackground : 'transparent'
        }, this.holderStyle));

        this.container = options.container ? options.container : document.body;

        this.containerPositionCheck();


        this.loaderWidth = options.loaderWidth ? options.loaderWidth : '100px';
        this.loaderHeight = options.loaderHeight ? options.loaderHeight : '100px';

        this.loaderContainer = document.createElement('div');
        this.lcStyl = new EasyStyle(this.loaderContainer);
        this.lcStyl.style({
            width: this.loaderWidth,
            height: this.loaderHeight,
            position: 'relative',
            objectFit: 'contain',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
        });

        if (options.loaderDOM) {
            this.loader = options.loaderDOM;
        } else {
            this.loader = getLoaderDOM(this.loaderClass);
        }

        this.loader.className = 'loadingSprite-loader ' + this.loader.className;
        this.lStyl = new EasyStyle(this.loader);
        this.lStyl.style({
            width: this.loaderWidth,
            height: this.loaderHeight,
            position: 'relative',
            objectFit: 'contain'
        });
        this.loaderContainer.appendChild(this.loader);
        this.loaderHolder.appendChild(this.loaderContainer);
        this.container.appendChild(this.loaderHolder);
    }

    (function (p) {
        p.show = function (container) {
            if (container) {
                this.setContainer(container);
            }

            this.lhstyl.style({
                display: 'block'
            });

            return this;
        };

        p.hide = function () {
            this.lhstyl.style({
                display: 'none'
            });
            return this;
        };

        p.setContainer = function (container) {
            this.container = container;
            this.containerPositionCheck();
            this.container.appendChild(this.loaderHolder);
            return this;
        };
        p.containerPositionCheck = function () {
            // if (this.container.style.position !== 'relative' && this.container.style.position !== 'absolute' && this.container.style.position !== 'fixed') {
            //     this.container.style.position = 'relative';
            // }
        };
    })(LoadingSprite.prototype);

    function getLoaderDOM(className) {
        switch (className) {
            case 'sk-cube-grid':
                var container = document.createElement('div');
                container.className = className;
                var cube;
                for (var i = 0; i < 9; i++) {
                    cube = document.createElement('div');
                    cube.className = 'sk-cube sk-cube' + (i + 1);
                    container.appendChild(cube);
                }

                return container;
            case 'sk-folding-cube':
                var container = document.createElement('div');
                container.className = className;
                var cube;

                [
                    'sk-cube sk-cube1',
                    'sk-cube sk-cube3',
                    'sk-cube sk-cube4',
                    'sk-cube sk-cube3'
                ].forEach(function (cls) {
                    cube = document.createElement('div');
                    cube.className = cls;
                    container.appendChild(cube);
                });

                return container;
            case 'sk-fading-circle':
                var container = document.createElement('div');
                container.className = className;
                var circle;
                for (var i = 0; i < 12; i++) {
                    circle = document.createElement('div');
                    circle.className = 'sk-circle sk-circle' + (i + 1);
                    container.appendChild(circle);
                }

                return container;
            case 'sk-circle':
                var container = document.createElement('div');
                container.className = className;
                var circle;
                for (var i = 0; i < 12; i++) {
                    circle = document.createElement('div');
                    circle.className = 'sk-child sk-circle' + (i + 1);
                    container.appendChild(circle);
                }

                return container;
            case 'sk-three-bounce':
                var container = document.createElement('div');
                container.className = className;
                var circle;
                for (var i = 0; i < 3; i++) {
                    circle = document.createElement('div');
                    circle.className = 'sk-child sk-bounce' + (i + 1);
                    container.appendChild(circle);
                }

                return container;

            case 'sk-chasing-dots':
                var container = document.createElement('div');
                container.className = className;
                var circle;
                for (var i = 0; i < 2; i++) {
                    circle = document.createElement('div');
                    circle.className = 'sk-child sk-dot' + (i + 1);
                    container.appendChild(circle);
                }

                return container;
            case 'sk-wandering-cubes':
                var container = document.createElement('div');
                container.className = className;
                var cube;
                for (var i = 0; i < 2; i++) {
                    cube = document.createElement('div');
                    cube.className = 'sk-cube sk-cube' + (i + 1);
                    container.appendChild(cube);
                }

                return container;
            case 'sk-wave':
                var container = document.createElement('div');
                container.className = className;
                var rect;
                for (var i = 0; i < 5; i++) {
                    rect = document.createElement('div');
                    rect.className = 'sk-rect sk-rect' + (i + 1);
                    container.appendChild(rect);
                }

                return container;
            case 'sk-double-bounce':
                var container = document.createElement('div');
                container.className = className;
                var circle;
                for (var i = 0; i < 2; i++) {
                    circle = document.createElement('div');
                    circle.className = 'sk-child sk-double-bounce' + (i + 1);
                    container.appendChild(circle);
                }

                return container;
            case 'sk-rotating-plane':
                var container = document.createElement('div');
                container.className = className;

                return container;
            case 'sk-spinner sk-spinner-pulse':
                var container = document.createElement('div');
                container.className = className;

                return container;
        }
    }

    function EasyStyle(el) {
        this.el = el;
    }

    (function (p) {
        p.style = function (styl) {
            var properties = Object.keys(styl);
            var property, val;
            for (var i = 0; i < properties.length; i++) {
                property = properties[i];
                val = styl[property];
                this.el.style[property] = val;
            }
            return this;
        };

        p.renewEl = function (el) {
            this.el = el;
            return this;
        };
    })(EasyStyle.prototype);

    return LoadingSprite;

}());
