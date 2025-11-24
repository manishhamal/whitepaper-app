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
    `,
    titleNe: "रोमन गणतन्त्र र आधुनिक एल्गोरिदमिक शासन",
    excerptNe: "रोमन गणतन्त्रको पतन र आधुनिक लोकतन्त्रमा अपारदर्शी एल्गोरिदमिक निर्णय-निर्माणको उदयबीच समानान्तर रेखाहरू।",
    tagsNe: ["रोम", "शासन", "एल्गोरिदम"],
    contentNe: `
      <p class="lead">रोमन गणतन्त्रको पतन रातारात भएको घटना थिएन। यो मानदण्डहरूको क्रमिक क्षरण, शक्तिको केन्द्रीकरण, र महत्वाकांक्षालाई जाँच्न डिजाइन गरिएका प्रणालीहरूको असफलता थियो। आज, हामी समान क्षरणको सामना गरिरहेका छौं, महत्वाकांक्षी जनरलहरूद्वारा होइन, तर अनुकूलन गर्ने एल्गोरिदमहरूद्वारा।</p>
      
      <h2>शक्तिको अनुकूलन कार्य</h2>
      <p>रोममा, <em>cursus honorum</em> राज्यको एल्गोरिदम थियो। यसले सैन्य सफलता र सार्वजनिक सेवाको लागि अनुकूलन गर्‍यो। तथापि, सम्पत्ति केन्द्रित हुँदै जाँदा, अनुकूलन कार्य लोकलुभावनवाद र घूसतर्फ झुक्यो।</p>
      
      <p>आधुनिक सामाजिक मिडिया एल्गोरिदमहरूले यो दोष साझा गर्छन्। संलग्नताको लागि अनुकूलन गर्न डिजाइन गरिएको, तिनीहरूले अनजानमा ध्रुवीकरणको लागि अनुकूलन गर्छन्। जसरी ग्राची भाइहरूले सिनेटलाई बाइपास गर्न लोकलुभावन बयानबाजी प्रयोग गरे, आधुनिक कलाकारहरूले लोकतान्त्रिक मानदण्डहरूलाई बाइपास गर्न एल्गोरिदमिक खामीहरू प्रयोग गर्छन्।</p>

      <blockquote>"इतिहास आफैलाई दोहोर्याउँदैन, तर यो प्रायः तालमेल गर्छ।" - मार्क ट्वेनलाई श्रेय दिइएको</blockquote>

      <h2>प्रणालीगत कमजोरी</h2>
      <p>हामीले इतिहासबाट के सिक्छौं भने प्रणालीहरू जुन बलियो देखिन्छन् अन्तर्निहित प्रोत्साहनहरू परिवर्तन हुँदा धेरै चाँडो भंगुर हुन सक्छन्। हामीले आफैलाई सोध्नुपर्छ: के हाम्रो डिजिटल पूर्वाधारहरूले गणतन्त्र वा साम्राज्य निर्माण गरिरहेका छन्?</p>
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
    `,
    titleNe: "React Server Components को अवस्था",
    excerptNe: "React 18+ को वास्तुकलामा गहिरो अध्ययन, क्लाइन्ट-साइड वाटरफलभन्दा बाहिर जाँदै र एजलाई अँगाल्दै।",
    tagsNe: ["React", "वेब विकास", "प्रदर्शन"],
    contentNe: `
      <p class="lead">वर्षौंसम्म, हामीले सबै कुरा क्लाइन्टमा धकेल्यौं। हामीले विशाल JavaScript बन्डलहरू निर्माण गर्‍यौं जुन अन्तरक्रियात्मक अनुप्रयोगहरूमा हाइड्रेट भयो। तर पेन्डुलम फिर्ता घुमिरहेको छ।</p>

      <h2>वाटरफल समस्या</h2>
      <p>क्लाइन्ट-साइड रेन्डरिङले प्रायः नेटवर्क वाटरफलहरू निम्त्याउँछ। कम्पोनेन्ट A लोड हुन्छ, डेटा ल्याउँछ, कम्पोनेन्ट B रेन्डर गर्छ, जसले थप डेटा ल्याउँछ। यो अकुशल छ।</p>
      
      <pre><code>// पुरानो तरिका: क्लाइन्ट-साइड वाटरफल
