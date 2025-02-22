import { motion } from "framer-motion";
import { GradientWrapper } from "@/components/gradient-wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Heart, Timer, Lock, Share } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50/50">
      <main className="container mx-auto px-4 py-16">
        <GradientWrapper className="p-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">About Digital Time Capsule</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mission is to help people preserve and share their most precious memories
              in a meaningful and beautiful way.
            </p>
          </motion.div>
        </GradientWrapper>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Digital Time Capsule was born from a simple idea: to create a space where
              people could preserve their memories, stories, and experiences in a way that
              would be meaningful for future generations.
            </p>
            <p className="text-muted-foreground">
              We believe that every memory has a story worth telling and preserving. Our
              platform provides a secure and beautiful way to capture these moments and share
              them at just the right time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {[
              {
                icon: Timer,
                title: "Time-Released Memories",
                description:
                  "Choose when your memories will be revealed to create meaningful moments of discovery.",
              },
              {
                icon: Lock,
                title: "Secure Storage",
                description:
                  "Your memories are safely encrypted and stored until their designated opening date.",
              },
              {
                icon: Share,
                title: "Collaborative Creation",
                description:
                  "Invite friends and family to contribute to shared capsules and create collective memories.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <feature.icon className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg">
            <Link href="/create">
              Start Creating Your Legacy
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
