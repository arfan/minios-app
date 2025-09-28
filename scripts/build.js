#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const APPS_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const APPS = ['calculator', 'colorapp', 'notes'];

async function createZip(appName) {
    const appDir = path.join(APPS_DIR, appName);
    const outputPath = path.join(DIST_DIR, `${appName}.zip`);
    
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        output.on('close', () => {
            console.log(`✓ ${appName}.zip created (${archive.pointer()} bytes)`);
            resolve(outputPath);
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);

        // Add files directly to the zip root (not in a folder)
        const files = ['index.html', 'script.js', 'icon.png', 'manifest.json'];
        
        for (const file of files) {
            const filePath = path.join(appDir, file);
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: file });
            }
        }

        archive.finalize();
    });
}

async function build() {
    try {
        console.log('🏗️  Building MiniOS App Release...');
        
        // Create dist directory
        await fs.ensureDir(DIST_DIR);
        
        // Clear existing files
        await fs.emptyDir(DIST_DIR);
        
        // Create zip files for each app
        const zipPromises = APPS.map(app => createZip(app));
        await Promise.all(zipPromises);
        
        // Copy catalog.json to dist
        await fs.copy(
            path.join(APPS_DIR, 'catalog.json'),
            path.join(DIST_DIR, 'catalog.json')
        );
        console.log('✓ catalog.json copied');
        
        // Generate release info
        const packageJson = await fs.readJson(path.join(APPS_DIR, 'package.json'));
        const releaseInfo = {
            version: packageJson.version,
            timestamp: new Date().toISOString(),
            apps: APPS,
            files: [
                'catalog.json',
                ...APPS.map(app => `${app}.zip`)
            ]
        };
        
        await fs.writeJson(
            path.join(DIST_DIR, 'release-info.json'),
            releaseInfo,
            { spaces: 2 }
        );
        console.log('✓ release-info.json created');
        
        console.log('🎉 Build completed successfully!');
        console.log(`📁 Release artifacts available in: ${DIST_DIR}`);
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

build();