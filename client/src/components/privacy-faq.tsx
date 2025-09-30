import { Shield, HelpCircle, Lock, Code, Network } from "lucide-react";
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
              <p>There are several ways to confirm this yourself:</p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-slate-900">1. Browser Network Monitor</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Press F12 to open Developer Tools</li>
                    <li>Go to the "Network" tab</li>
                    <li>Upload your file and analyze the traffic</li>
                    <li>You'll see only static asset loads (HTML, CSS, JS)—no data uploads</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">2. Offline Test</p>
                  <p className="text-sm mt-1">
                    Load the page, then disconnect from the internet (airplane mode). 
                    The analysis will still work perfectly because everything runs locally.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">3. Review the Code</p>
                  <p className="text-sm mt-1">
                    This is an open-source project. You can review the source code to confirm 
                    that all processing happens in client-side JavaScript files.
                  </p>
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
                Yes. The complete source code is publicly available.
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
              <p className="text-sm">
                You can review, audit, or even run a modified version locally if you prefer.
              </p>
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

