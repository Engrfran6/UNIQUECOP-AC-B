"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/contexts/AuthContext";
import {useToast} from "@/hooks/use-toast";
import {db} from "@/lib/firebase";
import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import React, {useEffect, useState} from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberDocId, setSubscriberDocId] = useState<string | null>(null);

  const {toast} = useToast();
  const {user} = useAuth();

  // Check if the entered email is already subscribed
  const checkSubscription = async (emailToCheck: string) => {
    if (!emailToCheck) return;
    const q = query(collection(db, "newsletter_subscribers"), where("email", "==", emailToCheck));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setIsSubscribed(true);
      setSubscriberDocId(querySnapshot.docs[0].id);
    } else {
      setIsSubscribed(false);
      setSubscriberDocId(null);
    }
  };

  // Set email to user's email on first load (optional)
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user]);

  // Re-check subscription when the email input changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      checkSubscription(email);
    }, 400); // debounce input
    return () => clearTimeout(timeout);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      if (isSubscribed && subscriberDocId) {
        // Unsubscribe
        await deleteDoc(doc(db, "newsletter_subscribers", subscriberDocId));
        toast({
          title: "You've been unsubscribed.",
          description: "We're sad to see you go.",
        });
        setIsSubscribed(false);
        setSubscriberDocId(null);
      } else {
        // Subscribe
        const docRef = await addDoc(collection(db, "newsletter_subscribers"), {
          email,
          subscribedAt: new Date(),
        });
        toast({
          title: "Subscribed successfully!",
          description: "You've been added to our newsletter list.",
        });
        setIsSubscribed(true);
        setSubscriberDocId(docRef.id);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-sage-green/8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Stay Connected
          </h2>
          <p className="text-charcoal-gray/70 mb-8">
            Subscribe to our newsletter for exclusive offers, new product launches, and mindful
            living tips delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-warm-white border-soft-taupe"
              // Do NOT disable input — users should be able to enter any email
            />
            <Button
              type="submit"
              disabled={isLoading}
              title={isSubscribed ? "Unsubscribe from newsletter" : "Subscribe to newsletter"}
              className={`
    transition-colors duration-200 px-6 py-2 font-medium inline-flex items-center justify-center gap-2 rounded
    ${
      isSubscribed
        ? "bg-red-600/70 hover:bg-red-700/70 text-white"
        : "bg-green-600/70 hover:bg-green-700/70 text-white"
    }
    ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
  `}>
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {isLoading
                ? isSubscribed
                  ? "Unsubscribing..."
                  : "Subscribing..."
                : isSubscribed
                ? "Unsubscribe"
                : "Subscribe"}
            </Button>
          </form>

          <p className="text-sm text-charcoal-gray/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
