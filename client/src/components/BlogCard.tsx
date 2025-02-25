import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card>
      <div className="aspect-video relative">
        <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full" />
      </div>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {format(new Date(post.publishedAt), "PP", { locale: he })}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="text-primary hover:underline">קרא עוד</a>
        </Link>
      </CardContent>
    </Card>
  );
}
