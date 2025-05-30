"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useFeedbackStore } from "@/lib/useFeedbackStore";
import { Button } from "./ui/button";
import { toast } from "sonner";

type FeedbackModalProps = {
  requestedIcon?: string;
};

export default function FeedbackModal({ requestedIcon }: FeedbackModalProps) {
  const { isOpen, close } = useFeedbackStore();

  const [iconName, setIconName] = useState(requestedIcon ||  "");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    setIconName(requestedIcon || '');
  }, [requestedIcon]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!iconName.trim()) {
      setError("Icon name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iconName, description }),
      });

      const result = await response.json();

      if (result.result === "success") {
        toast.success(`Request for "${iconName}" submitted!`);
        setIconName("");
        setDescription("");
        close();
      } else {
        throw new Error(
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogTitle>Request an Icon</DialogTitle>
        <DialogDescription className="mb-4">
          Please provide details about the icon you're looking for.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="iconName" className="block text-sm font-medium">
              Icon Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="iconName"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              placeholder="e.g., Next.js"
              className="mt-1 block w-full rounded px-3 py-2 border focus:border-primary focus:ring focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any other details or use cases"
              rows={3}
              className="mt-1 block w-full rounded border px-3 py-2 focus:border-primary focus:ring focus:ring-primary/50 resize-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-white py-2 px-6 rounded hover:bg-primary-dark"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}