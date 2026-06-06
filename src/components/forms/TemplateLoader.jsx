import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select";
import { BookMarked, DownloadCloud } from "lucide-react";
import { EXAMPLE_TEMPLATES } from "@/data/exampleTemplates";
import { useBuilder } from "@/features/game-design-builder/builderContext";

 
export default function TemplateLoader() {
  const { loadTemplate } = useBuilder();

 
  const templateList = useMemo(() => Object.values(EXAMPLE_TEMPLATES), []);
  const [selectedId, setSelectedId] = useState(templateList[0]?.id || "");
 

  const selectedTemplate = templateList.find((item) => item.id === selectedId);

 

  return (

    <Card className="rounded-[28px] border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-slate-700" />
          Example Templates
        </CardTitle>
        <CardDescription>
          Load a sample project to explore the workflow, outputs, and starter-engine structure faster.
        </CardDescription>
      </CardHeader>

 

      <CardContent className="space-y-5">

        <div>

          <Label className="mb-2 block">Choose a template</Label>

 

          <Select value={selectedId} onValueChange={setSelectedId}>

            <SelectTrigger className="rounded-2xl">

              <SelectValue placeholder="Select an example template" />

            </SelectTrigger>

 

            <SelectContent>

              {templateList.map((template) => (

                <SelectItem key={template.id} value={template.id}>

                  {template.label}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

 

        {selectedTemplate ? (

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex flex-wrap items-center gap-2">

              <Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">

                {selectedTemplate.label}

              </Badge>

 

              <Badge variant="secondary" className="rounded-full px-3 py-1">

                {selectedTemplate.genre.toUpperCase()}

              </Badge>

            </div>

 

            <div className="text-sm leading-6 text-slate-700">

              {selectedTemplate.summary}

            </div>

 

            <div className="text-sm text-slate-500">

              {selectedTemplate.description}

            </div>

 

            <Button

              onClick={() => loadTemplate(selectedTemplate.id)}

              className="rounded-2xl"

            >

              <DownloadCloud className="mr-2 h-4 w-4" />

              Load Example Project

            </Button>

          </div>

        ) : null}

      </CardContent>

    </Card>

  );

}