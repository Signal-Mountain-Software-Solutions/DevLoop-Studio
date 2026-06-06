import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getNestedValue } from "@/lib/nestedData";
import { useBuilder } from "@/features/game-design-builder/builderContext";
import { Input } from "@/components/ui/input";

export default function SectionForm({ section }) {
  const { data, setField } = useBuilder();

return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {section.fields.map((f) => {
        const value = getNestedValue(data, f.path) || "";

        return (
          <div key={f.path} className={f.textarea ? "lg:col-span-2" : ""}>
            <Label className="mb-2 block text-sm font-medium">{f.label}</Label>

            {f.textarea ? (
              <Textarea
                value={value}
                onChange={(e) => setField(f.path, e.target.value)}
                placeholder={f.placeholder}
                className="min-h-[120px] rounded-2xl"
              />
            ) : (
              <Input
                value={value}
                onChange={(e) => setField(f.path, e.target.value)}
                placeholder={f.placeholder}
                className="rounded-2xl"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
``


