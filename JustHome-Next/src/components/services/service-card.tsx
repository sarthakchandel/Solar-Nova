"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star, ShoppingCart } from "lucide-react";
import type { Service } from "@/types";
import { useCartStore } from "@/store/use-cart-store";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ServiceCard({ service }: { service: Service }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="group">
      <div className="relative h-48 overflow-hidden">
        <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3">
          <Badge variant="accent">★ {service.rating}</Badge>
        </div>
      </div>
      <div className="p-5">
        <Badge variant="primary" className="mb-2">{service.categoryName}</Badge>
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{service.duration}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{service.reviewCount} reviews</span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xl font-bold text-accent-gradient">{formatPrice(service.price)}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border/60 hover:border-accent hover:text-accent transition-colors"
              onClick={() => addItem({
                serviceId: service.id,
                title: service.title,
                price: service.price,
                image: service.image,
              })}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
            <Link href={`/booking?service=${service.id}`}>
              <Button size="sm" className="rounded-full px-4">Book</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
