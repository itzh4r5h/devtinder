import {
  Award,
  CakeSlice,
  ChartNoAxesColumnIncreasing,
  FileText,
  SquarePen,
  Tags,
  User,
  VenetianMask,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TAG_COLORS, TAG_LABELS } from "@/constants/tag";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SOCIALS } from "@/constants/socials";

export const EditProfile = () => {
  const experiences = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Expert", value: "expert" },
  ];

  const [age, setAge] = useState("");

  const allowedAgeUpto100 = (e) => {
    const value = e.target.value;

    const number = Number(value);

    // Only allow integers from 11 to 100
    if (number <= 100 && value.length <= 3) {
      setAge(value);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="button-bg cursor-pointer rounded-full size-10"
            >
              <SquarePen className="size-5 text-foreground" />
            </Button>
          }
        />
        <DialogContent
          className="sm:max-w-sm card border border-white/10 text-foreground"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle className="text-xl px-1">Edit profile</DialogTitle>
            <DialogDescription className="text-base px-1">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="overflow-y-auto max-h-120 w-full no-scrollbar px-1 pb-3">
            {/* name */}
            <Field>
              <FieldLabel htmlFor="name" className="text-foreground text-base">
                Name
              </FieldLabel>
              <div className="relative">
                <User className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="name"
                  type="text"
                  placeholder="harsh"
                  autoComplete="off"
                  className="border-0 pl-9 text-foreground font-medium tracking-wide lowercase"
                />
              </div>
            </Field>
            {/* gender */}
            <Field>
              <FieldLabel
                htmlFor="gender"
                className="text-foreground text-base"
              >
                Gender
              </FieldLabel>
              <div className="relative">
                <VenetianMask className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <RadioGroup className="w-fit pl-11 flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="male"
                      id="male"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="male" className="cursor-pointer">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="female"
                      id="female"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="female" className="cursor-pointer">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="others"
                      id="others"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="others" className="cursor-pointer">
                      Others
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </Field>
            {/* age */}
            <Field>
              <FieldLabel htmlFor="age" className="text-foreground text-base">
                Age
              </FieldLabel>
              <div className="relative">
                <CakeSlice className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="age"
                  type="number"
                  placeholder="18"
                  autoComplete="off"
                  min={11}
                  max={100}
                  onChange={allowedAgeUpto100}
                  value={age}
                  className="border-0 pl-9 text-foreground font-medium tracking-wide lowercase [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none 11[&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            </Field>
            {/* role */}
            <Field>
              <FieldLabel htmlFor="role" className="text-foreground text-base">
                Role
              </FieldLabel>
              <div className="relative">
                <Award className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Input
                  id="role"
                  type="text"
                  placeholder="full stack developer"
                  autoComplete="off"
                  className="border-0 pl-9 text-foreground font-medium tracking-wide lowercase"
                />
              </div>
            </Field>
            {/* experience */}
            <Field>
              <FieldLabel
                htmlFor="experience"
                className="text-foreground text-base"
              >
                Experience
              </FieldLabel>
              <div className="relative">
                <ChartNoAxesColumnIncreasing className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Select
                  items={experiences}
                  defaultValue="intermediate"
                  className="w-full"
                >
                  <SelectTrigger className="w-full pl-9 border-white/10 border-0 border-solid">
                    <SelectValue className="font-medium" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="card text-foreground border border-white/10"
                  >
                    <SelectGroup>
                      {experiences.map((exp) => (
                        <SelectItem
                          key={exp.value}
                          value={exp.value}
                          className="cursor-pointer dropdown-item tracking-wider font-medium"
                        >
                          {exp.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </Field>
            {/* description */}
            <Field>
              <FieldLabel
                htmlFor="description"
                className="text-foreground text-base"
              >
                Description
              </FieldLabel>
              <div className="relative">
                <FileText className="top-5 -translate-y-1/2 size-4 text-foreground absolute left-3" />
                <Textarea
                  id="description"
                  placeholder="about you..."
                  autoComplete="off"
                  className="border-0 pl-9 text-foreground font-medium tracking-wide lowercase max-h-70 scrollbar-none"
                  maxLength={500}
                />
              </div>
            </Field>
            {/* tags */}
            <Field>
              <FieldLabel htmlFor="tags" className="text-foreground text-base">
                Tags
              </FieldLabel>
              <div className="relative">
                <TagsInput />
              </div>
            </Field>
            {/* socials */}
            <Field>
              <FieldLabel
                htmlFor="socials"
                className="text-foreground text-base"
              >
                Socials
              </FieldLabel>
              {SOCIALS.map(({ Icon, id, placeholder }, index) => {
                return (
                  <SocialInput
                    key={id + index}
                    Icon={Icon}
                    placeholder={placeholder}
                  />
                );
              })}
            </Field>
          </FieldGroup>

          <DialogFooter className="bg-transparent grid grid-cols-2 gap-5">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent rounded-full text-base text-foreground border-white/10 border-solid cursor-pointer capitalize"
                >
                  cancel
                </Button>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="button-bg font-bold text-base cursor-pointer capitalize rounded-full"
            >
              save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

const SocialInput = ({ Icon, id, placeholder }) => {
  return (
    <div className="relative">
      <Icon className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
      <Input
        id={id}
        type="url"
        placeholder={placeholder}
        autoComplete="off"
        className="border-0 pl-9 text-foreground font-medium tracking-wide lowercase"
      />
    </div>
  );
};

const TagsInput = () => {
  const anchor = useComboboxAnchor();
  const skills = Object.values(TAG_LABELS);
  return (
    <Combobox multiple autoHighlight items={skills}>
      <ComboboxChips ref={anchor} className="w-full border-0 gap-2">
        <Tags className=" size-4 text-foreground" />

        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value, index) => (
                <ComboboxChip
                  key={value + index}
                  className={`text-foreground ${TAG_COLORS[value.toLowerCase()] ?? "bg-neutral-500 text-foreground"} text-sm h-7`}
                >
                  {TAG_LABELS[value.toLowerCase()] ?? value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="add tag..." />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor} className="card text-foreground">
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item, index) => (
            <ComboboxItem
              key={item + index}
              value={item}
              className="cursor-pointer dropdown-item"
            >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
