import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { Clock, Eye } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={post.thumbnailUrl} 
          alt={post.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime} דקות קריאה
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.viewCount} צפיות
          </span>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded">
            {post.category}
          </span>
          <time className="text-muted-foreground">
            {format(new Date(post.publishedAt), "PP", { locale: he })}
          </time>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            קרא עוד
            <span className="rtl:rotate-180 ml-1">→</span>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}