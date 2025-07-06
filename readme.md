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
- **Usage:** Confirmations, successful operations

### ❌ Error
```javascript
toastletNotify.notify('error', 'Error processing request.');
```
- **Color:** Red (`#E74C3C`)
- **Usage:** Errors, operation failures

### ℹ️ Info
```javascript
toastletNotify.notify('info', 'Important system information.');
```
- **Color:** Blue (`#3498DB`)
- **Usage:** General information, tips

### ⚠️ Warning
```javascript
toastletNotify.notify('warning', 'Warning: please verify the entered data.');
```
- **Color:** Orange (`#F39C12`)
- **Usage:** Warnings, preventive alerts

### 🔔 Notice
```javascript
toastletNotify.notify('notice', 'New update available.');
```
- **Color:** Orange (`#F39C12`) - Alias for `warning`
- **Usage:** General notifications, reminders

---

## ⚙️ Advanced Settings

### 🛠️ `options` Parameter

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sticky` | `boolean` | `false` | Makes notification permanent (no automatic closing) |
| `delay` | `number` | `5000` | Duration in milliseconds before automatic closing |
| `customClass` | `string` | `""` | Additional CSS classes for customization |

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

---

## 🔗 Useful Links

- 📚 [GitHub Repository](https://github.com/pedrohrigolin/Toastlet-Notify-JS)
- 🎯 [Online Demo](https://pedrohrigolin.github.io/Toastlet-Notify-JS/demo.html)
- 🐛 [Report Bugs](https://github.com/pedrohrigolin/Toastlet-Notify-JS/issues)

---

## 📄 License

MIT License - Free for commercial and personal use.

**Developed by Pedro Rigolin** 👨‍💻