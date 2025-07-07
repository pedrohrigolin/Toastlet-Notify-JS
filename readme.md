# 🍞 Toastlet Notify

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/pedrohrigolin/Toastlet-Notify-JS) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/pedrohrigolin/Toastlet-Notify-JS/releases)

**Modern and responsive floating notification JavaScript library**

Toastlet Notify is a lightweight and efficient solution for displaying toast notifications in web applications, with design inspired by PNotify 4+ and Bootstrap style. It offers essential functionalities with focus on performance and usability.

---

## 🚀 Installation

### 📦 Via CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/gh/pedrohrigolin/Toastlet-Notify-JS@main/toastletNotify.min.js"></script>
```

### 📥 Local Download

```html
<script src="path/to/toastletNotify.js"></script>
```

> 💡 **Note:** The library includes all necessary CSS styles. No additional external files required.

---

## ⚡ Basic Usage

### 🎯 Main Syntax

```javascript
toastletNotify.notify(type, message, options);
```

### 🔥 Simple Example

```javascript
toastletNotify.notify('success', 'Operation completed successfully!');
```

---

## 🎨 Notification Types

### ✅ Success
```javascript
toastletNotify.notify('success', 'Data saved successfully!');
```
- **Color:** Green (`#00bc8c`)
- **CSS Class:** `toastletSuccess`
- **Usage:** Confirmations, successful operations

### ❌ Error
```javascript
toastletNotify.notify('error', 'Error processing request.');
```
- **Color:** Red (`#E74C3C`)
- **CSS Class:** `toastletError`
- **Usage:** Errors, operation failures

### ℹ️ Info
```javascript
toastletNotify.notify('info', 'Important system information.');
```
- **Color:** Blue (`#3498DB`)
- **CSS Class:** `toastletInfo`
- **Usage:** General information, tips

### ⚠️ Warning
```javascript
toastletNotify.notify('warning', 'Warning: please verify the entered data.');
```
- **Color:** Orange (`#F39C12`)
- **CSS Class:** `toastletWarning`
- **Usage:** Warnings, preventive alerts

### 🔔 Notice
```javascript
toastletNotify.notify('notice', 'New update available.');
```
- **Color:** Orange (`#F39C12`) - Alias for `warning`
- **CSS Class:** `toastletNotice`
- **Usage:** General notifications, reminders

---

## ⚙️ Advanced Settings

### 🛠️ `options` Parameter

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sticky` | `boolean` | `false` | Makes notification permanent (no automatic closing) |
| `delay` | `number` | `5000` | Duration in milliseconds before automatic closing |
| `customClass` | `string` | `""` | Additional CSS classes for customization |
| `transition` | `boolean` | `true` | Enable/disable transition animations |
| `transitionDuration` | `number` | `300` | Duration of animations in milliseconds |

### 🧲 Sticky Notification

```javascript
toastletNotify.notify('warning', 'This notification stays until manually closed.', {
    sticky: true
});
```

### ⏱️ Custom Duration

```javascript
toastletNotify.notify('info', 'This notification lasts 10 seconds.', {
    delay: 10000
});
```

### 🎨 Custom Styling

```javascript
toastletNotify.notify('success', 'Success with custom style!', {
    customClass: 'my-custom-class'
});
```

### 🎞️ Animation Control

```javascript
// Disable all animations
toastletNotify.notify('info', 'No animations applied.', {
    transition: false
});

// Custom animation duration
toastletNotify.notify('success', 'Slow animation applied!', {
    transition: true,
    transitionDuration: 800
});

// Instant animations (no transition effect)
toastletNotify.notify('warning', 'Instant display!', {
    transition: true,
    transitionDuration: 0
});
```

---

## 🎯 CSS Classes Structure

Each notification automatically includes several CSS classes for targeted styling:

### 🏗️ Main Container Classes
- `toastlet` - Base class applied to all notifications
- Type-specific classes:
  - `toastletSuccess` - Applied to success notifications
  - `toastletError` - Applied to error notifications  
  - `toastletInfo` - Applied to info notifications
  - `toastletWarning` - Applied to warning notifications
  - `toastletNotice` - Applied to notice notifications

### 🧩 Component Classes
- `toastlet-icon` - Icon container
- `toastlet-content` - Content wrapper
- `toastlet-title` - Title text
- `toastlet-message` - Message text
- `toastlet-controls` - Controls container
- `toastlet-pause` - Pause/play button
- `toastlet-close` - Close button

### 🎨 Targeting Specific Types

```css
/* Style only success notifications */
.toastlet.toastletSuccess {
    border-left: 4px solid #00bc8c;
}

/* Style only error notifications */
.toastlet.toastletError {
    animation: shake 0.5s ease-in-out;
}

/* Style only warning notifications */
.toastlet.toastletWarning .toastlet-title {
    text-transform: uppercase;
}

