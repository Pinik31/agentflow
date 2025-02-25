import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Group posts by category
  const aiNews = posts?.filter(post => post.category === "ai-news") || [];
  const industryUpdates = posts?.filter(post => post.category === "industry") || [];
  const companyNews = posts?.filter(post => post.category === "company") || [];

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">בלוג ועדכוני AI</h1>
        <p className="text-xl text-muted-foreground">
          התעדכנו בחדשות האחרונות בתחום ה-AI, טיפים מקצועיים ועדכונים מהחברה
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="ai-news">חדשות AI</TabsTrigger>
          <TabsTrigger value="industry">עדכוני תעשייה</TabsTrigger>
          <TabsTrigger value="company">חדשות החברה</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-video w-full mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai-news" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiNews.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="industry" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryUpdates.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyNews.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <p className="text-muted-foreground">
          רוצים להישאר מעודכנים? הירשמו לניוזלטר שלנו וקבלו עדכונים ישירות למייל
        </p>
      </div>
    </div>
  );
}