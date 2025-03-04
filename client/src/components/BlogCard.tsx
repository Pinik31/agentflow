
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost | { 
    id: number; 
    title: string; 
    content: string; 
    category: string; 
    slug: string; 
    excerpt: string; 
    imageUrl: string; 
    publishedAt: Date | string; 
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  // Map category codes to display names
  const categoryDisplayNames = {
    "ai-news": "חדשות AI",
    "ai-tools": "כלי AI",
    "industry": "עדכוני תעשייה",
    "company": "חדשות החברה"
  };

  return (
    <Card className="overflow-hidden group flex flex-col h-full transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video overflow-hidden relative cursor-pointer">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105" 
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium text-primary bg-background/90 backdrop-blur-sm rounded-full">
              {categoryDisplayNames[post.category as keyof typeof categoryDisplayNames] || post.category}
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="flex-1 flex flex-col p-5">
        <div className="mb-auto">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">
            {format(new Date(post.publishedAt), "dd בMMMM, yyyy", { locale: he })}
          </p>
          <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <span className="text-primary font-medium hover:underline inline-flex items-center cursor-pointer">
            קרא עוד
            <svg className="w-4 h-4 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
