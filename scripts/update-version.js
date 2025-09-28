#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function updateVersion() {
    try {
        const args = process.argv.slice(2);
        const newVersion = args[0];
        
        if (!newVersion) {
            console.error('❌ Please provide a version number');
            console.log('Usage: npm run version <version>');
            console.log('Example: npm run version 1.1.0');
            process.exit(1);
        }
        
        // Validate version format (basic semver check)
        const versionRegex = /^\d+\.\d+\.\d+$/;
        if (!versionRegex.test(newVersion)) {
            console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.0.0)');
            process.exit(1);
        }
        
        console.log(`📝 Updating version to ${newVersion}...`);
        
        // Update package.json
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.version = newVersion;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log('✓ package.json updated');
        
        // Update catalog.json download URLs to use new version
        const catalogJsonPath = path.join(__dirname, '..', 'catalog.json');
        const catalog = await fs.readJson(catalogJsonPath);
        
        catalog.apps.forEach(app => {
            // Update download URL to use the new version
            app.downloadUrl = app.downloadUrl.replace(
                /\/download\/v[\d.]+\//,
                `/download/v${newVersion}/`
            );
        });
        
        await fs.writeJson(catalogJsonPath, catalog, { spaces: 2 });
        console.log('✓ catalog.json download URLs updated');
        
        console.log(`🎉 Version updated to ${newVersion} successfully!`);
        console.log('💡 Next steps:');
        console.log('   1. Run: npm run build');
        console.log('   2. Run: npm run release');
        console.log('   3. Commit and tag: git add . && git commit -m "Release v' + newVersion + '" && git tag v' + newVersion);
        
    } catch (error) {
        console.error('❌ Version update failed:', error.message);
        process.exit(1);
    }
}

updateVersion();