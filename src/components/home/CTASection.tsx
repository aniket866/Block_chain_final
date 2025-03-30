
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="rounded-2xl bg-gradient-to-r from-accent to-primary p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users already building the future with our Rust-powered blockchain ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="https://en.wikipedia.org/wiki/Cryptocurrency_wallet" target="_blank" rel="noopener noreferrer">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
