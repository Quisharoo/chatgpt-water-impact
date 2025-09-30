import { Shield, HelpCircle, Lock, Code, Network, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyFAQ() {
  return (
    <Card className="border border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="text-green-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Privacy & Security FAQ</h3>
            <p className="text-slate-600 text-sm">Your questions about data security answered</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="data-sent">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Is my ChatGPT data sent to a server?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p className="font-semibold text-slate-900">
                No. Files never leave your device; everything is handled in your browser.
              </p>
              <p>
                When you upload a file, it's read directly into your browser's memory using JavaScript. 
                All parsing, calculations, and visualizations happen client-side. There are no server 
                uploads, no API calls to external services, and no data transmission whatsoever.
              </p>
              <div className="bg-green-50 border border-green-200 rounded p-3 mt-2">
                <p className="text-sm text-green-900">
                  <strong>Verification:</strong> Open your browser's DevTools (F12) and check the 
                  Network tab while uploading. You'll see no POST/PUT requests with your data.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-stored">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Is my data stored anywhere?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p className="font-semibold text-slate-900">
                No. Your data is only in your browser's temporary memory while you're using the app.
              </p>
              <p>
                The data exists in RAM while you're on the page and is completely cleared when you:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Close the browser tab</li>
                <li>Refresh the page</li>
                <li>Navigate away from the site</li>
              </ul>
              <p className="text-sm">
                We don't use cookies, local storage, or any persistence mechanisms for your conversation data.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-verify">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4" />
                <span>How can I verify no data is transmitted?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p className="font-semibold text-slate-900 mb-3">You don't have to trust us—verify it yourself!</p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Method 1: Check Your Network Activity
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm mt-2">
                    <li>Right-click on this page and select <strong>"Inspect"</strong> (or press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">F12</kbd>)</li>
                    <li>Click the <strong>"Network"</strong> tab in the developer tools</li>
                    <li>Click the <strong>"XHR"</strong> or <strong>"Fetch"</strong> filter to see API requests</li>
                    <li>Upload your ChatGPT file and watch the requests in real-time</li>
                    <li><strong>Expected result:</strong> You'll see ZERO POST/PUT/PATCH requests containing your data</li>
                  </ol>
                  <div className="mt-3 p-2 bg-white rounded border border-blue-300">
                    <p className="text-xs font-mono text-slate-700">
                      🔍 What you'll see: Only static files like <code className="bg-slate-100 px-1 rounded">index.js</code>, <code className="bg-slate-100 px-1 rounded">index.css</code>
                    </p>
                    <p className="text-xs font-mono text-slate-700 mt-1">
                      ❌ What you WON'T see: Any <code className="bg-red-100 px-1 rounded">POST /upload</code> or API calls with file data
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-2">✈️ Method 2: Offline Test</p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm mt-2">
                    <li>Load this page in your browser (let it fully load)</li>
                    <li>Enable <strong>airplane mode</strong> or disconnect your WiFi/ethernet</li>
                    <li>Try uploading and analyzing your ChatGPT file</li>
                    <li><strong>It still works!</strong> This proves everything runs locally</li>
                  </ol>
                  <p className="text-xs text-purple-900 mt-2 italic">
                    ✅ If it required a server, the analysis would fail with "No internet connection"
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-2">💻 Method 3: Inspect the Source Code</p>
                  <p className="text-sm mb-2">
                    This app is 100% open source. Review the actual code that processes your files:
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="https://github.com/Quisharoo/chatgpt-water-impact/blob/main/client/src/lib/conversation-parser.ts" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      <Code className="w-3.5 h-3.5" />
                      conversation-parser.ts - File parsing logic
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://github.com/Quisharoo/chatgpt-water-impact/blob/main/client/src/lib/water-calculator.ts" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      <Code className="w-3.5 h-3.5" />
                      water-calculator.ts - Calculation logic
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://github.com/Quisharoo/chatgpt-water-impact" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View full repository on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="open-source">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Is this application open source?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p className="font-semibold text-slate-900">
                Yes! The complete source code is publicly available on GitHub.
              </p>
              <p>
                Being open source means anyone can inspect the code to verify:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All file processing happens in <code className="text-sm bg-slate-100 px-1 rounded">conversation-parser.ts</code></li>
                <li>All calculations are done in <code className="text-sm bg-slate-100 px-1 rounded">water-calculator.ts</code></li>
                <li>No server-side endpoints handle user data</li>
                <li>No analytics or tracking of conversation content</li>
              </ul>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-3">
                <p className="text-sm font-semibold text-slate-900 mb-2">Explore the Code:</p>
                <div className="space-y-2">
                  <a 
                    href="https://github.com/Quisharoo/chatgpt-water-impact" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
                  >
                    <Code className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-600">
                    You can review, audit, fork, or run a modified version locally if you prefer.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="what-collected">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>What information do you collect?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p className="font-semibold text-slate-900">
                We collect no user data from the analysis tool.
              </p>
              <p>The only data collection is standard web hosting analytics that may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Page views (not linked to you personally)</li>
                <li>Browser type and general geographic region</li>
                <li>Basic performance metrics</li>
              </ul>
              <p className="font-semibold mt-3">We explicitly do NOT collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your uploaded files or their contents</li>
                <li>Conversation data or metadata</li>
                <li>Analysis results or water consumption statistics</li>
                <li>Any personally identifiable information beyond standard web logs</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="trust">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Why should I trust this tool with my data?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p>
                You shouldn't have to trust us—you can verify it yourself:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Technical Verification:</strong> Use browser DevTools to confirm 
                  no data transmission occurs
                </li>
                <li>
                  <strong>Code Transparency:</strong> Review the open-source code to see 
                  exactly how files are processed
                </li>
                <li>
                  <strong>Offline Capability:</strong> Test the app offline to prove it works 
                  without internet connectivity
                </li>
                <li>
                  <strong>No Server Logic:</strong> There's no backend code that could process 
                  or store your conversations
                </li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                <p className="text-sm text-blue-900">
                  <strong>By design:</strong> We built this as a purely client-side application 
                  specifically to eliminate any privacy concerns. Your data never needs to leave 
                  your device for the analysis to work.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

