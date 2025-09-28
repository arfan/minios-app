#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const RELEASES_DIR = path.join(ROOT_DIR, 'releases');

async function createReleaseArtifact() {
    try {
        const packageJson = await fs.readJson(path.join(ROOT_DIR, 'package.json'));
        const version = packageJson.version;
        
        console.log(`🚀 Creating release artifact for version ${version}...`);
        
        // Ensure releases directory exists
        await fs.ensureDir(RELEASES_DIR);
        
        // Create release zip
        const releaseZipPath = path.join(RELEASES_DIR, `minios-app-catalog-v${version}.zip`);
        
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(releaseZipPath);
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            output.on('close', () => {
                console.log(`✓ Release artifact created: ${releaseZipPath}`);
                console.log(`📦 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
                resolve(releaseZipPath);
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);

            // Add all files from dist directory
            archive.directory(DIST_DIR, false);

            archive.finalize();
        });
        
    } catch (error) {
        console.error('❌ Release creation failed:', error.message);
        process.exit(1);
    }
}

async function release() {
    try {
        // Check if dist directory exists
        if (!await fs.pathExists(DIST_DIR)) {
            console.log('📁 Dist directory not found. Running build first...');
            require('./build.js');
            return;
        }
        
        // Create release artifact
        const releaseZipPath = await createReleaseArtifact();
        
        console.log('🎉 Release completed successfully!');
        console.log(`📁 Release artifact: ${releaseZipPath}`);
        
        // Display release contents
        const releaseInfo = await fs.readJson(path.join(DIST_DIR, 'release-info.json'));
        console.log('\n📋 Release contents:');
        console.log(`   Version: ${releaseInfo.version}`);
        console.log(`   Timestamp: ${releaseInfo.timestamp}`);
        console.log(`   Apps: ${releaseInfo.apps.join(', ')}`);
        console.log(`   Files: ${releaseInfo.files.join(', ')}`);
        
    } catch (error) {
        console.error('❌ Release failed:', error.message);
        process.exit(1);
    }
}

release();