function UserProfile({ id }) {
  const user = useSWR('/api/user/' + id);
  if (!user) return <Spinner />;
  return <div>{user.name}</div>;
}</code></pre>

      <p>React Server Components (RSC) ले हामीलाई यो तर्क सर्भरमा सार्न अनुमति दिन्छ। कम्पोनेन्ट सर्भरमा रेन्डर हुन्छ, र क्लाइन्टमा सिरियलाइज्ड ढाँचा पठाउँछ। तर्कको लागि कुनै अतिरिक्त JS बन्डल छैन, डाटाबेसमा प्रत्यक्ष पहुँच।</p>

      <h2>यो किन महत्त्वपूर्ण छ</h2>
      <p>यो केवल प्रदर्शनको बारेमा होइन; यो सरलीकरणको बारेमा हो। ब्याकएन्ड र फ्रन्टएन्डबीचको रेखा धमिलो पारेर, हामी राज्य व्यवस्थापनको संज्ञानात्मक भार घटाउँछौं।</p>
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
    `,
    titleNe: "खण्डित संसारमा डिजिटल सार्वभौमसत्ता",
    excerptNe: "इन्टरनेट क्षेत्रीय इन्ट्रानेटहरूमा विभाजित हुँदा, हामी कसरी जडान भएको विश्वव्यापी जनसंख्याको दृष्टिकोण कायम राख्छौं?",
    tagsNe: ["भूराजनीति", "इन्टरनेट", "गोपनीयता"],
    contentNe: `
      <p class="lead">खुला इन्टरनेटको युग प्रभावकारी रूपमा समाप्त भएको छ। हामी स्प्लिन्टरनेटको युगमा प्रवेश गर्दैछौं।</p>
      
      <p>युरोपमा GDPR देखि चीनको ग्रेट फायरवालसम्म, र अब भारत र ब्राजिलमा उदीयमान डेटा स्थानीयकरण कानूनहरू, डिजिटल सीमाहरू भौतिक सीमाहरू जत्तिकै कडा हुँदै गइरहेका छन्।</p>

      <h2>विखण्डनको लागत</h2>
      <p>प्रविधि कम्पनीहरूको लागि, यसको अर्थ बढेको अनुपालन लागत हो। तर नागरिकहरूको लागि, यसको अर्थ साझा वास्तविकतामा विचलन हो। यदि हामी एउटै जानकारी देख्न सक्दैनौं भने, हामी जलवायु परिवर्तन जस्ता मुद्दाहरूमा विश्वव्यापी सहमति बनाउन सक्दैनौं।</p>
      
      <p>हामीलाई डिजिटल अधिकारहरूको लागि नयाँ प्रोटोकल चाहिन्छ जुन स्थानीय शासनलाई सम्मान गर्दै राष्ट्रिय सीमाहरू पार गर्दछ। यो हाम्रो पुस्ताको राजनीतिक चुनौती हो।</p>
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
    `,
    titleNe: "औद्योगिक क्रान्ति 4.0",
    excerptNe: "AI एजेन्टहरू नयाँ स्टीम इन्जिनहरू हुन्। हामी संज्ञान स्वचालित गर्दैछौं, केवल मांसपेशी होइन।",
    tagsNe: ["AI", "अर्थतन्त्र", "भविष्य"],
    contentNe: `
      <p>जब स्टीम इन्जिन आयो, यसले मांसपेशी प्रतिस्थापन गर्‍यो। यसले हामीलाई छिटो सर्न र ठूलो निर्माण गर्न अनुमति दियो। वर्तमान क्रान्ति फरक छ। यसले संज्ञानात्मक श्रमलाई प्रतिस्थापन गर्दछ।</p>
      <p>यसले सेतो कलर कार्यबललाई मौलिक रूपमा पुन: आकार दिनेछ जसलाई हामी बुझ्न मात्र सुरु गरिरहेका छौं।</p>
    `
  },
  {
    id: "5",
    title: "Building Modern Web Applications with React",
    excerpt: "A practical guide to creating fast, responsive web applications using React and modern tooling.",
    date: "2024-11-24",
    category: Category.Technology,
    readTime: "8 min read",
    tags: ["React", "Web Development", "JavaScript", "Tutorial"],
    featuredImage: "https://picsum.photos/800/400?random=5",
    content: `
      <p class="lead">React has revolutionized how we build web applications. In this article, we'll explore the key concepts that make React powerful and how to leverage them effectively.</p>
      
      <h2>Component-Based Architecture</h2>
      <p>React's component-based approach allows us to build encapsulated components that manage their own state. This makes our code more maintainable and reusable.</p>
      
      <p>Each component is a self-contained unit that can be composed with other components to build complex user interfaces. This modularity is one of React's greatest strengths.</p>
      
      <h2>The Virtual DOM</h2>
      <p>React uses a virtual DOM to optimize rendering performance. Instead of manipulating the browser's DOM directly, React creates a virtual representation and efficiently updates only what has changed.</p>
      
      <blockquote>"React makes it painless to create interactive UIs. Design simple views for each state in your application." - React Documentation</blockquote>
      
      <h2>Modern Tooling</h2>
      <p>Tools like Vite have made the development experience incredibly smooth. With hot module replacement and lightning-fast builds, we can iterate quickly and see changes instantly.</p>
      
      <pre><code>// Example: A simple React component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Welcome;</code></pre>
      
      <h2>Best Practices</h2>
      <p>When building React applications, keep components small and focused. Use hooks for state management, and always think about performance. Remember: premature optimization is the root of all evil, but thoughtful architecture pays dividends.</p>
      
      <p>The React ecosystem continues to evolve with features like Server Components, Suspense, and concurrent rendering. Staying up-to-date with these developments will help you build better applications.</p>
    `,
    titleNe: "React सँग आधुनिक वेब अनुप्रयोगहरू निर्माण गर्दै",
    excerptNe: "React र आधुनिक उपकरणहरू प्रयोग गरेर छिटो, उत्तरदायी वेब अनुप्रयोगहरू सिर्जना गर्नको लागि व्यावहारिक गाइड।",
    tagsNe: ["React", "वेब विकास", "JavaScript", "ट्यूटोरियल"],
    contentNe: `
      <p class="lead">React ले हामीले वेब अनुप्रयोगहरू कसरी निर्माण गर्छौं भन्नेमा क्रान्ति ल्याएको छ। यस लेखमा, हामी React लाई शक्तिशाली बनाउने मुख्य अवधारणाहरू र तिनीहरूलाई प्रभावकारी रूपमा कसरी प्रयोग गर्ने भन्ने अन्वेषण गर्नेछौं।</p>
      
      <h2>कम्पोनेन्ट-आधारित वास्तुकला</h2>
      <p>React को कम्पोनेन्ट-आधारित दृष्टिकोणले हामीलाई आफ्नै अवस्था व्यवस्थापन गर्ने समाहित कम्पोनेन्टहरू निर्माण गर्न अनुमति दिन्छ। यसले हाम्रो कोडलाई थप मर्मत योग्य र पुन: प्रयोग योग्य बनाउँछ।</p>
      
      <p>प्रत्येक कम्पोनेन्ट एक स्व-निहित इकाई हो जुन जटिल प्रयोगकर्ता इन्टरफेसहरू निर्माण गर्न अन्य कम्पोनेन्टहरूसँग रचना गर्न सकिन्छ। यो मोड्युलरता React को सबैभन्दा ठूलो शक्तिहरू मध्ये एक हो।</p>
      
      <h2>भर्चुअल DOM</h2>
      <p>React ले रेन्डरिङ प्रदर्शन अनुकूलन गर्न भर्चुअल DOM प्रयोग गर्दछ। ब्राउजरको DOM लाई प्रत्यक्ष हेरफेर गर्नुको सट्टा, React ले भर्चुअल प्रतिनिधित्व सिर्जना गर्दछ र केवल परिवर्तन भएको कुरालाई कुशलतापूर्वक अपडेट गर्दछ।</p>
      
      <blockquote>"React ले अन्तरक्रियात्मक UI हरू सिर्जना गर्न पीडारहित बनाउँछ। तपाईंको अनुप्रयोगमा प्रत्येक अवस्थाको लागि सरल दृश्यहरू डिजाइन गर्नुहोस्।" - React कागजात</blockquote>
      
      <h2>आधुनिक उपकरणहरू</h2>
      <p>Vite जस्ता उपकरणहरूले विकास अनुभवलाई अविश्वसनीय रूपमा सहज बनाएको छ। तातो मोड्युल प्रतिस्थापन र बिजुली-छिटो निर्माणको साथ, हामी छिटो पुनरावृत्ति गर्न र परिवर्तनहरू तुरुन्तै देख्न सक्छौं।</p>
      
      <pre><code>// उदाहरण: एक सरल React कम्पोनेन्ट
function Welcome({ name }) {
  return <h1>नमस्ते, {name}!</h1>;
}

export default Welcome;</code></pre>
      
      <h2>उत्तम अभ्यासहरू</h2>
      <p>React अनुप्रयोगहरू निर्माण गर्दा, कम्पोनेन्टहरू सानो र केन्द्रित राख्नुहोस्। राज्य व्यवस्थापनको लागि हुकहरू प्रयोग गर्नुहोस्, र सधैं प्रदर्शनको बारेमा सोच्नुहोस्। याद गर्नुहोस्: समयपूर्व अनुकूलन सबै खराबीको जरा हो, तर विचारशील वास्तुकलाले लाभांश तिर्छ।</p>
      
      <p>React इकोसिस्टम Server Components, Suspense, र समवर्ती रेन्डरिङ जस्ता सुविधाहरूको साथ विकसित भइरहेको छ। यी विकासहरूसँग अद्यावधिक रहनुले तपाईंलाई राम्रो अनुप्रयोगहरू निर्माण गर्न मद्दत गर्नेछ।</p>
    `
  }
];