import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  className?: string;
}

export default function ServiceCard({ title, description, imageUrl, href, className }: ServiceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageError ? "https://images.unsplash.com/photo-1682687982501-1e58ab814714" : imageUrl} 
          alt={title} 
          className={`w-full h-full transition duration-300 group-hover:scale-105 ${className}`}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={href}>
          <Button className="w-full gap-2 group-hover:gap-4 transition-all">
            <span>למד עוד</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}