import { NextRequest, NextResponse } from "next/server";
import https from "https";
import http from "http";
import { URL } from "url";

export async function POST(request: NextRequest) {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:2420";
    const searchParams = request.nextUrl.searchParams.toString();
    const backendUrl = `${apiBaseUrl}/api/File/upload${searchParams ? `?${searchParams}` : ""}`;

    // Read the raw multipart body and preserve the original Content-Type (includes boundary)
    const bodyBuffer = Buffer.from(await request.arrayBuffer());
    const contentType = request.headers.get("content-type") ?? "multipart/form-data";

    const url = new URL(backendUrl);
    const isHttps = url.protocol === "https:";

    // For local HTTPS development, allow the self-signed certificate when the
    // Next.js server proxies the request server-side.
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    const agent = isHttps
      ? new https.Agent({ rejectUnauthorized: !(isHttps && isLocalhost) })
      : new http.Agent();

    const requestHeaders: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Length": bodyBuffer.length.toString(),
    };

    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      requestHeaders["Authorization"] = authHeader;
    }

    const options: https.RequestOptions = {
      method: "POST",
      hostname: url.hostname,
      port: url.port || (isHttps ? "443" : "80"),
      path: url.pathname + url.search,
      agent,
      headers: requestHeaders,
    };

    const backendResponse = await new Promise<{
      statusCode: number;
      statusMessage: string;
      body: string;
    }>((resolve, reject) => {
      const req = (isHttps ? https : http).request(options, (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode ?? 0,
            statusMessage: res.statusMessage ?? "",
            body: data,
          });
        });
      });

      req.on("error", (err) => reject(err));
      req.write(bodyBuffer);
      req.end();
    });

    let data: any = null;
    if (backendResponse.body) {
      try {
        data = JSON.parse(backendResponse.body);
      } catch {
        data = backendResponse.body;
      }
    }

    if (backendResponse.statusCode < 200 || backendResponse.statusCode >= 300) {
      return NextResponse.json(
        {
          success: false,
          error: data?.messages?.[0] ?? data?.message ?? `Upload failed (${backendResponse.statusCode})`,
        },
        { status: backendResponse.statusCode }
      );
    }

    return NextResponse.json({ success: true, data: data?.data ?? data });
  } catch (error: any) {
    console.error("Upload proxy error:", error);
    return NextResponse.json(
      { success: false, error: error.message ?? "Upload failed" },
      { status: 500 }
    );
  }
}
