export function AdSenseBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center ${className}`}>
      <p className="text-sm text-muted-foreground">AdSense Banner Placeholder</p>
      <p className="text-xs text-muted-foreground/70 mt-1">728x90 or 320x50</p>
    </div>
  );
}

export function AdSenseInContent({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center ${className}`}>
      <p className="text-sm text-muted-foreground">AdSense In-Content Placeholder</p>
      <p className="text-xs text-muted-foreground/70 mt-1">336x280 or 300x250</p>
    </div>
  );
}

export function AdSenseMobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t p-2 md:hidden">
      <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg p-2 text-center">
        <p className="text-xs text-muted-foreground">Mobile Sticky Ad</p>
        <p className="text-xs text-muted-foreground/70">320x50</p>
      </div>
    </div>
  );
}