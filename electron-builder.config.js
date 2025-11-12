/**
 * Electron Builder Configuration
 */
module.exports = {
  appId: 'com.guidesoft.app',
  productName: 'Guidesoft',
  directories: {
    output: 'dist-electron'
  },
  files: [
    'dist/**/*',
    'electron/**/*',
    'public/**/*',
    'package.json',
    '!node_modules/**/*',
    '!**/*.map'
  ],
  extraResources: [
    {
      from: 'public/',
      to: 'public/',
      filter: ['**/*']
    }
  ],
  // Add broader platform support
  mac: {
    category: 'public.app-category.business',
    icon: 'public/guidesoft-favicon.png',
    target: [
      'dmg',
      'zip'
    ],
    extendInfo: {
      NSCameraUsageDescription: "This app needs access to the camera",
      NSMicrophoneUsageDescription: "This app needs access to the microphone"
    }
  },
  win: {
    icon: 'public/guidesoft-favicon.png',
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      },
      'zip'
    ],
    publisherName: 'Guidesoft'
  },
  linux: {
    icon: 'public/guidesoft-favicon.png',
    target: [
      'AppImage',
      'deb',
      'rpm',
      'snap',
      'zip'
    ],
    category: 'Development'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  },
  appImage: {
    artifactName: '${productName}-${version}.${ext}'
  },
  deb: {
    afterInstall: 'scripts/postinst',
    compression: 'xz'
  },
  rpm: {
    afterInstall: 'scripts/postinst'
  },
  snap: {
    confinement: 'strict',
    grade: 'stable'
  },
  publish: null,
  // Add broader compatibility settings
  asar: true,
  compression: 'maximum',
  detectUpdateChannel: true,
  generateUpdatesFilesForAllChannels: true
};