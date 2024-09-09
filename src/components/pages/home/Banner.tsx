import { motion } from "framer-motion";
import { ChevronRight, Droplet, Shield, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BannerSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }}
      />

      {/* Content */}
      <div className="  relative z-10 container mx-auto px-6 text-center text-white ">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Car Deserves to Sparkle
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Professional car washing services at your fingertips
        </motion.p>

        {/* Features */}
        <motion.div
          className="flex justify-center space-x-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center">
            <Droplet className="w-6 h-6 mr-2 text-blue-400" />
            <span>Eco-Friendly</span>
          </div>
          <div className="flex items-center">
            <Car className="w-6 h-6 mr-2 text-blue-400" />
            <span>All Car Types</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-400" />
            <span>Guaranteed Quality</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold transition duration-300"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center"
            >
              Explore Services <ChevronRight className="ml-2" />
            </motion.a>
          </Button>
        </motion.div>

        {/* Animated water drops */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100, 0],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
