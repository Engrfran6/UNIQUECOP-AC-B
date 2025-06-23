'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {Slider} from '@/components/ui/slider';
import {FilterOptions} from '@/hooks/use-products-filter';
import {Filter} from 'lucide-react';
import {useState} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from './ui/sheet';

interface ProductFiltersProps {
  category: string;
  priceRange: [number, number];
  selectedOptions: Record<string, string[]>;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
}

export default function ProductFilters({
  category,
  priceRange,
  selectedOptions,
  onFilterChange,
  onResetFilters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handlePriceChange = (value: number[]) => {
    onFilterChange({priceRange: value as [number, number]});
  };

  const handleOptionToggle = (filterType: string, option: string) => {
    const currentOptions = selectedOptions[filterType] || [];
    const newOptions = currentOptions.includes(option)
      ? currentOptions.filter((item) => item !== option)
      : [...currentOptions, option];

    onFilterChange({
      selectedOptions: {
        ...selectedOptions,
        [filterType]: newOptions,
      },
    });
  };

  const getFilters = () => {
    switch (category) {
      case 'candles':
        return {
          scents: ['Vanilla', 'Lavender', 'Citrus', 'Sandalwood', 'Rose', 'Pine'],
          sizes: ['7 oz', '8 oz', '9 oz', '10 oz'],
          burnTime: ['40-45 hours', '45-50 hours', '50-55 hours', '55-60 hours'],
        };
      case 'scents':
        return {
          types: ['Essential Oil', 'Essential Oil Blend', 'Premium Blend', 'Absolute Oil'],
          volumes: ['10ml', '15ml', '20ml'],
          notes: ['Floral', 'Citrus', 'Woody', 'Herbal', 'Spicy'],
        };
      case 'books':
        return {
          genres: [
            'Self-Help',
            'Lifestyle',
            'Health & Wellness',
            'Home & Design',
            'Crafts & Hobbies',
            'Spirituality',
          ],
          authors: [
            'Sarah Chen',
            'Emma Thompson',
            'Dr. Michael Green',
            'Luna Martinez',
            'James Wilson',
            'Zen Master Kai',
          ],
          pages: ['Under 200', '200-300', '300-400', '400+'],
        };
      default:
        return {};
    }
  };

  const filters = getFilters();

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          max={100}
          step={1}
          className="w-full bg-muted-gold rounded-lg"
        />
        <div className="flex justify-between text-sm text-charcoal-gray/70">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Dynamic Filters */}
      {Object.entries(filters).map(([filterType, options]) => (
        <div key={filterType} className="space-y-3">
          <Label className="text-sm font-medium capitalize">
            {filterType.replace(/([A-Z])/g, ' $1').trim()}
          </Label>
          <div className="space-y-2">
            {(options as string[]).map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filterType}-${option}`}
                  checked={selectedOptions[filterType]?.includes(option) || false}
                  onCheckedChange={() => handleOptionToggle(filterType, option)}
                />
                <Label
                  htmlFor={`${filterType}-${option}`}
                  className="text-sm text-charcoal-gray/70 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={onResetFilters} variant="outline" className="w-full btn-secondary">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-center gap-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white">
              <Filter className="h-4 w-4" />
              Filters & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-warm-white w-full sm:w-80">
            <SheetHeader className="pb-6">
              <SheetTitle className="font-playfair text-xl text-charcoal-gray">Filters</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
              <FilterContent />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 bg-warm-white pt-4 border-t border-soft-taupe/20">
              <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 btn-accent" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <Card className="bg-warm-white border-soft-taupe/20">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
