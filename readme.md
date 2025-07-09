# 🍞 Toastlet Notify

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/pedrohrigolin/Toastlet-Notify-JS) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/pedrohrigolin/Toastlet-Notify-JS/releases)

**Ultra-lightweight, zero-dependency JavaScript toast notification library**

Toastlet Notify is a plug-and-play solution for displaying toast notifications in web applications. Designed for developers who want something that works immediately without complex setup or configuration. Simply include the script, call `toastletNotify.notify('success', 'Message')`, and you're done. With design inspired by PNotify 4+ and Bootstrap styling, it delivers essential notification functionality with maximum simplicity and minimal overhead.

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

### 🔔 Notice
```javascript
toastletNotify.notify('notice', 'New update available.');
```
- **Color:** Slate Gray (`#708090`)
- **CSS Class:** `toastletNotice`
- **Usage:** System announcements, general notifications, user awareness

### ℹ️ Info
```javascript
toastletNotify.notify('info', 'Tip: You can drag files here.');
```
- **Color:** Blue (`#3498DB`)
- **CSS Class:** `toastletInfo`
- **Usage:** Contextual tips, helpful explanations, guidance

### ✅ Success
```javascript
toastletNotify.notify('success', 'Data saved successfully!');
```
- **Color:** Green (`#00bc8c`)
- **CSS Class:** `toastletSuccess`
- **Usage:** Confirmations, successful operations, completed actions

### ⚠️ Warning
```javascript
toastletNotify.notify('warning', 'Please verify the entered data.');
```
- **Color:** Orange (`#F39C12`)
- **CSS Class:** `toastletWarning`
- **Usage:** Potential issues, preventive alerts, cautionary messages

### ❌ Error
```javascript
toastletNotify.notify('error', 'Error processing request.');
```
- **Color:** Red (`#E74C3C`)
- **CSS Class:** `toastletError`
- **Usage:** Operation failures, validation errors, critical problems

---

## ⚙️ Advanced Settings

### 🛠️ `options` Parameter

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sticky` | `boolean` | `false` | Makes notification permanent (no automatic closing) |
| `delay` | `number` | `5000` | Duration in milliseconds before automatic closing. Use `0` for same effect as `sticky: true` |
| `customClass` | `string` | `""` | Additional CSS classes for customization |
| `transition` | `boolean` | `true` | Enable/disable transition animations |
| `transitionDuration` | `number` | `300` | Duration of animations in milliseconds. Use `0` for same effect as `transition: false` |

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

### 🎞️ Transition Control

```javascript
// Disable all transitions (preferred way)
toastletNotify.notify('info', 'No transitions applied.', {
    transition: false  // Most direct way to disable all transitions
});

// Custom transition duration (slower)
toastletNotify.notify('success', 'Slow transition applied!', {
    transitionDuration: 800  // Default is 300ms, higher = slower transitions
});

