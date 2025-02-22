import { motion } from "framer-motion";
import { GradientWrapper } from "@/components/gradient-wrapper";
import { Camera } from "lucide-react";
import { mockCapsules } from "@/lib/mock-data";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50/50">
      <main className="container mx-auto px-4 py-16">
        <GradientWrapper className="p-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Memory Gallery</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a collection of unlocked time capsules and shared memories from our
              community.
            </p>
          </motion.div>
        </GradientWrapper>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockCapsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={capsule.imageUrl}
                alt={capsule.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold truncate">{capsule.title}</h3>
                  <p className="text-sm text-white/80 truncate">
                    {capsule.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
