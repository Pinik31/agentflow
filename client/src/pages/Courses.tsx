import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";
import { Bot, Users, Brain, Rocket } from "lucide-react";

const courses = [
  {
    title: "מבוא לכלי AI",
    description: "למדו את היסודות של טכנולוגיות AI והשימושים העסקיים שלהן",
    icon: Bot,
    features: [
      "הכרות עם כלי AI מובילים",
      "שימושים עסקיים מעשיים",
      "דוגמאות ותרגול מעשי",
      "תמיכה אישית לאורך הקורס"
    ],
    price: "₪499",
    level: "מתחילים"
  },
  {
    title: "אוטומציה עסקית עם AI",
    description: "גלו כיצד לייעל תהליכים עסקיים באמצעות אוטומציה חכמה",
    icon: Rocket,
    features: [
      "בניית תהליכי עבודה אוטומטיים",
      "שילוב AI בשירות לקוחות",
      "אוטומציה של משימות שיווק",
      "פרויקט מעשי מותאם אישית"
    ],
    price: "₪799",
    level: "מתקדמים"
  }
];

export default function Courses() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">קורסים והדרכות AI</h1>
        <p className="text-xl text-muted-foreground">
          למדו כיצד להשתמש בכלי AI מתקדמים לקידום העסק שלכם
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {courses.map((course) => (
          <Card key={course.title} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-16 -translate-y-16" />
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <course.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <CardTitle>{course.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">רמה: {course.level}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{course.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {course.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{course.price}</span>
                <Button size="lg">הרשמה לקורס</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">רוצים ייעוץ אישי?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          הבוט החכם שלנו יעזור לכם לבחור את המסלול המתאים ביותר עבורכם
        </p>
        <Button size="lg" className="gap-2">
          <SiWhatsapp className="w-5 h-5" />
          <span>התייעצות חינם בוואטסאפ</span>
        </Button>
      </div>
    </div>
  );
}
