#!/usr/bin/env node

/**
 * Migration script to convert Kirby content to Ghost format
 * Usage: node migrate.js <kirby-content-dir> <output-dir>
 */

const fs = require('fs');
const path = require('path');

function convertKirbyToGhost(kirbyDir, outputDir) {
    console.log('Starting Kirby to Ghost migration...');
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Process blog posts
    const blogDir = path.join(kirbyDir, '3_blog');
    if (fs.existsSync(blogDir)) {
        console.log('Processing blog posts...');
        processDirectory(blogDir, outputDir, 'post');
    }
    
    // Process notes
    const notesDir = path.join(kirbyDir, '8_notes');
    if (fs.existsSync(notesDir)) {
        console.log('Processing notes...');
        processDirectory(notesDir, outputDir, 'note');
    }
    
    console.log('Migration completed!');
}

function processDirectory(dir, outputDir, type) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory() && !item.startsWith('_')) {
            processPost(itemPath, outputDir, type);
        }
    });
}

function processPost(postDir, outputDir, type) {
    const postFile = path.join(postDir, type === 'note' ? 'note.txt' : 'post.txt');
    
    if (!fs.existsSync(postFile)) {
        return;
    }
    
    const content = fs.readFileSync(postFile, 'utf8');
    const post = parseKirbyContent(content);
    
    if (!post.title) {
        return;
    }
    
    // Create Ghost post
    const ghostPost = {
        title: post.title,
        slug: post.slug || generateSlug(post.title),
        html: convertMarkdown(post.text),
        status: 'published',
        published_at: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        tags: post.tags || [],
        meta_title: post.title,
        meta_description: post.excerpt || post.title,
        feature_image: null
    };
    
    // Add note tag for notes
    if (type === 'note') {
        ghostPost.tags.push('note');
    }
    
    // Save to output directory
    const filename = `${ghostPost.slug}.json`;
    const outputPath = path.join(outputDir, filename);
    
    fs.writeFileSync(outputPath, JSON.stringify(ghostPost, null, 2));
    console.log(`Created: ${filename}`);
}

function parseKirbyContent(content) {
    const lines = content.split('\n');
    const post = {};
    let currentField = null;
    let fieldContent = [];
    
    lines.forEach(line => {
        if (line.startsWith('----')) {
            if (currentField && fieldContent.length > 0) {
                post[currentField] = fieldContent.join('\n').trim();
                fieldContent = [];
            }
            currentField = null;
        } else if (line.includes(':') && !currentField) {
            const [field, ...value] = line.split(':');
            currentField = field.toLowerCase();
            if (value.length > 0) {
                fieldContent.push(value.join(':').trim());
            }
        } else if (currentField) {
            fieldContent.push(line);
        }
    });
    
    // Handle tags
    if (post.tags) {
        post.tags = post.tags.split(',').map(tag => tag.trim());
    }
    
    return post;
}

function convertMarkdown(text) {
    if (!text) return '';
    
    // Basic markdown conversion
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
    
    return html;
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length !== 2) {
        console.log('Usage: node migrate.js <kirby-content-dir> <output-dir>');
        process.exit(1);
    }
    
    const [kirbyDir, outputDir] = args;
    
    if (!fs.existsSync(kirbyDir)) {
        console.error('Kirby content directory does not exist');
        process.exit(1);
    }
    
    convertKirbyToGhost(kirbyDir, outputDir);
}

module.exports = { convertKirbyToGhost }; 