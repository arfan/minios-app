# MiniOS App Catalog

A collection of applications for MiniOS including Calculator, Color App, and Notes with automated release management.

## 📱 Apps Included

- **Calculator** - Simple and powerful calculator application
- **Color App** - Beautiful color picker with various color formats
- **Notes** - Take notes anywhere, anytime with a clean interface

## 🚀 Release Management

This project includes automated scripts and workflows to create release artifacts containing:
- Individual app zip files (contents only, no folder structure)
- `catalog.json` with app metadata
- Complete release bundle

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build all apps:**
   ```bash
   npm run build
   ```

3. **Create release artifact:**
   ```bash
   npm run release
   ```

### Version Management

Update version and release URLs:
```bash
npm run version 1.1.0
```

This will:
- Update `package.json` version
- Update download URLs in `catalog.json`
- Provide next steps for release

### Manual Release Process

1. **Update version:**
   ```bash
   npm run version 1.1.0
   ```

2. **Build and create release:**
   ```bash
   npm run build
   npm run release
   ```

3. **Commit and tag:**
   ```bash
   git add .
   git commit -m "Release v1.1.0"
   git tag v1.1.0
   git push origin main --tags
   ```

### Automated GitHub Releases

The project includes GitHub Actions workflow that automatically:
- Builds all apps when you push a git tag
- Creates zip files for each app
- Generates a complete release bundle
- Creates a GitHub release with all artifacts

**To trigger an automated release:**
```bash
git tag v1.1.0
git push origin v1.1.0
```

**Or use the manual workflow dispatch on GitHub.**

## 📁 Project Structure

```
minios-app/
├── calculator/          # Calculator app files
│   ├── index.html
│   ├── script.js
│   ├── icon.png
│   └── manifest.json
├── colorapp/           # Color picker app files
│   ├── index.html
│   ├── script.js
│   ├── icon.png
│   └── manifest.json
├── notes/              # Notes app files
│   ├── index.html
│   ├── script.js
│   ├── icon.png
│   └── manifest.json
├── scripts/            # Build and release scripts
│   ├── build.js
│   ├── release.js
│   └── update-version.js
├── dist/              # Built artifacts (generated)
├── releases/          # Release bundles (generated)
├── catalog.json       # App catalog metadata
├── package.json       # Project configuration
└── .github/workflows/ # GitHub Actions
```

## 🔧 Scripts

- `npm run build` - Create zip files for all apps and copy catalog.json
- `npm run release` - Create complete release bundle
- `npm run version <version>` - Update version and URLs

## 📦 Release Artifacts

Each release contains:
- `catalog.json` - App metadata for discovery
- `calculator.zip` - Calculator app (files only, no folder)
- `colorapp.zip` - Color picker app (files only, no folder)  
- `notes.zip` - Notes app (files only, no folder)
- `minios-app-catalog-v{version}.zip` - Complete bundle

## 🤝 Contributing

1. Make changes to apps or catalog
2. Test locally with `npm run build`
3. Update version with `npm run version x.x.x`
4. Create pull request or push tag for release

## 📄 License

MIT License - see LICENSE file for details.
