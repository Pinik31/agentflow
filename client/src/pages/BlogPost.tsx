import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  ChevronLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessagesSquare 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Layout } from '@/components/layout/Layout';
import { BlogPost as BasePostType } from '@shared/schema';
import BlogCard from '@/components/BlogCard';
import { Link } from 'wouter';

// Extended blog post type that includes the author field
interface BlogPostType extends BasePostType {
  author?: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

// Mock data for development - will be replaced with API data
const mockPosts = [
  {
    id: 1,
    title: "השילוב המושלם בין AI לאוטומציה של תהליכים עסקיים",
    content: `<p>כיצד בינה מלאכותית יכולה לשפר תהליכים עסקיים ולהביא לחסכון משמעותי בזמן ובמשאבים.</p>
    <p>הטמעת AI בתהליכים עסקיים הפכה מטרנד אופציונלי לצורך הכרחי עבור עסקים שרוצים להישאר רלוונטיים. לפי מחקר של מקינזי, חברות המטמיעות טכנולוגיות AI חוות שיפור של 20-30% בפרודוקטיביות ובתפוקה העסקית.</p>
    <h2>כיצד AI משנה את פני האוטומציה העסקית?</h2>
    <p>עד לאחרונה, מערכות אוטומציה היו מוגבלות לתהליכים פשוטים וחזרתיים. אולם, עם התקדמות טכנולוגיות AI כמו למידת מכונה ועיבוד שפה טבעית, היכולות השתפרו משמעותית:</p>
    <ul>
      <li><strong>קבלת החלטות אוטונומית</strong> - מערכות AI יכולות כעת לקבל החלטות מורכבות על בסיס נתונים רבים</li>
      <li><strong>התאמה אישית</strong> - יכולת לספק חוויה מותאמת אישית לכל לקוח</li>
      <li><strong>ניתוח נתונים מתקדם</strong> - זיהוי מגמות ותובנות שאינן גלויות לעין האנושית</li>
    </ul>
    <h2>יתרונות מרכזיים בשילוב AI באוטומציה</h2>
    <p>ההטמעה של AI בתהליכי האוטומציה מביאה ליתרונות משמעותיים:</p>
    <ol>
      <li>חיסכון של עד 40% בעלויות תפעוליות</li>
      <li>צמצום טעויות אנוש בתהליכים קריטיים</li>
      <li>שיפור חוויית הלקוח והגברת שביעות רצון</li>
      <li>יכולת סקילבילית להתמודד עם צמיחה עסקית</li>
    </ol>
    <p>עם זאת, חשוב לזכור שהטמעה מוצלחת של AI דורשת אסטרטגיה ברורה והבנה מעמיקה של הצרכים העסקיים. לא כל תהליך מתאים לאוטומציה באמצעות AI, ולפעמים נדרשת גישה היברידית המשלבת אינטליגנציה אנושית עם טכנולוגיה.</p>`,
    excerpt: "כיצד בינה מלאכותית יכולה לשפר תהליכים עסקיים ולהביא לחסכון משמעותי בזמן ובמשאבים.",
    slug: "ai-business-automation",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-tools",
    publishedAt: new Date("2025-02-10"),
    author: {
      name: "רון לוי",
      role: "מנהל טכנולוגיות",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 2,
    title: "5 כלים חדשים של OpenAI שכל עסק צריך להכיר",
    content: "סקירה מעמיקה של הכלים החדשים של OpenAI שיכולים לשדרג את הפעילות העסקית שלכם.",
    excerpt: "סקירה מעמיקה של הכלים החדשים של OpenAI שיכולים לשדרג את הפעילות העסקית שלכם.",
    slug: "openai-new-tools",
    imageUrl: "https://images.unsplash.com/photo-1655720828083-8a3a840631f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-tools",
    publishedAt: new Date("2025-02-15"),
    author: {
      name: "מיכל כהן",
      role: "מומחית AI",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 3,
    title: "מחקר חדש: 70% מהעסקים בישראל ישלבו AI בשנה הקרובה",
    content: "ממצאי מחקר חדש מראים כי רוב העסקים בישראל מתכננים להטמיע טכנולוגיות AI בשנה הקרובה.",
    excerpt: "ממצאי מחקר חדש מראים כי רוב העסקים בישראל מתכננים להטמיע טכנולוגיות AI בשנה הקרובה.",
    slug: "ai-adoption-israel-research",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-news",
    publishedAt: new Date("2025-02-18"),
    author: {
      name: "נועה שלום",
      role: "מנהלת מחקר",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  }
];

// Function to get category display name
const getCategoryDisplayName = (category: string) => {
  const categoryDisplayNames: Record<string, string> = {
    "ai-news": "חדשות AI",
    "ai-tools": "כלי AI",
    "industry": "עדכוני תעשייה",
    "company": "חדשות החברה"
  };
  return categoryDisplayNames[category] || category;
};

export default function BlogPostPage() {
  // Match route pattern
  const [, params] = useRoute<{ slug: string }>('/blog/:slug');
  const [, setLocation] = useLocation();
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  // Fetch blog post data
  const { data: post, isLoading, error } = useQuery<any>({
    queryKey: ['/api/blog', params?.slug],
    enabled: !!params?.slug,
    // In a real implementation, we'd make an API call here
    // For now, simulate by finding the post in our mock data
    initialData: mockPosts.find(p => p.slug === params?.slug)
  });
  
  useEffect(() => {
    // If post doesn't exist, redirect to blog index
    if (!isLoading && !post && !error) {
      setLocation('/blog');
    }
    
    // Find related posts with the same category (for real implementation, this would be an API call)
    if (post) {
      const related = mockPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [post, isLoading, error, setLocation]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">פוסט לא נמצא</h1>
          <p className="mb-6">הפוסט המבוקש אינו קיים או הוסר.</p>
          <Button asChild>
            <Link href="/blog">חזרה לבלוג</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{post.title} | Agent Flow Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="container py-8 md:py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center">
              <ChevronLeft className="mr-2" />
              חזרה לבלוג
            </Link>
          </Button>
        </div>
        
        {/* Hero section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="object-cover w-full h-full" 
            />
            <div className="absolute bottom-0 right-0 m-4">
              <span className="px-3 py-1 text-sm font-medium text-primary bg-background/90 backdrop-blur-sm rounded-full">
                {getCategoryDisplayName(post.category)}
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            {post.author && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img 
                    src={post.author.imageUrl} 
                    alt={post.author.name} 
                    className="object-cover w-full h-full" 
                  />
                </div>
                <span>{post.author.name}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(post.publishedAt), "dd בMMMM, yyyy", { locale: he })}</span>
            </div>
            
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{getCategoryDisplayName(post.category)}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share buttons */}
        <div className="border-t border-b py-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium ml-4">שתף:</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <MessagesSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">פוסטים נוספים שיעניינו אותך</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}