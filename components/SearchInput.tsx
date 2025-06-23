// components/SearchInput.tsx
'use client';

import {Input} from '@/components/ui/input';
import {X} from 'lucide-react';
import {useEffect, useRef} from 'react';

export function SearchInput({
  searchQuery,
  updateSearchQuery,
  onClose,
}: {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleClose = () => {
    updateSearchQuery(''); // Clear the search query
    onClose(); // Close the search input
  };

  return (
    <div className="py-4 border-t border-soft-taupe/20">
      <div className="relative max-w-md mx-auto flex items-center">
        <Input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="pr-12 text-lg py-6"
        />
        <button
          onClick={handleClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-gray hover:text-sage-green transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
