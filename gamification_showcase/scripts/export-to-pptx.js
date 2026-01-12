#!/usr/bin/env node

/**
 * Export Gamification Showcase to PowerPoint
 * 
 * This script uses Puppeteer to render each section at high quality,
 * then calls a Python script to generate the PowerPoint file.
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import http from 'http';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.EXPORT_URL || 'http://localhost:5173';
const OUTPUT_DIR = join(__dirname, '..', 'export');
const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

// Sections in order
const sections = [
  { id: 'hero', name: 'Hero' },
  { id: 'xp-system', name: 'XP System' },
  { id: 'profile', name: 'Profile Customization' },
  { id: 'badges', name: 'Badge System' },
  { id: 'daily-login', name: 'Daily Login' },
  { id: 'mockups', name: 'UI Mockups' },
  { id: 'launch-plan', name: 'Launch Plan' },
];

async function ensureDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function cleanupOldFiles(dir) {
  try {
    console.log('Cleaning up old export files...');
    const files = await fs.readdir(dir);
    let cleanedCount = 0;

    for (const file of files) {
      if ((file.startsWith('slide_') || file.startsWith('section_')) && file.endsWith('.png')) {
        await fs.unlink(join(dir, file));
        cleanedCount++;
      }
      if (file === 'Gamification_Showcase.pptx') {
        await fs.unlink(join(dir, file));
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`✓ Removed ${cleanedCount} old file(s)`);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`Warning: Could not clean old files: ${error.message}`);
    }
  }
}

async function waitForServer(url, maxRetries = 30) {
  console.log(`Waiting for server at ${url}...`);
  const httpModule = url.startsWith('https') ? https : http;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const available = await new Promise((resolve) => {
        const req = httpModule.get(url, (res) => {
          resolve(res.statusCode >= 200 && res.statusCode < 400);
        });
        req.on('error', () => resolve(false));
        req.setTimeout(2000, () => {
          req.destroy();
          resolve(false);
        });
      });
      
      if (available) {
        console.log('✓ Server is ready');
        return true;
      }
    } catch (error) {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error(`Server at ${url} did not become available after ${maxRetries} seconds`);
}

async function captureSection(page, section, index) {
  try {
    console.log(`Capturing section ${index + 1}/${sections.length}: ${section.name}...`);
    
    // Navigate to page
    await page.goto(BASE_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Scroll to section
    const sectionElement = await page.$(`#${section.id}`);
    if (sectionElement) {
      await sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await page.waitForTimeout(1500); // Wait for scroll and animations
    }

    // Hide navigation sidebar if present
    await page.evaluate(() => {
      const nav = document.querySelector('[data-side-nav], nav, aside');
      if (nav) {
        nav.style.display = 'none';
      }
    });

    // Get section dimensions and capture
    const boundingBox = await sectionElement?.boundingBox();
    if (!boundingBox) {
      console.warn(`Warning: Could not find section ${section.id}, capturing viewport`);
    }

    // Capture full viewport or section - use slide_ prefix to match Python script
    const outputPath = join(OUTPUT_DIR, `slide_${String(index + 1).padStart(2, '0')}.png`);
    
    if (boundingBox && boundingBox.height > 0) {
      // Capture the section with padding
      await page.screenshot({
        path: outputPath,
        clip: {
          x: Math.max(0, boundingBox.x),
          y: Math.max(0, boundingBox.y - 50), // Add padding above
          width: Math.min(boundingBox.width, SLIDE_WIDTH),
          height: Math.min(boundingBox.height + 100, SLIDE_HEIGHT), // Add padding below
        },
      });
    } else {
      // Fallback: capture viewport
      await page.screenshot({
        path: outputPath,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
        },
      });
    }

    console.log(`✓ Saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`Error capturing section ${section.name}:`, error.message);
    throw error;
  }
}

async function generatePowerPoint() {
  console.log('\nGenerating PowerPoint file...');
  
  const pythonScript = join(__dirname, '..', '..', 'pitch_deck', 'scripts', 'generate_pptx.py');
  const pptxOutput = join(OUTPUT_DIR, 'Gamification_Showcase.pptx');

  return new Promise((resolve, reject) => {
    const python = spawn('python3', [pythonScript, OUTPUT_DIR, pptxOutput], {
      stdio: 'inherit',
    });

    python.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✓ PowerPoint file created: ${pptxOutput}`);
        resolve();
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });

    python.on('error', (error) => {
      reject(new Error(`Failed to run Python script: ${error.message}`));
    });
  });
}

async function main() {
  console.log('Starting Gamification Showcase export...\n');

  await ensureDirectory(OUTPUT_DIR);
  await cleanupOldFiles(OUTPUT_DIR);
  await waitForServer(BASE_URL);

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      deviceScaleFactor: 2,
    });

    // Capture all sections
    const slidePaths = [];
    for (let i = 0; i < sections.length; i++) {
      const path = await captureSection(page, sections[i], i);
      slidePaths.push(path);
    }

    await page.close();

    // Generate PowerPoint
    await generatePowerPoint();

    console.log('\n✓ Export complete!');
    console.log(`PowerPoint file: ${join(OUTPUT_DIR, 'Gamification_Showcase.pptx')}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Error during export:', error);
  process.exit(1);
});
