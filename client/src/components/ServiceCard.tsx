import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export default function ServiceCard({ title, description, imageUrl, href }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={href}>
          <Button className="w-full">למד עוד</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
