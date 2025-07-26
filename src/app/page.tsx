import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RenderingDemo } from "@/components/RenderingDemo";
import CallToActionPage from "@/components/CallToActionPage";

// Server Component - rendered on the server
export default function Home() {
  const serverTime = new Date().toISOString();

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Builders</h1>
          <p className="text-muted-foreground">
            Demonstrating Server vs Client Components with TanStack Query
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Server Component</CardTitle>
              <CardDescription>
                This page is rendered on the server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This page doesn&apos;t use TanStack Query and is rendered as a
                Server Component. It&apos;s fast, SEO-friendly, and has a
                smaller JavaScript bundle.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  🖥️ Server render time: {serverTime}
                </p>
              </div>
            </CardContent>
          </Card>
          <CallToActionPage />
          <RenderingDemo />
        </div>
      </div>
    </div>
  );
}