/* Style all info notifications */
.toastlet.toastletInfo .toastlet-message {
    font-style: italic;
}
```

---

## 🔧 Interactive Features

### 🖱️ User Controls

- **Pause/Play:** Pauses/resumes the automatic close timer
- **Close:** Manually removes the notification
- **Hover:** Automatically pauses when mouse is over the notification

### 📱 Mobile Support

- **Swipe:** Swipe horizontally to close (mobile devices)
- **Responsive Layout:** Automatically adapts to screen size
- **Touch-friendly:** Touch-optimized controls

---

## 📱 Responsive Behavior

### 🖥️ Desktop
- Positioning: Top right corner
- Width: 360px
- Animation: Slide down with fade

### 📱 Mobile
- Positioning: Top of screen (full width)
- Width: 100% of viewport
- Swipe gesture support

---

## 🎯 Practical Examples

### 🔄 Contact Form

```javascript
// Success sending
toastletNotify.notify('success', 'Message sent successfully!');

// Validation error
toastletNotify.notify('error', 'Please fill in all required fields.');

// Processing information
toastletNotify.notify('info', 'Processing your request...', {
    delay: 3000
});
```

### 💾 Save System

```javascript
// Auto-save with short duration
toastletNotify.notify('success', 'Draft saved automatically.', {
    delay: 2000
});

// Manual save confirmation
toastletNotify.notify('success', 'Document saved successfully!');

// Connection error
toastletNotify.notify('error', 'Connection error. Please try again.', {
    sticky: true
});
```

### 🔐 User Authentication

```javascript
// Successful login
toastletNotify.notify('success', 'Login successful! Redirecting...');

// Invalid credentials
toastletNotify.notify('error', 'Invalid username or password.');

// Expired session
toastletNotify.notify('warning', 'Your session has expired. Please login again.', {
    sticky: true
});
```

### 🎨 Advanced Customization Examples

```javascript
// Success notification with custom class and slow animation
toastletNotify.notify('success', 'Custom styled success!', {
    customClass: 'premium-success',
    transition: true,
    transitionDuration: 600
});

// Error notification without animations
toastletNotify.notify('error', 'Critical error occurred!', {
    sticky: true,
    transition: false,
    customClass: 'critical-error'
});

// Info notification with fast animation
toastletNotify.notify('info', 'Quick info message.', {
    delay: 2000,
    transition: true,
    transitionDuration: 150
});
```

---

## 🎨 CSS Customization

### 🖌️ Overriding Styles

```css
/* Customize specific toast */
.toastlet.my-class {
    border-left: 4px solid #FF6B6B;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

/* Customize title */
.toastlet .toastlet-title {
    font-size: 16px;
    text-transform: uppercase;
}

/* Customize message */
.toastlet .toastlet-message {
    font-style: italic;
}

/* Customize controls */
.toastlet .toastlet-controls {
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
}
```

### 🌈 Custom Themes

```javascript
// Apply dark theme
toastletNotify.notify('info', 'Dark theme activated!', {
    customClass: 'dark-theme'
});
```

```css
.toastlet.dark-theme {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: #ffffff;
}

/* Type-specific customization */
.toastlet.toastletSuccess.premium-success {
    background: linear-gradient(45deg, #00bc8c, #4caf50) !important;
    box-shadow: 0 8px 32px rgba(0,188,140,0.3);
}

.toastlet.toastletError.critical-error {
    background: linear-gradient(45deg, #e74c3c, #c0392b) !important;
    border: 2px solid #fff;
    animation: pulse 1s infinite;
}
```

---

## 🔍 Troubleshooting

### ❓ Common Issues

**Notification doesn't appear:**
- Check if the script was loaded correctly
- Confirm there are no console errors
- Check z-index of other elements

**Style is not applied:**
- Make sure there are no CSS conflicts
- Check CSS rule specificity
- Use `!important` if necessary

**Doesn't work on mobile devices:**
- Check if viewport is configured correctly
- Confirm touch events are being captured

**Animations not working:**
- Verify `transition` is set to `true`
- Check `transitionDuration` is a positive number
- Ensure no CSS transitions are conflicting

---

## 🛡️ Compatibility

### 🌐 Supported Browsers

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

### 📱 Mobile Devices

- ✅ iOS Safari 12+
- ✅ Android Chrome 60+
- ✅ Samsung Internet 8+

---

## 🎭 Recommended Use Cases

### ✅ Ideal For:
- User action confirmations
- Error/success notifications
- Temporary warnings
- Asynchronous operation feedback
- System alerts

### ❌ Not Recommended For:
- Critical content requiring mandatory action
- Information that needs to remain visible
- Complex forms or inputs
- Extensive or detailed content

---

## 📊 Performance

### 🚀 Metrics

- **Size:** ~8KB (minified)
- **Dependencies:** Zero
- **Compatibility:** ES5+

### 💡 Optimizations

- Inline CSS to reduce requests
- Optimized event listeners
- Automatic garbage collection
- Conditional animation rendering

---

## 🔗 Useful Links

- 📚 [GitHub Repository](https://github.com/pedrohrigolin/Toastlet-Notify-JS)
- 🎯 [Online Demo](https://pedrohrigolin.github.io/Toastlet-Notify-JS/demo.html)
- 🐛 [Report Bugs](https://github.com/pedrohrigolin/Toastlet-Notify-JS/issues)

---

## 📄 License

MIT License - Free for commercial and personal use.

**Developed by Pedro Rigolin** 👨‍💻