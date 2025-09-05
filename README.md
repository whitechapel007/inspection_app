# Camera Web Application

A responsive camera web application built with Nuxt.js, Vue 3, and TypeScript that allows users to access their device's camera, capture photos, and manage a local gallery.

## 🚀 Live Demo

[View Live Application](https://your-vercel-deployment-url.vercel.app)

## ✨ Features

### Core Features

- **📷 Camera Access**: Access device camera with back camera preference
- **📱 iOS Support**: Full compatibility with iOS devices and Safari
- **📸 Photo Capture**: Capture photos in JPG/PNG format with size optimization (max 2MB)
- **🖼️ Gallery Management**: View, delete, and manage captured photos locally
- **📱 Responsive Design**: Mobile-first design with proper viewport handling
- **💾 Local Storage**: Persistent photo storage in browser

### Bonus Features

- **⬇️ Photo Download**: Download captured photos to device
- **⚙️ Settings**: Configurable photo limits, format preferences, and quality settings
- **🎨 Modern UI**: Clean interface using Tailwind CSS and Heroicons
- **🧪 Comprehensive Testing**: Unit and E2E tests with Vitest and Playwright

## 🛠️ Technology Stack

- **Framework**: Nuxt.js 4.x
- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Heroicons
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Utilities**: VueUse for composables
- **Deployment**: Vercel

## 📋 Requirements Met

✅ **Camera Access**: Works across different phone types with iOS support
✅ **Photo Capture**: JPG/PNG format with 2MB size limit
✅ **Gallery View**: Local photo management and viewing
✅ **Back Camera Only**: Restricts to devices with back camera
✅ **Responsive Design**: Mobile-first responsive interface
✅ **Download Feature**: Optional photo download capability

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inspection_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Testing

**Run unit tests**

```bash
npm run test
# or with UI
npm run test:ui
```

**Run E2E tests**

```bash
npm run test:e2e
# or with UI
npm run test:e2e:ui
```

**Test coverage**

```bash
npm run test:coverage
```

## 📱 Usage

### Camera Access

1. Grant camera permissions when prompted
2. The app will automatically prefer the back camera
3. If no back camera is available, an error will be displayed

### Taking Photos

1. Point camera at subject
2. Tap the large white capture button
3. Photo will be automatically saved to the gallery
4. Maximum photos configurable in settings (default: 10)

### Gallery Management

1. Tap "Gallery" button to view captured photos
2. Tap any photo to view full size
3. Use download button to save photos to device
4. Use delete button to remove individual photos
5. Use "Clear All" to remove all photos

### Settings

1. Tap the settings (cog) icon
2. Configure:
   - Maximum number of photos (5-50)
   - Preferred format (JPEG/PNG)
   - JPEG quality (10-100%)

## 🏗️ Project Structure

```
app/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── UiButton.vue
│   │   └── UiModal.vue
│   └── camera/             # Camera-specific components
│       ├── CameraApp.vue   # Main app component
│       ├── CameraView.vue  # Camera interface
│       └── PhotoGallery.vue # Gallery management
├── composables/            # Vue composables
│   ├── useCamera.ts        # Camera access logic
│   ├── usePhotoCapture.ts  # Photo capture logic
│   └── usePhotoGallery.ts  # Gallery management
├── types/                  # TypeScript type definitions
│   └── index.ts
├── utils/                  # Utility functions
│   ├── constants.ts        # App constants
│   ├── index.ts           # General utilities
│   ├── photo-processing.ts # Photo processing
│   └── storage.ts         # Local storage management
├── assets/css/            # Styles
│   └── main.css
└── pages/                 # Nuxt pages
    └── index.vue

tests/
├── unit/                  # Unit tests
│   ├── components/
│   ├── composables/
│   └── utils/
└── e2e/                   # End-to-end tests
    └── camera-app.spec.ts
```

## 🔧 Technical Implementation

### Camera Access Strategy

- **Device Detection**: Automatically detects available cameras
- **iOS Compatibility**: Special handling for iOS Safari constraints
- **Back Camera Preference**: Prioritizes environment-facing camera
- **Graceful Fallback**: Falls back to any available camera if back camera unavailable
- **Permission Handling**: Proper error handling for denied permissions

### Photo Processing Pipeline

1. **Capture**: Canvas-based photo capture from video stream
2. **Format Conversion**: Support for JPEG and PNG formats
3. **Size Optimization**: Automatic resizing to meet 2MB limit
4. **Quality Adjustment**: Dynamic quality reduction for JPEG
5. **Metadata Extraction**: Capture device and image information

### Storage Architecture

- **Local Storage**: Browser localStorage for persistence
- **Blob Handling**: Efficient blob to base64 conversion
- **Metadata Management**: Structured photo metadata storage
- **Settings Persistence**: User preferences saved locally
- **Data Integrity**: Error handling and data validation

### Responsive Design Approach

- **Mobile-First**: Designed primarily for mobile devices
- **Viewport Optimization**: Proper viewport meta tags
- **Safe Area Support**: iOS safe area inset handling
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Orientation Support**: Works in both portrait and landscape

## 🧪 Testing Strategy

### Unit Tests

- **Utilities**: Core utility function testing
- **Composables**: Vue composable logic testing
- **Components**: UI component behavior testing
- **Storage**: Local storage functionality testing

### E2E Tests

- **User Flows**: Complete user interaction testing
- **Camera Integration**: Camera permission and access testing
- **Responsive Behavior**: Mobile viewport testing
- **Error Handling**: Permission denied scenarios

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**

   - Link your GitHub repository to Vercel
   - Vercel will auto-detect Nuxt.js configuration

2. **Environment Setup**

   - No environment variables required for basic functionality
   - HTTPS required for camera access in production

3. **Build Configuration**

   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".output/public",
     "framework": "nuxtjs"
   }
   ```

4. **Domain Configuration**
   - Ensure HTTPS is enabled (required for camera access)
   - Configure custom domain if needed

### Manual Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to your hosting provider
# Upload .output/public directory
```

