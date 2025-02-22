import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GradientWrapper } from "@/components/gradient-wrapper";
import { ChevronRight, TimerIcon, LockIcon, UnlockIcon, ShareIcon, HeartIcon, SparklesIcon, UsersIcon } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <GradientWrapper className="p-8 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div {...fadeInUp}>
                <TimerIcon className="w-16 h-16 mx-auto mb-8 text-primary" />
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Digital Time Capsule
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Preserve your memories, share your stories, and create lasting digital legacies
                  that can be opened at just the right moment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/create">
                      Create a Capsule
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/timeline">View Timeline</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </GradientWrapper>
        </section>

        {/* Statistics Section */}
        <section className="bg-purple-50/50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "1000+", label: "Memories Preserved", icon: HeartIcon },
                { number: "500+", label: "Active Users", icon: UsersIcon },
                { number: "50+", label: "Group Capsules", icon: ShareIcon },
                { number: "100%", label: "Secure Storage", icon: LockIcon },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating and sharing your digital memories has never been easier
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: "Create Your Capsule",
                description: "Add photos, write messages, and include special memories",
                icon: SparklesIcon,
              },
              {
                step: 2,
                title: "Set the Timer",
                description: "Choose when your capsule should be opened",
                icon: TimerIcon,
              },
              {
                step: 3,
                title: "Share & Preserve",
                description: "Invite others to contribute or keep it private",
                icon: ShareIcon,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-white shadow-lg"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-gradient-to-b from-purple-50/50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Create",
                  description: "Build your digital time capsule with text, images, and memories",
                  image: "https://images.unsplash.com/photo-1510772314292-9c0ad420734a",
                  features: ["Multiple media types", "Rich text editor", "Voice messages"]
                },
                {
                  title: "Preserve",
                  description: "Lock your memories until the perfect moment to revisit them",
                  image: "https://images.unsplash.com/photo-1528109901743-12b16e05eedf",
                  features: ["Time-locked content", "Secure storage", "Backup protection"]
                },
                {
                  title: "Share",
                  description: "Share your capsules with family, friends, or your future self",
                  image: "https://images.unsplash.com/photo-1527422419387-c3822ad4b198",
                  features: ["Group capsules", "Private sharing", "Custom permissions"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                    <div className="relative h-48">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 text-2xl font-semibold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item) => (
                          <li key={item} className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 text-primary mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What People Say</h2>
            <p className="text-muted-foreground">Discover how others are using Digital Time Capsule</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "A beautiful way to preserve our wedding memories for our future anniversary.",
                author: "Sarah & James",
                role: "Newlyweds"
              },
              {
                quote: "I created a capsule for my daughter to open on her 18th birthday. It's perfect!",
                author: "Michael R.",
                role: "Parent"
              },
              {
                quote: "Our school used it for our 10-year reunion. The memories were priceless!",
                author: "Emma T.",
                role: "Teacher"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <GradientWrapper className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Start Preserving Your Memories Today
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of others in creating meaningful time capsules for the future.
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/create">
                    Create Your First Capsule
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </GradientWrapper>
        </section>
      </main>
    </div>
  );
}