# How to Create and Add New Posts to Your Whitepaper Website

This guide will show you how to add new articles/posts to your whitepaper website.

## Quick Overview

Your articles are stored in the [`constants.ts`](file:///c:/Users/admin/Documents/whitepaper/constants.ts) file as a JavaScript array. To add a new post, you simply add a new object to this array.

---

## Step-by-Step Guide to Add a New Post

### Step 1: Open the constants.ts File

Open [`constants.ts`](file:///c:/Users/admin/Documents/whitepaper/constants.ts) in your code editor.

### Step 2: Find the ARTICLES Array

Scroll down to line 43 where you'll see:

```typescript
export const ARTICLES: Article[] = [
  // ... existing articles
];
```

### Step 3: Add Your New Article

Copy this template and paste it into the `ARTICLES` array (before the closing `]`):

```typescript
{
  id: "5",  // Increment this number for each new post
  title: "Your Article Title Here",
  excerpt: "A brief summary of your article (1-2 sentences). This appears on article cards.",
  date: "2024-11-24",  // Format: YYYY-MM-DD
  category: Category.Technology,  // Options: Category.Technology, Category.History, Category.Politics
  readTime: "5 min read",
  tags: ["Tag1", "Tag2", "Tag3"],
  featuredImage: "https://picsum.photos/800/400?random=5",  // Optional: URL to an image
  content: `
    <p class="lead">Your opening paragraph goes here. This is styled as a lead paragraph.</p>
    
    <h2>First Section Heading</h2>
    <p>Your main content paragraph goes here. You can write multiple paragraphs.</p>
    
    <p>Another paragraph with more details.</p>
    
    <h2>Second Section Heading</h2>
    <p>More content here.</p>
    
    <blockquote>"You can add quotes like this." - Author Name</blockquote>
    
    <h3>Subsection</h3>
    <p>Even more detailed content.</p>
    
    <pre><code>// You can add code blocks
function example() {
  console.log("Hello World");
}</code></pre>
  `
},
```

### Step 4: Customize Your Article

Fill in the details:

- **id**: Use a unique number (increment from the last article)
- **title**: Your article title
- **excerpt**: A short summary (appears on the article preview card)
- **date**: Publication date in `YYYY-MM-DD` format
- **category**: Choose from:
  - `Category.Technology` - For tech articles
  - `Category.History` - For historical topics
  - `Category.Politics` - For political issues
- **readTime**: Estimate like "5 min read", "10 min read", etc.
- **tags**: Array of relevant tags `["AI", "Web Dev", "React"]`
- **featuredImage**: (Optional) URL to a header image
- **content**: Your article content in HTML format

### Step 5: Save and Test

1. Save the `constants.ts` file
2. Your dev server should automatically reload
3. Visit http://localhost:3000/articles to see your new post
4. Click on it to view the full article

### Step 6: Deploy to Netlify

Once you're happy with your new post:

```bash
git add .
git commit -m "Add new article: [Your Article Title]"
git push origin main
```

Netlify will automatically rebuild and deploy your site with the new article!

---

## HTML Tags You Can Use in Content

Your article content supports HTML. Here are common tags:

### Text Formatting
```html
<p>Regular paragraph</p>
<p class="lead">Lead paragraph (larger, intro text)</p>
<strong>Bold text</strong>
<em>Italic text</em>
```

### Headings
```html
<h2>Main Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>
```

### Quotes
```html
<blockquote>"Your quote here." - Author</blockquote>
```

### Code
```html
<code>inline code</code>

<pre><code>// Code block
function example() {
  return "multi-line code";
}</code></pre>
```

### Lists
```html
<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>
```

### Links
```html
<a href="https://example.com">Link text</a>
```

### Images
```html
<img src="https://example.com/image.jpg" alt="Description" />
```

---

## Example: Complete New Article

Here's a complete example of a new article:

```typescript
{
  id: "5",
  title: "The Future of AI in Web Development",
  excerpt: "Exploring how artificial intelligence is transforming the way we build websites and applications.",
  date: "2024-11-24",
  category: Category.Technology,
  readTime: "7 min read",
  tags: ["AI", "Web Development", "Future Tech"],
  featuredImage: "https://picsum.photos/800/400?random=5",
  content: `
    <p class="lead">Artificial Intelligence is no longer a distant future—it's here, and it's reshaping how we approach web development.</p>
    
    <h2>AI-Powered Code Generation</h2>
    <p>Tools like GitHub Copilot and ChatGPT are enabling developers to write code faster than ever before. But this isn't just about speed—it's about democratizing development.</p>
    
    <p>Junior developers can now tackle complex problems with AI assistance, while senior developers can focus on architecture and design rather than boilerplate code.</p>
    
    <h2>The Human Element</h2>
    <p>Despite these advances, the human element remains crucial. AI can generate code, but it can't understand business context, user needs, or make ethical decisions.</p>
    
    <blockquote>"AI is a tool, not a replacement. The best developers will be those who know how to wield it effectively." - Tech Industry Leader</blockquote>
    
    <h2>What's Next?</h2>
    <p>As we move forward, we'll see AI integrated into every aspect of the development workflow—from design to deployment. The question isn't whether to adopt AI, but how to do so responsibly.</p>
  `
}
```

---

## Tips for Great Articles

1. **Start with a strong lead paragraph** - Use `<p class="lead">` for your opening
2. **Use headings to structure content** - Break up long text with `<h2>` and `<h3>` tags
3. **Add quotes for emphasis** - Use `<blockquote>` for impactful statements
4. **Include code examples** - If writing about tech, show code with `<pre><code>`
5. **Choose relevant tags** - Help readers find related content
6. **Pick a good featured image** - Makes your article stand out on the articles page
7. **Write a compelling excerpt** - This is what appears on the preview card

---

## Changing Author Information

To update your author profile, edit the `AUTHOR` object in [`constants.ts`](file:///c:/Users/admin/Documents/whitepaper/constants.ts) (lines 6-16):

```typescript
export const AUTHOR: Author = {
  name: "Your Name",
  role: "Your Role/Title",
  avatar: "https://your-image-url.com/avatar.jpg",
  bio: "Your bio here",
  socials: {
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
  }
};
```

---

## Need Help?

- The article structure is defined in [`types.ts`](file:///c:/Users/admin/Documents/whitepaper/types.ts)
- All articles are in [`constants.ts`](file:///c:/Users/admin/Documents/whitepaper/constants.ts)
- Article display logic is in [`pages/ArticleDetail.tsx`](file:///c:/Users/admin/Documents/whitepaper/pages/ArticleDetail.tsx)

Happy writing! 📝
