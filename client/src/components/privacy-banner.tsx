import { Shield, Lock, Code, ExternalLink, Info } from "lucide-react";
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
              variant="outline" 
              size="sm"
              className="bg-white border-green-300 text-green-700 hover:bg-green-50 hover:text-green-900 hover:border-green-400 font-semibold shadow-sm min-h-[44px] md:min-h-0 active:scale-[0.98] transition-transform touch-manipulation"
            >
              <Info className="w-4 h-4 mr-1.5" />
              Learn more
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Shield className="w-6 h-6 text-green-600" />
                Your Privacy & Data Security
              </DialogTitle>
              <DialogDescription asChild>
                <div className="text-left space-y-4 pt-4 text-sm text-muted-foreground">
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

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mt-4">
                    <p className="text-blue-900 text-sm font-semibold mb-2">
                      Want to verify this yourself?
                    </p>
                    <p className="text-blue-800 text-sm mb-3">
                      Check our <strong>Privacy & Security FAQ</strong> below for detailed verification 
                      methods, offline testing instructions, and open-source code links.
                    </p>
                    <a 
                      href="https://github.com/Quisharoo/chatgpt-water-impact" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      <Code className="w-4 h-4" />
                      View source code on GitHub
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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