// Instant transitions (alternative way to disable)
toastletNotify.notify('warning', 'Also no transitions!', {
    transition: true,
    transitionDuration: 0  // Functionally equivalent to transition: false
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
/* Style only notice notifications */
.toastlet.toastletNotice {
    border-left: 4px solid #708090;
    font-weight: 500;
}

/* Style only info notifications */
.toastlet.toastletInfo {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

/* Style only success notifications */
.toastlet.toastletSuccess {
    border-left: 4px solid #00bc8c;
    background-image: linear-gradient(to right, rgba(0, 188, 140, 0.05), transparent);
}

/* Style only warning notifications */
.toastlet.toastletWarning .toastlet-title {
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Style only error notifications */
.toastlet.toastletError {
    border: 1px solid rgba(231, 76, 60, 0.3);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
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
- **Tap:** Simple tap on notification pauses the timer
- **Touch and Hold:** Similar to hover on desktop, pauses while finger remains on notification
- **Responsive Layout:** Automatically adapts to screen size
- **Touch-friendly:** Touch-optimized controls

---

## 📱 Responsive Behavior

### 🖥️ Desktop
- **Positioning:** Fixed at top right (top: 20px, right: 20px)
- **Dimensions:** Width: 360px, min-height: 80px
- **Entry Animation:** Slides down from -20px with fade in
- **Exit Animation:** Slides up to -20px with fade out
- **Border Radius:** 5px for rounded corners

### 📱 Mobile
- **Positioning:** Fixed at top of screen (top: 0, full width)
- **Dimensions:** Width: 100% of viewport, min-height: 80px
- **Entry Animation:** Slides down from -20px with fade in
- **Timer Exit:** Slides up to -20px with fade out
- **Swipe Exit:** Slides left/right based on swipe direction
  - Swipe left: Exits with translateX(-100%)
  - Swipe right: Exits with translateX(100%)
- **Border Radius:** None (flat design for mobile)

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
// Success notification with custom class and slow transition
toastletNotify.notify('success', 'Custom styled success!', {
    customClass: 'premium-success',
    transition: true,
    transitionDuration: 600
});

// Error notification without transitions
toastletNotify.notify('error', 'Critical error occurred!', {
    sticky: true,
    transition: false,
    customClass: 'critical-error'
});

// Info notification with fast transition
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
}
```

---

## 🔍 Troubleshooting

### ❓ Common Issues

**Notification doesn't appear:**
- Check if the script was loaded correctly
- Confirm there are no console errors
- Check z-index of other elements
- Verify document.body is available when calling notify()

**Style is not applied:**
- Make sure there are no CSS conflicts
- Check CSS rule specificity
- Use `!important` if necessary
- Verify customClass parameter is correctly formatted

**Doesn't work on mobile devices:**
- Check if viewport is configured correctly
- Confirm touch events are being captured
- Test with different mobile browsers
- Verify swipe threshold settings

**Animations not working:**
- Verify `transition` is set to `true`
- Check `transitionDuration` is a positive number
- Ensure no CSS transitions are conflicting
- Try increasing transitionDuration value

**Multiple notifications not all visible:**
- This is expected behavior - Toastlet Notify displays only the most recent notification
- New notifications replace existing ones by design
- For queuing or stacking multiple notifications, custom implementation would be required
- Consider adding delay between notification calls if sequential display is needed

---

## 🛡️ Compatibility

### 🌐 Supported Browsers

- ✅ Chrome 66+
- ✅ Firefox 78+
- ✅ Safari 13+
- ✅ Edge 79+
- ✅ Opera 53+

### 📱 Mobile Devices

- ✅ iOS Safari 13+
- ✅ Android Chrome 66+
- ✅ Samsung Internet 9+

---

## 🎭 Recommended Use Cases

### ✅ Perfect For:
- **Quick Feedback:** Form submissions, save operations, settings changes
- **Transient Notifications:** Messages that don't require user action
- **Status Updates:** Process completions, background task results
- **Microinteractions:** Small confirmations that improve UX
- **Mobile Web Apps:** Thanks to responsive design and touch controls

### 📝 By Notification Type:
- **Notice:** New features, announcements, service updates
- **Info:** Tips, hints, contextual information, navigation guidance
- **Success:** Saved data, completed uploads, finished processes
- **Warning:** Session timeouts, unsaved changes, usage limits
- **Error:** Validation failures, connectivity issues, operation failures

### ❌ Not Recommended For:
- **Critical Alerts:** Information requiring immediate user attention
- **Persistent Content:** Messages that must remain visible
- **Interactive Elements:** Forms, inputs, or complex interactions
- **Multi-step Processes:** Wizards or flows requiring state persistence
- **Lengthy Content:** Detailed explanations or instructions

### 💡 Integration Sweet Spots:
- **Forms & Data Entry:** Quick validation feedback
- **CRUD Operations:** Create/update/delete confirmations
- **User Settings:** Changes saved, preferences updated
- **Authentication:** Login success/failure notifications
- **Async Operations:** API calls, background processing

---

## 🔄 Advanced Alternatives

While Toastlet Notify is designed for simplicity and lightweight performance, some projects may require more advanced notification features. If you need more complex functionality, consider these excellent alternatives:

### 🌟 For Advanced Use Cases

- **[PNotify](https://sciactive.com/pnotify/)** - Feature-rich notification library with extensive options, stacking, modules, and advanced functionality
- **[SweetAlert](https://sweetalert.js.org/)** - Beautiful replacement for JavaScript's alert with customizable options and interactive prompts
- **[SweetAlert2](https://sweetalert2.github.io/)** - An enhanced version of SweetAlert with significantly more customization options, input types, and interactive features while maintaining accessibility and responsive design

> 💡 **Note:** These alternatives offer more features but come with larger file sizes and may have dependencies. Choose based on your project's specific requirements.

---

## 📊 Performance

### 🚀 Metrics

- **Size:** ~19KB (minified) / ~5KB (gzipped)
- **Dependencies:** Zero
- **Compatibility:** ES2018+

### 💡 Optimizations

- Inline CSS to eliminate external requests
- Efficient DOM operations with minimal reflows
- Optimized event listeners with automatic cleanup
- Smart animation handling with conditional rendering
- Memory-efficient design with proper cleanup

---

## 🔗 Useful Links

- 📚 [GitHub Repository](https://github.com/pedrohrigolin/Toastlet-Notify-JS)
- 🎯 [Online Demo](https://pedrohrigolin.github.io/Toastlet-Notify-JS/demo.html)
- 🐛 [Report Bugs](https://github.com/pedrohrigolin/Toastlet-Notify-JS/issues)

---

## 📄 License

MIT License - Toastlet Notify code is free for commercial and personal use.

### Attributions
- Visual styling inspired by [PNotify 4+](https://github.com/sciactive/pnotify) by SciActive Inc, which is licensed under the Apache 2.0 license.
- Design elements inspired by Bootstrap styling.
- Icons from [Font Awesome](https://fontawesome.com/) (v5.15.4), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Per Apache License requirements, no modification has been made to the original PNotify code - this project only draws inspiration from its visual appearance.

**Developed by Pedro Rigolin** 👨‍💻