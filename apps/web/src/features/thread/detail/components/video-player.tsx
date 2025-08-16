"use client";

import { Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  videoId: string;
  iframeUrl?: string;
};

export function VideoPlayer({ videoId, iframeUrl }: VideoPlayerProps) {
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 署名付きURLが提供されている場合はそれを使用、なければデフォルト
  const iframeSrc =
    iframeUrl || `https://iframe.cloudflarestream.com/${videoId}`;

  return (
    <div className="relative w-full bg-black rounded-md overflow-hidden aspect-video">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`動画 ${videoId}`}
        onError={() => setError(true)}
      />

      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            動画を読み込めませんでした
          </p>
        </div>
      )}
    </div>
  );
}
