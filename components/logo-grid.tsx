"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/lib/types";
import Image from "next/image";
import FeedbackModal from "./FeedbackModal";
import { useFeedbackStore } from "@/lib/useFeedbackStore";
import { toast } from "sonner";

interface LogoGridProps {
  initialLogos: Logo[];
  initialQuery?: string;
  initialCategory?: string;
  totalIcons: number;
  hasMore: boolean;
  currentPage: number;
}

export function LogoGrid({
  initialLogos = [],
  initialQuery = "",
  initialCategory = "",
  totalIcons,
  hasMore: initialHasMore,
  currentPage,
}: LogoGridProps) {
  const searchParams = useSearchParams();
  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [noIcon, setNoIcon] = useState("");
  const { open } = useFeedbackStore();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchLogos = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      params.set("page", "1");
      if (query) {
        params.set("q", query)
        setNoIcon(query)
      };
      if (category) params.set("category", category);

      const res = await fetch(`/api/icons?${params.toString()}`);
      const data = await res.json();

      setLogos(data.logos);
      setHasMore(data.hasMore);
      setPage(1);
      setLoading(false);
    };

    fetchLogos();
  }, [query, category]);

  const fetchMore = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", (page + 1).toString());
    if (query) params.set("q", query);
    if (category) params.set("category", category);

    const res = await fetch(`/api/icons?${params.toString()}`);
    const data = await res.json();

    setLogos((prev) => [...prev, ...data.logos]);
    setHasMore(data.hasMore);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  if (logos.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No icons found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
        <button
          onClick={open}
          className="mt-2 hover:text-primary underline hover:opacity-80"
        >
          Didn’t find your icon? Request it → {noIcon}
        </button>
        <FeedbackModal requestedIcon={noIcon}/>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.slug + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.02, 1) }}
          >
            <Link href={`/icon/${logo.slug}`}>
              <Card className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer h-full overflow-hidden group">
                <CardContent className="bg-gradient-to-r dark:from-gray-700 dark:to-gray-900 p-6 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <LazyImage
                      src={logo.svgFilePath}
                      alt={logo.name}
                      className="max-w-full max-h-full"
                    />
                  </div>
                  <p className="text-center font-medium text-sm mb-2">
                    {logo.name}
                  </p>
                  {logo.category && (
                    <Badge variant="secondary" className="text-xs">
                      {logo.category}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button onClick={fetchMore} disabled={loading} variant="outline">
            {loading ? "Loading..." : "Load More Icons"}
          </Button>
        </div>
      )}

      <p className="text-sm text-muted-foreground my-4 text-center">
        Showing {logos.length} of {totalIcons}{" "}
        {totalIcons === 1 ? "icon" : "icons"}
      </p>
    </div>
  );
}

function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    const element = document.querySelector(`[data-src="${src}"]`);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [src]);

  return (
    <div className={`relative ${className}`} data-src={src}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      {isInView && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={70}
          height={70}
          className={`${className} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