## 📱 Browser Compatibility

### Supported Browsers

- ✅ **Chrome/Chromium** 88+ (Android/Desktop)
- ✅ **Safari** 14+ (iOS/macOS)
- ✅ **Firefox** 85+ (Android/Desktop)
- ✅ **Edge** 88+ (Desktop)

### Camera API Requirements

- **getUserMedia API**: Required for camera access
- **MediaDevices API**: Required for device enumeration
- **Canvas API**: Required for photo capture
- **Blob API**: Required for photo processing

### Known Limitations

- **HTTP**: Camera access requires HTTPS in production
- **iOS Safari**: Some constraints may not work as expected
- **Older Browsers**: Limited support for modern camera APIs

## 🔒 Privacy & Security

### Data Handling

- **Local Only**: All photos stored locally in browser
- **No Server Upload**: Photos never leave the device
- **User Control**: Users can delete all data anytime
- **Permission Respect**: Proper camera permission handling

### Security Considerations

- **HTTPS Required**: Camera access requires secure context
- **No External Dependencies**: Minimal external API usage
- **Client-Side Processing**: All photo processing done locally
- **Storage Limits**: Browser storage quotas naturally limit data

## 🐛 Troubleshooting

### Common Issues

**Camera not working**

- Ensure HTTPS is enabled
- Check browser permissions
- Verify camera is not in use by another app
- Try refreshing the page

**Photos not saving**

- Check browser storage quota
- Ensure localStorage is enabled
- Try clearing browser cache

**iOS Safari issues**

- Ensure iOS 14+ is being used
- Check Safari settings for camera access
- Try using in full-screen mode

**Performance issues**

- Reduce photo quality in settings
- Clear old photos from gallery
- Close other browser tabs

### Debug Mode

Enable debug logging by adding to browser console:

```javascript
localStorage.setItem("debug", "camera-app:*");
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Use Vue 3 Composition API
- Follow existing code style
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nuxt.js Team** - For the amazing framework
- **Vue.js Team** - For the reactive framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Heroicons** - For the beautiful icon set
- **VueUse** - For the useful composables

---

**Built with ❤️ using modern web technologies**
