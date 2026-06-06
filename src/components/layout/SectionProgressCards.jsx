import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/features/game-design-builder/builderContext";

export default function SectionProgressCards() {
  const { sectionCompletion, setActiveTab } = useBuilder();

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {sectionCompletion.map((section) => {
        const Icon = section.icon;

        return (
          <Card key={section.key} className="rounded-[28px] border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-slate-700" />
                    {section.title}
                  </CardTitle>
                  <CardDescription className="mt-1">{section.description}</CardDescription>
                </div>

                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {section.percent}%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all"
                  style={{ width: `${section.percent}%` }}
                />
              </div>

              <div className="text-sm text-slate-600">
                {section.completed} of {section.total} fields completed
              </div>

              <Button
                variant="outline"
                className="w-full rounded-2xl"
                onClick={() => setActiveTab(section.key)}
              >
                Open Section
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}