import { Article, Author, Category } from './types';

export const BLOG_NAME = "Whitepaper";
export const BLOG_TAGLINE = "Analyzing the intersection of past, present, and future code.";

export const AUTHOR: Author = {
  name: "Akshya",
  role: "Learner",
  avatar: "https://picsum.photos/200/200",
  bio: "",
  email: "alex@whitepaper.dev",
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
    title: "Does Social Media Sell Emotion Over Logic?",
    excerpt: "In our search for truth, are we seeing the absolute reality or just a carefully curated view? Exploring how algorithms trade on our sensitivities.",
    date: "2024-11-27",
    category: Category.Technology,
    readTime: "6 min read",
    tags: ["Social Media", "Algorithms", "Psychology", "Digital Ethics"],
    featuredImage: "https://picsum.photos/800/400?random=10",
    content: `
      <p class="lead">In our search for truth, have we ever considered—is what we call "my truth" really the absolute truth of the universe, or just a carefully curated view placed before our eyes?</p>

      <p>We wake up. Pick up the phone. Scroll. And we think—we are swimming in a sea of information. But did we choose this flow, or was it skillfully pushed towards us? This question is the deepest philosophical and freedom-related crisis of our modern lives.</p>
      
      <h2>1. The Invisible Network: The Circle of Belief and the Illusion of Self-Confirmation</h2>
      <p>Human minds have a natural weakness: we always seek evidence to prove ourselves right. Psychology calls this <strong>Confirmation Bias</strong>. Seeing information that strengthens what we believe gives us pleasure and a sense of security. We want to stay away from information that challenges our beliefs.</p>
      
      <p>Previously, this was a limit of our individual thinking. But social media turned it into a terrifying power. Today, this bias is not just our personal weakness; it has become an ideological bond organized and constantly reinforced by algorithms.</p>

      <p>Your social media feed is like a room where the windows don't show you the whole world outside. Instead, they repeatedly show the same frame of the view you already wanted to see. Thus, we are forced to live within a circle of belief.</p>

      <h2>2. The Trade of Sensitivity: Our Emotions Recognized by Technology</h2>
      <p>Algorithms are not just emotionless code; they are skilled traders of our human sensitivities.</p>

      <p>Imagine you watched a painful video of a youth exploited abroad and felt sad. You spent a few more seconds on it. The algorithm learned this: you are sensitive to sadness, anger, and injustice.</p>
      
      <p>Now what happens?</p>

      <p>The headlines in your feed are designed to provoke your emotions and deepen your despair. "Exploitation abroad, whose fault?" "Youth dying due to government negligence." The purpose of such headlines is not to make you think, but to force an immediate <em>Reaction</em>.</p>

      <p>Because the algorithm knows well: anger, fear, and outrage spread faster than calm thought. Therefore, stories of constructive solutions (like: youth succeeding without going abroad) are rarely shown to you.</p>

      <p>What is the indirect effect? Your worldview slowly narrows. Your brain starts seeing the world as only 'hopeless'. You start thinking that the despair you see is the whole truth, while you are only watching a feed of despair.</p>

      <h2>3. The Echo Chamber: The Birth of Ideological Extremism</h2>
      <p>When your feed is filled only with content that confirms your views, and your friends also hold similar views, then you repeat each other's ideas. This state is called a <strong>Digital Echo Chamber</strong>.</p>

      <p>The biggest danger inside this cave is the birth of illusion. You start feeling that what your group is saying is the collective truth of society. You don't see the need to challenge your views because everyone in your circle agrees.</p>

      <p>Consequently, our ideological outlook becomes hard as stone and intolerant instead of flexible. We are not ready to listen to dissenting voices because we think—we are 100% right. Thus, ideological polarization increases in society.</p>

      <h2>4. The Defeat of Logic: The Cost of Impulsive Decisions</h2>
      <p>The success of social media lies in the fact that it values emotion over logic. The more provocative or emotional a piece of information is, the more attention it succeeds in getting.</p>

      <p>Let's look at an example:</p>
      
      <ul>
        <li><strong>First content:</strong> "Five phased and practical suggestions for education system reform."</li>
        <li><strong>Second content:</strong> "Education system completely failed! This country is ruined! Who is to blame?"</li>
      </ul>

      <p>The second content gets thousands of shares. Why? Because the first content seeks your contemplation, which requires time and peace. The second content seeks your outrage, which produces an immediate reaction.</p>

      <p>Human tendency is that we easily react to anger, fear, and hate, but less to love, wisdom, and deep logic.</p>

      <p>When our decision-making process is guided not by calm analysis but by momentary impulses of anger, we lose the ability to distinguish between truth and falsehood. Political, social, or personal decisions are made in haste, the results of which are often destructive.</p>

      <h2>5. Path to Liberation: Renaissance of Conscience</h2>
      <p>When our digital feed shows us only content that confirms our beliefs, our conscience becomes lethargic. We stop thinking, we start becoming just a part of the crowd. We transform from individuals to a mob.</p>

      <p>Constructive change is possible only when collective conscience awakens in society. But today, our collective conscience is filled with confused and divided information.</p>
    `,
    titleNe: "सामाजिक सञ्जाल तर्कभन्दा भावनालाई बढी बेच्छ?",
    excerptNe: "सत्यको खोजीमा हामीले कहिल्यै सोचेका छौं—हामीले जुन कुरालाई मेरो सत्य भनिरहेका छौं, त्यो साँच्चै ब्रह्माण्डको निरपेक्ष सत्य हो, वा केवल कसैले हाम्रो आँखामा राखिदिएको एउटा सावधानीपूर्वक छानिएको दृश्य मात्र हो?",
    tagsNe: ["सामाजिक सञ्जाल", "एल्गोरिदम", "मनोविज्ञान", "डिजिटल नैतिकता"],
    contentNe: `
      <p class="lead">सत्यको खोजीमा हामीले कहिल्यै सोचेका छौं—हामीले जुन कुरालाई मेरो सत्य भनिरहेका छौं, त्यो साँच्चै ब्रह्माण्डको निरपेक्ष सत्य हो, वा केवल कसैले हाम्रो आँखामा राखिदिएको एउटा सावधानीपूर्वक छानिएको दृश्य मात्र हो?</p>

      <p>हामी बिहान उठ्छौं। हातमा फोन लिन्छौं। स्क्रोल गर्छौं। र, हामीलाई लाग्छ—हामी सूचनाको समुद्रमा पौडिरहेका छौं। तर, के यो सूचनाको बहाव हामीले रोजेका हौं, वा यो बहाव हामीतिर कुशलतापूर्वक धकेलिएको हो? यो प्रश्न हाम्रो आधुनिक जीवनको सबैभन्दा गहिरो दार्शनिक र स्वतन्त्रतासम्बन्धी सङ्कट हो।</p>

      <h2>१. अदृश्य सञ्जाल: विश्वासको घेरा र आत्म-पुष्टिको भ्रम</h2>
      <p>मानव मनको एउटा स्वभावगत कमजोरी छ: हामी सधैँ आफूलाई सही प्रमाणित गर्ने प्रमाणको खोजीमा हुन्छौं। मनोविज्ञान यसलाई पुष्टि पूर्वाग्रह (Confirmation Bias) भन्छ। हामीलाई जुन कुरामा विश्वास छ, त्यसलाई बलियो बनाउने सूचना देख्दा हामीलाई आनन्द र सुरक्षा महसुस हुन्छ। हामी हाम्रो मान्यतालाई चुनौती दिने जानकारीबाट टाढै बस्न चाहन्छौं।</p>

      <p>पहिले, यो हाम्रो व्यक्तिगत सोचको सीमा थियो। तर, सामाजिक सञ्जालले यसलाई एउटा भयानक शक्तिमा परिणत गरिदियो। आज, यो पूर्वाग्रह हाम्रो व्यक्तिगत कमजोरी मात्र रहेन; यो एल्गोरिदमद्वारा व्यवस्थित र निरन्तर बलियो बनाइएको एउटा वैचारिक बन्धन बनेको छ।</p>

      <p>तपाईंको सामाजिक सञ्जालको फिड एउटा कोठाजस्तै हो, जहाँका झ्यालहरूले तपाईंलाई बाहिरको सम्पूर्ण संसार देखाउँदैनन्। बरु, तिनीहरूले केवल त्यही दृश्यको फ्रेमलाई बारम्बार दोहोर्‍याउँछन् जुन तपाईं पहिलेदेखि नै हेर्न चाहनुहुन्थ्यो। यसरी, हामी विश्वासको एउटा घेराभित्र बस्न बाध्य हुन्छौं।</p>

      <h2>२. संवेदनशीलताको व्यापार: प्रविधिले चिनेको हाम्रो भावना</h2>
      <p>एल्गोरिदमहरू कुनै भावनाविहीन कोड मात्र होइनन्; तिनीहरू हाम्रो मानवीय संवेदनशीलताका कुशल व्यापारी हुन्।</p>

      <p>कल्पना गर्नुहोस्, तपाईंले विदेशमा श्रम शोषणमा परेका युवाको पीडादायी भिडियो हेर्नुभयो र तपाईंलाई दुःख लाग्यो। तपाईंले त्यसमा केही सेकेन्ड बढी समय खर्च गर्नुभयो। एल्गोरिदमले यो सिक्यो: तपाईं दुःख, रिस र अन्यायप्रति संवेदनशील हुनुहुन्छ।</p>
      
      <p>अब के हुन्छ?</p>

      <p>तपाईंको फिडमा आउने हेडलाइनहरू तपाईंका भावनालाई उक्साउने र निराशालाई थप गहिर्याउने गरी डिजाइन गरिएका हुन्छन्। "विदेशमा शोषण, कसको दोष?" "सरकारको बेवास्ताले युवा मरिरहेका छन्।" यस्ता हेडलाइनको उद्देश्य तपाईंलाई सोच्न लगाउने होइन, बरु तत्काल प्रतिक्रिया (Reaction) दिन बाध्य पार्ने हो।</p>

      <p>किनभने एल्गोरिदमलाई राम्ररी थाहा छ: शान्त विचार भन्दा रिस, डर, र आक्रोश सबैभन्दा छिटो फैलिन्छन्। त्यसैले, रचनात्मक समाधानका कथाहरू (जस्तै: विदेश नगई सफल भएका युवाका प्रेरणा) तपाईंलाई बिरलै देखाइन्छन्।</p>

      <p>यसको अप्रत्यक्ष असर के हुन्छ? तपाईंको विश्वदृष्टि बिस्तारै सङ्कुचित हुँदै जान्छ। तपाईंको मस्तिष्कले संसारलाई 'निराशाजनक' मात्र देख्न थाल्छ। तपाईं सोच्न थाल्नुहुन्छ कि तपाईंले देखेको निराशा नै सम्पूर्ण सत्य हो, जब कि तपाईंले केवल निराशाको फिड मात्र हेरिरहनुभएको छ।</p>

      <h2>३. प्रतिध्वनिको गुफा: वैचारिक कट्टरताको जन्म</h2>
      <p>जब तपाईंको फिडले तपाईंको विचार पुष्टि गर्ने सामग्रीले मात्र भरिन्छ, र तपाईंका साथीहरू पनि त्यस्तै विचार राख्ने हुन्छन्, तब तपाईंहरू एकअर्काको विचारलाई दोहोर्‍याउनुहुन्छ। यो अवस्थालाई डिजिटल इको चेम्बर (Digital Echo Chamber) भनिन्छ—प्रतिध्वनिको गुफा।</p>

      <p>यो गुफाभित्रको सबैभन्दा ठूलो खतरा भनेको भ्रमको जन्म हो। तपाईंलाई लाग्न थाल्छ कि तपाईंको समूहले जे बोलिरहेको छ, त्यही नै समाजको सामूहिक सत्य हो। तपाईं आफ्नो विचारलाई चुनौती दिन आवश्यक देख्नुहुन्न, किनकि तपाईंको घेराभित्र सबै सहमत छन्।</p>

      <p>परिणामस्वरूप, हाम्रो वैचारिक दृष्टिकोण लचिलो हुनुको सट्टा ढुङ्गाजस्तो कडा र असहिष्णु बन्छ। हामी असहमत आवाज सुन्न तयार हुँदैनौं, किनभने हामीलाई लाग्छ—हामी शतप्रतिशत सही छौं। यसरी, समाजमा वैचारिक ध्रुवीकरण (Polarization) बढ्दै जान्छ।</p>

      <h2>४. तर्कको पराजय: आवेगमा गरिने निर्णयको मूल्य</h2>
      <p>सामाजिक सञ्जालको सफलता यसैमा निहित छ कि यसले भावनालाई तर्कभन्दा बढी मूल्य दिन्छ। कुनै पनि जानकारी जति बढी उत्तेजक वा भावनात्मक हुन्छ, त्यो उति नै बढी ध्यान पाउन सफल हुन्छ।</p>

      <p>एउटा उदाहरण हेरौं:</p>

      <p>पहिलो सामग्री: "शिक्षा प्रणालीको सुधारका लागि पाँच चरणबद्ध र व्यावहारिक सुझावहरू।"</p>

      <p>दोस्रो सामग्री: "शिक्षा प्रणाली पूर्ण रूपमा असफल! यो देश बर्बाद भयो! दोषी को?"</p>

      <p>दोस्रो सामग्रीले हजारौं सेयर पाउँछ। किन? किनकि पहिलो सामग्रीले तपाईंको मनन खोज्छ, जसका लागि समय र शान्ति चाहिन्छ। दोस्रो सामग्रीले तपाईंको आक्रोश खोज्छ, जसले तुरुन्त प्रतिक्रिया पैदा गर्छ।</p>

      <p>मानवीय प्रवृत्ति के हो भने, हामी रिस, डर, र घृणामा सजिलै प्रतिक्रिया दिन्छौं, तर प्रेम, विवेक र गहिरो तर्कमा कम।</p>

      <p>जब हाम्रो निर्णय प्रक्रिया शान्त विश्लेषणबाट होइन, बरु क्षणभरको रिसको आवेगबाट निर्देशित हुन्छ, तब हामी सत्य र असत्यको फरक छुट्याउन सक्ने क्षमता गुमाउँछौं। राजनीतिक, सामाजिक वा व्यक्तिगत निर्णयहरू हडबडाहटमा गरिन्छन्, जसको परिणाम प्रायः विध्वंसात्मक हुन्छ।</p>

      <h2>५. मुक्ति मार्ग: विवेकको पुनर्जागरण</h2>
      <p>जब हाम्रो डिजिटल फिडले हामीलाई केवल हाम्रो विश्वासलाई पुष्टि गर्ने सामग्री देखाउँछ, तब हाम्रो विवेक (Consciousness) शिथिल बन्छ। हामी सोच्न छोड्छौं, हामी केवल भीडको एक हिस्सा बन्न थाल्छौं। व्यक्तिबाट भीडमा रूपान्तरण हुन्छौं।</p>

      <p>रचनात्मक परिवर्तन तब मात्र सम्भव हुन्छ, जब समाजमा सामूहिक विवेक जागृत हुन्छ। तर, आज हाम्रो सामूहिक विवेक भ्रमित र विभाजित सूचनाले भरिएको छ।</p>
    `
  }
];