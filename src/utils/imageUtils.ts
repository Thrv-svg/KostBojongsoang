import React from 'react';

// Fallback image URL when local asset or remote photo fails to load
export const FALLBACK_KOST_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';

export const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_KOST_IMAGE;
};
