import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Newspaper, Lightbulb, Star, Clock } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { 
  getCategoryImage, 
  getOptimizedImageUrl, 
  generateSrcSet 
} from "@/lib/imageUtils";

// Create a partial type that allows string for date in our mock data
type MockBlogPost = Omit<BlogPost, 'publishedAt'> & {
  publishedAt: Date | string;
};

// Mock data for development
const mockPosts: MockBlogPost[] = [
  {
    id: 1,
    title: "השילוב המושלם בין AI לאוטומציה של תהליכים עסקיים",
    content: "כיצד בינה מלאכותית יכולה לשפר תהליכים עסקיים ולהביא לחסכון משמעותי בזמן ובמשאבים.",
    excerpt: "כיצד בינה מלאכותית יכולה לשפר תהליכים עסקיים ולהביא לחסכון משמעותי בזמן ובמשאבים.",
    slug: "ai-business-automation",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-tools",
    publishedAt: new Date("2025-02-10"),
  },
  {
    id: 2,
    title: "5 כלים חדשים של OpenAI שכל עסק צריך להכיר",
    content: "סקירה מעמיקה של הכלים החדשים של OpenAI שיכולים לשדרג את הפעילות העסקית שלכם.",
    excerpt: "סקירה מעמיקה של הכלים החדשים של OpenAI שיכולים לשדרג את הפעילות העסקית שלכם.",
    slug: "openai-new-tools",
    imageUrl: "https://images.unsplash.com/photo-1655720828083-8a3a840631f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-news",
    publishedAt: new Date("2025-02-15"),
  },
  {
    id: 3,
    title: "בינה מלאכותית בשיווק: מגמות וחידושים לשנת 2025",
    content: "כיצד בינה מלאכותית משנה את עולם השיווק הדיגיטלי בשנת 2025.",
    excerpt: "כיצד בינה מלאכותית משנה את עולם השיווק הדיגיטלי בשנת 2025.",
    slug: "ai-marketing-trends-2025",
    imageUrl: "https://images.unsplash.com/photo-1677442135133-4da37d49c421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "industry",
    publishedAt: new Date("2025-02-18"),
  },
  {
    id: 4,
    title: "מהפכת הצ'אטבוטים החכמים: כיצד הם משפרים את חווית הלקוח",
    content: "מחקר חדש מראה כיצד צ'אטבוטים מבוססי AI משפרים את שביעות רצון הלקוחות ומפחיתים עלויות.",
    excerpt: "מחקר חדש מראה כיצד צ'אטבוטים מבוססי AI משפרים את שביעות רצון הלקוחות ומפחיתים עלויות.",
    slug: "ai-chatbots-customer-experience",
    imageUrl: "https://images.unsplash.com/photo-1680695918853-b938379906c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-tools",
    publishedAt: new Date("2025-02-20"),
  },
  {
    id: 5,
    title: "Agent Flow מציגה: פלטפורמת האוטומציה החדשה לעסקים",
    content: "הפלטפורמה החדשה שלנו מאפשרת לכם לייעל תהליכים עסקיים באמצעות סוכני AI חכמים.",
    excerpt: "הפלטפורמה החדשה שלנו מאפשרת לכם לייעל תהליכים עסקיים באמצעות סוכני AI חכמים.",
    slug: "agent-flow-new-platform",
    imageUrl: "https://images.unsplash.com/photo-1661347334036-d484f970ebc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "company",
    publishedAt: new Date("2025-02-22"),
  },
  {
    id: 6,
    title: "דוח: כך בינה מלאכותית משנה את שוק העבודה בישראל",
    content: "דוח מקיף על ההשפעה של בינה מלאכותית על שוק העבודה בישראל בשנים הקרובות.",
    excerpt: "דוח מקיף על ההשפעה של בינה מלאכותית על שוק העבודה בישראל בשנים הקרובות.",
    slug: "ai-impact-on-jobs-israel",
    imageUrl: "https://images.unsplash.com/photo-1668869713519-9bcbb0da7171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-news",
    publishedAt: new Date("2025-02-24"),
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // In a real implementation, we'd fetch data from the API
  // For now, using mock data and simulating loading state
  const { data: posts = mockPosts as BlogPost[], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    enabled: false, // Disable actual API call while using mock data
  });

  // Filter posts by search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group posts by category for statistics
  const aiTools = posts.filter(post => post.category === "ai-tools").length;
  const aiNews = posts.filter(post => post.category === "ai-news").length;
  const industryUpdates = posts.filter(post => post.category === "industry").length;
  const companyNews = posts.filter(post => post.category === "company").length;

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Featured post is the newest one
  const featuredPost = sortedPosts[0];
  // Other posts are the rest
  const otherPosts = sortedPosts.slice(1);

  return (
    <div className="container py-8 md:py-12">
      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">חדשות ומאמרים בעולם ה-AI</h1>
        <p className="text-xl text-muted-foreground mb-8">
          התעדכנו בחדשות והתובנות האחרונות בתחום הבינה המלאכותית והאוטומציה
        </p>

        {/* Search bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Input
            type="text"
            placeholder="חיפוש מאמרים..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        </div>
      </div>

      {/* Category stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <Newspaper className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">חדשות AI</h3>
          <p className="text-2xl font-bold">{aiNews}</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">כלי AI</h3>
          <p className="text-2xl font-bold">{aiTools}</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <Star className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">עדכוני תעשייה</h3>
          <p className="text-2xl font-bold">{industryUpdates}</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">חדשות החברה</h3>
          <p className="text-2xl font-bold">{companyNews}</p>
        </div>
      </div>

      {/* Category tabs */}
      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="mb-10">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 max-w-3xl mx-auto">
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="ai-news">חדשות AI</TabsTrigger>
          <TabsTrigger value="ai-tools">כלי AI</TabsTrigger>
          <TabsTrigger value="industry">עדכוני תעשייה</TabsTrigger>
          <TabsTrigger value="company">חדשות החברה</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && filteredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 border-r-4 border-primary pr-4">מאמר מומלץ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 rounded-xl p-6">
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
                        {featuredPost.category === "ai-news" ? "חדשות AI" :
                         featuredPost.category === "ai-tools" ? "כלי AI" :
                         featuredPost.category === "industry" ? "עדכוני תעשייה" : "חדשות החברה"}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
                      <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                      <Button asChild className="self-start" variant="outline">
                        <a href={`/blog/${featuredPost.slug}`}>קרא עוד</a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* If no results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
                  <p className="text-muted-foreground">נסו לחפש מונחים אחרים או לשנות את הקטגוריה</p>
                </div>
              )}

              {/* Grid of other posts */}
              {otherPosts.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-6 border-r-4 border-primary pr-4">מאמרים אחרונים</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Newsletter section */}
      <div className="bg-primary/5 rounded-lg p-8 my-12">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">הישארו מעודכנים</h2>
          <p className="text-muted-foreground mb-6">
            הירשמו לניוזלטר שלנו וקבלו עדכונים על חידושים בעולם הבינה המלאכותית והאוטומציה
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}