import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import { SeedrailLogo } from '@/components/seedrail-logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="backdrop-blur-md bg-background/70 border-b border-border/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">SEED</span>
              <SeedrailLogo size={24} />
              <span className="text-xl font-bold text-red-500">RAIL</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Trusted by 10,000+ creators worldwide</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 text-balance">
            The complete platform
            <br />
            <span className="text-primary">to grow your campaigns</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Discover, participate, and earn from the best marketing campaigns. 
            Connect with brands looking for authentic creators like you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">$2M+</div>
              <div className="text-sm text-muted-foreground">Paid to creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Creators joined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to discover campaigns, 
              track performance, and maximize your earnings.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Fast Discovery"
              description="Find relevant campaigns instantly with smart filters and search."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure Payments"
              description="Get paid on time with our secure escrow payment system."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Performance Analytics"
              description="Track your campaign performance with detailed analytics."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Community"
              description="Connect with other creators and share insights."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to start earning?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of creators who are already earning with SEEDRAIL.
            Sign up today and discover your first campaign.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">SEED</span>
              <SeedrailLogo size={20} />
              <span className="font-bold text-red-500">RAIL</span>
            </div>
            <div className="text-sm text-muted-foreground">
              2026 SEEDRAIL. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
