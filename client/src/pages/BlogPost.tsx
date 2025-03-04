
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import type { BlogPost } from "@shared/schema";
import { mockPosts } from "./Blog";

export default function BlogPostPage() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from API
    // For now, use mock data
    setIsLoading(true);
    
    // Find the post with matching slug
    const foundPost = mockPosts.find(p => p.slug === params?.slug);
    
    // Simulate API delay
    setTimeout(() => {
      setPost(foundPost as unknown as BlogPost || null);
      setIsLoading(false);
    }, 300);
  }, [params?.slug]);

  // Category display names map
  const categoryDisplayNames = {
    "ai-news": "חדשות AI",
    "ai-tools": "כלי AI",
    "industry": "עדכוני תעשייה",
    "company": "חדשות החברה"
  };

  if (isLoading) {
    return (
      <div className="container py-12 max-w-4xl">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="aspect-video w-full mb-10">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">המאמר לא נמצא</h1>
        <p className="mb-6">המאמר שחיפשת אינו קיים או הוסר.</p>
        <a href="/blog" className="text-primary hover:underline">
          חזרה לבלוג
        </a>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
        {categoryDisplayNames[post.category as keyof typeof categoryDisplayNames] || post.category}
      </span>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-muted-foreground mb-8">
        {format(new Date(post.publishedAt), "dd בMMMM, yyyy", { locale: he })}
      </p>
      <div className="aspect-video w-full mb-10 rounded-xl overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="prose prose-lg max-w-none">
        <p>{post.content}</p>
        
        {/* In a real implementation, this would be structured content */}
        <p>המאמר המלא יכיל כאן מידע מפורט על הנושא, כולל פסקאות מובנות, תמונות נוספות, וקישורים רלוונטיים.</p>
        <p>בינה מלאכותית ממשיכה להשפיע על חיינו בדרכים חדשות ומרתקות. המאמר הזה מספק מידע מעמיק על ההתפתחויות האחרונות בתחום ומשמעותן עבור הקהל הישראלי.</p>
        <p>המשך לעקוב אחר הבלוג שלנו לעדכונים נוספים בתחום ה-AI.</p>
      </div>
    </div>
  );
}
