import { Article, Author, Category } from './types';

export const BLOG_NAME = "Whitepaper";
export const BLOG_TAGLINE = "Analyzing the intersection of past, present, and future code.";

export const AUTHOR: Author = {
  name: "Alex V.",
  role: "Senior Engineer & Historian",
  avatar: "https://picsum.photos/200/200",
  bio: "I write about the recursive nature of history, the bleeding edge of technology, and the political frameworks that govern them both. Believing in clarity above all.",
  socials: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  }
};

/* 
  ========================================
  HOW TO ADD A NEW POST
  ========================================
  1. Copy the object below.
  2. Paste it into the ARTICLES array.
  3. Update the details.

  {
    id: "unique-id-here", 
    title: "Your Title Here",
    excerpt: "A short summary (1-2 sentences) used for the preview card.",
    date: "YYYY-MM-DD",
    category: Category.Technology, // or History, Politics
    readTime: "5 min read",
    tags: ["Tag1", "Tag2"],
    featuredImage: "https://picsum.photos/800/400", // Optional
    content: `
      <p class="lead">Your introductory paragraph here.</p>
      <h2>Subheading</h2>
      <p>Your main content paragraph.</p>
    `
  },
*/

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Roman Republic and Modern Algorithmic Governance",
    excerpt: "Drawing parallels between the fall of the Roman Republic and the rise of opaque algorithmic decision-making in modern democracies.",
    date: "2023-10-15",
    category: Category.History,
    readTime: "8 min read",
    tags: ["Rome", "Governance", "Algorithms"],
    featuredImage: "https://picsum.photos/800/400?random=1",
    content: `
      <p class="lead">The collapse of the Roman Republic wasn't an overnight event. It was a gradual erosion of norms, a centralization of power, and a failure of the systems designed to check ambition. Today, we face a similar erosion, not by ambitious generals, but by optimizing algorithms.</p>
      
      <h2>The Optimizing Function of Power</h2>
      <p>In Rome, the <em>cursus honorum</em> was the algorithm of the state. It optimized for military success and public service. However, as wealth concentrated, the optimization function skewed towards populism and bribery.</p>
      
      <p>Modern social media algorithms share this flaw. Designed to optimize for engagement, they inadvertently optimize for polarization. Just as the Gracchi brothers used populist rhetoric to bypass the Senate, modern actors use algorithmic loopholes to bypass democratic norms.</p>

      <blockquote>"History doesn't repeat itself, but it often rhymes." - Attributed to Mark Twain</blockquote>

      <h2>Systemic Fragility</h2>
      <p>What we learn from history is that systems which appear robust can become brittle very quickly when the underlying incentives shift. We must ask ourselves: are our digital infrastructures building a Republic or an Empire?</p>
    `
  },
  {
    id: "2",
    title: "The State of React Server Components",
    excerpt: "A deep dive into the architecture of React 18+, moving beyond the client-side waterfall and embracing the edge.",
    date: "2023-11-02",
    category: Category.Technology,
    readTime: "12 min read",
    tags: ["React", "Web Development", "Performance"],
    content: `
      <p class="lead">For years, we pushed everything to the client. We built massive JavaScript bundles that hydrated into interactive applications. But the pendulum is swinging back.</p>

      <h2>The Waterfall Problem</h2>
      <p>Client-side rendering often leads to network waterfalls. Component A loads, fetches data, renders Component B, which fetches more data. It's inefficient.</p>
      
      <pre><code>// Old way: Client-side waterfall
function UserProfile({ id }) {
  const user = useSWR('/api/user/' + id);
  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}</code></pre>

      <p>React Server Components (RSC) allow us to move this logic to the server. The component renders on the server, and sends a serialized format to the client. No extra JS bundle for the logic, direct access to the database.</p>

      <h2>Why it Matters</h2>
      <p>This isn't just about performance; it's about simplification. By blurring the line between backend and frontend, we reduce the cognitive load of state management.</p>
    `
  },
  {
    id: "3",
    title: "Digital Sovereignty in a Fragmented World",
    excerpt: "As the internet splinters into regional intranets, how do we maintain the vision of a connected global populace?",
    date: "2023-11-20",
    category: Category.Politics,
    readTime: "6 min read",
    tags: ["Geopolitics", "Internet", "Privacy"],
    featuredImage: "https://picsum.photos/800/400?random=2",
    content: `
      <p class="lead">The era of the open internet is effectively over. We are entering the age of the Splinternet.</p>
      
      <p>From GDPR in Europe to the Great Firewall of China, and now emerging data localization laws in India and Brazil, digital borders are becoming as hard as physical ones.</p>

      <h2>The Cost of Fragmentation</h2>
      <p>For technology companies, this means increased compliance costs. But for citizens, it means a divergence in shared reality. If we cannot see the same information, we cannot form a global consensus on issues like climate change.</p>
      
      <p>We need a new protocol for digital rights that transcends national boundaries while respecting local governance. It is the political challenge of our generation.</p>
    `
  },
  {
    id: "4",
    title: "The Industrial Revolution 4.0",
    excerpt: "AI agents are the new steam engines. We are automating cognition, not just muscle.",
    date: "2023-12-05",
    category: Category.Technology,
    readTime: "10 min read",
    tags: ["AI", "Economy", "Future"],
    content: `
      <p>When the steam engine arrived, it replaced muscle. It allowed us to move faster and build bigger. The current revolution is different. It replaces the cognitive drudgery.</p>
      <p>This will fundamentally reshape the white-collar workforce in ways we are only beginning to understand.</p>
    `
  }
];