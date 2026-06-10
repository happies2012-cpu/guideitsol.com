"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Eye,
  MousePointer,
  MessageSquare,
  Share2,
  Bookmark,
  Star,
  TrendingUp,
  Zap,
  Globe,
  Briefcase,
  ShoppingBag,
  Building,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Upload,
  X,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  adCategories, 
  sampleAds, 
  adTypes, 
  pricingTypes, 
  formatAdPrice, 
  getFeaturedAds,
  type AdPost 
} from "@/data/ads";

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Brain,
  Palette,
  TrendingUp,
  Briefcase,
  Cloud,
  Layout,
  Puzzle,
  GraduationCap,
  Clock,
  UserPlus,
  Rocket,
  Handshake,
  DollarSign,
};

export default function AdsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredAds = sampleAds.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ad.category === selectedCategory;
    const matchesType = selectedType === "all" || ad.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredAds = getFeaturedAds();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-muted-foreground">Find services, products, and opportunities</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Post an Ad
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Ad</DialogTitle>
                  <DialogDescription>
                    Post your service, product, or job opportunity to reach thousands of potential customers.
                  </DialogDescription>
                </DialogHeader>
                <CreateAdForm onClose={() => setIsCreateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        {/* Featured Ads */}
        {featuredAds.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-semibold">Featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAds.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AdCard ad={ad} featured />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Search & Filters */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search ads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {adTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {adCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {adCategories.slice(0, 12).map((category) => {
              const Icon = iconMap[category.icon] || Briefcase;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`card-elevated p-4 text-center transition-all ${
                    selectedCategory === category.slug ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium truncate">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Ads Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {filteredAds.length} {filteredAds.length === 1 ? 'Result' : 'Results'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AdCard ad={ad} />
              </motion.div>
            ))}
          </div>
          {filteredAds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No ads found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Ad Card Component
function AdCard({ ad, featured }: { ad: AdPost; featured?: boolean }) {
  return (
    <Card className={`card-elevated overflow-hidden group ${featured ? 'ring-2 ring-primary/20' : ''}`}>
      <CardContent className="p-0">
        {/* Image Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center relative">
          {featured && (
            <Badge className="absolute top-3 left-3 bg-amber-500">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {ad.promoted && (
            <Badge className="absolute top-3 right-3 bg-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              Promoted
            </Badge>
          )}
          <Zap className="w-12 h-12 text-primary/30" />
        </div>
        
        <div className="p-4">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {ad.type}
            </Badge>
            {ad.verified && (
              <Badge className="bg-green-500/20 text-green-500 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {ad.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {ad.shortDescription}
          </p>

          {/* Features */}
          <div className="space-y-1 mb-4">
            {ad.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-primary" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-lg font-bold gradient-text">
                {formatAdPrice(ad.pricing)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {ad.location?.remote && (
                <Globe className="w-3 h-3" />
              )}
              {ad.location?.remote ? 'Remote' : ad.location?.city || 'Worldwide'}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {ad.stats.views}
              </span>
              <span className="flex items-center gap-1">
                <MousePointer className="w-3 h-3" />
                {ad.stats.clicks}
              </span>
            </div>
            <Link to={`/ads/${ad.slug}`}>
              <Button size="sm" variant="outline" className="btn-outline text-xs h-7">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Create Ad Form Component
function CreateAdForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    title: '',
    description: '',
    shortDescription: '',
    pricingType: '',
    amount: '',
    city: '',
    remote: false,
    name: '',
    email: '',
    phone: '',
    features: ['', '', ''],
  });

  const handleSubmit = () => {
    // Submit logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-16 h-0.5 mx-2 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label>Ad Type</Label>
            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {adTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {adCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter ad title"
            />
          </div>
          <Button className="w-full btn-primary" onClick={() => setStep(2)} disabled={!formData.type || !formData.category || !formData.title}>
            Next Step <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label>Short Description</Label>
            <Input
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief tagline (max 100 chars)"
              maxLength={100}
            />
          </div>
          <div>
            <Label>Full Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of your service/product"
              rows={5}
            />
          </div>
          <div>
            <Label>Pricing</Label>
            <div className="flex gap-2">
              <Select value={formData.pricingType} onValueChange={(v) => setFormData({ ...formData, pricingType: v })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Pricing type" />
                </SelectTrigger>
                <SelectContent>
                  {pricingTypes.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.pricingType === 'fixed' && (
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Amount"
                  className="flex-1"
                />
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button className="flex-1 btn-primary" onClick={() => setStep(3)}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <Label>Your Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email address"
            />
          </div>
          <div>
            <Label>Phone (Optional)</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone number"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remote"
              checked={formData.remote}
              onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="remote">Available for remote work</Label>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button className="flex-1 btn-primary" onClick={handleSubmit}>
              Post Ad
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}