import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { Clock, Eye, ArrowLeft } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-transparent hover:bg-white/50">
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <img 
          src={post.thumbnailUrl || post.imageUrl} 
          alt={post.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
        <div className="absolute bottom-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
          {post.category === "ai-news" ? "חדשות AI" : 
            post.category === "industry" ? "עדכוני תעשייה" : 
            post.category === "company" ? "חדשות החברה" : 
            post.category}
        </div>
      </div>
      <CardHeader className="space-y-2 px-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime || 5} דקות קריאה
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {post.viewCount} צפיות
          </span>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-xs">
          <time className="text-muted-foreground">
            {format(new Date(post.publishedAt), "PP", { locale: he })}
          </time>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {post.author}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-1">
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            קרא עוד
            <ArrowLeft className="rtl:rotate-180 ml-1 w-4 h-4" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}