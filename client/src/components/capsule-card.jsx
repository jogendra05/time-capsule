
import { motion } from "framer-motion";
import { Calendar, Lock, Eye } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CapsuleCard({ capsule, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img
            src={capsule.imageUrl}
            alt={capsule.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{capsule.title}</span>
            {new Date(capsule.openDate) > new Date() ? (
              <Lock className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {capsule.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Opens {format(new Date(capsule.openDate), "PPP")}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
