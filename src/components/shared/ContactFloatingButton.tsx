"use client";

import { ContactChannels } from "@/components/shared/ContactChannels";

export function ContactFloatingButton() {
  return (
    <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 sm:right-6">
      <div className="pointer-events-auto">
        <ContactChannels variant="floating" />
      </div>
    </div>
  );
}
