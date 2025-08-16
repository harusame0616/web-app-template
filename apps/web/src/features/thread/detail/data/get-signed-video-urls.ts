import { getSignedStreamUrl } from "../utils/cloudflare-stream";

export type SignedVideoData = {
  videoId: string;
  iframeUrl: string;
};

// 動画IDの配列から署名付きURLを生成
export async function getSignedVideoUrls(
  videoIds: string[],
): Promise<SignedVideoData[]> {
  const signedUrls = await Promise.all(
    videoIds.map(async (videoId) => {
      const iframeUrl = await getSignedStreamUrl(videoId);

      return {
        videoId,
        iframeUrl,
      };
    }),
  );

  return signedUrls;
}
