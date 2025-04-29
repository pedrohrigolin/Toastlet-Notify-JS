/**
 * 🍞 Toastlet Notify
 * Biblioteca JavaScript para exibição de notificações flutuantes (toasts) na tela.
 * Inspirado visualmente no estilo do PNotify 4+ com Bootstrap.
 *
 * 📦 @version 1.0.0
 * 👤 @author Pedro Rigolin
 *
 * ⚙️ Uso básico:
 * toastletNotify.notify(type, message);
 *
 * 🎨 Tipos suportados:
 * - ℹ️ info
 * - ✅ success
 * - ⚠️ warning
 * - ❌ error
 *
 * 🧩 @namespace toastletNotify
 * 🛎️ @method notify
 * @param {string} type - O tipo da notificação. Pode ser: "info", "success", "warning" ou "error".
 * @param {string} message - A mensagem a ser exibida.
 * @param {Object} [options] - Configurações opcionais.
 * @param {boolean} [options.sticky=false] - Se true, a notificação não fecha automaticamente.
 * @param {number} [options.duration=3000] - Duração da notificação em milissegundos (ignorado se sticky for true).
 * @param {string} [options.class] - Classes CSS adicionais para estilizar a notificação.
 */
(function(){

    if(typeof toastletNotify !== 'undefined'){
        console.warn('Toastlet Notify is already defined!');
        return;
    }

    Object.defineProperty(window, 'toastletNotify', {

        value: Object.freeze({

            icons: {

                success: 
                        `
                            <svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                warning: 
                        `
                            <svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                info:
                        `
                            <svg width="18" height="18" viewBox="0 0 512 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                error:
                        `
                            <svg width="18" height="18" viewBox="0 0 576 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                pause: 
                        `
                            <svg width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                play:
                        `
                            <svg width="16" height="16" viewBox="0 0 448 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim(),

                close:
                        `
                            <svg width="16" height="16" viewBox="0 0 352 512" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                            </svg>
                        `.replace(/\n/gm, '').replace(/\s+/gm, ' ').trim()

            },


            typeMap: {
                warning: { 
                    color: '#F39C12', 
                    icon: null,
                    name: 'Warning'
                },
                info: { 
                    color: '#3498DB', 
                    icon: null,
                    name: 'Info'
                },
                success: { 
                    color: '#00bc8c', 
                    icon: null,
                    name: 'Success!'
                },
                error: { 
                    color: '#E74C3C', 
                    icon: null,
                    name: 'Error!'
                },
                notice: { 
                    color: '#F39C12', 
                    icon: null,
                    name: 'Notice'
                },
                get: function(type){
                    type = type.toLowerCase().trim()
                    if(!toastletNotify.typeMap.hasOwnProperty(type)) return false
                    map = this[type]
                    type === 'notice' ? map.icon = toastletNotify.icons.warning : map.icon = toastletNotify.icons[type]
                    return map
                }
            },

            notify: function(type, message, options = {}){

                const notificationType = toastletNotify.typeMap.get(type) || toastletNotify.typeMap.get('info');

                if(!notificationType) return false

                const elements = {
                    notificationType: notificationType
                }

                elements.windowResize = window.addEventListener('resize', toastletNotify.handles.window.resize.bind(null, elements));
                
                message = message.replace('<br>', '\n').trim()

                const isMobile = toastletNotify.utils.isMobile();

                elements.config = {
                    sticky: false,
                    delay: 5000,
                    customClass: '',
                    ...options
                };

                elements.toastStyle = {
                    desktop: toastletNotify.styles.toast['desktop'],
                    mobile: toastletNotify.styles.toast['mobile']
                }

                elements.toastStyle.desktop += `background-color: ${elements.notificationType.color};`
                elements.toastStyle.mobile += `background-color: ${elements.notificationType.color};`            

                elements.toast = document.createElement('div');
                elements.toast.className = `toastlet ${elements.config.customClass}`;
                elements.toast.style.cssText = elements.toastStyle[isMobile ? 'mobile' : 'desktop']

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

                elements.pauseButton = null;
                elements.closeButton = null;
                elements.timeoutId = null;
                elements.isPausedByButton = false;
                elements.isHovered = false;
                elements.startX = 0;
                elements.currentX = 0;
                elements.isDragging = false;

                if (!elements.config.sticky && elements.config.delay > 0) {
                    elements.pauseButton = document.createElement('button');
                    elements.pauseButton.className = 'toastlet-pause';
                    elements.pauseButton.innerHTML = toastletNotify.icons.pause;
                    elements.pauseButton.style.cssText = toastletNotify.styles.pauseButton
                    elements.pauseButton.addEventListener('click', toastletNotify.handles.pauseButton.click.bind(null, elements));
                    elements.controlsCol.appendChild(elements.pauseButton);
                }

                elements.closeButton = document.createElement('button');
                elements.closeButton.className = 'toastlet-close';
                elements.closeButton.innerHTML = toastletNotify.icons.close;
                elements.closeButton.style.cssText = toastletNotify.styles.closeButton
                elements.closeButton.addEventListener('click', toastletNotify.handles.closeButton.click.bind(null, elements));
                elements.controlsCol.appendChild(elements.closeButton);

                elements.toast.appendChild(elements.iconCol);
                elements.toast.appendChild(elements.contentCol);
                elements.toast.appendChild(elements.controlsCol);
                
                document.body.appendChild(elements.toast);

                toastletNotify.timeouts.enter(elements);

                elements.toast.addEventListener('mouseenter', toastletNotify.handles.toast.mouseenter.bind(null, elements));

                elements.toast.addEventListener('mouseleave', toastletNotify.handles.toast.mouseleave.bind(null, elements));

                if (!elements.config.sticky && elements.config.delay > 0) toastletNotify.utils.startTimer(elements);

                elements.toast.addEventListener('touchstart', toastletNotify.handles.toast.touchstart.bind(null, elements));

                elements.toast.addEventListener('touchmove', toastletNotify.handles.toast.touchmove.bind(null, elements));

                elements.toast.addEventListener('touchend', toastletNotify.handles.toast.touchend.bind(null, elements));

            },

            styles: {

                toast: {

                    desktop:
                            `
                                position: fixed;
                                top: 20px;
                                right: 20px;
                                width: 360px;
                                min-height: 80px;
                                z-index: 999999;
                                border-radius: 5px;
                                color: white;
                                box-shadow: 0px 6px 28px 0px rgba(0, 0, 0, 0.1);
                                display: grid;
                                grid-template-columns: auto 1fr auto;
                                opacity: 0;
                                transform: translateY(-20px);
                                transition: all 0.3s ease;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                font-size: 15px;
                                line-height: 1.1;
                                touch-action: pan-y;
                            `,
                    
                    mobile:
                            `
                                position: fixed;
                                top: 0;
                                right: 0;
                                left: 0;
                                width: 100vw;
                                min-height: 80px;
                                z-index: 999999;
                                border-radius: 0;
                                color: white;
                                box-shadow: 0px 6px 28px 0px rgba(0, 0, 0, 0.1);
                                display: grid;
                                grid-template-columns: auto 1fr auto;
                                opacity: 1;
                                transform: translateY(0);
                                transition: all 0.3s ease;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                font-size: 15px;
                                line-height: 1.1;
                                margin: 0;
                                touch-action: pan-y;
                            `

                },

                iconCol: 
                        `
                            padding: 15px 10px 15px 15px;
                            display: flex;
                            align-items: flex-start;
                        `,

                contentCol:
                            `
                                padding: 15px 0;
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                                height: 100%;
                            `,
                
                title: 
                        `
                            font-weight: 600;
                            font-size: 18px;
                        `,
                
                text:
                    `
                        word-break: break-word;
                        white-space: pre-line;
                        font-weight: 400;
                        line-height: 1.5;
                        height: 100%;
                        display: flex;
                        align-content: center;
                        flex-wrap: wrap;
                    `,
                    
                constrolCol:
                            `
                                padding: 15px 15px 15px 10px;
                                display: flex;
                                gap: 12px;
                                align-items: flex-start;
                                opacity: 0;
                                transition: opacity 0.2s ease;
                            `,

                pauseButton: 
                            `
                                background: none;
                                border: none;
                                cursor: pointer;
                                padding: 2px;
                                opacity: 1;
                                transition: opacity 0.2s;
                            `,

                closeButton:
                            `
                                background: none;
                                border: none;
                                cursor: pointer;
                                padding: 2px;
                                opacity: 1;
                                transition: opacity 0.2s;
                            `
                
            },

            handles: {

                toast: {

                    mouseenter: function(elements){
                        if(elements.toast === undefined) return;
                        elements.isHovered = true;
                        elements.controlsCol.style.opacity = '1';
                        if (!elements.config.sticky && elements.config.delay > 0 && !elements.isPausedByButton) {
                            toastletNotify.utils.pauseTimer(elements);
                        }
                    },

                    mouseleave: function(elements){
                        if(elements.toast === undefined) return;
                        elements.isHovered = false;
                        elements.controlsCol.style.opacity = '0';
                        if (!elements.config.sticky && elements.config.delay > 0 && !elements.isPausedByButton) {
                            toastletNotify.utils.startTimer(elements);
                        }
                    },

                    touchstart: function(elements, e){
                        if(elements.toast === undefined) return;
                        if (!toastletNotify.utils.isMobile()) return;
                        elements.startX = e.touches[0].clientX;
                        elements.currentX = elements.startX;
                        elements.isDragging = true;
                        elements.toast.style.transition = 'none';
                    },

                    touchmove: function(elements, e){
                        if(elements.toast === undefined) return;
                        if (!elements.isDragging || !toastletNotify.utils.isMobile()) return;
                        elements.currentX = e.touches[0].clientX;
                        const diff = elements.currentX - elements.startX;
                        elements.toast.style.transform = `translateX(${diff}px)`;
                    },

                    touchend: function(elements){
                        if(elements.toast === undefined) return;
                        if (!elements.isDragging || !toastletNotify.utils.isMobile()) return;
                        elements.isDragging = false;
                        elements.toast.style.transition = 'all 0.3s ease';
                        
                        const diff = elements.currentX - elements.startX;
                        if (Math.abs(diff) > 100) {
                            elements.toast.style.opacity = '0';
                            setTimeout(toastletNotify.timeouts.remove, 300, elements);
                        } else {
                            elements.toast.style.transform = 'translateX(0)';
                        }
                    }

                },

                closeButton: {

                    click: function(elements, e){
                        if(elements.toast === undefined) return;
                        e.stopPropagation();
                        toastletNotify.utils.closeToast(elements);
                    }

                },

                pauseButton: {
                    click: function(elements, e){
                        if(elements.toast === undefined) return;
                        e.stopPropagation();
                        toastletNotify.utils.togglePauseByButton(elements);
                    }
                },

                window: {
                    resize: function(elements){
                        if(elements.toast === undefined) return;
                        if(toastletNotify.utils.isMobile())
                            elements.toast.style.cssText = elements.toastStyle.mobile
                        else
                            elements.toast.style.cssText = elements.toastStyle.desktop
                    }
                }

            },

            timeouts: {

                enter: function(elements){
                    if(elements.toast === undefined) return;
                    elements.toast.style.opacity = '1';
                    elements.toast.style.transform = 'translateY(0)';
                },

                remove: function(elements){
                    if(elements.toast === undefined) return;
                    elements.toast.remove();
                    window.removeEventListener('resize', elements.windowResize);
                    for (const key in elements) {
                        if (elements.hasOwnProperty(key)) {
                            delete elements[key];
                        }
                    }
                }

            },

            utils: {

                isMobile: function(){
                    return window.innerWidth <= 768;
                },

                startTimer: function(elements){
                    if(elements.toast === undefined) return;
                    if (elements.timeoutId) clearTimeout(elements.timeoutId);
                    elements.timeoutId = setTimeout(toastletNotify.utils.closeToast, elements.config.delay, elements);
                    if (elements.pauseButton) elements.pauseButton.innerHTML = toastletNotify.icons.pause;
                },

                pauseTimer: function(elements){
                    if(elements.toast === undefined) return;
                    if (elements.timeoutId) clearTimeout(elements.timeoutId);
                    elements.timeoutId = null;
                },

                togglePauseByButton: function(elements){
                    if(elements.toast === undefined) return;
                    elements.isPausedByButton = !elements.isPausedByButton;
                    
                    if (elements.isPausedByButton) {
                        toastletNotify.utils.pauseTimer(elements);
                        if (elements.pauseButton) elements.pauseButton.innerHTML = toastletNotify.icons.play;
                    } else {
                        toastletNotify.utils.startTimer(elements);
                    }
                },

                closeToast: function(elements){
                    if(elements.toast === undefined) return;
                    if (elements.timeoutId) clearTimeout(elements.timeoutId);
                    elements.toast.style.opacity = '0';
                    elements.toast.style.transform = 'translateY(-20px)';
                    setTimeout(toastletNotify.timeouts.remove, 300, elements);
                }

            }

        }),
        writable: false,
        enumerable: false,
        configurable: false

    })

})();
