// Cloudflare Stream設定
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const CLOUDFLARE_STREAM_CUSTOMER_CODE =
  process.env.CLOUDFLARE_STREAM_CUSTOMER_CODE || "";
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";

// トークンのキャッシュ（メモリキャッシュ）
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

// Cloudflare Stream /token エンドポイントからトークンを取得
async function getStreamToken(videoId: string): Promise<string | null> {
  // キャッシュをチェック
  const cached = tokenCache.get(videoId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.token;
  }

  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.warn("Cloudflare API credentials are not configured");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // オプション：アクセス制限を設定可能
          // exp: Math.floor(Date.now() / 1000) + 3600, // 1時間後
          // downloadable: false,
          // requireSignedURLs: true,
        }),
      },
    );
    console.log(response);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `Failed to get stream token: ${response.status} ${response.statusText}`,
        errorData,
      );
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      console.error("Token request failed:", data.errors);
      return null;
    }

    const token = data.result?.token;

    if (!token) {
      console.error("No token in response");
      return null;
    }

    // トークンをキャッシュ（59分間）
    tokenCache.set(videoId, {
      token,
      expiresAt: Date.now() + 59 * 60 * 1000, // 59分
    });

    return token;
  } catch (error) {
    console.error("Error fetching stream token:", error);
    return null;
  }
}

// Cloudflare Stream署名付きURL生成
export async function getSignedStreamUrl(videoId: string): Promise<string> {
  if (!CLOUDFLARE_STREAM_CUSTOMER_CODE) {
    console.error("CLOUDFLARE_STREAM_CUSTOMER_CODE is not configured");
    return "";
  }

  const token = await getStreamToken(videoId);
  console.log(`Video ID: ${videoId}, Token: ${token}`);

  if (!token) {
    // トークンなしURL（公開動画またはエラー時）
    console.warn("No token available, returning public URL");
    return `https://iframe.cloudflarestream.com/${videoId}`;
  }

  // トークン付きURL（埋め込みプレーヤー用）
  // ビデオIDの代わりにトークンを使用
  const signedUrl = `https://customer-${CLOUDFLARE_STREAM_CUSTOMER_CODE}.cloudflarestream.com/${token}/iframe`;
  console.log(`Signed URL: ${signedUrl}`);
  return signedUrl;
}

// 動画情報を取得
export async function getVideoInfo(videoId: string): Promise<any> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.error("Cloudflare API credentials are not configured");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching video info:", error);
    return null;
  }
}
