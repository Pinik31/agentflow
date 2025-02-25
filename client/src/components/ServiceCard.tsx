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
  icon?: React.ReactNode;
}

export default function ServiceCard({ title, description, imageUrl, href, className, icon }: ServiceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg border border-primary/5 hover:border-primary/20">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageError ? "https://images.unsplash.com/photo-1682687982501-1e58ab814714" : imageUrl} 
          alt={title} 
          className={`w-full h-full transition duration-300 group-hover:scale-105 ${className}`}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        {icon && (
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={href}>
          <Button className="w-full gap-2 group-hover:gap-4 transition-all duration-300">
            <span>למד עוד</span>
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-4px]" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}