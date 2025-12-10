import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export function GET() {
    const filePath = path.join(process.cwd(), "public", "opengraph-image.jpg");
    const file = fs.readFileSync(filePath);

    return new NextResponse(file, {
        headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000",
        },
    });
}
