'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { toast } from 'sonner';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'For solo creators getting started.',
    features: ['10 active campaigns', 'Email support', 'Basic analytics', 'Weekly payout'],
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing creators and small teams.',
    features: ['50 active campaigns', 'Priority chat support', 'Advanced analytics', 'Daily payout'],
    featured: true,
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/month',
    description: 'For agencies managing multiple creators.',
    features: ['Unlimited campaigns', 'Dedicated success manager', 'Custom reports', '24/7 premium support'],
  },
];

export default function LandingPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    setName('');
    setEmail('');
    setMessage('');
    toast.success('We will get back to you soon');
  };

  useEffect(() => {
    if (!showContactModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowContactModal(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showContactModal]);

  return (
    <div className="theme-locked-dark min-h-screen bg-[#050506] text-white">
      {/* Navigation */}
      <header className="backdrop-blur-md bg-[#050506]/80 border-b border-[#1f2329] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrandLogo priority />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                Pricing
              </Link>
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="text-sm text-[#94a3b8] hover:text-white transition-colors"
              >
                Contact Us
              </button>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12161b] text-[#cbd5e1] text-sm mb-8 border border-[#1f2329]">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Trusted by 10,000+ creators worldwide</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 text-balance">
            The complete platform
            <br />
            <span className="text-primary">to grow your campaigns</span>
          </h1>
          <p className="text-lg md:text-xl text-[#cbd5e1] max-w-2xl mx-auto mb-10 text-pretty">
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
      <section className="py-16 border-y border-[#1f2329]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2M+</div>
              <div className="text-sm text-[#94a3b8]">Paid to creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm text-[#94a3b8]">Active campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-[#94a3b8]">Creators joined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-[#94a3b8]">Satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-[#cbd5e1] max-w-2xl mx-auto">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 border-t border-[#1f2329]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-[#cbd5e1] max-w-2xl mx-auto">
              Pick a plan that fits your campaign growth. All plans include creator onboarding and secure payouts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 transition-all ${
                  plan.featured
                    ? 'border-[#b30d0d] bg-[linear-gradient(180deg,rgba(179,13,13,0.14)_0%,rgba(11,13,16,1)_45%)] shadow-[0_0_30px_rgba(179,13,13,0.2)]'
                    : 'border-[#1f2329] bg-[#0b0d10] hover:bg-[#12161b]'
                }`}
              >
                <p className="text-sm text-[#f87171] font-semibold mb-2">{plan.name}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#94a3b8]">{plan.period}</span>
                </div>
                <p className="text-sm text-[#cbd5e1] mb-5">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((item) => (
                    <li key={item} className="text-sm text-[#e2e8f0]">
                      - {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[linear-gradient(180deg,#ba0b0b_0%,#8f0707_100%)] hover:opacity-95 text-white">
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#0b0d10]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start earning?
          </h2>
          <p className="text-[#cbd5e1] mb-8">
            Join thousands of creators who are already earning with FORKOFF.
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
      <footer className="py-12 border-t border-[#1f2329]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BrandLogo className="h-9 sm:h-10" />
            </div>
            <div className="text-sm text-[#94a3b8]">
              2026@FORKOFF. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-[#8f0707] bg-[#0b0d10] p-6 shadow-[0_0_40px_rgba(185,11,11,0.2)]">
            <h3 className="text-xl font-semibold text-white mb-1">Contact Us</h3>
            <p className="text-sm text-[#94a3b8] mb-5">Share your query and our team will respond soon.</p>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-[#e2e8f0]">Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border-[#8f0707] bg-[#12161b] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-[#e2e8f0]">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border-[#8f0707] bg-[#12161b] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-[#e2e8f0]">Message</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need..."
                  className="border-[#8f0707] bg-[#12161b] text-white min-h-24"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1 border-[#8f0707] text-white hover:bg-[#1b1013]" onClick={() => setShowContactModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-[linear-gradient(180deg,#ba0b0b_0%,#8f0707_100%)] hover:opacity-95 text-white">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-[#1f2329] bg-[#0b0d10] hover:bg-[#12161b] transition-colors">
      <div className="w-12 h-12 rounded-lg bg-[#7f1d1d]/20 flex items-center justify-center text-[#ef4444] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#94a3b8]">{description}</p>
    </div>
  );
}
