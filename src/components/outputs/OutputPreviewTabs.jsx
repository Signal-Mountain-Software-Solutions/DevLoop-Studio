import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Copy, Download, CheckCircle2, Archive } from "lucide-react";

import { useBuilder } from "@/features/game-design-builder/builderContext";

 

export default function OutputPreviewTabs() {

  const {

    outputs,

    fileNames,

    enabledOutputKeys,

    copyOutput,

    downloadOutput,

    downloadAllOutputs,

    copiedKey,

  } = useBuilder();

 

  const available = useMemo(() => {

    const labels = {

      concept: "Concept",

      gdd: "Full GDD",

      lore: "Lore Pack",

      assets: "Asset Pack",

      technical: "Technical Spec",

      prompt: "AI Build Prompt",

      json: "JSON Data",

    };

 

    return (enabledOutputKeys || []).map((key) => ({

      key,

      label: labels[key] || key,

      content: outputs?.[key] ?? "",

    }));

  }, [enabledOutputKeys, outputs]);

 

  const initialTab = available.length > 0 ? available[0].key : "concept";

  const [tab, setTab] = useState(initialTab);

 

  useEffect(() => {

    if (!available.length) return;

 

    const currentStillExists = available.some((item) => item.key === tab);

 

    if (!currentStillExists) {

      setTab(available[0].key);

    }

  }, [available, tab]);

 

  if (!available.length) {

    return (

      <Card className="rounded-[28px] border-slate-200 shadow-sm">

        <CardHeader>

          <CardTitle>Output Studio Preview</CardTitle>

          <CardDescription>

            No outputs are currently enabled. Go to Output Studio and turn at least one output on.

          </CardDescription>

        </CardHeader>

      </Card>

    );

  }

 

  return (

    <Card className="rounded-[28px] border-slate-200 shadow-sm">

      <CardHeader>

        <CardTitle>Output Studio Preview</CardTitle>

        <CardDescription>

          Copy or download AI-ready outputs generated from your structured intake.

        </CardDescription>

      </CardHeader>

 

      <CardContent className="space-y-4">

        <div className="flex flex-wrap gap-2">

          <Button className="rounded-2xl" onClick={downloadAllOutputs}>

            <Archive className="mr-2 h-4 w-4" />

            Download Full Bundle

          </Button>

        </div>

 

        <Tabs value={tab} onValueChange={setTab} className="space-y-4">

          <ScrollArea className="w-full whitespace-nowrap rounded-2xl border bg-white p-1">

            <TabsList className="inline-flex h-auto w-max rounded-xl bg-transparent p-1">

              {available.map((item) => (

                <TabsTrigger

                  key={item.key}

                  value={item.key}

                  className="rounded-xl px-4 py-2"

                >

                  {item.label}

                </TabsTrigger>

              ))}

            </TabsList>

          </ScrollArea>

 

          {available.map((item) => (

            <TabsContent key={item.key} value={item.key} className="space-y-4">

              <div className="flex flex-wrap gap-2">

                <Button className="rounded-2xl" onClick={() => copyOutput(item.key)}>

                  {copiedKey === item.key ? (

                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copiedKey === item.key ? "Copied" : "Copy"}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => downloadOutput(item.key)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

 
              <div className="rounded-2xl border bg-slate-50">
                <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-slate-800">
                  {item.content}
                </pre>
              </div>

 
              <div className="text-xs text-slate-500">

                {fileNames?.[item.key] || `${item.key}.txt`}
              </div>
            </TabsContent>

          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}