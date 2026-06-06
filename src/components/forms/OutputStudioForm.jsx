import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OUTPUT_TOGGLES } from "@/data/outputToggles";
import { useBuilder } from "@/features/game-design-builder/builderContext";

export default function OutputStudioForm() {
  const { data, setField } = useBuilder();
  const studio = data.outputStudio;

  return (
    <Card className="rounded-[28px] border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Output Studio</CardTitle>
        <CardDescription>
          Configure how your AI-ready exports should be framed, formatted, and generated.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <Label className="mb-2 block">Tone</Label>
            <Input
              value={studio.tone}
              onChange={(e) => setField("outputStudio.tone", e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block">Detail Level</Label>
            <Input
              value={studio.detailLevel}
              onChange={(e) => setField("outputStudio.detailLevel", e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block">Preferred Format</Label>
            <Input
              value={studio.preferredFormat}
              onChange={(e) => setField("outputStudio.preferredFormat", e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <div>
            <Label className="mb-2 block">AI Partner</Label>
            <Input
              value={studio.aiPartner}
              onChange={(e) => setField("outputStudio.aiPartner", e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <div className="lg:col-span-2">
            <Label className="mb-2 block">Coding Style</Label>
            <Input
              value={studio.codingStyle}
              onChange={(e) => setField("outputStudio.codingStyle", e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <div className="lg:col-span-2">
            <Label className="mb-2 block">Additional Instructions</Label>
            <Textarea
              value={studio.additionalInstructions}
              onChange={(e) => setField("outputStudio.additionalInstructions", e.target.value)}
              className="min-h-[140px] rounded-2xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="block">Enabled Outputs</Label>

          <div className="grid gap-3 md:grid-cols-2">
            {OUTPUT_TOGGLES.map((toggle) => (
              <label
                key={toggle.key}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
              >
                <Checkbox
                  checked={!!studio[toggle.key]}
                  onCheckedChange={(checked) => setField(`outputStudio.${toggle.key}`, !!checked)}
                />
                <span className="text-sm font-medium">{toggle.label}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
