import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <Card className="mb-12 md:mb-16 overflow-hidden shadow-2xl bg-gradient-to-br from-card to-secondary/50">
      <div className="relative w-full h-64 md:h-96">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
           <div className="text-center text-white p-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Bienvenido al Futuro del Networking</h2>
              <p className="mt-4 text-lg md:text-xl max-w-2xl">
                Descubre con quién tienes más afinidad y encuentra tu grupo ideal para innovar.
              </p>
            </div>
        </div>
      </div>
    </Card>
  );
}
