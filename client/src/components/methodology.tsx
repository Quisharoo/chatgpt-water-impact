import { Info, BookOpen, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function Methodology() {
  return (
    <Card className="border border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">About Our Methodology</h3>
            <p className="text-slate-600 text-sm">Understanding how we calculate water consumption</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="calculation">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>How is water consumption calculated?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p>
                Our analysis estimates <strong>0.5 liters of water per query</strong>. This figure accounts for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Data center cooling:</strong> Water used to cool servers running AI models</li>
                <li><strong>Power generation:</strong> Water consumption at power plants generating electricity</li>
                <li><strong>Infrastructure:</strong> Upstream water usage in the computational pipeline</li>
              </ul>
              <p className="text-sm italic">
                This estimate is based on research from data center water usage studies and AI computational 
                requirements. The actual water footprint varies by data center location, cooling technology, 
                and energy grid composition.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sources">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>What are the data sources?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p>Our calculations draw from several research areas:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Academic research on data center water consumption and PUE (Power Usage Effectiveness)</li>
                <li>Studies on large language model computational requirements and energy usage</li>
                <li>Industry reports on data center cooling systems and water efficiency</li>
                <li>Energy grid water intensity data from various regions</li>
              </ul>
              <p className="text-sm">
                Key references include research from Google, Microsoft, and academic institutions studying 
                AI environmental impacts.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitations">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>What are the limitations?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p>This tool provides estimates with several important limitations:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Averages:</strong> We use average values that don't account for specific data center locations or infrastructure</li>
                <li><strong>Query complexity:</strong> All queries are weighted equally, though some require more computation than others</li>
                <li><strong>Model versions:</strong> Different ChatGPT models (GPT-3.5 vs GPT-4) have different resource requirements</li>
                <li><strong>Incomplete scope:</strong> We don't account for all aspects of the AI lifecycle (training, model updates, etc.)</li>
                <li><strong>Temporal changes:</strong> Data center efficiency improves over time, but we use a static estimate</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> This is an educational tool designed to raise awareness about AI's 
                  environmental footprint, not a precise lifecycle analysis. Use these estimates as directional 
                  indicators rather than exact measurements.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="comparisons">
            <AccordionTrigger className="text-slate-700 hover:text-slate-900">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>How are the comparisons calculated?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 space-y-3">
              <p>We convert water consumption into relatable everyday equivalents:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Shower time:</strong> Based on 13.5L/minute (typical shower head flow rate)</li>
                <li><strong>Coffee cups:</strong> 150ml per cup (standard coffee serving)</li>
                <li><strong>Car washes:</strong> 40L per wash (average water usage for automated car wash)</li>
                <li><strong>Water bottles:</strong> 500ml bottles (standard single-serve size)</li>
              </ul>
              <p className="text-sm">
                These comparisons help contextualize abstract water quantities into familiar daily activities.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
