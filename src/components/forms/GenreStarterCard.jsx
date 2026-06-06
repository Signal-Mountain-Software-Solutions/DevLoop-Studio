import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wand2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ENGINE_STARTERS } from "@/data/engineStarters";
import { useBuilder } from "@/features/game-design-builder/builderContext";

export default function GenreStarterCard() {
  const { data, applyGenreSuggestions } = useBuilder();
  const starter = ENGINE_STARTERS[data.meta.genre];

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-violet-600" />
          {starter.label} Starter Pattern
        </CardTitle>
        <CardDescription>{starter.promptHint}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
            Core Loops
          </Label>
          <div className="flex flex-wrap gap-2">
            {starter.coreLoops.map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
            Reusable Modules
          </Label>
          <div className="flex flex-wrap gap-2">
            {starter.engineFit.map((item) => (
              <Badge
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-slate-800 hover:bg-slate-100"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <Button onClick={applyGenreSuggestions} className="rounded-2xl">
          <Wand2 className="mr-2 h-4 w-4" />
          Apply Genre Suggestions
        </Button>
      </CardContent>
    </Card>
  );
}
