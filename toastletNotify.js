/**
 * 🍞 Toastlet Notify
 * A lightweight JavaScript library for displaying beautiful toast notifications.
 * Visually inspired by PNotify 4+ with Bootstrap styling.
 * 
 * 📦 @version 1.0.0
 * 👤 @author Pedro Rigolin
 * 🔗 @repository https://github.com/pedrohrigolin/Toastlet-Notify-JS
 * 📝 @license MIT
 * 
 * ⚙️ Basic Usage:
 * toastletNotify.notify('success', 'Operation completed successfully');
 * 
 * 🎨 Supported Types:
 * - 🔔 notice - For system announcements and general notifications
 * - ℹ️ info - For contextual tips and helpful explanations
 * - ✅ success - For successful operations
 * - ⚠️ warning - For warning messages
 * - ❌ error - For error notifications
 * 
 * 🧩 Advanced Usage:
 * toastletNotify.notify('success', 'Data saved!', {
 *   sticky: true,
 *   customClass: 'my-custom-toast',
 *   delay: 5000,
 *   transition: true,
 *   transitionDuration: 300
 * });
 * 
 * 🧠 Mobile Responsive:
 * Automatically adapts to mobile devices with appropriate styling
 * 
 * 🌐 @namespace toastletNotify
 * 🛎️ @method notify
 * @param {string} type - Notification type: "info", "success", "warning", "error", or "notice"
 * @param {string} message - Text message to display (supports line breaks with \n)
 * @param {Object} [options] - Optional configuration settings
 * @param {boolean} [options.sticky=false] - If true, notification won't auto-close
 * @param {number} [options.delay=5000] - Duration in milliseconds before auto-closing (ignored if sticky is true)
 * @param {string} [options.customClass] - Additional CSS classes for custom styling
 * @param {boolean} [options.transition=true] - Enable/disable transition animations
 * @param {number} [options.transitionDuration=300] - Duration of animations in milliseconds
 * 
 * 📱 Touch Support:
 * Swipe to dismiss on mobile devices
 * 
 * 🖱️ Interaction:
 * - Hover to reveal controls
 * - Pause/resume timer button
 * - Close button to dismiss
 */
