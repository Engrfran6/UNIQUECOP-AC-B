import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {BookOpen, Flame, Ruler} from 'lucide-react';

const SizeGuidePage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-muted-gold/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">Size Guide</h1>
            <p className="text-lg text-charcoal-gray/80">
              Find the perfect size for your space and needs with our comprehensive size guide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Candle Sizes */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Flame className="h-12 w-12 text-muted-gold mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
                Candle Sizes
              </h2>
              <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
                Our candles come in various sizes to suit different spaces and occasions. Each size
                is carefully crafted for optimal burn time and scent throw.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-20 h-24 mx-auto mb-4 bg-sage-green/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-sage-green">4 oz</span>
                  </div>
                  <CardTitle className="text-lg">Travel Size</CardTitle>
                  <Badge className="bg-sage-green text-warm-white">4 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Diameter:</span>
                      <span className="font-medium">2.5"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Height:</span>
                      <span className="font-medium">2.75"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Burn Time:</span>
                      <span className="font-medium">25-30 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Perfect for small spaces, bathrooms, or travel
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-24 h-28 mx-auto mb-4 bg-dusty-rose/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-dusty-rose">8 oz</span>
                  </div>
                  <CardTitle className="text-lg">Standard</CardTitle>
                  <Badge className="bg-dusty-rose text-warm-white">8 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Diameter:</span>
                      <span className="font-medium">3.25"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Height:</span>
                      <span className="font-medium">3.5"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Burn Time:</span>
                      <span className="font-medium">45-50 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Most popular size, ideal for bedrooms and living rooms
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-28 h-32 mx-auto mb-4 bg-muted-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-gold">12 oz</span>
                  </div>
                  <CardTitle className="text-lg">Large</CardTitle>
                  <Badge className="bg-muted-gold text-warm-white">12 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Diameter:</span>
                      <span className="font-medium">3.75"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Height:</span>
                      <span className="font-medium">4.25"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Burn Time:</span>
                      <span className="font-medium">65-75 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Great for larger rooms and open spaces
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-32 h-36 mx-auto mb-4 bg-sage-green/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-sage-green">16 oz</span>
                  </div>
                  <CardTitle className="text-lg">Extra Large</CardTitle>
                  <Badge className="bg-sage-green text-warm-white">16 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Diameter:</span>
                      <span className="font-medium">4"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Height:</span>
                      <span className="font-medium">5"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Burn Time:</span>
                      <span className="font-medium">85-95 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Perfect for large spaces and extended enjoyment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Wax Melts */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="h-12 w-12 text-dusty-rose mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🧊</span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
                Wax Melts
              </h2>
              <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
                Our wax melts come in convenient cube formats, designed for use with electric wax
                warmers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-12 mx-auto mb-4 bg-dusty-rose/20 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-dusty-rose">2 oz</span>
                  </div>
                  <CardTitle className="text-lg">Standard Pack</CardTitle>
                  <Badge className="bg-dusty-rose text-warm-white">2 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Cubes:</span>
                      <span className="font-medium">6 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Per Cube:</span>
                      <span className="font-medium">8-12 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Total:</span>
                      <span className="font-medium">48-72 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">Perfect for trying new scents</p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-20 h-14 mx-auto mb-4 bg-muted-gold/20 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-muted-gold">2.5 oz</span>
                  </div>
                  <CardTitle className="text-lg">Value Pack</CardTitle>
                  <Badge className="bg-muted-gold text-warm-white">2.5 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Cubes:</span>
                      <span className="font-medium">8 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Per Cube:</span>
                      <span className="font-medium">8-12 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Total:</span>
                      <span className="font-medium">64-96 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">Best value for favorite scents</p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-24 h-16 mx-auto mb-4 bg-sage-green/20 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-sage-green">3 oz</span>
                  </div>
                  <CardTitle className="text-lg">Luxury Pack</CardTitle>
                  <Badge className="bg-sage-green text-warm-white">3 oz</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Cubes:</span>
                      <span className="font-medium">10 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Per Cube:</span>
                      <span className="font-medium">10-14 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Total:</span>
                      <span className="font-medium">100-140 hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">Premium scents, maximum value</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Books */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <BookOpen className="h-12 w-12 text-sage-green mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
                Book Formats
              </h2>
              <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
                Our curated books are available in different formats to suit your reading
                preferences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-20 h-28 mx-auto mb-4 bg-sage-green/20 rounded flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-sage-green" />
                  </div>
                  <CardTitle className="text-lg">Paperback</CardTitle>
                  <Badge className="bg-sage-green text-warm-white">Standard</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Size:</span>
                      <span className="font-medium">5" × 8"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Weight:</span>
                      <span className="font-medium">8-12 oz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Pages:</span>
                      <span className="font-medium">180-350</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Lightweight and portable for everyday reading
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-20 h-28 mx-auto mb-4 bg-muted-gold/20 rounded flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-gold" />
                  </div>
                  <CardTitle className="text-lg">Hardcover</CardTitle>
                  <Badge className="bg-muted-gold text-warm-white">Premium</Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Size:</span>
                      <span className="font-medium">6" × 9"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Weight:</span>
                      <span className="font-medium">1-2 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Pages:</span>
                      <span className="font-medium">200-400</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    Durable and elegant for your personal library
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Room Size Recommendations */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Ruler className="h-12 w-12 text-dusty-rose mx-auto mb-4" />
              <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
                Room Size Recommendations
              </h2>
              <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
                Choose the right candle size based on your room dimensions for optimal scent throw.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Small Rooms</CardTitle>
                  <p className="text-sm text-charcoal-gray/70">Up to 150 sq ft</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-2xl font-bold text-sage-green">4 oz</div>
                  <p className="text-xs text-charcoal-gray/60">
                    Perfect for bathrooms, closets, small bedrooms
                  </p>
                  <div className="text-xs text-charcoal-gray/60">
                    Examples: Powder room, walk-in closet, office
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Medium Rooms</CardTitle>
                  <p className="text-sm text-charcoal-gray/70">150-300 sq ft</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-2xl font-bold text-dusty-rose">8 oz</div>
                  <p className="text-xs text-charcoal-gray/60">
                    Ideal for bedrooms, home offices, dining rooms
                  </p>
                  <div className="text-xs text-charcoal-gray/60">
                    Examples: Master bedroom, study, breakfast nook
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Large Rooms</CardTitle>
                  <p className="text-sm text-charcoal-gray/70">300-500 sq ft</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-2xl font-bold text-muted-gold">12 oz</div>
                  <p className="text-xs text-charcoal-gray/60">
                    Great for living rooms, kitchens, family rooms
                  </p>
                  <div className="text-xs text-charcoal-gray/60">
                    Examples: Living room, kitchen, family room
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Extra Large</CardTitle>
                  <p className="text-sm text-charcoal-gray/70">500+ sq ft</p>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-2xl font-bold text-sage-green">16 oz</div>
                  <p className="text-xs text-charcoal-gray/60">
                    Perfect for open concepts, great rooms
                  </p>
                  <div className="text-xs text-charcoal-gray/60">
                    Examples: Open floor plan, great room, loft
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-creamy-beige rounded-lg p-8">
            <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-6 text-center">
              Sizing Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-charcoal-gray mb-3">For Best Results:</h4>
                <ul className="space-y-2 text-sm text-charcoal-gray/70">
                  <li>• Consider ceiling height - higher ceilings need larger candles</li>
                  <li>• Open floor plans require multiple candles or larger sizes</li>
                  <li>• Start with our recommended size and adjust based on preference</li>
                  <li>• Multiple smaller candles can be more effective than one large candle</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-charcoal-gray mb-3">Scent Throw Factors:</h4>
                <ul className="space-y-2 text-sm text-charcoal-gray/70">
                  <li>• Room ventilation affects scent distribution</li>
                  <li>• Carpeted rooms hold scent longer than hardwood</li>
                  <li>• Some scents naturally have stronger throw than others</li>
                  <li>• Burn for 2-3 hours for optimal scent throw</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SizeGuidePage;
