import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CalendarIcon, HelpCircle, ImageIcon, Lock } from "lucide-react";
import { format } from "date-fns";
import { insertCapsuleSchema } from "@shared/schema";
import { GradientWrapper } from "@/components/gradient-wrapper";

const previewImages = [
  "https://images.unsplash.com/photo-1447069387593-a5de0862481e",
  "https://images.unsplash.com/photo-1528109901743-12b16e05eedf",
  "https://images.unsplash.com/photo-1527422419387-c3822ad4b198",
];

export default function Create() {
  const [selectedImage, setSelectedImage] = useState(previewImages[0]);

  const form = useForm({
    resolver: zodResolver(insertCapsuleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: { text: "" },
      openDate: undefined,
      imageUrl: previewImages[0],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50/50">
      <main className="container mx-auto px-4 py-16">
        <GradientWrapper className="max-w-4xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-12">
              <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h1 className="text-3xl font-bold mb-4">Create a New Time Capsule</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill in the details below to create your digital time capsule. Choose when it
                can be opened and customize its appearance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Name your time capsule" {...field} />
                          </FormControl>
                          <FormDescription>
                            Give your capsule a meaningful name that captures its essence
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What's this time capsule about?"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Describe the memories or moments you're preserving
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content.text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your message for the future..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is the main content that will be revealed when the capsule is opened
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="openDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Open Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Choose when your capsule can be opened
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Create Time Capsule
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Preview
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>See how your capsule will appear in the timeline</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <CardDescription>
                      This is how others will see your capsule until it's opened
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {previewImages.map((image) => (
                        <button
                          key={image}
                          onClick={() => setSelectedImage(image)}
                          className={cn(
                            "relative h-20 rounded-md overflow-hidden",
                            "ring-2 ring-offset-2",
                            selectedImage === image
                              ? "ring-primary"
                              : "ring-transparent"
                          )}
                        >
                          <img
                            src={image}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Select a cover image for your time capsule
                    </p>
                  </CardFooter>
                </Card>

                {/* Tips Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Tips for a Great Capsule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Choose a meaningful date for opening",
                        "Add detailed descriptions",
                        "Include personal touches in your message",
                        "Select an image that represents your memories",
                      ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm">
                          <span className="text-primary">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </GradientWrapper>
      </main>
    </div>
  );
}