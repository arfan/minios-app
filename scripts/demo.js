#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');

async function demo() {
    console.log('🎬 MiniOS App Release Demo');
    console.log('==========================\n');
    
    try {
        // Check current version
        const packageJson = await fs.readJson('./package.json');
        console.log(`📦 Current version: ${packageJson.version}\n`);
        
        // Clean previous builds
        console.log('🧹 Cleaning previous builds...');
        if (await fs.pathExists('./dist')) {
            await fs.remove('./dist');
        }
        if (await fs.pathExists('./releases')) {
            await fs.remove('./releases');
        }
        console.log('✓ Clean complete\n');
        
        // Build apps
        console.log('🏗️  Building apps...');
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✓ Build complete\n');
        
        // Create release
        console.log('🚀 Creating release...');
        execSync('npm run release', { stdio: 'inherit' });
        console.log('✓ Release complete\n');
        
        // Show results
        console.log('📁 Generated files:');
        
        if (await fs.pathExists('./dist')) {
            const distFiles = await fs.readdir('./dist');
            distFiles.forEach(file => {
                console.log(`   dist/${file}`);
            });
        }
        
        if (await fs.pathExists('./releases')) {
            const releaseFiles = await fs.readdir('./releases');
            releaseFiles.forEach(file => {
                console.log(`   releases/${file}`);
            });
        }
        
        console.log('\n🎉 Demo completed successfully!');
        console.log('\n💡 To create a new release:');
        console.log('   1. npm run version 1.1.0');
        console.log('   2. npm run build');
        console.log('   3. npm run release');
        console.log('   4. git add . && git commit -m "Release v1.1.0" && git tag v1.1.0');
        
    } catch (error) {
        console.error('❌ Demo failed:', error.message);
        process.exit(1);
    }
}

demo();