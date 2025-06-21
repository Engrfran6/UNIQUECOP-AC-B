// components/ExitPopup.tsx
'use client';

import {useEffect, useState} from 'react';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from './ui/dialog';

export function ExitPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        // Store in localStorage to prevent showing again soon
        localStorage.setItem('exitPopupShown', Date.now().toString());
      }
    };

    // Check if we've shown this recently
    const lastShown = localStorage.getItem('exitPopupShown');
    if (lastShown && Date.now() - parseInt(lastShown) < 86400000) {
      // 24 hours
      setHasShown(true);
    }

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [hasShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] bg-slate-300">
        <DialogHeader>
          <DialogTitle className="text-2xl">Wait! Don&apos;t Go Yet!</DialogTitle>
          <DialogDescription>
            We noticed you&apos;re leaving. Here&apos;s a special offer just for you:
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Summer Meadow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center justify-center">
                <span className="line-through text-gray-500">$70.00</span>
                <span className="font-bold text-red-600">$60.00</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Winter Solstice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center justify-center">
                <span className="line-through text-gray-500">$90.00</span>
                <span className="font-bold text-red-600">$80.00</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <Badge variant="secondary" className="text-lg font-mono mb-2">
            CODE20OFF
          </Badge>
          <p className="text-sm">Use above code to get 20% OFF your first order</p>
        </div>

        <div className="flex justify-center mt-4">
          <Button size="lg" className="w-full max-w-xs" onClick={() => setIsOpen(false)}>
            GRAB THE DISCOUNT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
