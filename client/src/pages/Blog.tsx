
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@shared/schema";
import { Helmet } from "react-helmet";

// Mock data for development
export const mockPosts = [
  {
    id: 1,
    title: "כיצד בינה מלאכותית משנה את תעשיית השירותים העסקיים",
    content: "בינה מלאכותית הפכה לכוח משמעותי בתעשיית השירותים העסקיים. חברות מאמצות פתרונות AI לאוטומציה של תהליכים, שיפור שירות לקוחות, וייעול קבלת החלטות. המאמר סוקר את האופן שבו טכנולוגיות כמו עיבוד שפה טבעית, למידת מכונה, וראייה ממוחשבת משנות את הדרך שבה עסקים מתפקדים ומתחרים בשוק הגלובלי.",
    excerpt: "סקירה מקיפה של השפעת הבינה המלאכותית על תעשיית השירותים העסקיים והאופן שבו חברות משתמשות בטכנולוגיות חדשניות לשיפור התפעול והשירות.",
    slug: "ai-business-services-transformation",
    imageUrl: "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "industry",
    publishedAt: new Date("2025-02-20"),
  },
  {
    id: 2,
    title: "סקירת כלי AI לעיצוב גרפי: המדריך המלא למעצבים",
    content: "עולם העיצוב הגרפי עובר מהפכה עם התפתחות כלי בינה מלאכותית המאפשרים יצירת אלמנטים ויזואליים מרהיבים במהירות וביעילות. מאמר זה סוקר את הכלים המובילים בתחום, כולל Midjourney, DALL-E, Leonardo.AI, וקבוצת המוצרים של Adobe Firefly. נדון ביתרונות, חסרונות, ותרחישי שימוש מיטביים לכל פלטפורמה.",
    excerpt: "סקירה מקיפה של כלי AI לעיצוב גרפי המתאימים למעצבים מקצועיים וחובבים, כולל השוואת יכולות, מחירים והמלצות לשימוש יעיל.",
    slug: "ai-graphic-design-tools",
    imageUrl: "https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-tools",
    publishedAt: new Date("2025-02-18"),
  },
  {
    id: 3,
    title: "השקת תוכנית ההכשרה החדשה: AI לארגונים",
    content: "אנו שמחים להכריז על השקת תוכנית ההכשרה החדשה 'AI לארגונים', המיועדת למנהלים ומובילי דיגיטל בארגונים. התוכנית מציעה מסלול מקיף להטמעת טכנולוגיות בינה מלאכותית בעסק, כולל אסטרטגיה, יישום מעשי, וניהול שינוי ארגוני. המשתתפים ירכשו כלים פרקטיים להובלת פרויקטי AI וייהנו מליווי מקצועי של מומחים מובילים בתחום.",
    excerpt: "תוכנית הכשרה חדשה המיועדת למנהלים ומובילי דיגיטל, המציעה מסלול מקיף להטמעת טכנולוגיות בינה מלאכותית בארגונים.",
    slug: "ai-for-organizations-training",
    imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "company",
    publishedAt: new Date("2025-02-15"),
  },
  {
    id: 4,
    title: "שיתוף פעולה חדש: פתרונות AI לתעשיית הפיננסים",
    content: "אנו גאים להודיע על שיתוף פעולה אסטרטגי עם חברת FinTech.IL, המתמחה בפתרונות טכנולוגיים מתקדמים לשוק הפיננסי הישראלי. במסגרת שיתוף הפעולה, נפתח יחד מערכת בינה מלאכותית ייעודית לניתוח סיכונים וזיהוי הונאות בתחום הבנקאות והביטוח. המערכת תשלב למידת מכונה מתקדמת עם ידע עסקי מעמיק בתעשייה הפיננסית.",
    excerpt: "הכרזה על שיתוף פעולה אסטרטגי לפיתוח מערכת בינה מלאכותית ייעודית לניתוח סיכונים וזיהוי הונאות בתחום הבנקאות והביטוח.",
    slug: "ai-fintech-partnership",
    imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "company",
    publishedAt: new Date("2025-02-10"),
  },
  {
    id: 5,
    title: "חמשת מודלי השפה המובילים ב-2025",
    content: "עולם מודלי השפה הגדולים (LLMs) ממשיך להתפתח במהירות מסחררת. מאמר זה סוקר את חמשת המודלים המובילים בשנת 2025, עם ניתוח מעמיק של היכולות, החידושים, והיתרונות היחסיים של כל אחד מהם. נבחן את GPT-5, Claude Haiku, Gemini Pro, Llama 3, וModels – ונדגיש את תחומי היישום האופטימליים עבור כל מודל בהתאם לצרכים עסקיים שונים.",
    excerpt: "סקירה מקיפה של מודלי השפה הגדולים המובילים בשנת 2025, כולל השוואת ביצועים, יכולות ייחודיות והתאמה לשימושים עסקיים שונים.",
    slug: "top-5-llm-models-2025",
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813dce26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    category: "ai-news",
    publishedAt: new Date("2025-02-22"),
  },
  {
    id: 6,
    title: "דוח: כך בינה מלאכותית משנה את שוק העבודה בישראל",
    content: "דוח מחקר חדש חושף את ההשפעה העמוקה של בינה מלאכותית על שוק העבודה הישראלי. המחקר, שנערך בשיתוף עם מכון המחקר 'עתיד העבודה', מנתח מגמות תעסוקה בענפים שונים ומזהה את המקצועות שצפויים לעבור את השינויים המשמעותיים ביותר בחמש השנים הקרובות. הדוח מציג גם המלצות למדיניות לאומית להכשרה מחדש של עובדים בענפים פגיעים.",
    excerpt: "דוח מקיף על ההשפעה של בינה מלאכותית על שוק העבודה בישראל, כולל ניתוח מגמות, זיהוי מקצועות בסיכון והמלצות למדיניות הכשרה מחדש.",
    slug: "ai-impact-on-jobs-israel",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
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
  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;

  return (
    <>
      <Helmet>
        <title>בלוג בינה מלאכותית | עדכוני AI ומדריכים מקצועיים</title>
        <meta name="description" content="בלוג מקצועי עם מאמרים, מדריכים וחדשות מעולם הבינה המלאכותית. תוכן איכותי בנושאי AI, מודלי שפה, כלי עיצוב חדשניים ועדכוני תעשייה." />
        <meta name="keywords" content="בינה מלאכותית, AI, GPT, מדריכי AI, חדשות טכנולוגיה, כלי AI, אוטומציה, מודלי שפה" />
      </Helmet>
      
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">בלוג בינה מלאכותית</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            <Input
              type="search"
              placeholder="חפש מאמרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />

            <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">הכל</TabsTrigger>
                <TabsTrigger value="ai-news">חדשות AI</TabsTrigger>
                <TabsTrigger value="ai-tools">כלי AI</TabsTrigger>
                <TabsTrigger value="industry">עדכוני תעשייה</TabsTrigger>
                <TabsTrigger value="company">חדשות החברה</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <div className="aspect-video w-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
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
                          className="object-cover w-full h-full" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <Badge variant="outline" className="mb-3">
                            {featuredPost.category === "ai-news" && "חדשות AI"}
                            {featuredPost.category === "ai-tools" && "כלי AI"}
                            {featuredPost.category === "industry" && "עדכוני תעשייה"}
                            {featuredPost.category === "company" && "חדשות החברה"}
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">{featuredPost.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            <span className="text-primary font-medium hover:underline inline-flex items-center cursor-pointer">
                              קרא עוד
                              <svg className="w-4 h-4 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* All posts grid */}
                {sortedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sortedPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">לא נמצאו מאמרים</h3>
                    <p className="text-muted-foreground">
                      נסה לחפש מושג אחר או לבחור קטגוריה שונה
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-span-1">
            <div className="bg-muted/20 p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">קטגוריות</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>חדשות AI</span>
                  <Badge variant="outline">{aiNews}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>כלי AI</span>
                  <Badge variant="outline">{aiTools}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>עדכוני תעשייה</span>
                  <Badge variant="outline">{industryUpdates}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>חדשות החברה</span>
                  <Badge variant="outline">{companyNews}</Badge>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6">הרשם לניוזלטר</h3>
                <p className="text-muted-foreground mb-4">
                  קבל עדכונים שבועיים על חדשות ומגמות בתחום הבינה המלאכותית
                </p>
                <Input
                  type="email"
                  placeholder="כתובת אימייל"
                  className="mb-4"
                />
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full">
                  הרשם
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
