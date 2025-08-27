// File: src/lib/components/homepage/Testimonial.tsx (Update this file)
// Last updated: 28 August 2025, 01:44 AM (AEST)
// The "Social Proof" section of the homepage, designed to build trust
// and authority with quotes from real creators.

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    {
        quote: "TickTrend is the first platform that feels like it was built by actual creators. The trend analysis is a game-changer and has saved me countless hours.",
        name: "Sarah Dole",
        title: "Full-Time Creator",
        image: "https://placehold.co/48x48/E2E8F0/475569?text=SD"
    },
    {
        quote: "The VibeSchool courses are pure gold. I learned more about monetization in one afternoon than I did in a year of trial and error.",
        name: "Michael Chen",
        title: "Tech & Gadget Reviewer",
        image: "https://placehold.co/48x48/E2E8F0/475569?text=MC"
    }
];

export default function Testimonial() {
  return (
    <section className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Trusted by Creators Like You
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-8">
                <p className="mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
