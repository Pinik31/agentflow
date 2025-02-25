import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Tag } from "lucide-react";
import { useState } from "react";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Group posts by category
  const aiNews = posts?.filter(post => post.category === "ai-news") || [];
  const industryUpdates = posts?.filter(post => post.category === "industry") || [];
  const companyNews = posts?.filter(post => post.category === "company") || [];

  // Filter posts based on search term
  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayPosts = searchTerm ? filteredPosts : posts;

  return (
    <div className="container py-12">
      {/* Hero section */}
      <div className="relative mb-16 py-10 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 z-0" />
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1701102364553-91bba30d683f')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">בלוג ועדכוני AI</h1>
          <p className="text-xl text-white/90 mb-8">
            התעדכנו בחדשות האחרונות בתחום ה-AI, טיפים מקצועיים ועדכונים מהחברה
          </p>
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="חיפוש מאמרים..."
              className="pr-10 py-6 text-base bg-white/95 border-0 focus-visible:ring-2 focus-visible:ring-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/80" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="all" className="rounded-full">הכל</TabsTrigger>
            <TabsTrigger value="ai-news" className="rounded-full">חדשות AI</TabsTrigger>
            <TabsTrigger value="industry" className="rounded-full">עדכוני תעשייה</TabsTrigger>
            <TabsTrigger value="company" className="rounded-full">חדשות החברה</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            סינון
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <Tag className="w-3.5 h-3.5" />
            בינה מלאכותית
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
            <Tag className="w-3.5 h-3.5" />
            מודלי שפה
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
            <Tag className="w-3.5 h-3.5" />
            אוטומציה
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
            <Tag className="w-3.5 h-3.5" />
            צ'אטבוטים
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
              {displayPosts?.map((post) => (
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

      <div className="bg-primary/5 p-8 rounded-lg text-center my-12">
        <h3 className="text-2xl font-bold mb-4">רוצים להישאר מעודכנים?</h3>
        <p className="text-muted-foreground mb-6">
          הירשמו לניוזלטר שלנו וקבלו עדכונים ומאמרים חדשים ישירות למייל
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <Input type="email" placeholder="כתובת המייל שלך" className="py-6" />
          <Button size="lg" className="gap-2">הרשמה</Button>
        </div>
      </div>
    </div>
  );
}