(function(){

    if(typeof toastletNotify !== 'undefined'){
        console.warn('Toastlet Notify is already defined!');
        return;
    }

    Object.defineProperty(window, 'toastletNotify', {

        value: Object.freeze({

            icons: {

                success: `<svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>`,

                warning: `<svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`,

                info: `<svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>`,

                error: `<svg width="18" height="18" viewBox="0 0 576 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`,

                notice: `<svg width="18" height="18" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>`,

                pause: `<svg width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>`,

                play: `<svg width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>`,

                close: `<svg width="16" height="16" viewBox="0 0 352 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>`

            },

            typeMap: {
                warning: { 
                    color: '#F39C12', 
                    icon: null,
                    name: 'Warning',
                    class: 'toastletWarning'
                },
                info: { 
                    color: '#3498DB', 
                    icon: null,
                    name: 'Info',
                    class: 'toastletInfo'
                },
                success: { 
                    color: '#00bc8c', 
                    icon: null,
                    name: 'Success!',
                    class: 'toastletSuccess'
                },
                error: { 
                    color: '#E74C3C', 
                    icon: null,
                    name: 'Error!',
                    class: 'toastletError'
                },
                notice: { 
                    color: '#708090', 
                    icon: null,
                    name: 'Notice',
                    class: 'toastletNotice'
                },
                get: function(type){
                    if (typeof type !== 'string') return false;
                    type = type.toLowerCase().trim();
                    if(!toastletNotify.typeMap.hasOwnProperty(type)) return false;
                    map = this[type];
                    map.icon = toastletNotify.icons[type];
                    return map;
                }
            },

            notify: function(type, message = "", options = {}){

                if (!document.body) {
                    console.error('[ToastletNotify] Error: document.body is not available');
                    return false;
                }

                if( typeof type !== 'string' ){
                    const err = new Error();
                    const lineInfo = err.lineNumber ? `toastletNotify.js:${err.lineNumber}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'type' must be a string\n  at toastletNotify.notify (${lineInfo})\n  Expected: string\n  Received: ${typeof type}`);
                    return false;
                }

                if( message === null || message === undefined ) message = "";

                if( typeof message !== 'string' ){
                    const err = new Error();
                    const lineInfo = err.lineNumber ? `toastletNotify.js:${err.lineNumber}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'message' must be a string\n  at toastletNotify.notify (${lineInfo})\n  Expected: string\n  Received: ${typeof message}`);
                    return false;
                }

                if( typeof options !== 'object' ){
                    const err = new Error();
                    const lineInfo = err.lineNumber ? `toastletNotify.js:${err.lineNumber}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'options' must be an object\n  at toastletNotify.notify (${lineInfo})\n  Expected: object\n  Received: ${typeof options}`);
                    return false;
                }

                if( options === null || Object.getPrototypeOf(options) !== Object.prototype ) {
                    const err = new Error();
                    const lineInfo = err.lineNumber ? `toastletNotify.js:${err.lineNumber}` : 'unknown line';
                    console.error(`[ToastletNotify] TypeError: Parameter 'options' must be a plain object\n  at toastletNotify.notify (${lineInfo})\n  Expected: plain object\n  Received: ${options === null ? 'null' : 'non-plain object'}`);
                    return false;
                }

                type = type.replace(/[\s\p{Z}\p{C}]+/gu, '').toLowerCase();

                const notificationType = toastletNotify.typeMap.get(type);

                if(!notificationType){
                    const err = new Error();
                    const lineInfo = err.lineNumber ? `toastletNotify.js:${err.lineNumber}` : 'unknown line';
                    console.error(`[ToastletNotify] Invalid notification type: "${type}"\n  at toastletNotify.notify (${lineInfo})\n  Valid types: info, success, warning, error, notice`);
                    return false;
                }

                const elements = {
                    notificationType: notificationType,
                    handles: {}
                };

                elements.handles.windowResize = {};
                elements.handles.windowResize.obj = window;
                elements.handles.windowResize.type = 'resize';
                elements.handles.windowResize.fn = toastletNotify.handles.window.resize.bind(null, elements);
                window.addEventListener('resize', elements.handles.windowResize.fn);
                
                message = message.replace(/<br\s*\/?>/gi, '\n').trim();

                const isMobile = toastletNotify.utils.isMobile();

                elements.config = {
                    sticky: false,
                    delay: 5000,
                    customClass: '',
                    transition: true,
                    transitionDuration: 300,
                    ...options
                };

                if(typeof elements.config.sticky !== 'boolean'){
                    console.warn(`[ToastletNotify] Warning: Option 'sticky' must be a boolean\n  Received: ${typeof elements.config.sticky}\n  Using default value: false`);
                    elements.config.sticky = false;
                }

                if(typeof elements.config.delay !== 'number'){
                    console.warn(`[ToastletNotify] Warning: Option 'delay' must be a number\n  Received: ${typeof elements.config.delay}\n  Using default value: 5000`);
                    elements.config.delay = 5000;
                }

                if(elements.config.delay < 0){
                    console.warn(`[ToastletNotify] Warning: Option 'delay' must be a non-negative number\n  Received: ${elements.config.delay}\n  Setting to 0 (notification will remain until dismissed, equivalent to sticky: true)`);
                    elements.config.delay = 0;
                }

                if(typeof elements.config.customClass !== 'string'){
                    console.warn(`[ToastletNotify] Warning: Option 'customClass' must be a string\n  Received: ${typeof elements.config.customClass}\n  Using default value: ""`);
                    elements.config.customClass = "";
                }

                if(typeof elements.config.transition !== 'boolean'){
                    console.warn(`[ToastletNotify] Warning: Option 'transition' must be a boolean\n  Received: ${typeof elements.config.transition}\n  Using default value: true`);
                    elements.config.transition = true;
                }

                if(typeof elements.config.transitionDuration !== 'number'){
                    console.warn(`[ToastletNotify] Warning: Option 'transitionDuration' must be a number\n  Received: ${typeof elements.config.transitionDuration}\n  Using default value: 300`);
                    elements.config.transitionDuration = 300;
                }

                if(elements.config.transitionDuration < 0){
                    console.warn(`[ToastletNotify] Warning: Option 'transitionDuration' must be a non-negative number\n  Received: ${elements.config.transitionDuration}\n  Setting to 0 (animations will be instant with no transition effect)`);
                    elements.config.transitionDuration = 0;
                }
                
                if(elements.config.transitionDuration === 0 && elements.config.transition) elements.config.transition = false;

                if(!elements.config.transition && elements.config.transitionDuration !== 0) elements.config.transitionDuration = 0;

                elements.config.customClass = elements.config.customClass.replace(/[\s\p{Z}]+/gu, ' ').trim()

                elements.toastStyle = {
                    desktop: toastletNotify.styles.toast['desktop'],
                    mobile: toastletNotify.styles.toast['mobile']
                }

                elements.toastStyle.desktop += `background-color: ${elements.notificationType.color};`
                elements.toastStyle.mobile += `background-color: ${elements.notificationType.color};`            

                elements.toast = document.createElement('div');
                elements.toast.className = `toastlet ${elements.notificationType.class} ${elements.config.customClass}`.trim();
                elements.toast.style.cssText = elements.toastStyle[isMobile ? 'mobile' : 'desktop'] + `transition: all ${elements.config.transitionDuration}ms ease-in-out`;

                elements.iconCol = document.createElement('div');
                elements.iconCol.className = 'toastlet-icon';
                elements.iconCol.style.cssText = toastletNotify.styles.iconCol

                elements.iconContainer = document.createElement('div');
                elements.iconContainer.innerHTML = elements.notificationType.icon;
                elements.iconCol.appendChild(elements.iconContainer);

                elements.contentCol = document.createElement('div');
                elements.contentCol.className = 'toastlet-content';
                elements.contentCol.style.cssText = toastletNotify.styles.contentCol

                elements.title = document.createElement('div');
                elements.title.className = 'toastlet-title';
                elements.title.textContent = elements.notificationType.name;
                elements.title.style.cssText = toastletNotify.styles.title

                elements.text = document.createElement('div');
                elements.text.className = 'toastlet-message';
                elements.text.textContent = message;
                elements.text.style.cssText = toastletNotify.styles.text

                elements.contentCol.appendChild(elements.title);
                elements.contentCol.appendChild(elements.text);

                elements.controlsCol = document.createElement('div');
                elements.controlsCol.className = 'toastlet-controls';
                elements.controlsCol.style.cssText = toastletNotify.styles.constrolCol

                elements.isSticky = elements.config.sticky || elements.config.delay <= 0;
                elements.pauseButton = null;
                elements.closeButton = null;
                elements.timeoutId = null;
                elements.isPausedByButton = false;
                elements.isHovered = false;
                elements.startX = 0;
                elements.currentX = 0;
                elements.isDragging = false;
                elements.isClosing = false;
                elements.isTouchDevice = 'ontouchstart' in window;
                elements.touchStartTime = 0;
                elements.touchEndTime = 0;
                elements.touchStartPosition = { x: 0, y: 0 };

                if (!elements.isSticky) {
                    elements.pauseButton = document.createElement('button');
                    elements.pauseButton.className = 'toastlet-pause';
                    elements.pauseButton.innerHTML = toastletNotify.icons.pause;
                    elements.pauseButton.style.cssText = toastletNotify.styles.pauseButton
                    elements.handles.pauseClickHandler = {};
                    elements.handles.pauseClickHandler.obj = elements.pauseButton;
                    elements.handles.pauseClickHandler.type = 'click';
                    elements.handles.pauseClickHandler.fn = toastletNotify.handles.pauseButton.click.bind(null, elements);
                    elements.pauseButton.addEventListener('click', elements.handles.pauseClickHandler.fn);
                    elements.controlsCol.appendChild(elements.pauseButton);
                }

                elements.closeButton = document.createElement('button');
                elements.closeButton.className = 'toastlet-close';
                elements.closeButton.innerHTML = toastletNotify.icons.close;
                elements.closeButton.style.cssText = toastletNotify.styles.closeButton
                elements.handles.closeClickHandler = {};
                elements.handles.closeClickHandler.obj = elements.closeButton;
                elements.handles.closeClickHandler.type = 'click';
                elements.handles.closeClickHandler.fn = toastletNotify.handles.closeButton.click.bind(null, elements);
                elements.closeButton.addEventListener('click', elements.handles.closeClickHandler.fn);
                elements.controlsCol.appendChild(elements.closeButton);

                elements.toast.appendChild(elements.iconCol);
                elements.toast.appendChild(elements.contentCol);
                elements.toast.appendChild(elements.controlsCol);

                elements.handles.mouseenterHandler = {};
                elements.handles.mouseenterHandler.obj = elements.toast;
                elements.handles.mouseenterHandler.type = 'mouseenter';
                elements.handles.mouseenterHandler.fn = toastletNotify.handles.toast.mouseenter.bind(null, elements);
                elements.toast.addEventListener('mouseenter', elements.handles.mouseenterHandler.fn);

                elements.handles.mouseleaveHandler = {};
                elements.handles.mouseleaveHandler.obj = elements.toast;
                elements.handles.mouseleaveHandler.type = 'mouseleave';
                elements.handles.mouseleaveHandler.fn = toastletNotify.handles.toast.mouseleave.bind(null, elements);
                elements.toast.addEventListener('mouseleave', elements.handles.mouseleaveHandler.fn);

                elements.handles.touchstartHandler = {};
                elements.handles.touchstartHandler.obj = elements.toast;
                elements.handles.touchstartHandler.type = 'touchstart';
                elements.handles.touchstartHandler.fn = toastletNotify.handles.toast.touchstart.bind(null, elements);
                elements.toast.addEventListener('touchstart', elements.handles.touchstartHandler.fn);

                elements.handles.touchmoveHandler = {};
                elements.handles.touchmoveHandler.obj = elements.toast;
                elements.handles.touchmoveHandler.type = 'touchmove';
                elements.handles.touchmoveHandler.fn = toastletNotify.handles.toast.touchmove.bind(null, elements);
                elements.toast.addEventListener('touchmove', elements.handles.touchmoveHandler.fn);

                elements.handles.touchendHandler = {};
                elements.handles.touchendHandler.obj = elements.toast;
                elements.handles.touchendHandler.type = 'touchend';
                elements.handles.touchendHandler.fn = toastletNotify.handles.toast.touchend.bind(null, elements);
                elements.toast.addEventListener('touchend', elements.handles.touchendHandler.fn);

                document.body.appendChild(elements.toast);

                toastletNotify.utils.enterElement(elements);

            },

            styles: {

                toast: {

                    desktop: `position:fixed;top:20px;right:20px;width:360px;min-height:80px;z-index:999999;border-radius:5px;color:#fff;box-shadow:0 6px 28px 0 rgb(0 0 0 / .1);display:grid;grid-template-columns:auto 1fr auto;opacity:0;transform:translateY(-20px);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.1;touch-action:pan-y;`,
                    
                    mobile: `position:fixed;top:0;right:0;left:0;width:100vw;min-height:80px;z-index:999999;border-radius:0;color:#fff;box-shadow:0 6px 28px 0 rgb(0 0 0 / .1);display:grid;grid-template-columns:auto 1fr auto;opacity:0;transform:translateY(-20px);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.1;margin:0;touch-action:pan-y;`

                },

                iconCol: `padding:15px 10px 15px 15px;display:flex;align-items:flex-start;`,

                contentCol: `padding:15px 0;display:flex;flex-direction:column;gap:10px;height:100%;`,
                
                title: `font-weight:600;font-size:18px;`,
                
                text: `word-break:break-word;white-space:pre-line;font-weight:400;line-height:1.5;height:100%;display:flex;align-content:center;flex-wrap:wrap;`,
                    
                constrolCol: `padding:15px 15px 15px 10px;display:flex;gap:12px;align-items:flex-start;opacity:0;transition:opacity 0.2s ease;`,

                pauseButton: `background:none;border:none;cursor:pointer;padding:2px;opacity:1;transition:opacity 0.2s;`,

                closeButton: `background:none;border:none;cursor:pointer;padding:2px;opacity:1;transition:opacity 0.2s;`
                
            },

            handles: {

                toast: {

                    mouseenter: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if (elements.isTouchDevice && e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
                        elements.isHovered = true;
                        elements.controlsCol.style.opacity = '1';
                        if (!elements.isSticky && !elements.isPausedByButton) toastletNotify.utils.pauseTimer(elements);
                    },

                    mouseleave: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if (elements.isTouchDevice && e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
                        elements.isHovered = false;
                        elements.controlsCol.style.opacity = '0';
                        if (!elements.isSticky && !elements.isPausedByButton) toastletNotify.utils.startTimer(elements);
                    },

                    touchstart: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if (!toastletNotify.utils.isMobile()) return;
                        elements.touchStartTime = Date.now();
                        elements.startX = e.touches[0].clientX;
                        elements.currentX = elements.startX;
                        elements.isDragging = false;
                        elements.touchStartPosition = {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY
                        };
                        if (!elements.isSticky && !elements.isPausedByButton) toastletNotify.utils.pauseTimer(elements);
                        elements.toast.style.transition = 'none';
                    },

                    touchmove: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if (!toastletNotify.utils.isMobile()) return;
                        elements.currentX = e.touches[0].clientX;
                        const diff = elements.currentX - elements.startX;
                        elements.toast.style.transform = `translate(${diff}px, 0px)`;
                        const currentX = e.touches[0].clientX;
                        const currentY = e.touches[0].clientY;
                        const deltaX = Math.abs(currentX - elements.touchStartPosition.x);
                        const deltaY = Math.abs(currentY - elements.touchStartPosition.y);
                        if (deltaX > 10 && deltaX > deltaY) elements.isDragging = true;
                    },

                    touchend: function(elements){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if (!toastletNotify.utils.isMobile()) return;
                        elements.touchEndTime = Date.now();
                        const touchDuration = elements.touchEndTime - elements.touchStartTime;
                        elements.toast.style.transition = `all ${elements.config.transitionDuration}ms ease-in-out`;
                        if (elements.isDragging) {
                            const diff = elements.currentX - elements.startX;
                            if (Math.abs(diff) > 100) {
                                toastletNotify.utils.clearTime(elements);
                                elements.toast.style.opacity = '0';
                                if (diff > 0) elements.toast.style.transform = 'translate(100%, 0px)';
                                else elements.toast.style.transform = 'translate(-100%, 0px)';
                                setTimeout(toastletNotify.timeouts.remove, elements.config.transitionDuration + 20, elements);
                            } else {
                                elements.toast.style.transform = 'translate(0px, 0px)';
                                if (!elements.isSticky && !elements.isPausedByButton) toastletNotify.utils.startTimer(elements);
                            }
                        } else {
                            elements.toast.style.transform = `translate(0px, 0px)`;
                            if (touchDuration < 300) {
                                if (!elements.isSticky) {
                                    if( ! elements.isPausedByButton ) elements.controlsCol.style.opacity = '1';
                                    else elements.controlsCol.style.opacity = '0';
                                    toastletNotify.utils.togglePauseByButton(elements);
                                }
                            } else {
                                if (!elements.isSticky && !elements.isPausedByButton) 
                                    toastletNotify.utils.startTimer(elements);
                            }
                        }
                        elements.isDragging = false;
                    }

                },

                closeButton: {

                    click: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        e.stopPropagation();
                        toastletNotify.utils.closeToast(elements);
                    }

                },

                pauseButton: {
                    click: function(elements, e){
                        if(elements.toast === undefined || elements.isClosing) return;
                        e.stopPropagation();
                        toastletNotify.utils.togglePauseByButton(elements);
                    }
                },

                window: {
                    resize: function(elements){
                        if(elements.toast === undefined || elements.isClosing) return;
                        if(toastletNotify.utils.isMobile()){
                            elements.toast.style.top = '0';
                            elements.toast.style.right = '0';
                            elements.toast.style.left = '0';
                            elements.toast.style.width = '100vw';
                            elements.toast.style.borderRadius = '0';
                            elements.toast.style.margin = '0';
                        }
                        else{
                            elements.toast.style.top = '20px';
                            elements.toast.style.right = '20px';
                            elements.toast.style.left = 'auto';
                            elements.toast.style.width = '360px';
                            elements.toast.style.borderRadius = '5px';
                            elements.toast.style.margin = 'auto';
                        }
                    }
                }

            },

            timeouts: {

                enter: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    elements.toast.style.opacity = '1';
                    elements.toast.style.transform = 'translateY(0)';
                    if (!elements.isSticky) toastletNotify.utils.setStartEnterTimer(elements);
                },

                startEnterTime: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    if (!elements.isSticky) toastletNotify.utils.startTimer(elements);
                },

                remove: function(elements){
                    if(elements.toast === undefined) return;
                    elements.isClosing = true;
                    toastletNotify.utils.clearTime(elements);
                    for( const key in elements.handles) {
                        if( elements.handles.hasOwnProperty(key) && elements.handles[key] && elements.handles[key].obj && elements.handles[key].fn ){
                            elements.handles[key].obj.removeEventListener(elements.handles[key].type, elements.handles[key].fn);
                        }
                    }
                    elements.toast.remove();
                    for (const key in elements) {
                        if (elements.hasOwnProperty(key)) {
                            elements[key] = null;
                            delete elements[key];
                        }
                    }
                }

            },

            utils: {

                isMobile: function(){
                    return window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                },

                clearTime: function(elements){
                    if(elements.timeoutId){
                        clearTimeout(elements.timeoutId);
                        elements.timeoutId = null;
                    }
                },

                enterElement: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    setTimeout(toastletNotify.timeouts.enter, 0, elements);
                },

                setStartEnterTimer: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    setTimeout(toastletNotify.timeouts.startEnterTime, elements.config.transitionDuration, elements);
                },

                startTimer: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    toastletNotify.utils.clearTime(elements);
                    elements.timeoutId = setTimeout(toastletNotify.utils.closeToast, elements.config.delay, elements);
                    if (elements.pauseButton) elements.pauseButton.innerHTML = toastletNotify.icons.pause;
                },

                pauseTimer: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    toastletNotify.utils.clearTime(elements);
                    elements.timeoutId = null;
                },

                togglePauseByButton: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    elements.isPausedByButton = !elements.isPausedByButton;
                    
                    if (elements.isPausedByButton) {
                        toastletNotify.utils.pauseTimer(elements);
                        if (elements.pauseButton) elements.pauseButton.innerHTML = toastletNotify.icons.play;
                    } else {
                        toastletNotify.utils.startTimer(elements);
                    }
                },

                closeToast: function(elements){
                    if(elements.toast === undefined || elements.isClosing) return;
                    elements.isClosing = true;
                    toastletNotify.utils.clearTime(elements);
                    elements.toast.style.opacity = '0';
                    elements.toast.style.transform = 'translateY(-20px)';
                    setTimeout(toastletNotify.timeouts.remove, elements.config.transitionDuration + 20, elements);
                }

            }

        }),
        writable: false,
        enumerable: false,
        configurable: false

    })

})();