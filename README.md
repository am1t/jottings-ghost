# Jottings Ghost Theme

A Ghost theme port of the Jottings Kirby theme, featuring a clean, minimal design with support for blog posts, notes (microblogging), and special newsletter integration.

## Features

- **Clean, minimal design** with custom typography
- **Two content types**: Regular blog posts and notes (microblogging)
- **IndieWeb support** with microformats (h-entry, u-url, p-name)
- **Newsletter integration** for Square 101
- **Related posts** functionality
- **Tag-based organization**
- **Responsive design**
- **Social media integration**

## Installation

1. **Download the theme**:
   ```bash
   git clone <repository-url>
   cd jottings-ghost
   ```

2. **Install dependencies** (optional):
   ```bash
   npm install
   ```

3. **Upload to Ghost**:
   - Zip the theme folder
   - Go to Ghost Admin → Design → Themes
   - Click "Upload a theme"
   - Select the zip file

4. **Activate the theme**:
   - Click "Activate" on the Jottings theme

## Content Types

### Blog Posts
Regular blog posts with full content, tags, and related posts.

### Notes (Microblogging)
Short posts tagged with "note" that display differently:
- Minimal header
- Compact layout
- Grouped by date on the notes page

### Newsletter Posts
Posts tagged with "newsletter" show special callout for Square 101 subscription.

## Customization

### Colors
The theme uses CSS custom properties for easy color customization:

```css
:root {
    --background: #F0ECDB;
    --text: #222;
    --highlight: #D64132;
    --bdbackground: #030222;
    --bdhighlight: #f9bf77;
    /* ... more variables */
}
```

### Typography
The theme uses Inter font family. You can change fonts in the CSS file.

### Special Pages

#### Notes Page
Create a page with slug "notes" to display all microblog posts.

#### Square 101 Page
Create a page with slug "squareone" to display the newsletter landing page.

## File Structure

```
jottings-ghost/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── fonts/
│   ├── icons/
│   └── images/
├── partials/
│   ├── header.hbs
│   ├── footer.hbs
│   ├── post-excerpt.hbs
│   ├── recommended.hbs
│   ├── archive.hbs
│   └── pageactions.hbs
├── default.hbs
├── index.hbs
├── post.hbs
├── page.hbs
├── tag.hbs
├── author.hbs
├── notes.hbs
├── squareone.hbs
├── package.json
└── README.md
```

## Templates

- **default.hbs**: Base template for all pages
- **index.hbs**: Home page template
- **post.hbs**: Individual post template
- **page.hbs**: Static page template
- **tag.hbs**: Tag archive template
- **author.hbs**: Author archive template
- **notes.hbs**: Notes/microblog template
- **squareone.hbs**: Newsletter landing page

## Migration from Kirby

### Content Migration
1. Export your Kirby content to Markdown
2. Import into Ghost using the admin interface
3. Tag posts appropriately:
   - Use "note" tag for microblog posts
   - Use "newsletter" tag for newsletter posts
   - Use "101" tag for Square 101 newsletter issues

### Assets
Copy your assets (images, icons, fonts) to the `assets/` directory.

### Custom Fields
If you have custom fields in Kirby, you may need to recreate them using Ghost's custom fields feature.

## Development

### Local Development
1. Install Ghost CLI:
   ```bash
   npm install -g ghost-cli
   ```

2. Create a local Ghost instance:
   ```bash
   ghost install local
   ```

3. Copy the theme to the content/themes directory:
   ```bash
   cp -r jottings-ghost /path/to/ghost/content/themes/
   ```

4. Restart Ghost and activate the theme.

### Theme Validation
Use gscan to validate your theme:
```bash
npx gscan jottings-ghost
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: amit@amitgawande.com

## Credits

Original Kirby theme by Amit Gawande
Port to Ghost by [Your Name] 