/**
 * 🍞 Toastlet Notify
 * A lightweight JavaScript library for displaying beautiful toast notifications.
 * Visually inspired by PNotify 4+ with Bootstrap styling.
 * 
 * 📦 @version 1.1.0
 * 👤 @author Pedro Rigolin
 * 🔗 @repository https://github.com/pedrohrigolin/Toastlet-Notify-JS
 * 📝 @license MIT
 * 
 * ⚙️ Basic Usage:
 * toastletNotify.notify('success', 'Operation completed successfully');
 * 
 * 🎨 Supported Types:
 * - 🔔 notice - System announcements and general notifications
 * - ℹ️ info - Contextual tips and helpful explanations
 * - ✅ success - Successful operations
 * - ⚠️ warning - Warning contents
 * - ❌ error - Error notifications
 * 
 * 🧩 Advanced Usage:
 * toastletNotify.notify('success', 'Data saved!', {
 *   sticky: true,
 *   customClass: 'my-custom-toast',
 *   delay: 5000,
 *   transition: true,
 *   transitionDuration: 300,
 *   position: 'top-left',         // Desktop: top, top-right, top-left, bottom, bottom-right, bottom-left
 *   positionMobile: 'top'         // Mobile: top, bottom (overrides automatic adjustment)
 * });
 * 
 * 🌐 @namespace toastletNotify
 * 🛎️ @method notify
 * @param {string} type - Notification type: "info", "success", "warning", "error", or "notice"
 * @param {string} content - Text content to display (supports line breaks with \\n)
 * @param {Object} [options] - Optional configuration settings
 * @param {boolean} [options.sticky=false] - If true, notification won't auto-close
 * @param {number} [options.delay=5000] - Duration in milliseconds before auto-closing (ignored if sticky is true)
 * @param {string} [options.customClass] - Additional CSS classes for custom styling
 * @param {boolean} [options.transition=true] - Enable/disable transition animations
 * @param {number} [options.transitionDuration=300] - Duration of animations in milliseconds
 * @param {string} [options.position='top-right'] - Desktop position: "top", "top-right", "top-left", "bottom", "bottom-right", "bottom-left"
 * @param {string} [options.positionMobile] - Mobile position: "top", "bottom" (overrides automatic adjustment)
 * @param {string} content - Text content to display (supports line breaks with \n)
 * @param {Object} [options] - Optional configuration settings
 * @param {boolean} [options.sticky=false] - If true, notification won't auto-close
 * @param {number} [options.delay=5000] - Duration in milliseconds before auto-closing (ignored if sticky is true)
 * @param {string} [options.customClass] - Additional CSS classes for custom styling
 * @param {boolean} [options.transition=true] - Enable/disable transition animations
 * @param {number} [options.transitionDuration=300] - Duration of animations in milliseconds
 * 
 * 🧠 Smart Behavior:
 * - Only one notification is displayed at a time
 * - Timer automatically pauses on mouse hover, keyboard focus, or tab change
 * 
 * ♿ Accessibility (a11y):
 * - Full keyboard navigation and interaction (Tab, Enter, Space, Escape)
 * - ARIA roles for screen readers (alert/status)
 * - Descriptive labels for interactive elements
 * 
 * 📱 Mobile Support:
 * - Responsive design adapts to screen size
 * - Touch gestures for interaction (swipe to dismiss)
 * - Customizable mobile position
 * 
 * 🖱️ User Interaction:
 * - Hover to reveal controls
 * - Pause/resume timer button
 * - Close button to dismiss
 */
