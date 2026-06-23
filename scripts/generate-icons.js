const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const svgPath = path.join(__dirname, '../public/icons/icon.svg')
const outDir = path.join(__dirname, '../public/icons')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const svgBuffer = fs.readFileSync(svgPath)

async function generate() {
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(outDir, 'icon-192.png'))
  console.log('✓ icon-192.png')
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(outDir, 'icon-512.png'))
  console.log('✓ icon-512.png')
  console.log('PWA icons generated successfully.')
}

generate().catch(console.error)
