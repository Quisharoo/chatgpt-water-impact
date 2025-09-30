import { Shield, Lock, Code } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PrivacyBanner() {
  return (
    <Alert className="bg-green-50 border-green-200 mb-6">
      <Lock className="h-4 w-4 text-green-600" />
      <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-green-900 font-medium">
          🔒 Your privacy is protected. This app analyzes your data entirely within your browser—nothing is ever uploaded or stored on a server.
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="link" 
              className="text-green-700 hover:text-green-900 underline p-0 h-auto font-semibold"
            >
              Learn more
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Shield className="w-6 h-6 text-green-600" />
                Your Privacy & Data Security
              </DialogTitle>
              <DialogDescription className="text-left space-y-4 pt-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-semibold text-slate-900 text-base mb-2">
                      100% Client-Side Processing
                    </h3>
                    <p className="text-slate-600">
                      Your ChatGPT conversation data never leaves your device. All file parsing, 
                      analysis, and calculations happen directly in your browser using JavaScript. 
                      There are no server uploads, no external API calls, and no data transmission 
                      beyond loading this web page.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-slate-900 text-base mb-2">
                      How It Works
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>
                        <strong>File Upload:</strong> When you select a file, it's read directly 
                        into your browser's memory—not sent anywhere.
                      </li>
                      <li>
                        <strong>Processing:</strong> All parsing, calculations, and analysis run 
                        in your browser using JavaScript libraries like JSZip.
                      </li>
                      <li>
                        <strong>Results:</strong> Charts and statistics are generated locally 
                        and displayed instantly.
                      </li>
                      <li>
                        <strong>No Storage:</strong> Once you close or refresh this page, all 
                        data is cleared from memory.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-slate-900 text-base mb-2">
                      Technical Verification
                    </h3>
                    <p className="text-slate-600 mb-2">
                      You can verify this yourself:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>
                        <strong>Browser DevTools:</strong> Open your browser's Network tab 
                        (F12 → Network) before uploading. You'll see no POST/PUT requests 
                        containing your data—only the initial page load.
                      </li>
                      <li>
                        <strong>Open Source:</strong> This application is open source. You can 
                        review the code to confirm no server-side data processing occurs.
                      </li>
                      <li>
                        <strong>Works Offline:</strong> After the page loads, you can disconnect 
                        from the internet and the analysis will still work perfectly.
                      </li>
                    </ul>
                  </section>

                  <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base mb-1">
                          Open Source
                        </h3>
                        <p className="text-slate-600 text-sm">
                          The complete source code is available for inspection. All data processing 
                          logic is contained in client-side TypeScript files that run in your browser.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="font-semibold text-slate-900 text-base mb-2">
                      What We Don't Collect
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Your ChatGPT conversation content</li>
                      <li>File names or metadata</li>
                      <li>Analysis results or statistics</li>
                      <li>Any personally identifiable information</li>
                      <li>Usage patterns or analytics (beyond basic page views)</li>
                    </ul>
                  </section>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <p className="text-green-900 text-sm">
                      <strong>Bottom line:</strong> Your data is yours. We built this tool to 
                      provide insights without compromising your privacy. Everything happens 
                      locally, in your control.
                    </p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </AlertDescription>
    </Alert>
  );
}