(() => {

    if(typeof toastletNotify !== 'undefined'){
        console.warn('Toastlet Notify is already defined!');
        return;
    }

    const objFreeze = Object.freeze( (obj) => { return Object.freeze(obj) } );

    const objFullKeys = Object.freeze( (obj) => { return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj) ] } );

    const toastletTypeValidators = Object.freeze({

        number: Object.freeze( function(value){

            return typeof value === 'number';

        }),

        unsignedNumber: Object.freeze( function(value){

            return typeof value === 'number' && value >= 0;

        }),

        string: Object.freeze( function(value){

            return typeof value === 'string';

        }),

        boolean: Object.freeze( function(value){

            return typeof value === 'boolean';

        }),

        plainObject: Object.freeze( function(value){

            return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;

        }),

        array: Object.freeze( function(value){

            return Array.isArray(value);

        }),

        function: Object.freeze( function(value){

            return typeof value === 'function';

        }),

        null: Object.freeze( function(value){

            return value === null;

        }),

        undefined: Object.freeze( function(value){

            return value === undefined;

        }),

        empty: Object.freeze( function(value){

            if(toastletTypeValidators.plainObject(value))
                return objFullKeys(value).length === 0;

            return value.length === 0;

        })

    });

    const toastletMatchMedia = Object.freeze({

        anyHover: window.matchMedia('(any-hover: hover)'),
        pointerFine: window.matchMedia('(any-pointer: fine)'),

    })

    const toastletHelpers = Object.freeze({

        isMobile: Object.freeze( function(){

            return !(window.innerWidth > 768 && toastletMatchMedia.anyHover.matches && toastletMatchMedia.pointerFine);

        }),

        mergeClasses: Object.freeze( function(...array){

            const classesArray = [];

            const arrayLength = array.length;

            for(let i=0; i<arrayLength; i++){

                if( ! toastletTypeValidators.array(array[i]) ) continue;

                const subArrayLength = array[i].length;

                for(let j=0; j<subArrayLength; j++){

                    if( ! toastletTypeValidators.string(array[i][j]) ) continue;

                    const string = array[i][j].replace(/[\s\p{Z}]+/, '');

                    if( classesArray.includes(string) ) continue;

                    classesArray.push(string);

                }

            }

            return classesArray;

        }),        

        explodeClasses: Object.freeze( function(...string){

            const classesArray = [];

            const stringLength = string.length;

            for(let i=0; i<stringLength; i++){

                if( ! toastletTypeValidators.string(string[i]) ) continue;

                const classString = string[i].replace(/[\s\p{Z}]+/, ' ').trim();

                const stringArray = classString.split(/\s+/);

                const stringArrayLength = stringArray.length;

                for(let j=0; j<stringArrayLength; j++){

                    stringArray[j] = stringArray[j].replace(/[\s\p{Z}]+/, ' ').trim();

                    if( classesArray.includes(stringArray[j]) ) continue;

                    classesArray.push(stringArray[j]);

                }

            }

            return classesArray;

        }),

        implodeClasses: Object.freeze( function(...array){

            return toastletHelpers.mergeClasses(...array).join(' ');

        }),

    });

    // !! REMOVE AFTER TESTS!
    window.toastletHelpers = toastletHelpers;
    window.toastletTypeValidators = toastletTypeValidators;
    window.objFreeze = objFreeze;
    window.objFullKeys = objFullKeys;

    const toastletInstances = Object.seal({

        all: new Map(), // Store all toast elements by ID

        nonStackable: new Map(), // Store non-stackable toast IDs

        stackable: new Map(), // Store stackable toast IDs

        id: 0,

        lastId: 0,

        push: Object.freeze( function(toastInstance){

            if(toastInstance === undefined || toastInstance === null) return;

            toastletInstances.all.set(toastletInstances.id, toastInstance);

            toastletInstances.lastId = toastletInstances.id;

            toastletInstances.id++;

            if( toastInstance.config.stackable )
                toastletInstances.stackable.set(toastletInstances.lastId, toastInstance);
            else
                toastletInstances.nonStackable.set(toastletInstances.lastId, toastInstance);

        }),

        delete: Object.freeze( function(id){

            if( toastletInstances.all.has(id) ) toastletInstances.all.delete(id);

            if( toastletInstances.stackable.has(id) ) toastletInstances.stackable.delete(id);

            if( toastletInstances.nonStackable.has(id) ) toastletInstances.nonStackable.delete(id);

        }),

        getLastActiveId: Object.freeze( function(){

            let lastId = toastletInstances.lastId;

            for( const [id] of toastletInstances.all ) lastId = id;

            return lastId;

        })

    });

    Object.defineProperty(window, 'toastletNotify', {

        value: Object.freeze({

            icons: Object.freeze({

                pause: `<svg class="toastlet-icon-svg toastlet-icon-pause" width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>`,

                play: `<svg class="toastlet-icon-svg toastlet-icon-play" width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>`,

                close: `<svg class="toastlet-icon-close toastlet-icon-svg" fill=#FFFFFF height=16 viewBox="-53 23 490 490" width=16 xmlns=http://www.w3.org/2000/svg><path d="M374.3 85.3c-21.9-21.9-57.5-21.9-79.4 0L192 188.1 89.1 85.3c-21.9-21.9-57.5-21.9-79.4 0s-21.9 57.5 0 79.4L112.6 267.5 9.7 370.3c-21.9 21.9-21.9 57.5 0 79.4s57.5 21.9 79.4 0L192 346.9l102.9 102.8c21.9 21.9 57.5 21.9 79.4 0s21.9-57.5 0-79.4L271.4 267.5 374.3 164.7c21.9-21.9 21.9-57.5 0-79.4z"/></svg>`

            }),

            styles: Object.freeze({

                toast: Object.freeze({

                    desktop: `overflow:hidden;margin:0;padding:15px;z-index:999999;color:#fff;box-shadow:0 6px 28px 0 rgb(0 0 0 / .1);display:grid;justify-content:space-between;opacity:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1;touch-action:pan-y;-webkit-tap-highlight-color:transparent;user-select:none;`,
                    
                    mobile: `overflow:hidden;margin:0;padding:15px;z-index:999999;color:#fff;box-shadow:0 6px 28px 0 rgb(0 0 0 / .1);display:grid;justify-content:space-between;opacity:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1;margin:0;touch-action:pan-y;-webkit-tap-highlight-color:transparent;user-select:none;`

                }),

                iconCol: `padding:0;display:flex;align-items:flex-start;`,

                iconContainer: `display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;width:fit-content;height:fit-content;`,

                contentCol: `padding:0;display:flex;flex-direction:column;gap:10px;height:100%;`,
                
                title: `font-weight:600;font-size:18px;line-height:1;margin:0;padding:0;`,
                
                text: `word-break:break-word;white-space:pre-line;font-weight:400;line-height:1.5;margin:0;padding:0;height:100%;display:flex;align-content:center;flex-wrap:wrap;`,
                    
                controlCol: `padding:0;display:flex;gap:12px;align-items:flex-start;transition:all 0.2s ease-in-out;`,

                pauseButton: `display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;width:fit-content;height:fit-content;background:none;border:none;cursor:pointer;padding:0 2px;-webkit-tap-highlight-color:transparent;user-select:none;`,

                closeButton: `display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;width:fit-content;height:fit-content;background:none;border:none;cursor:pointer;padding:0 2px;-webkit-tap-highlight-color:transparent;user-select:none;`,

                progressBar: `background-color:rgba(0,0,0,.15);`,

                progressBarThumb: `background-color:rgba(255, 255, 255, 0.7);`
                
            }),

            typeMap: Object.freeze({

                warning: Object.freeze({
                    type: 'warning',
                    color: '#F39C12', 
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`,
                    name: 'Warning',
                    class: 'toastlet-warning',
                    role: 'alert',
                    ariaLive: 'assertive',
                    config: Object.freeze({
                        a11y: {
                            role: 'alert',
                            ariaLive: 'assertive',
                        },
                        titleText: 'Warning'
                    })
                }),

                info: Object.freeze({
                    type: 'info',
                    color: '#3498DB', 
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>`,
                    name: 'Info',
                    class: 'toastlet-info',
                    role: 'status',
                    ariaLive: 'polite',
                    config: Object.freeze({
                        a11y: {
                            role: 'status',
                            ariaLive: 'polite'
                        },
                        titleText: 'Info'
                    })
                }),

                success: Object.freeze({
                    type: 'success',
                    color: '#00bc8c', 
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>`,
                    name: 'Success!',
                    class: 'toastlet-success',
                    role: 'status',
                    ariaLive: 'polite',
                    config: Object.freeze({
                        a11y: {
                            role: 'status',
                            ariaLive: 'polite'
                        },
                        titleText: 'Success!'
                    })
                }),

                error: Object.freeze({
                    type: 'error',
                    color: '#E74C3C', 
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 576 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`,
                    name: 'Error!',
                    class: 'toastlet-error',
                    role: 'alert',
                    ariaLive: 'assertive',
                    config: Object.freeze({
                        a11y: {
                            role: 'alert',
                            ariaLive: 'assertive'
                        },
                        titleText: 'Error!'
                    })
                }),

                notice: Object.freeze({
                    type: 'notice',
                    color: '#708090', 
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>`,
                    name: 'Notice',
                    class: 'toastlet-notice',
                    role: 'status',
                    ariaLive: 'polite',
                    config: Object.freeze({
                        a11y: {
                            role: 'status',
                            ariaLive: 'polite'
                        },
                        titleText: 'Notice'
                    })
                }),

                loading: Object.freeze({
                    type: 'loading',
                    color: '#1a6394',
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18px" height="18px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke-width="10" stroke-linecap="round" stroke="#FFFFFF" cx="33" cy="33" r="28" stroke-dasharray="94 94"><animateTransform attributeName="transform" type="rotate" from="0 33 33" to="360 33 33" dur="1s" repeatCount="indefinite" /></circle></svg>`,
                    name: 'Loading...',
                    class: 'toastlet-loading',
                    role: 'status',
                    ariaLive: 'polite',
                    config: Object.freeze({
                        dismissible: false,
                        sticky: true,
                        a11y: {
                            role: 'status',
                            ariaLive: 'polite'
                        },
                        titleText: 'Loading...'
                    })
                }),

                custom: Object.freeze({
                    type: 'custom',
                    color: '#4A4A4A',
                    icon: `<svg class="toastlet-icon-svg toastlet-icon-type" width="18" height="18" viewBox="0 0 576 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"/></svg>`,
                    name: 'Custom',
                    class: 'toastlet-custom',
                    role: 'status',
                    ariaLive: 'polite',
                    config: Object.freeze({
                        a11y: {
                            role: 'status',
                            ariaLive: 'polite',
                        },
                        titleText: 'Custom'
                    })
                }),

                get: Object.freeze( function(type){

                    if (typeof type !== 'string') return false;

                    type = type.replace(/[^a-zA-Z]/g, '').toLowerCase();

                    if( ! toastletNotify.typeMap.hasOwnProperty(type) ) return false;

                    return toastletNotify.typeMap[type];

                })

            }),

            progressBarMap: Object.freeze({

                available: Object.freeze({

                    righttoleft: Object.freeze({
                        name: 'right-to-left',
                        flexDirection: 'row-reverse',
                        start: '0%',
                        end: '100%'
                    }),

                    lefttoright: Object.freeze({
                        name: 'left-to-right',
                        flexDirection: 'row',
                        start: '0%',
                        end: '100%'
                    })

                }),

                array: Object.freeze(['right-to-left', 'left-to-right']),

                get: Object.freeze( function(direction){

                    if (typeof direction !== 'string') return false;

                    direction = direction.replace(/[^a-zA-Z]/g, '').toLowerCase();

                    if( ! toastletNotify.progressBarMap.available.hasOwnProperty(direction) ) return false;

                    return toastletNotify.progressBarMap.available[direction];

                })

            }),

            configValidators: Object.freeze({
                
                sticky: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.sticky) ){
                        console.warn(`[ToastletNotify] Warning: Option 'sticky' must be a boolean\n  Received: ${typeof userConfig.sticky}\n  Using default value: ${defaultConfig.sticky}`);
                        userConfig.sticky = defaultConfig.sticky;
                    }

                }),

                duration: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.unsignedNumber(userConfig.duration) ){
                        console.warn(`[ToastletNotify] Warning: Option 'duration' must be an unsigned number\n  Received: ${typeof userConfig.duration}, ${userConfig.duration}\n  Using default value: ${defaultConfig.duration}`);
                        userConfig.duration = defaultConfig.duration;
                    }

                }),

                dismissible: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.dismissible) ){
                        console.warn(`[ToastletNotify] Warning: Option 'dismissible' must be a boolean\n  Received: ${typeof userConfig.dismissible}\n  Using default value: ${defaultConfig.dismissible}`);
                        userConfig.dismissible = defaultConfig.dismissible;
                    }

                }),

                stackable: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.stackable) ){
                        console.warn(`[ToastletNotify] Warning: Option 'stackable' must be a boolean\n  Received: ${typeof userConfig.stackable}\n  Using default value: ${defaultConfig.stackable}`);
                        userConfig.stackable = defaultConfig.stackable;
                    }

                }),

                stackableGap: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.stackableGap) ){
                        console.warn(`[ToastletNotify] Warning: Option 'stackableGap' must be a plain object\n  Received: ${typeof userConfig.stackableGap}, ${userConfig.stackableGap}\n  Using default value: ${JSON.stringify(defaultConfig.stackableGap)}`);
                        userConfig.stackableGap = defaultConfig.stackableGap;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.stackableGap = {...userConfig.stackableGap};

                    for(const [key, value] of Object.entries(userConfig.stackableGap)){

                        if( ! defaultConfig.stackableGap.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'stackableGap' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.stackableGap[key];
                            continue;
                        }

                        if( ! toastletTypeValidators.unsignedNumber(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'stackableGap.${key}' must be an unsigned number\n  Received: ${typeof value}, ${value}\n  Using default value: ${defaultConfig.stackableGap[key]}`);
                            userConfig.stackableGap[key] = defaultConfig.stackableGap[key];
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.stackableGap)){

                        if( ! userConfig.stackableGap.hasOwnProperty(key) )
                            userConfig.stackableGap[key] = value;

                    }

                }),

                html: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.html) ){
                        console.warn(`[ToastletNotify] Warning: Option 'html' must be a boolean\n  Received: ${typeof userConfig.html}\n  Using default value: ${defaultConfig.html}`);
                        userConfig.html = defaultConfig.html;
                    }

                }),

                icon: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.icon) ){
                        console.warn(`[ToastletNotify] Warning: Option 'icon' must be a boolean\n  Received: ${typeof userConfig.icon}\n  Using default value: ${defaultConfig.icon}`);
                        userConfig.icon = defaultConfig.icon;
                    }

                }),

                title: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.boolean(userConfig.title) ){
                        console.warn(`[ToastletNotify] Warning: Option 'title' must be a boolean\n  Received: '${typeof userConfig.title}'\n  Using default value: '${defaultConfig.title}'`);
                        userConfig.title = defaultConfig.title;
                    }

                }),

                titleText: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.string(userConfig.titleText) ){
                        console.warn(`[ToastletNotify] Warning: Option 'titleText' must be a string\n  Received: '${typeof userConfig.titleText}'\n  Using default value: '${defaultConfig.titleText}'`);
                        userConfig.titleText = defaultConfig.titleText;
                    }

                }),

                customClass: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.string(userConfig.customClass) ){
                        console.warn(`[ToastletNotify] Warning: Option 'customClass' must be a string\n  Received: '${typeof userConfig.customClass}'\n  Using default value: '${defaultConfig.customClass}'`);
                        userConfig.customClass = defaultConfig.customClass;
                    }

                }),

                transition: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.transition) ){
                        console.warn(`[ToastletNotify] Warning: Option 'transition' must be a plain object\n  Received: ${typeof userConfig.transition}, ${userConfig.transition}\n  Using default value: ${JSON.stringify(defaultConfig.transition)}`);
                        userConfig.transition = defaultConfig.transition;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.transition = {...userConfig.transition};

                    for(const [key, value] of Object.entries(userConfig.transition)){

                        if( ! defaultConfig.transition.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'transition' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.transition[key];
                            continue;
                        }

                        if( key === 'enabled' && ! toastletTypeValidators.boolean(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'transition.enabled' must be a boolean\n  Received: ${typeof value}\n  Using default value: ${defaultConfig.transition.enabled}`);
                            userConfig.transition.enabled = defaultConfig.transition.enabled;
                            continue;
                        }

                        if( key === 'duration' && ! toastletTypeValidators.unsignedNumber(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'transition.duration' must be an unsigned number\n  Received: ${typeof value}, ${value}\n  Using default value: ${defaultConfig.transition.duration}`);
                            userConfig.transition.duration = defaultConfig.transition.duration;
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.transition)){

                        if( ! userConfig.transition.hasOwnProperty(key) )
                            userConfig.transition[key] = value;

                    }

                }),

                animation: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.animation) ){
                        console.warn(`[ToastletNotify] Warning: Option 'animation' must be a plain object\n  Received: ${typeof userConfig.animation}, ${userConfig.animation}\n  Using default value: ${JSON.stringify(defaultConfig.animation)}`);
                        userConfig.animation = defaultConfig.animation;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.animation = {...userConfig.animation};

                    for(const [key, value] of Object.entries(userConfig.animation)){

                        if( ! defaultConfig.animation.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'animation' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.animation[key];
                            continue;
                        }

                        if( ! toastletTypeValidators.string(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'animation.${key}' must be a string\n  Received: '${typeof value}'\n  Using default value: '${defaultConfig.animation[key]}'`);
                            userConfig.animation[key] = defaultConfig.animation[key];
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.animation)){

                        if( ! userConfig.animation.hasOwnProperty(key) )
                            userConfig.animation[key] = value;

                    }

                }),

                pause: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.pause) ){
                        console.warn(`[ToastletNotify] Warning: Option 'pause' must be a plain object\n  Received: ${typeof userConfig.pause}, ${userConfig.pause}\n  Using default value: ${JSON.stringify(defaultConfig.pause)}`);
                        userConfig.pause = defaultConfig.pause;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.pause = {...userConfig.pause};

                    for(const [key, value] of Object.entries(userConfig.pause)){

                        if( ! defaultConfig.pause.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'pause' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.pause[key];
                            continue;
                        }

                        if( ! toastletTypeValidators.boolean(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'pause.${key}' must be a boolean\n  Received: ${typeof value}\n  Using default value: ${defaultConfig.pause[key]}`);
                            userConfig.pause[key] = defaultConfig.pause[key];
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.pause)){

                        if( ! userConfig.pause.hasOwnProperty(key) )
                            userConfig.pause[key] = value;

                    }

                }),

                progressBar: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.progressBar) ){
                        console.warn(`[ToastletNotify] Warning: Option 'progressBar' must be a plain object\n  Received: ${typeof userConfig.progressBar}, ${userConfig.progressBar}\n  Using default value: ${JSON.stringify(defaultConfig.progressBar)}`);
                        userConfig.progressBar = defaultConfig.progressBar;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.progressBar = {...userConfig.progressBar};

                    for(const [key, value] of Object.entries(userConfig.progressBar)){

                        if( ! defaultConfig.progressBar.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'progressBar' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.progressBar[key];
                            continue;
                        }

                        if( key === 'enabled' && ! toastletTypeValidators.boolean(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'progressBar.enabled' must be a boolean\n  Received: ${typeof value}\n  Using default value: ${defaultConfig.progressBar.enabled}`);
                            userConfig.progressBar.enabled = defaultConfig.progressBar.enabled;
                            continue;
                        }

                        if( key === 'direction' && ! toastletNotify.progressBarMap.get(value) ){
                            console.warn(`[ToastletNotify] Warning: Option 'progressBar.direction' must be one of: ${toastletNotify.progressBarMap.array.join(', ')}\n  Received: ${typeof value}, '${value}'\n  Using default value: '${defaultConfig.progressBar.direction}'`);
                            userConfig.progressBar.direction = defaultConfig.progressBar.direction;
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.progressBar)){
                        
                        if( ! userConfig.progressBar.hasOwnProperty(key) )
                            userConfig.progressBar[key] = value;

                    }

                    userConfig.progressBar.data = toastletNotify.progressBarMap.get(userConfig.progressBar.direction);

                }),

                position: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.plainObject(userConfig.position) ){
                        console.warn(`[ToastletNotify] Warning: Option 'position' must be a plain object\n  Received: ${typeof userConfig.position}, ${userConfig.position}\n  Using default value: ${JSON.stringify(defaultConfig.position)}`);
                        userConfig.position = defaultConfig.position;
                        return;
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.position = {...userConfig.position};

                    for(const key of Object.keys(userConfig.position)){

                        if( ! defaultConfig.position.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'position' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.position[key];
                        }

                    }

                    const defaultDesktopPosition = toastletNotify.getPosition.desktop(defaultConfig.position.desktop);

                    defaultConfig.position.mobile = defaultDesktopPosition.mobile;

                    for(const [key, value] of Object.entries(defaultConfig.position)){

                        if( ! userConfig.position.hasOwnProperty(key) )
                            userConfig.position[key] = value;

                    }

                    let desktopPosition = toastletNotify.getPosition.desktop(userConfig.position.desktop);

                    if( ! desktopPosition ){
                        console.warn(`[ToastletNotify] Warning: Invalid desktop position '${userConfig.position.desktop}'\n  Valid positions: ${toastletNotify.getPosition.available.array.desktop.join(', ')}\n  Using default position: '${defaultConfig.position.desktop}'`);
                        desktopPosition = defaultDesktopPosition;
                        userConfig.position.desktop = desktopPosition.name;                       
                    }

                    let mobilePosition = toastletNotify.getPosition.mobile(userConfig.position.mobile);
                    
                    if( ! mobilePosition ){
                        console.warn(`[ToastletNotify] Warning: Invalid mobile position '${userConfig.position.mobile}'\n  Valid positions: ${toastletNotify.getPosition.available.array.mobile.join(', ')}\n  Using default position: '${defaultConfig.position.mobile}'`);
                        mobilePosition = toastletNotify.getPosition.mobile(defaultConfig.position.mobile);
                        userConfig.position.mobile = mobilePosition.name;
                    }

                    userConfig.position.data = {};

                    userConfig.position.data.desktop = desktopPosition;

                    userConfig.position.data.mobile = mobilePosition;

                }),

                a11y: Object.freeze( function(defaultConfig, userConfig){
                    
                    if( defaultConfig.notificationType.type !== 'custom' ){
                        console.warn(`[ToastletNotify] Warning: Option 'a11y' can only be used with notification type 'custom'\n  Received type: '${defaultConfig.notificationType.type}'\n  This property will be removed.`);
                        delete userConfig.a11y;
                        return;                        
                    }

                    if( ! toastletTypeValidators.plainObject(userConfig) ){
                        console.warn(`[ToastletNotify] Warning: Option 'a11y' must be a plain object\n  Received: ${typeof userConfig.a11y}, ${userConfig.a11y}\n  Using default value: ${JSON.stringify(defaultConfig.a11y)}`);
                        userConfig.a11y = defaultConfig.a11y;
                        return;                        
                    }

                    // Extract only enumerable properties and not symbols keys properties
                    userConfig.a11y = {...userConfig.a11y};

                    for(const [key, value] of Object.entries(userConfig.a11y)){

                        if( ! defaultConfig.a11y.hasOwnProperty(key) ){
                            console.warn(`[ToastletNotify] Warning: Option 'a11y' has unknown property '${key}'\n  This property will be removed.`);
                            delete userConfig.a11y[key];
                            continue;
                        }                        

                        if( key === 'role' && value !== 'status' && value !== 'alert' ){
                            console.warn(`[ToastletNotify] Warning: Option 'a11y.role' must be either 'status' or 'alert'\n  Received: '${value}'\n  Using default value: '${defaultConfig.a11y.role}'`);
                            userConfig.a11y.role = defaultConfig.a11y.role;
                            continue;
                        }

                        if( key === 'ariaLive' && value !== 'polite' && value !== 'assertive' ){
                            console.warn(`[ToastletNotify] Warning: Option 'a11y.ariaLive' must be either 'polite' or 'assertive'\n  Received: '${value}'\n  Using default value: '${defaultConfig.a11y.ariaLive}'`);
                            userConfig.a11y.ariaLive = defaultConfig.a11y.ariaLive;
                            continue;
                        }

                    }

                    for(const [key, value] of Object.entries(defaultConfig.a11y)){

                        if( ! userConfig.a11y.hasOwnProperty(key) )
                            userConfig.a11y[key] = value;

                    }                    

                }),

                onClick: Object.freeze( function(defaultConfig, userConfig){

                    if( ! toastletTypeValidators.function(userConfig.onClick) && ! toastletTypeValidators.null(userConfig.onClick) ){
                        console.warn(`[ToastletNotify] Warning: Option 'onClick' must be a function or null\n  Received: ${typeof userConfig.onClick}\n  Using default value: ${defaultConfig.onClick === null ? 'null' : 'function'}`);
                        userConfig.onClick = defaultConfig.onClick;
                    }

                })

            }),

            sanitizeConfig: Object.freeze( function(defaultConfig, userConfig){

                // Safety copy to avoid mutating the original object
                const defaultConfigCopy = {...defaultConfig};

                // Safety copy to avoid mutating the original object, and extract only
                // enumerable properties and not symbols key properties
                const userConfigCopy = {...userConfig};

                for(const key of Object.keys(userConfigCopy)){

                    if( ! defaultConfigCopy.hasOwnProperty(key) || key === 'notificationType' ){
                        console.warn(`[ToastletNotify] Warning: Unknown option '${key}'\n  This property will be removed.`);
                        delete userConfigCopy[key];
                        continue;                      
                    }

                    toastletNotify.configValidators[key](defaultConfigCopy, userConfigCopy);

                }

                const finalConfig = {
                    ...defaultConfigCopy,
                    ...userConfigCopy
                }

                delete finalConfig.notificationType;

                return finalConfig;

            }),

            timeouts: Object.freeze({

                clearTimer: Object.freeze( function(toastInstance){

                    if(!toastInstance.timeoutId) return;
                    
                    clearTimeout(toastInstance.timeoutId);
                    
                    toastInstance.timeoutId = null;

                    if(toastInstance.config.progressBar) {

                        const actualWidth = ( toastInstance.progressBarThumb.getBoundingClientRect().width / toastInstance.progressBar.getBoundingClientRect().width ) * 100;

                        toastInstance.progressBarThumb.style.setProperty('width', `${actualWidth}%`, 'important');
                        toastInstance.progressBarThumb.style.setProperty('transition', 'none', 'important');

                        void toastInstance.progressBarThumb.offsetWidth; // Force reflow

                    }
                    
                }),             
                
                startTimer: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        toastInstance.isClosing || 
                        toastInstance.isSticky ||
                        toastInstance.isPausedByButton ||
                        toastInstance.isHovered ||
                        toastInstance.isFocusHovered ||
                        document.visibilityState === 'hidden'
                    ) return;

                    toastletNotify.timeouts.clearTimer(toastInstance);

                    if(toastInstance.config.progressBar) {

                        toastInstance.progressBarThumb.style.setProperty('width', toastInstance.progressBarConfig.start, 'important');
                        toastInstance.progressBarThumb.style.setProperty('transition', 'none', 'important');

                        void toastInstance.progressBarThumb.offsetWidth; // Force reflow

                        toastInstance.progressBarThumb.style.setProperty('transition', toastInstance.transitionRule.progressBar.join(' '), 'important');

                        toastInstance.progressBarThumb.style.setProperty('width', toastInstance.progressBarConfig.end, 'important');

                        void toastInstance.progressBarThumb.offsetWidth; // Force reflow

                    }

                    toastInstance.timeoutId = setTimeout(toastletNotify.utils.closeToast, toastInstance.config.duration, toastInstance);

                }),

                pointerEvent: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.isPointerEvent = false;

                }),

                touchEvent: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.isTouchEvent = false;

                }),

                clickInProgress: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.isClickInProgress = false;

                }),

                focusin: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.isFocusHovered = true;

                    toastletNotify.utils.shButtons(toastInstance);

                    toastletNotify.timeouts.clearTimer(toastInstance);                    

                }),

                focusout: Object.freeze( function(toastInstance){
                
                    if(toastInstance.toast === undefined || toastInstance.isClosing || toastInstance.toast.contains(document.activeElement)) return;

                    toastInstance.isFocusHovered = false;
                    
                    toastletNotify.utils.shButtons(toastInstance);

                    toastletNotify.timeouts.startTimer(toastInstance);                    

                }),
                
                blur: Object.freeze( function(toastInstance, blurElement){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    if(blurElement === undefined || blurElement === null) return;

                    blurElement.blur();

                }),

                focus: Object.freeze( function(toastInstance, focusElement){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    if(focusElement === undefined || focusElement === null) return;

                    focusElement.focus();

                }),

                remove: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined) return;

                    toastInstance.isClosing = true;

                    toastletNotify.timeouts.clearTimer(toastInstance);

                    let keys = objFullKeys(toastInstance.handles);
                    
                    let i = keys.length;

                    while(i--) {

                        const key = keys[i];

                        if(
                            toastInstance.handles[key].type &&
                            toastInstance.handles[key].obj &&
                            toastInstance.handles[key].fn
                        ){

                            toastInstance.handles[key].obj.removeEventListener(
                                toastInstance.handles[key].type,
                                toastInstance.handles[key].fn
                            );

                        }

                    }

                    toastInstance.toast.remove();

                    toastInstance.observerBody.disconnect();
                    toastInstance.observerHtml.disconnect();

                    toastletInstances.delete(toastInstance.id);

                    keys = objFullKeys(toastInstance);

                    i = keys.length;

                    while(i--) delete toastInstance[keys[i]];

                })

            }),
            
            animation: Object.freeze({

                setAnimationIn: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        toastInstance.isClosing || 
                        ! toastInstance.animationIn || 
                        toastInstance.animationInClassList === 0
                    ) return;
                    
                    const classList = [...toastInstance.classList.desktop, ...toastInstance.classList.mobile, ...toastInstance.animationInClassList, ...toastInstance.animationOutClassList];

                    for(let i = 0, len = classList.length; i < len; i++) {

                        if( toastInstance.toast.classList.contains(classList[i]) ) 
                            toastInstance.toast.classList.remove(classList[i]);

                    }

                    const mode = toastletNotify.utils.isMobile(toastInstance) ? 'mobile' : 'desktop';

                    const modeClassList = [...toastInstance.classList[mode], ...toastInstance.animationInClassList];
                    
                    const elClassList = toastInstance.toast.classList;

                    for(let i = 0, len = elClassList.length; i < len; i++) {

                        if( modeClassList.includes(elClassList[i]) ) continue;
                            
                        modeClassList.push(elClassList[i]);

                    }

                    toastInstance.toast.className = modeClassList.join(' ').replace(/[\s\p{Z}]+/gu, ' ').trim();

                    toastInstance.toast.style.setProperty('animation-play-state', 'paused', 'important');

                    void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                }),

                setAnimationOut: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        ! toastInstance.isClosing || 
                        ! toastInstance.animationOut || 
                        toastInstance.animationOutClassList === 0
                    ) return;

                    const classList = [...toastInstance.classList.desktop, ...toastInstance.classList.mobile, ...toastInstance.animationInClassList, ...toastInstance.animationOutClassList];

                    for(let i = 0, len = classList.length; i < len; i++) {

                        if( toastInstance.toast.classList.contains(classList[i]) ) 
                            toastInstance.toast.classList.remove(classList[i]);

                    }

                    const mode = toastletNotify.utils.isMobile(toastInstance) ? 'mobile' : 'desktop';

                    const modeClassList = [...toastInstance.classList[mode], ...toastInstance.animationOutClassList];
                
                    const elClassList = toastInstance.toast.classList;

                    for(let i = 0, len = elClassList.length; i < len; i++) {

                        if( modeClassList.includes(elClassList[i]) ) continue;
                            
                        modeClassList.push(elClassList[i]);

                    }

                    toastInstance.toast.className = modeClassList.join(' ').replace(/[\s\p{Z}]+/gu, ' ').trim();

                    toastInstance.toast.style.setProperty('animation-play-state', 'paused', 'important');

                    void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                }),

                getAnimationDuration: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined) return 0;

                    const computedStyle = window.getComputedStyle(toastInstance.toast);

                    const animationName = computedStyle.animationName;

                    if(animationName === 'none' || animationName.length === 0)
                        return toastInstance.config.transitionDuration;

                    const animationDuration = computedStyle.animationDuration.replace(/[\s\p{Z}]+/gu, '').split(',');

                    const animationDelay = computedStyle.animationDelay.replace(/[\s\p{Z}]+/gu, '').split(',');

                    const totalTime = [];

                    for( let i = 0, len = animationDuration.length; i < len; i++ ){

                        const duration = parseFloat(animationDuration[i] || 0) * 1000;

                        const delay = parseFloat(animationDelay[i] || 0) * 1000;

                        let total = 0;

                        if( ! isNaN(duration) && typeof duration === 'number' )
                            total = total + duration;

                        if( ! isNaN(delay) && typeof delay === 'number' )
                            total = total + delay;

                        totalTime.push(total);

                    }

                    if(totalTime.length === 0) return 0;

                    const maxTime = Math.max(...totalTime);

                    return maxTime;

                }),

                runAnimationIn: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        toastInstance.isClosing
                    ) return;

                    const computedStyle = window.getComputedStyle(toastInstance.toast);

                    const animationName = computedStyle.animationName;

                    const customAnimation = (
                        toastInstance.animationIn && 
                        toastInstance.animationInClassList.length > 0 && 
                        animationName !== 'none' && 
                        animationName.length > 0
                    );

                    if( customAnimation ){
                        toastInstance.toast.style.setProperty('animation-play-state', 'running', 'important');
                    }
                    else {
                        toastInstance.toast.style.opacity = '1';
                        toastInstance.toast.style.transform = 'translate(0px, 0px)';
                    }

                    void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                }),

                runAnimationOut: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        ! toastInstance.isClosing
                    ) return;

                    const computedStyle = window.getComputedStyle(toastInstance.toast);

                    const animationName = computedStyle.animationName;

                    const customAnimation = (
                        toastInstance.animationOut && 
                        toastInstance.animationOutClassList.length > 0 && 
                        animationName !== 'none' && 
                        animationName.length > 0
                    );

                    if( customAnimation ){
                        toastInstance.toast.style.setProperty('animation-play-state', 'running', 'important');
                    }
                    else {
                        toastInstance.toast.style.opacity = '0';
                        toastInstance.toast.style.transform = `translate(${toastInstance.translateOutX}, ${toastInstance.translateOutY})`;
                    }

                    void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                })

            }),
            
            rAF: Object.freeze({

                restoreTransition: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.toast.style.setProperty('transition', toastInstance.transitionRule.toast.join(' '));

                    toastInstance.rAF.restoreTransition.isScheduled = false;

                }),

                enterElement: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    const animationDuration = toastletNotify.animation.getAnimationDuration(toastInstance);

                    toastletNotify.animation.runAnimationIn(toastInstance);

                    setTimeout(toastletNotify.timeouts.startTimer, animationDuration + 20, toastInstance);

                })

            }),
            
            setPosition: Object.freeze({

                progressBar: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        toastInstance.isClosing || 
                        toastInstance.isSticky || 
                        ! toastInstance.config.progressBar ||
                        toastInstance.progressBar === undefined ||
                        toastInstance.progressBarThumb === undefined
                    ) return;

                    toastInstance.progressBar.style.setProperty('display', 'flex', 'important');
                    toastInstance.progressBar.style.setProperty('flex-direction', toastInstance.progressBarConfig.flexDirection, 'important');
                    toastInstance.progressBar.style.setProperty('flex-wrap', 'nowrap', 'important');
                    toastInstance.progressBar.style.setProperty('align-items', 'center', 'important');
                    toastInstance.progressBar.style.setProperty('justify-content', 'normal', 'important');
                    toastInstance.progressBar.style.setProperty('transition', 'none', 'important');
                    toastInstance.progressBar.style.setProperty('padding', '0', 'important');
                    toastInstance.progressBar.style.setProperty('gap', '0', 'important');
                    toastInstance.progressBar.style.setProperty('margin', '0', 'important');
                    toastInstance.progressBar.style.setProperty('position', 'absolute', 'important');
                    toastInstance.progressBar.style.setProperty('bottom', '0', 'important');
                    toastInstance.progressBar.style.setProperty('left', '0', 'important');
                    toastInstance.progressBar.style.setProperty('width', '100%', 'important');
                    toastInstance.progressBar.style.setProperty('height', '5px');
                    toastInstance.progressBarThumb.style.setProperty('display', 'flex', 'important');
                    toastInstance.progressBarThumb.style.setProperty('flex-direction', 'row', 'important');
                    toastInstance.progressBarThumb.style.setProperty('flex-wrap', 'nowrap', 'important');
                    toastInstance.progressBarThumb.style.setProperty('align-items', 'center', 'important');
                    toastInstance.progressBarThumb.style.setProperty('justify-content', 'normal', 'important');
                    toastInstance.progressBarThumb.style.setProperty('padding', '0', 'important');
                    toastInstance.progressBarThumb.style.setProperty('gap', '0', 'important');
                    toastInstance.progressBarThumb.style.setProperty('margin', '0', 'important');
                    toastInstance.progressBarThumb.style.setProperty('position', 'relative', 'important');
                    toastInstance.progressBarThumb.style.setProperty('height', '100%', 'important');

                }),

                desktop: Object.freeze( {

                    setDefault: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastInstance.toast.style.setProperty('transition', 'none', 'important');
                        toastInstance.toast.style.setProperty('position', 'fixed', 'important');
                        toastInstance.toast.style.setProperty('min-height', toastInstance.defaultDimensions.desktop.minHeight);
                        toastInstance.toast.style.setProperty('max-height', toastInstance.defaultDimensions.desktop.maxHeight);
                        toastInstance.toast.style.setProperty('min-width', toastInstance.defaultDimensions.desktop.minWidth);
                        toastInstance.toast.style.setProperty('max-width', toastInstance.defaultDimensions.desktop.maxWidth);
                        toastInstance.toast.style.setProperty('width', toastInstance.defaultDimensions.desktop.width);
                        toastInstance.toast.style.setProperty('height', toastInstance.defaultDimensions.desktop.height);
                        toastInstance.toast.style.setProperty('border-radius', '5px');

                        toastletNotify.setPosition.progressBar(toastInstance);

                        const classList = [...toastInstance.classList.desktop, ...toastInstance.classList.mobile, ...toastInstance.animationInClassList, ...toastInstance.animationOutClassList];
                        
                        for(let i = 0, len = classList.length; i < len; i++) {

                            if( toastInstance.toast.classList.contains(classList[i]) ) 
                                toastInstance.toast.classList.remove(classList[i]);

                        }

                        const modeClassList = [...toastInstance.classList.desktop];

                        const elClassList = toastInstance.toast.classList;

                        for(let i = 0, len = elClassList.length; i < len; i++) {

                            if( modeClassList.includes(elClassList[i]) ) continue;
                                
                            modeClassList.push(elClassList[i]);

                        }

                        toastInstance.toast.className = modeClassList.join(' ').replace(/[\s\p{Z}]+/gu, ' ').trim();

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        if( ! toastInstance.rAF.restoreTransition.isScheduled ) {
                            toastInstance.rAF.restoreTransition.isScheduled = true;
                            requestAnimationFrame(toastInstance.rAF.restoreTransition.fn);
                        }

                    }),

                    topRight: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        toastInstance.toast.style.setProperty('top', '20px');
                        toastInstance.toast.style.setProperty('right', '20px');
                        toastInstance.toast.style.setProperty('left', 'auto');
                        toastInstance.toast.style.setProperty('bottom', 'auto');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '-20px';

                    }),

                    topMiddle: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        const toastWidth = toastInstance.toast.getBoundingClientRect().width;

                        toastInstance.toast.style.setProperty('top', '20px');
                        toastInstance.toast.style.setProperty('left', `calc(50vw - ${toastWidth/2}px)`);
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('bottom', 'auto');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '-20px';

                    }),

                    topLeft: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        toastInstance.toast.style.setProperty('top', '20px');
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('left', '20px');
                        toastInstance.toast.style.setProperty('bottom', 'auto');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '-20px';

                    }),

                    bottomRight: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        toastInstance.toast.style.setProperty('top', 'auto');
                        toastInstance.toast.style.setProperty('right', '20px');
                        toastInstance.toast.style.setProperty('left', 'auto');
                        toastInstance.toast.style.setProperty('bottom', '20px');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '20px';

                    }),

                    bottomMiddle: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        const toastWidth = toastInstance.toast.getBoundingClientRect().width;

                        toastInstance.toast.style.setProperty('top', 'auto');
                        toastInstance.toast.style.setProperty('left', `calc(50vw - ${toastWidth/2}px)`);
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('bottom', '20px');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '20px';

                    }),

                    bottomLeft: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.desktop.setDefault(toastInstance);

                        toastInstance.toast.style.setProperty('top', 'auto');
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('left', '20px');
                        toastInstance.toast.style.setProperty('bottom', '20px');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '20px';

                    })

                }),

                mobile: Object.freeze({

                    setDefault: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        const minWidth = Math.min(window.innerWidth, 500);

                        toastInstance.toast.style.setProperty('transition', 'none', 'important');
                        toastInstance.toast.style.setProperty('position', 'fixed', 'important');
                        toastInstance.toast.style.setProperty('min-height', toastInstance.defaultDimensions.mobile.minHeight);
                        toastInstance.toast.style.setProperty('max-height', toastInstance.defaultDimensions.mobile.maxHeight);
                        toastInstance.toast.style.setProperty('min-width', `${minWidth}px`);
                        toastInstance.toast.style.setProperty('max-width', toastInstance.defaultDimensions.mobile.maxWidth);
                        toastInstance.toast.style.setProperty('width', toastInstance.defaultDimensions.mobile.width);
                        toastInstance.toast.style.setProperty('height', toastInstance.defaultDimensions.mobile.height);
                        toastInstance.toast.style.setProperty('border-radius', '0');

                        toastletNotify.setPosition.progressBar(toastInstance);

                        const classList = [...toastInstance.classList.mobile, ...toastInstance.classList.desktop, ...toastInstance.animationInClassList, ...toastInstance.animationOutClassList];

                        for(let i = 0, len = classList.length; i < len; i++) {

                            if( toastInstance.toast.classList.contains(classList[i]) ) 
                                toastInstance.toast.classList.remove(classList[i]);

                        }

                        const modeClassList = [...toastInstance.classList.mobile];

                        const elClassList = toastInstance.toast.classList;

                        for(let i = 0, len = elClassList.length; i < len; i++) {

                            if( modeClassList.includes(elClassList[i]) ) continue;
                                
                            modeClassList.push(elClassList[i]);

                        }

                        toastInstance.toast.className = modeClassList.join(' ').replace(/[\s\p{Z}]+/gu, ' ').trim();

                        void toastInstance.toast.offsetWidth; // Trigger reflow to restart animation

                        if( ! toastInstance.rAF.restoreTransition.isScheduled ) {
                            toastInstance.rAF.restoreTransition.isScheduled = true;
                            requestAnimationFrame(toastInstance.rAF.restoreTransition.fn);
                        }

                    }),

                    top: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.mobile.setDefault(toastInstance);

                        const toastWidth = toastInstance.toast.getBoundingClientRect().width;

                        toastInstance.toast.style.setProperty('top', '0');
                        toastInstance.toast.style.setProperty('left', `calc(50vw - ${toastWidth/2}px)`);
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('bottom', 'auto');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '-20px';

                    }),

                    bottom: Object.freeze( function(toastInstance) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        toastletNotify.setPosition.mobile.setDefault(toastInstance);

                        const toastWidth = toastInstance.toast.getBoundingClientRect().width;

                        toastInstance.toast.style.setProperty('top', 'auto');
                        toastInstance.toast.style.setProperty('left', `calc(50vw - ${toastWidth/2}px)`);
                        toastInstance.toast.style.setProperty('right', 'auto');
                        toastInstance.toast.style.setProperty('bottom', '0');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.translateOutY = '20px';

                    })

                })

            }),

            getPosition: Object.freeze({

                available: Object.freeze({

                    desktop: Object.freeze({

                        top: Object.freeze({
                            name: 'topRight',
                            class: 'toastlet-top-right',
                            mobile: 'top'
                        }),

                        topright: Object.freeze({
                            name: 'topRight',
                            class: 'toastlet-top-right',
                            mobile: 'top'
                        }),

                        topmiddle: Object.freeze({
                            name: 'topMiddle',
                            class: 'toastlet-top-middle',
                            mobile: 'top'
                        }),

                        topleft: Object.freeze({
                            name: 'topLeft',
                            class: 'toastlet-top-left',
                            mobile: 'top'
                        }),
                        
                        bottom: Object.freeze({
                            name: 'bottomRight',
                            class: 'toastlet-bottom-right',
                            mobile: 'bottom'
                        }),

                        bottomright: Object.freeze({
                            name: 'bottomRight',
                            class: 'toastlet-bottom-right',
                            mobile: 'bottom'
                        }),

                        bottommiddle: Object.freeze({
                            name: 'bottomMiddle',
                            class: 'toastlet-bottom-middle',
                            mobile: 'bottom'
                        }),

                        bottomleft: Object.freeze({
                            name: 'bottomLeft',
                            class: 'toastlet-bottom-left',
                            mobile: 'bottom'
                        })

                    }),

                    mobile: Object.freeze({

                        top: Object.freeze({
                            name: 'top',
                            class: 'toastlet-top'
                        }),

                        bottom: Object.freeze({
                            name: 'bottom',
                            class: 'toastlet-bottom'
                        })

                    }),

                    array: Object.freeze({
                        desktop: Object.freeze( ['top', 'top-right', 'top-middle', 'top-left', 'bottom', 'bottom-right', 'bottom-middle', 'bottom-left'] ),
                        mobile: Object.freeze( ['top', 'bottom'] )
                    })

                }),

                desktop: Object.freeze( function(position) {

                    if(typeof position !== 'string') return false;

                    position = position.replace(/[^a-zA-Z]/g, '').toLowerCase();

                    if( ! toastletNotify.getPosition.available.desktop.hasOwnProperty(position) ) return false;

                    return toastletNotify.getPosition.available.desktop[position];

                }),

                mobile: Object.freeze( function(position) {

                    if(typeof position !== 'string') return false;

                    position = position.replace(/[^a-zA-Z]/g, '').toLowerCase();

                    if( ! toastletNotify.getPosition.available.mobile.hasOwnProperty(position) ) return false;

                    return toastletNotify.getPosition.available.mobile[position];

                })

            }),

            utils: Object.freeze( {

                isMobile: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    return !(window.innerWidth > 768 && toastInstance.canHover && toastInstance.pointerFine);

                }),

                enterElement: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;
                    
                    if( ! toastInstance.config.stackable ) {

                        for( const [id, el] of toastletInstances.nonStackable ){

                            if( id === toastInstance.id ) continue;

                            toastletNotify.utils.closeToast(el);

                        }

                    }

                    if( ! toastInstance.rAF.enterElement.isScheduled ) {
                        toastInstance.rAF.enterElement.isScheduled = true;
                        requestAnimationFrame(toastInstance.rAF.enterElement.fn);
                    }
                
                }),

                shButtons: Object.freeze( function(toastInstance){

                    if(
                        toastInstance.toast === undefined || 
                        toastInstance.isClosing ||
                        (toastInstance.isSticky && ! toastInstance.isDismissible) ||
                        ( ! toastInstance.config.pauseButton && ! toastInstance.isDismissible )
                    ) return;

                    const mustBeVisible = (
                        toastInstance.isHovered ||
                        toastInstance.isTouchHovered ||
                        toastInstance.isFocusHovered ||
                        (toastletNotify.utils.isMobile(toastInstance) && toastInstance.config.onClick !== null)
                    );

                    if( mustBeVisible ){
                        toastInstance.controlsCol.style.visibility = 'visible';
                        toastInstance.controlsCol.style.zIndex = 'auto';
                        toastInstance.controlsCol.style.opacity = '1';
                    }
                    else{
                        toastInstance.controlsCol.style.opacity = '0';
                        toastInstance.controlsCol.style.visibility = 'hidden';
                        toastInstance.controlsCol.style.zIndex = '-1';
                    }

                }),

                togglePauseByButton: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing || toastInstance.isSticky) return;

                    toastInstance.isPausedByButton = !toastInstance.isPausedByButton;

                    if (toastInstance.isPausedByButton) {

                        if( toastInstance.config.pauseButton ){

                            toastInstance.pauseButton.innerHTML = toastletNotify.icons.play;
    
                            toastInstance.pauseButton.setAttribute('aria-label', 'Play notification timer');

                        }

                        toastletNotify.timeouts.clearTimer(toastInstance);

                    }
                    else {

                        if( toastInstance.config.pauseButton ){

                            toastInstance.pauseButton.innerHTML = toastletNotify.icons.pause;

                            toastInstance.pauseButton.setAttribute('aria-label', 'Pause notification timer');

                        }

                        toastletNotify.timeouts.startTimer(toastInstance);

                    }

                }),

                closeToast: Object.freeze( function(toastInstance){

                    if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                    toastInstance.isClosing = true;

                    toastletNotify.timeouts.clearTimer(toastInstance);

                    toastletNotify.animation.setAnimationOut(toastInstance);

                    const animationDuration = toastletNotify.animation.getAnimationDuration(toastInstance);

                    toastletNotify.animation.runAnimationOut(toastInstance);

                    setTimeout(toastletNotify.timeouts.remove, animationDuration + 20, toastInstance);

                })

            }),

            handles: Object.freeze( {

                toast: Object.freeze( {

                    click: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing || 
                            !e.isTrusted || 
                            toastInstance.isClickInProgress ||
                            toastInstance.config.onClick === null ||
                            typeof toastInstance.config.onClick !== 'function' ||
                            toastInstance.clickControl.disabled ||
                            (toastInstance.pauseButton && toastInstance.pauseButton.contains(e.target)) ||
                            (toastInstance.closeButton && toastInstance.closeButton.contains(e.target))
                        ) return;

                        e.stopPropagation();

                        toastInstance.isClickInProgress = true;

                        toastInstance.config.onClick.call(toastInstance.toast, e, toastInstance.toast, toastInstance.clickControl);

                        setTimeout(toastletNotify.timeouts.clickInProgress, 10, toastInstance);

                    }),

                    mousedown: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing || 
                            !e.isTrusted || 
                            toastInstance.isTouchEvent
                        ) return;

                        toastInstance.isPointerEvent = true;

                    }),

                    mouseup: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing || 
                            !e.isTrusted || 
                            toastInstance.isTouchEvent
                        ) return;

                        setTimeout(toastletNotify.timeouts.pointerEvent, 10, toastInstance);

                    }),

                    mouseenter: Object.freeze( function(toastInstance, e){

                        if (
                            toastInstance.toast === undefined ||
                            toastInstance.isClosing ||
                            !e.isTrusted ||
                            toastInstance.isHovered ||
                            !toastInstance.canHover || 
                            !toastInstance.pointerFine || 
                            toastInstance.isPointerEvent || 
                            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents)
                        ) return;

                        toastInstance.isHovered = true;

                        toastletNotify.utils.shButtons(toastInstance);

                        toastletNotify.timeouts.clearTimer(toastInstance);

                    }),

                    mouseleave: Object.freeze( function(toastInstance, e){

                        if (
                            toastInstance.toast === undefined ||
                            toastInstance.isClosing ||
                            !e.isTrusted ||
                            !toastInstance.isHovered ||
                            toastInstance.toast.contains(e.relatedTarget) || 
                            toastInstance.isTouchEvent || 
                            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents)
                        ) return;

                        toastInstance.isHovered = false;

                        toastletNotify.utils.shButtons(toastInstance);

                        toastletNotify.timeouts.startTimer(toastInstance);

                        setTimeout(toastletNotify.timeouts.pointerEvent, 10, toastInstance);

                    }),

                    touchstart: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing || 
                            !e.isTrusted ||
                            !toastletNotify.utils.isMobile(toastInstance)
                        ) return;

                        toastInstance.isPointerEvent = true;

                        toastInstance.isTouchEvent = true;

                        toastInstance.touchStartTime = Date.now();

                        toastInstance.startX = e.touches[0].clientX;

                        toastInstance.currentX = toastInstance.startX;

                        toastInstance.isDragging = false;

                        toastInstance.touchStartPosition = {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY
                        };

                        toastletNotify.timeouts.clearTimer(toastInstance);

                        toastInstance.toast.style.setProperty('transition', 'none', 'important');

                    }),

                    touchcancel: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing || 
                            !e.isTrusted ||
                            !toastInstance.isTouchEvent
                        ) return;

                        setTimeout(toastletNotify.timeouts.touchEvent, 10, toastInstance);

                        setTimeout(toastletNotify.timeouts.pointerEvent, 10, toastInstance);

                        toastInstance.isDragging = false;

                        toastInstance.toast.style.transition = toastInstance.transitionRule.toast.join(' ');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        toastInstance.toast.style.transform = 'translate(0px, 0px)';

                        toastletNotify.timeouts.startTimer(toastInstance);

                    }),

                    touchmove: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing ||
                            !e.isTrusted ||
                            !toastInstance.isTouchEvent
                        ) return;

                        e.preventDefault();

                        toastInstance.currentX = e.touches[0].clientX;

                        const diff = toastInstance.currentX - toastInstance.startX;

                        toastInstance.toast.style.transform = `translate(${diff}px, 0px)`;

                        const currentX = e.touches[0].clientX;
                        const currentY = e.touches[0].clientY;

                        const deltaX = Math.abs(currentX - toastInstance.touchStartPosition.x);
                        const deltaY = Math.abs(currentY - toastInstance.touchStartPosition.y);

                        if (deltaX > 10 && deltaX > deltaY)
                            toastInstance.isDragging = true;

                    }),

                    touchend: Object.freeze( function(toastInstance, e){

                        if(
                            toastInstance.toast === undefined || 
                            toastInstance.isClosing ||
                            !e.isTrusted ||
                            !toastInstance.isTouchEvent
                        ) return;

                        setTimeout(toastletNotify.timeouts.pointerEvent, 10, toastInstance);

                        setTimeout(toastletNotify.timeouts.touchEvent, 10, toastInstance);

                        toastInstance.touchEndTime = Date.now();

                        const touchDuration = toastInstance.touchEndTime - toastInstance.touchStartTime;

                        toastInstance.toast.style.transition = toastInstance.transitionRule.toast.join(' ');

                        void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                        if (toastInstance.isDragging) {

                            const diff = toastInstance.currentX - toastInstance.startX;

                            if (Math.abs(diff) > 100 && toastInstance.isDismissible) {

                                toastInstance.translateOutY = '0px';

                                if(diff > 0)
                                    toastInstance.translateOutX = '100%';
                                else
                                    toastInstance.translateOutX = '-100%';

                                toastInstance.animationOut = false;

                                toastletNotify.utils.closeToast(toastInstance);
                            
                            } 
                            else {

                                toastInstance.toast.style.transform = 'translate(0px, 0px)';

                                toastletNotify.timeouts.startTimer(toastInstance);
                            
                            }

                        } else {

                            toastInstance.toast.style.transform = `translate(0px, 0px)`;

                            if( (toastInstance.pauseButton && toastInstance.pauseButton.contains(e.target)) || (toastInstance.closeButton && toastInstance.closeButton.contains(e.target)) ) return;

                            if (touchDuration < 300) {

                                toastInstance.isTouchHovered = !toastInstance.isTouchHovered;
                                
                                toastletNotify.utils.shButtons(toastInstance);

                                if( toastInstance.config.onClick === null )
                                    toastletNotify.utils.togglePauseByButton(toastInstance);
                                else
                                    toastletNotify.handles.toast.click(toastInstance, e);

                            } 
                            else {
                            
                                toastletNotify.timeouts.startTimer(toastInstance);
                            
                            }

                        }

                        toastInstance.isDragging = false;

                    }),

                    focusin: Object.freeze( function(toastInstance, e) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        if(!e.isTrusted || toastInstance.isPointerEvent || (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents)){

                            e.target.blur();

                            setTimeout(toastletNotify.timeouts.blur, 0, toastInstance, e.target);

                            return;

                        }

                        setTimeout(toastletNotify.timeouts.focusin, 0, toastInstance);

                    }),

                    focusout: Object.freeze( function(toastInstance, e) {

                        if(toastInstance.toast === undefined || toastInstance.isClosing) return;

                        if(!e.isTrusted){

                            e.target.focus();

                            setTimeout(toastletNotify.timeouts.focus, 0, toastInstance, e.target);

                            return;

                        }

                        setTimeout(toastletNotify.timeouts.focusout, 0, toastInstance);
                    
                    }),

                    keydown: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        if(e.target === toastInstance.pauseButton)
                            return toastletNotify.handles.pauseButton.keydown(toastInstance, e);
                        else if(e.target === toastInstance.closeButton)
                            return toastletNotify.handles.closeButton.keydown(toastInstance, e);

                        if(e.target !== toastInstance.toast) return;

                        if(e.key === ' ' || e.key === 'Enter') {

                            e.preventDefault();
                            e.stopPropagation();

                            if( toastInstance.config.onClick === null )
                                toastletNotify.utils.togglePauseByButton(toastInstance);
                            else
                                toastletNotify.handles.toast.click(toastInstance, e);

                        }
                        else if(e.key === 'Escape' && toastInstance.isDismissible) {

                            e.preventDefault();
                            e.stopPropagation();

                            toastletNotify.utils.closeToast(toastInstance);

                        }

                    })

                }),

                closeButton: Object.freeze( {

                    click: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted || ! toastInstance.isDismissible) return;

                        e.stopPropagation();

                        toastInstance.isTouchHovered = false;

                        toastletNotify.utils.shButtons(toastInstance);

                        toastletNotify.utils.closeToast(toastInstance);

                    }),

                    keydown: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        if(e.target !== toastInstance.closeButton) return;

                        if( ( e.key === ' ' || e.key === 'Enter' || e.key === 'Escape' ) && toastInstance.isDismissible ) {

                            e.preventDefault();
                            e.stopPropagation();

                            toastletNotify.utils.closeToast(toastInstance);

                        }

                    })

                }),

                pauseButton: Object.freeze( {

                    click: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        e.stopPropagation();

                        toastInstance.isTouchHovered = false;

                        toastletNotify.utils.shButtons(toastInstance);

                        toastletNotify.utils.togglePauseByButton(toastInstance);

                    }),

                    keydown: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        if(e.target !== toastInstance.pauseButton) return;

                        if(e.key === ' ' || e.key === 'Enter') {

                            e.preventDefault();
                            e.stopPropagation();

                            toastletNotify.utils.togglePauseByButton(toastInstance);

                        }
                        else if(e.key === 'Escape' && toastInstance.isDismissible) {

                            e.preventDefault();
                            e.stopPropagation();

                            toastletNotify.utils.closeToast(toastInstance);

                        }

                    })

                }),

                window: Object.freeze( {

                    resize: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        if(toastletNotify.utils.isMobile(toastInstance)) {

                            if(toastInstance.isPausedByButton)
                                toastInstance.isTouchHovered = true;

                            toastletNotify.setPosition.mobile[toastInstance.config.positionMobile](toastInstance);

                        }
                        else {

                            if(toastInstance.isTouchHovered && !toastInstance.isHovered && !toastInstance.isFocusHovered)
                                toastInstance.isTouchHovered = false;

                            toastletNotify.setPosition.desktop[toastInstance.config.position](toastInstance);

                        }

                        toastletNotify.utils.shButtons(toastInstance);

                    })

                }),

                document: Object.freeze( {

                    visibilityChange: Object.freeze( function(toastInstance, e){

                        if(toastInstance.toast === undefined || toastInstance.isClosing || !e.isTrusted) return;

                        if(document.visibilityState === 'hidden') {

                            toastletNotify.timeouts.clearTimer(toastInstance);

                        } 
                        else if(document.visibilityState === 'visible') {

                            toastletNotify.timeouts.startTimer(toastInstance);

                        }

                    })

                }),

                body: Object.freeze( {

                    mutation: Object.freeze( function(toastInstance, mutationList, observer){

                        if(toastInstance.toast === undefined || toastInstance.isClosing){
                            observer.disconnect();
                            return;
                        }

                        if(toastInstance.toast.parentElement !== document.body || !toastInstance.toast.isConnected)
                            setTimeout(toastletNotify.timeouts.remove, 0, toastInstance);

                    })

                }),

                html: Object.freeze( {

                    mutation: Object.freeze( function(toastInstance, mutationList, observer){

                        if(toastInstance.toast === undefined || toastInstance.isClosing){
                            observer.disconnect();
                            return;
                        }

                        if(!document.body) setTimeout(toastletNotify.timeouts.remove, 0, toastInstance);

                    })

                })

            }),
            
            close: Object.freeze( function(id){
                
                if( id === undefined ) id = toastletInstances.getLastActiveId();

                if( typeof id !== 'number' || id < 0 ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'id' must be a non-negative integer\n  at toastletNotify.close (${lineInfo})\n  Expected: non-negative integer\n  Received: ${typeof id}`);
                    return;
                }

                if( ! toastletInstances.all.has(id) ) return;

                const toastInstance = toastletInstances.all.get(id);

                toastletNotify.utils.closeToast(toastInstance);            

            }),

            closeAllNonStackable: Object.freeze( function(){

                for( const [id, toastInstance] of toastletInstances.nonStackable ){

                    toastletNotify.utils.closeToast(toastInstance);

                }

            }),

            closeAllStackable: Object.freeze( function(){

                for( const [id, toastInstance] of toastletInstances.stackable ){

                    toastletNotify.utils.closeToast(toastInstance);

                }

            }),

            closeAll: Object.freeze( function(){

                for( const [id, toastInstance] of toastletInstances.all ){

                    toastletNotify.utils.closeToast(toastInstance);

                }

            }),

            notify: Object.freeze( function(type, content = "", options = {}){

                if ( ! document.body ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';                    
                    console.error(`[ToastletNotify] Error: document.body is not available\n  at toastletNotify.notify (${lineInfo})`);
                    return null;
                }

                if( typeof type !== 'string' ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'type' must be a string\n  at toastletNotify.notify (${lineInfo})\n  Expected: string\n  Received: ${typeof type}`);
                    return null;
                }

                if( content === null || content === undefined ) content = "";

                if( typeof content !== 'string' ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'content' must be a string\n  at toastletNotify.notify (${lineInfo})\n  Expected: string\n  Received: ${typeof content}`);
                    return null;
                }

                if( typeof options !== 'object' || options === null || Object.getPrototypeOf(options) !== Object.prototype ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'options' must be a plain object\n  at toastletNotify.notify (${lineInfo})\n  Expected: plain object\n  Received: ${typeof options === 'object' ? (options === null ? 'null' : 'non-plain object') : typeof options}`);
                    return null;
                }

                const notificationType = toastletNotify.typeMap.get(type);

                if( ! notificationType ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] Invalid notification type: "${type}"\n  at toastletNotify.notify (${lineInfo})\n  Valid types: info, success, warning, error, notice`);
                    return null;
                }

                let defaultConfig = {
                    notificationType: notificationType,
                    sticky: false,
                    dismissible: true,
                    stackable: false,
                    duration: 5000,
                    pauseButton: true,
                    pause: {
                        hover: true,
                        focus: true,
                        touch: true,
                        inactiveTab: true
                    },
                    html: false,
                    progressBar: false,
                    progressBarDirection: 'left-to-right',
                    icon: true,
                    title: true,
                    titleText: notificationType.name,
                    customClass: '',
                    transition: true,
                    transitionDuration: 300,
                    position: 'top-right',
                    positionMobile: '',
                    animationIn: '',
                    animationOut: '',
                    onClick: null,
                    ...notificationType.config                    
                };

                window.defaultConfigProto = {

                    notificationType: notificationType,

                    // ======================================================
                    // Módulo 1: PROPRIEDADES DE ACESSO DIRETO (As mais comuns)
                    // ======================================================
                    
                    sticky: false,
                    duration: 5000,
                    dismissible: true,
                    stackable: false,
                    stackableGap: { // Adicionado conforme nossa discussão
                        desktop: 20,
                        mobile: 10
                    },
                    
                    html: false,
                    icon: true,
                    title: true,
                    titleText: '',
                    customClass: '',
                    
                    // ======================================================
                    // Módulo 2: GRUPOS ESPECÍFICOS E COESOS
                    // ======================================================

                    /**
                     * Controla a transição CSS padrão da biblioteca (fade/slide).
                     */
                    transition: {
                        enabled: true,
                        duration: 300
                    },

                    /**
                     * Controla as animações de entrada/saída baseadas em classes CSS customizadas.
                     */
                    animation: {
                        in: '',
                        out: ''
                    },

                    /**
                     * Controla as condições que pausam o timer.
                     */
                    pause: {
                        hover: true,
                        focus: true,
                        touch: true,
                        inactiveTab: true
                    },
                    
                    /**
                     * Controla a barra de progresso do timer.
                     */
                    progressBar: {
                        enabled: false,
                        direction: 'left-to-right'
                    },

                    /**
                     * Controla o posicionamento.
                     */
                    position: {
                        desktop: 'top-right',
                        mobile: ''
                    },

                    /**
                     * Controla as propriedades de acessibilidade.
                     */
                    a11y: {
                        role: '',
                        ariaLive: ''
                    },

                    onClick: null,

                    ...notificationType.config

                };

                let customConfig = { ...options }

                // console.log(defaultConfig)

                // console.log(customConfig)

                const toastInstance = {

                    notificationType: notificationType,
                    
                    get canHover(){
                        return toastletMatchMedia.anyHover.matches;
                    },

                    get pointerFine(){
                        return toastletMatchMedia.pointerFine.matches;
                    },

                    timeoutId: null,
                    isPausedByButton: false,
                    isClickInProgress: false,
                    isPointerEvent: false,
                    isTouchEvent: false,
                    isHovered: false,
                    isTouchHovered: false,
                    isFocusHovered: false,

                    get mode(){
                        return toastletHelpers.isMobile() ? 'mobile' : 'desktop';
                    },

                    startX: 0,
                    currentX: 0,
                    isDragging: false,
                    isClosing: false,
                    touchStartTime: 0,
                    touchEndTime: 0,
                    touchStartPosition: { x: 0, y: 0 },
                    translateOutX: "0px",
                    translateOutY: "-20px",
                    animationIn: false,
                    animationInClassList: [],
                    animationOut: false,
                    animationOutClassList: [],
                    config: {
                        ...defaultConfig,
                        ...options
                    },
                    toastStyle: {
                        desktop: toastletNotify.styles.toast['desktop'] + `background-color: ${notificationType.color};`,
                        mobile: toastletNotify.styles.toast['mobile'] + `background-color: ${notificationType.color};`
                    },
                    classList: {
                        desktop: ['toastlet', 'toastlet-desktop'],
                        mobile: ['toastlet', 'toastlet-mobile']
                    },
                    defaultDimensions: {
                        desktop: {
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100vw',
                            minWidth: 'auto',
                            maxHeight: '100vh',
                            minHeight: '48px'
                        },
                        mobile: {
                            width: '100vw',
                            height: 'auto',
                            maxWidth: '100vw',
                            minWidth: '100vw', // Or '500px' if 100vw > 500px, see setPosition.mobile
                            maxHeight: '100vh',
                            minHeight: '48px'
                        },
                    },
                    observerConfig: {
                        childList: true,
                        subtree: false,
                        attributes: false,
                        characterData: false,
                        attributeOldValue: false,
                        characterDataOldValue: false
                    },
                    rAF: {
                        restoreTransition: {
                            isScheduled: false,
                            fn: null
                        },
                        enterElement: {
                            isScheduled: false,
                            fn: null
                        }
                    },
                    handles: {}
                };

/*                 if( typeof toastInstance.config.sticky !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'sticky' must be a boolean\n  Received: ${typeof toastInstance.config.sticky}\n  Using default value: false`);
                    toastInstance.config.sticky = false;
                }

                if( typeof toastInstance.config.dismissible !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'dismissible' must be a boolean\n  Received: ${typeof toastInstance.config.dismissible}\n  Using default value: true`);
                    toastInstance.config.dismissible = true;
                }

                if( typeof toastInstance.config.stackable !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'stackable' must be a boolean\n  Received: ${typeof toastInstance.config.stackable}\n  Using default value: false`);
                    toastInstance.config.stackable = false;
                }

                if( typeof toastInstance.config.duration !== 'number' ){
                    console.warn(`[ToastletNotify] Warning: Option 'delay' must be a number\n  Received: ${typeof toastInstance.config.duration}\n  Using default value: 5000`);
                    toastInstance.config.duration = 5000;
                }

                if( toastInstance.config.duration < 0 ){
                    console.warn(`[ToastletNotify] Warning: Option 'delay' must be a non-negative number\n  Received: ${toastInstance.config.duration}\n  Setting to 0 (notification will remain until dismissed, equivalent to sticky: true)`);
                    toastInstance.config.duration = 0;
                }

                if( typeof toastInstance.config.pauseButton !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'pauseButton' must be a boolean\n  Received: ${typeof toastInstance.config.pauseButton}\n  Using default value: true`);
                    toastInstance.config.pauseButton = true;
                }

                if( typeof toastInstance.config.progressBar !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'progressBar' must be a boolean\n  Received: ${typeof toastInstance.config.progressBar}\n  Using default value: false`);
                    toastInstance.config.progressBar = false;
                }

                if( typeof toastInstance.config.progressBarDirection !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'progressBarDirection' must be a string\n  Received: ${typeof toastInstance.config.progressBarDirection}\n  Using default value: "left-to-right"`);
                    toastInstance.config.progressBarDirection = 'left-to-right';
                }

                toastInstance.progressBarConfig = toastletNotify.progressBarMap.get(toastInstance.config.progressBarDirection);

                if( ! toastInstance.progressBarConfig ) {
                    console.warn(`[ToastletNotify] Warning: Invalid progressBarDirection "${toastInstance.config.progressBarDirection}"\n  Valid directions: ${toastletNotify.progressBarMap.array.join(' ')}\n  Using default value: "left-to-right"`);
                    toastInstance.progressBarConfig = toastletNotify.progressBarMap.get('left-to-right');
                }

                if( typeof toastInstance.config.icon !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'icon' must be a boolean\n  Received: ${typeof toastInstance.config.icon}\n  Using default value: true`);
                    toastInstance.config.icon = true;
                }

                if( typeof toastInstance.config.title !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'title' must be a boolean\n  Received: ${typeof toastInstance.config.title}\n  Using default value: true`);
                    toastInstance.config.title = true;
                }

                if( typeof toastInstance.config.titleText !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'titleText' must be a string\n  Received: ${typeof toastInstance.config.titleText}\n  Using default value: "${notificationType.name}"`);
                    toastInstance.config.titleText = notificationType.name;
                }

                if( typeof toastInstance.config.customClass !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'customClass' must be a string\n  Received: ${typeof toastInstance.config.customClass}\n  Using default value: ""`);
                    toastInstance.config.customClass = "";
                }

                if( typeof toastInstance.config.transition !== 'boolean' ){
                    console.warn(`[ToastletNotify] Warning: Option 'transition' must be a boolean\n  Received: ${typeof toastInstance.config.transition}\n  Using default value: true`);
                    toastInstance.config.transition = true;
                }

                if( typeof toastInstance.config.transitionDuration !== 'number' ){
                    console.warn(`[ToastletNotify] Warning: Option 'transitionDuration' must be a number\n  Received: ${typeof toastInstance.config.transitionDuration}\n  Using default value: 300`);
                    toastInstance.config.transitionDuration = 300;
                }

                if( toastInstance.config.transitionDuration < 0 ){
                    console.warn(`[ToastletNotify] Warning: Option 'transitionDuration' must be a non-negative number\n  Received: ${toastInstance.config.transitionDuration}\n  Setting to 0 (animations will be instant with no transition effect)`);
                    toastInstance.config.transitionDuration = 0;
                }

                if( typeof toastInstance.config.position !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'position' must be a string\n  Received: ${typeof toastInstance.config.position}\n  Using default value: "top-right"`);
                    toastInstance.config.position = 'top-right';
                }

                if( typeof toastInstance.config.animationIn !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'animationIn' must be a string\n  Received: ${typeof toastInstance.config.animationIn}\n  Using default value: ""`);
                    toastInstance.config.animationIn = '';
                }

                if( typeof toastInstance.config.animationOut !== 'string' ){
                    console.warn(`[ToastletNotify] Warning: Option 'animationOut' must be a string\n  Received: ${typeof toastInstance.config.animationOut}\n  Using default value: ""`);
                    toastInstance.config.animationOut = '';
                }

                if( typeof toastInstance.config.onClick !== 'function' && toastInstance.config.onClick !== null ){
                    console.warn(`[ToastletNotify] Warning: Option 'onClick' must be a function or null\n  Received: ${typeof toastInstance.config.onClick}\n  Using default value: null`);
                    toastInstance.config.onClick = null;
                }
 */

                let desktopPosition = toastletNotify.getPosition.desktop(toastInstance.config.position);

                if( ! desktopPosition ) {
                    console.warn(`[ToastletNotify] Warning: Invalid desktop position "${toastInstance.config.position}"\n  Valid positions: ${toastletNotify.getPosition.available.array.desktop.join(', ')}\n  Using default position: "top-right"`);
                    desktopPosition = toastletNotify.getPosition.desktop('top-right');
                }
                
                toastInstance.config.position = desktopPosition.name;

                if(toastInstance.config.positionMobile.trim().length === 0)
                    toastInstance.config.positionMobile = desktopPosition.mobile;

                let mobilePosition = toastletNotify.getPosition.mobile(toastInstance.config.positionMobile);

                if( ! mobilePosition ){
                    console.warn(`[ToastletNotify] Warning: Invalid mobile position "${toastInstance.config.positionMobile}"\n  Valid positions: ${toastletNotify.getPosition.available.array.mobile.join(', ')}\n  Using default position: "${desktopPosition.mobile}"`);
                    mobilePosition = toastletNotify.getPosition.mobile(desktopPosition.mobile);
                }

                toastInstance.config.positionMobile = mobilePosition.name;

                toastInstance.classList.desktop.push(desktopPosition.class, notificationType.class);
                
                toastInstance.classList.mobile.push(mobilePosition.class, notificationType.class);

                // TODO: FAZER ISSO AQUI LOGO NA CRIAÇÃO DO OBJETO

                if(toastInstance.config.transitionDuration === 0 && toastInstance.config.transition) 
                    toastInstance.config.transition = false;

                if(!toastInstance.config.transition && toastInstance.config.transitionDuration !== 0) 
                    toastInstance.config.transitionDuration = 0;

                toastInstance.isSticky = toastInstance.config.sticky || toastInstance.config.duration <= 0;

                if(toastInstance.isSticky) toastInstance.config.progressBar = false;

                toastInstance.isDismissible = toastInstance.config.dismissible;

                // TODO: AQUI CABE OTIMIZAÇÃO DE CÓDIGO PARA EVITAR REPETIR ESSES LOOPS

                // Normalize customClass removing extra spaces, normalizing whitespace and trimming
                toastInstance.config.customClass = toastInstance.config.customClass.replace(/[\s\p{Z}]+/gu, ' ').trim();
                
                const classList = toastInstance.config.customClass.split(' ');

                for(let i = 0, len = classList.length; i < len; i++) {

                    const cls = classList[i].replace(/[\s\p{Z}]+/gu, '');

                    if(cls.length === 0) continue;

                    if( ! toastInstance.classList.desktop.includes(cls) )
                        toastInstance.classList.desktop.push(cls);

                    if( ! toastInstance.classList.mobile.includes(cls) )
                        toastInstance.classList.mobile.push(cls);

                }

                // Normalize animationIn removing extra spaces, normalizing whitespace and trimming
                toastInstance.config.animationIn = toastInstance.config.animationIn.replace(/[\s\p{Z}]+/gu, ' ').trim();

                const animationInClassList = toastInstance.config.animationIn.split(' ');

                for(let i = 0, len = animationInClassList.length; i < len; i++) {

                    const cls = animationInClassList[i].replace(/[\s\p{Z}]+/gu, '');

                    if(cls.length === 0) continue;

                    if( ! toastInstance.animationInClassList.includes(cls) )
                        toastInstance.animationInClassList.push(cls);

                }

                if( toastInstance.animationInClassList.length > 0 )
                    toastInstance.animationIn = true;

                // Normalize animationOut removing extra spaces, normalizing whitespace and trimming
                toastInstance.config.animationOut = toastInstance.config.animationOut.replace(/[\s\p{Z}]+/gu, ' ').trim();

                const animationOutClassList = toastInstance.config.animationOut.split(' ');

                for(let i = 0, len = animationOutClassList.length; i < len; i++) {

                    const cls = animationOutClassList[i].replace(/[\s\p{Z}]+/gu, '');

                    if(cls.length === 0) continue;

                    if( ! toastInstance.animationOutClassList.includes(cls) )
                        toastInstance.animationOutClassList.push(cls);

                }

                if( toastInstance.animationOutClassList.length > 0 )
                    toastInstance.animationOut = true;

                if( ! toastInstance.config.icon && ! toastInstance.config.title && content.length === 0 ) {
                    const err = new Error();
                    const lineInfo = err.stack ? `toastletNotify.js:${err.stack}` : 'unknown line';
                    console.error(`[ToastletNotify] Error: At least one of 'icon', 'title', or 'content' must be provided\n  at toastletNotify.notify (${lineInfo})`);
                    return null;
                }

                // TODO: JÁ DEIXAR ESSE OBJETO AQUI DECLARADO
                toastInstance.transitionRule = {
                    toast: ['all', `${toastInstance.config.transitionDuration}ms`, 'ease-in-out'],
                    progressBar: ['all', `${toastInstance.config.duration}ms`, 'linear']
                };

                if( toastInstance.config.onClick !== null ) {

                    toastInstance.clickControl = {};

                    let disabled = false;

                    Object.defineProperty(toastInstance.clickControl, 'disabled', {

                        get: function() {
                            return disabled;
                        },

                        set: function(value) {

                            if( typeof value !== 'boolean' ) {
                                console.warn(`[ToastletNotify] Warning: 'disabled' must be a boolean\n  Received: ${typeof value}\n  No value was set.`);
                                return;
                            }

                            disabled = value;

                        },

                        enumerable: true,
                        configurable: false

                    });

                    Object.freeze(toastInstance.clickControl);

                }

                const gridTemplate = [];

                toastInstance.toast = document.createElement('div');
                toastInstance.toast.setAttribute("tabindex", "0");
                toastInstance.toast.setAttribute("role", toastInstance.notificationType.role);
                toastInstance.toast.setAttribute("aria-live", toastInstance.notificationType.ariaLive);
                toastInstance.toast.setAttribute("aria-atomic", "true");
                toastInstance.rAF.restoreTransition.fn = toastletNotify.rAF.restoreTransition.bind(null, toastInstance);
                toastInstance.rAF.enterElement.fn = toastletNotify.rAF.enterElement.bind(null, toastInstance);

                if(toastInstance.config.icon) {

                    toastInstance.iconCol = document.createElement('div');
                    toastInstance.iconCol.className = 'toastlet-icon';
                    toastInstance.iconCol.style.cssText = toastletNotify.styles.iconCol

                    gridTemplate.push('auto');

                    toastInstance.toast.appendChild(toastInstance.iconCol);

                    toastInstance.iconContainer = document.createElement('div');
                    toastInstance.iconContainer.className = 'toastlet-icon-container';
                    toastInstance.iconContainer.style.cssText = toastletNotify.styles.iconContainer;
                    toastInstance.iconContainer.innerHTML = toastInstance.notificationType.icon;

                    toastInstance.iconCol.appendChild(toastInstance.iconContainer);

                }

                if( toastInstance.config.title || content.length > 0 ) {

                    toastInstance.contentCol = document.createElement('div');
                    toastInstance.contentCol.className = 'toastlet-content';
                    toastInstance.contentCol.style.cssText = toastletNotify.styles.contentCol;

                    gridTemplate.push('1fr');

                    toastInstance.toast.appendChild(toastInstance.contentCol);

                    if( toastInstance.config.title ) {

                        toastInstance.title = document.createElement('div');
                        toastInstance.title.className = 'toastlet-title';
                        toastInstance.title.textContent = toastInstance.config.titleText;
                        toastInstance.title.style.cssText = toastletNotify.styles.title;

                        toastInstance.contentCol.appendChild(toastInstance.title);

                    }

                    if( content.length > 0 ) {

                        toastInstance.text = document.createElement('div');
                        toastInstance.text.className = 'toastlet-content';
                        toastInstance.text.textContent = content;
                        toastInstance.text.style.cssText = toastletNotify.styles.text

                        toastInstance.contentCol.appendChild(toastInstance.text);

                        toastInstance.toast.appendChild(toastInstance.contentCol);

                    }

                    toastInstance.defaultDimensions.desktop.minWidth = '360px'; // Default minimum width for desktop
                    toastInstance.defaultDimensions.desktop.width = '360px'; // Default width for desktop

                    if( toastInstance.config.title && content.length > 0 ) {
                        toastInstance.defaultDimensions.desktop.minHeight = '80px'; // Default minimum height for desktop
                        toastInstance.defaultDimensions.mobile.minHeight = '80px'; // Default minimum height for mobile
                    }

                }

                if( ( ! toastInstance.isSticky && toastInstance.config.pauseButton ) || toastInstance.isDismissible ) {

                    toastInstance.controlsCol = document.createElement('div');
                    toastInstance.controlsCol.className = 'toastlet-controls';
                    toastInstance.controlsCol.style.cssText = toastletNotify.styles.controlCol

                    toastletNotify.utils.shButtons(toastInstance);

                    gridTemplate.push('auto');

                    if ( ! toastInstance.isSticky && toastInstance.config.pauseButton ) {

                        toastInstance.pauseButton = document.createElement('button');
                        toastInstance.pauseButton.setAttribute("tabindex", "0");
                        toastInstance.pauseButton.setAttribute('aria-label', 'Pause notification timer');
                        toastInstance.pauseButton.className = 'toastlet-pause';
                        toastInstance.pauseButton.innerHTML = toastletNotify.icons.pause;
                        toastInstance.pauseButton.style.cssText = toastletNotify.styles.pauseButton;

                        toastInstance.controlsCol.appendChild(toastInstance.pauseButton);

                        toastInstance.handles.pauseClickHandler = {};
                        toastInstance.handles.pauseClickHandler.obj = toastInstance.pauseButton;
                        toastInstance.handles.pauseClickHandler.type = 'click';
                        toastInstance.handles.pauseClickHandler.fn = toastletNotify.handles.pauseButton.click.bind(null, toastInstance);
                        toastInstance.pauseButton.addEventListener('click', toastInstance.handles.pauseClickHandler.fn);

                    }

                    if( toastInstance.isDismissible ) {

                        toastInstance.closeButton = document.createElement('button');
                        toastInstance.closeButton.setAttribute("tabindex", "0");
                        toastInstance.closeButton.setAttribute('aria-label', 'Close notification');
                        toastInstance.closeButton.className = 'toastlet-close';
                        toastInstance.closeButton.innerHTML = toastletNotify.icons.close;
                        toastInstance.closeButton.style.cssText = toastletNotify.styles.closeButton;

                        toastInstance.controlsCol.appendChild(toastInstance.closeButton);

                        toastInstance.handles.closeClickHandler = {};
                        toastInstance.handles.closeClickHandler.obj = toastInstance.closeButton;
                        toastInstance.handles.closeClickHandler.type = 'click';
                        toastInstance.handles.closeClickHandler.fn = toastletNotify.handles.closeButton.click.bind(null, toastInstance);
                        toastInstance.closeButton.addEventListener('click', toastInstance.handles.closeClickHandler.fn);                    

                    }

                    toastInstance.toast.appendChild(toastInstance.controlsCol);

                }

                if(toastInstance.config.progressBar && !toastInstance.isSticky) {

                    toastInstance.progressBar = document.createElement('div');
                    toastInstance.progressBar.className = 'toastlet-progress-bar';
                    toastInstance.progressBar.style.cssText = toastletNotify.styles.progressBar;

                    toastInstance.toast.appendChild(toastInstance.progressBar);

                    toastInstance.progressBarThumb = document.createElement('div');
                    toastInstance.progressBarThumb.className = 'toastlet-progress-bar-thumb';
                    toastInstance.progressBarThumb.style.cssText = toastletNotify.styles.progressBarThumb;

                    toastInstance.progressBar.appendChild(toastInstance.progressBarThumb);

                }

                toastInstance.handles.mouseupHandler = {};
                toastInstance.handles.mouseupHandler.obj = toastInstance.toast;
                toastInstance.handles.mouseupHandler.type = 'mouseup';
                toastInstance.handles.mouseupHandler.fn = toastletNotify.handles.toast.mouseup.bind(null, toastInstance);
                toastInstance.toast.addEventListener('mouseup', toastInstance.handles.mouseupHandler.fn);
                
                toastInstance.handles.pointerupHandler = {};
                toastInstance.handles.pointerupHandler.obj = toastInstance.toast;
                toastInstance.handles.pointerupHandler.type = 'pointerup';
                toastInstance.handles.pointerupHandler.fn = toastletNotify.handles.toast.mouseup.bind(null, toastInstance);
                toastInstance.toast.addEventListener('pointerup', toastInstance.handles.pointerupHandler.fn);

                toastInstance.handles.mousedownHandler = {};
                toastInstance.handles.mousedownHandler.obj = toastInstance.toast;
                toastInstance.handles.mousedownHandler.type = 'mousedown';
                toastInstance.handles.mousedownHandler.fn = toastletNotify.handles.toast.mousedown.bind(null, toastInstance);
                toastInstance.toast.addEventListener('mousedown', toastInstance.handles.mousedownHandler.fn);

                toastInstance.handles.pointerdownHandler = {};
                toastInstance.handles.pointerdownHandler.obj = toastInstance.toast;
                toastInstance.handles.pointerdownHandler.type = 'pointerdown';
                toastInstance.handles.pointerdownHandler.fn = toastletNotify.handles.toast.mousedown.bind(null, toastInstance);
                toastInstance.toast.addEventListener('pointerdown', toastInstance.handles.pointerdownHandler.fn);

                if( toastInstance.config.onClick !== null ) {

                    toastInstance.handles.clickHandler = {};
                    toastInstance.handles.clickHandler.obj = toastInstance.toast;
                    toastInstance.handles.clickHandler.type = 'click';
                    toastInstance.handles.clickHandler.fn = toastletNotify.handles.toast.click.bind(null, toastInstance);
                    toastInstance.toast.addEventListener('click', toastInstance.handles.clickHandler.fn);

                }

                toastInstance.handles.mouseenterHandler = {};
                toastInstance.handles.mouseenterHandler.obj = toastInstance.toast;
                toastInstance.handles.mouseenterHandler.type = 'mouseenter';
                toastInstance.handles.mouseenterHandler.fn = toastletNotify.handles.toast.mouseenter.bind(null, toastInstance);
                toastInstance.toast.addEventListener('mouseenter', toastInstance.handles.mouseenterHandler.fn);

                toastInstance.handles.mouseleaveHandler = {};
                toastInstance.handles.mouseleaveHandler.obj = toastInstance.toast;
                toastInstance.handles.mouseleaveHandler.type = 'mouseleave';
                toastInstance.handles.mouseleaveHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, toastInstance);
                toastInstance.toast.addEventListener('mouseleave', toastInstance.handles.mouseleaveHandler.fn);

                toastInstance.handles.mouseoutHandler = {};
                toastInstance.handles.mouseoutHandler.obj = toastInstance.toast;
                toastInstance.handles.mouseoutHandler.type = 'mouseout';
                toastInstance.handles.mouseoutHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, toastInstance);
                toastInstance.toast.addEventListener('mouseout', toastInstance.handles.mouseoutHandler.fn);

                toastInstance.handles.pointerleaveHandler = {};
                toastInstance.handles.pointerleaveHandler.obj = toastInstance.toast;
                toastInstance.handles.pointerleaveHandler.type = 'pointerleave';
                toastInstance.handles.pointerleaveHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, toastInstance);
                toastInstance.toast.addEventListener('pointerleave', toastInstance.handles.pointerleaveHandler.fn);

                toastInstance.handles.pointeroutHandler = {};
                toastInstance.handles.pointeroutHandler.obj = toastInstance.toast;
                toastInstance.handles.pointeroutHandler.type = 'pointerout';
                toastInstance.handles.pointeroutHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, toastInstance);
                toastInstance.toast.addEventListener('pointerout', toastInstance.handles.pointeroutHandler.fn);

                toastInstance.handles.touchstartHandler = {};
                toastInstance.handles.touchstartHandler.obj = toastInstance.toast;
                toastInstance.handles.touchstartHandler.type = 'touchstart';
                toastInstance.handles.touchstartHandler.fn = toastletNotify.handles.toast.touchstart.bind(null, toastInstance);
                toastInstance.toast.addEventListener('touchstart', toastInstance.handles.touchstartHandler.fn);

                toastInstance.handles.touchcancelHandler = {};
                toastInstance.handles.touchcancelHandler.obj = toastInstance.toast;
                toastInstance.handles.touchcancelHandler.type = 'touchcancel';
                toastInstance.handles.touchcancelHandler.fn = toastletNotify.handles.toast.touchcancel.bind(null, toastInstance);
                toastInstance.toast.addEventListener('touchcancel', toastInstance.handles.touchcancelHandler.fn);

                toastInstance.handles.pointercancelHandler = {};
                toastInstance.handles.pointercancelHandler.obj = toastInstance.toast;
                toastInstance.handles.pointercancelHandler.type = 'pointercancel';
                toastInstance.handles.pointercancelHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, toastInstance);
                toastInstance.toast.addEventListener('pointercancel', toastInstance.handles.pointercancelHandler.fn);

                toastInstance.handles.touchmoveHandler = {};
                toastInstance.handles.touchmoveHandler.obj = toastInstance.toast;
                toastInstance.handles.touchmoveHandler.type = 'touchmove';
                toastInstance.handles.touchmoveHandler.fn = toastletNotify.handles.toast.touchmove.bind(null, toastInstance);
                toastInstance.toast.addEventListener('touchmove', toastInstance.handles.touchmoveHandler.fn);

                toastInstance.handles.touchendHandler = {};
                toastInstance.handles.touchendHandler.obj = toastInstance.toast;
                toastInstance.handles.touchendHandler.type = 'touchend';
                toastInstance.handles.touchendHandler.fn = toastletNotify.handles.toast.touchend.bind(null, toastInstance);
                toastInstance.toast.addEventListener('touchend', toastInstance.handles.touchendHandler.fn);

                toastInstance.handles.focusinHandler = {};
                toastInstance.handles.focusinHandler.obj = toastInstance.toast;
                toastInstance.handles.focusinHandler.type = 'focusin';
                toastInstance.handles.focusinHandler.fn = toastletNotify.handles.toast.focusin.bind(null, toastInstance);
                toastInstance.toast.addEventListener('focusin', toastInstance.handles.focusinHandler.fn);

                toastInstance.handles.focusoutHandler = {};
                toastInstance.handles.focusoutHandler.obj = toastInstance.toast;
                toastInstance.handles.focusoutHandler.type = 'focusout';
                toastInstance.handles.focusoutHandler.fn = toastletNotify.handles.toast.focusout.bind(null, toastInstance);
                toastInstance.toast.addEventListener('focusout', toastInstance.handles.focusoutHandler.fn);
                
                toastInstance.handles.keydownHandler = {};
                toastInstance.handles.keydownHandler.obj = toastInstance.toast;
                toastInstance.handles.keydownHandler.type = 'keydown';
                toastInstance.handles.keydownHandler.fn = toastletNotify.handles.toast.keydown.bind(null, toastInstance);
                toastInstance.toast.addEventListener('keydown', toastInstance.handles.keydownHandler.fn);

                toastInstance.handles.windowResize = {};
                toastInstance.handles.windowResize.obj = window;
                toastInstance.handles.windowResize.type = 'resize';
                toastInstance.handles.windowResize.fn = toastletNotify.handles.window.resize.bind(null, toastInstance);
                window.addEventListener('resize', toastInstance.handles.windowResize.fn);
                
                toastInstance.handles.documentVisibilityChange = {};
                toastInstance.handles.documentVisibilityChange.obj = document;
                toastInstance.handles.documentVisibilityChange.type = 'visibilitychange';
                toastInstance.handles.documentVisibilityChange.fn = toastletNotify.handles.document.visibilityChange.bind(null, toastInstance);
                document.addEventListener('visibilitychange', toastInstance.handles.documentVisibilityChange.fn);

                toastInstance.observerBody = new MutationObserver(toastletNotify.handles.body.mutation.bind(null, toastInstance));
                toastInstance.observerBody.observe(document.body, toastInstance.observerConfig);

                toastInstance.observerHtml = new MutationObserver(toastletNotify.handles.html.mutation.bind(null, toastInstance));
                toastInstance.observerHtml.observe(document.documentElement, toastInstance.observerConfig);

                toastletInstances.push(toastInstance);

                toastInstance.id = toastletInstances.lastId;

                Object.preventExtensions(toastInstance);

                document.body.appendChild(toastInstance.toast);

                const gridTemplateColumns = `grid-template-columns: ${gridTemplate.join(' ')};`;

                const gridGap = ( ! toastInstance.config.title && content.length === 0 ) ? 'gap: 20px;' : 'gap: 10px;';

                const cursor = ( toastInstance.config.onClick !== null ) ? 'cursor: pointer;' : 'cursor: auto;';

                if( toastletNotify.utils.isMobile(toastInstance) ) {

                    toastInstance.toast.style.cssText = toastInstance.toastStyle.mobile + gridTemplateColumns + gridGap + cursor;
                    toastletNotify.setPosition.mobile[toastInstance.config.positionMobile](toastInstance);

                }
                else {

                    toastInstance.toast.style.cssText = toastInstance.toastStyle.desktop + gridTemplateColumns + gridGap + cursor;
                    toastletNotify.setPosition.desktop[toastInstance.config.position](toastInstance);

                }

                if( toastInstance.animationIn ) {

                    toastInstance.toast.style.opacity = '1';

                    toastletNotify.animation.setAnimationIn(toastInstance);

                }
                else{

                    toastInstance.toast.style.setProperty('transform', `translate(${toastInstance.translateOutX}, ${toastInstance.translateOutY})`);
    
                    void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                }

                toastInstance.toast.style.setProperty('transition', toastInstance.transitionRule.toast.join(' '));

                void toastInstance.toast.offsetWidth; // Trigger reflow to apply new styles

                toastletNotify.utils.enterElement(toastInstance);
                
                // !! REMOVE AFTER TESTING !!
                window.toastletToast = toastInstance;

                const controller = {

                    id: toastInstance.id,
                    toast: toastInstance.toast,
                    close: () => toastletNotify.close(toastInstance.id)
                    
                };

                if( toastInstance.config.onClick !== null )
                    controller.clickControl = toastInstance.clickControl;

                return controller;

            })

        }),
        writable: false,
        enumerable: false,
        configurable: false

    })

    // !! REMOVE AFTER TESTING !!
    window.toastletInstances = toastletInstances;

})();