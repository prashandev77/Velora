import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const usedImages = new Set();
// Scan code for used images
function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const matches = content.match(/\/Photos\/[^'"`,]+?\.(jpg|jpeg|png|webp)/gi);
            if (matches) {
                matches.forEach(m => usedImages.add(decodeURI(m)));
            }
        }
    });
}

scanDir(path.join(rootDir, 'app'));
scanDir(path.join(rootDir, 'components'));

// Include the hardcoded one in Destinations just in case the regex misses it?
// The regex looks for /Photos/something.jpg
// Decode URI components so spaces match

const photosDir = path.join(rootDir, 'public', 'Photos');
const allImages = new Set();
const unusedImages = [];

function scanPhotos(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            scanPhotos(fullPath);
        } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(fullPath)) {
            // Get path like /Photos/file.jpg
            const relativePath = '/' + path.relative(path.join(rootDir, 'public'), fullPath).replace(/\\/g, '/');
            allImages.add(relativePath);
            
            // Handle encoded vs unencoded spaces
            
            let isUsed = false;
            usedImages.forEach(ui => {
                if (decodeURIComponent(ui) === decodeURIComponent(relativePath)) {
                    isUsed = true;
                }
            });

            if (!isUsed) {
                unusedImages.push(fullPath);
            }
        }
    });
}

scanPhotos(photosDir);

console.log(`Found ${usedImages.size} distinct image references in code.`);
console.log(`Found ${allImages.size} total image files in public/Photos.`);
console.log(`Found ${unusedImages.length} unused images.`);

// Delete unused
unusedImages.forEach(file => {
    console.log(`Deleting unused: ${path.basename(file)}`);
    fs.unlinkSync(file);
});

const processImages = async () => {
    let processedCount = 0;
    
    for (const imagePath of allImages) {
        const fullPath = path.join(rootDir, 'public', imagePath);
        if (!fs.existsSync(fullPath)) continue; // skip deleted

        try {
            const tempPath = fullPath + '.tmp';
            const metadata = await sharp(fullPath).metadata();
            let s = sharp(fullPath);
            let changed = false;
            
            // Resize if >= 2000px width
            if (metadata.width > 1920) {
                s = s.resize(1920, null, { withoutEnlargement: true });
                changed = true;
            }
            
            const origSizeMB = fs.statSync(fullPath).size / 1024 / 1024;

            // Compress massive files > 1.5MB even if width is fine
            if (changed || origSizeMB > 1.5) {
                if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
                    s = s.jpeg({ quality: 80, progressive: true, mozjpeg: true });
                    changed = true;
                } else if (metadata.format === 'png') {
                    s = s.png({ quality: 80, compressionLevel: 8 });
                    changed = true;
                } else if (metadata.format === 'webp') {
                    s = s.webp({ quality: 80 });
                    changed = true;
                }
            }
            
            if (changed) {
                await s.toFile(tempPath);
                fs.renameSync(tempPath, fullPath);
                const newSize = fs.statSync(fullPath).size;
                console.log(`Optimized ${path.basename(fullPath)}: ${(origSizeMB).toFixed(2)} MB -> ${(newSize/1024/1024).toFixed(2)} MB`);
                processedCount++;
            }
        } catch (e) {
            console.error(`Error processing ${path.basename(imagePath)}:`, e.message);
        }
    }
    
    console.log(`Finished processing ${processedCount} images.`);
};

processImages();
