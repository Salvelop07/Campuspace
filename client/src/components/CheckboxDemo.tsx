import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo({
  text,
  value,
  name,
  handleChange,
  title,
}: {
  text: string;
  value: string;
  name: string;
  title?: string;
  handleChange: (e: boolean, value: string) => void;
}) {
  return (
    <div className="flex items-center space-x-2 m-2 text-lg">
      <Checkbox
        id={value}
        value={value}
        onCheckedChange={(e: boolean) => handleChange(e, value)}
        name={name}
      />
      <label
        htmlFor={value}
        title={title}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}
