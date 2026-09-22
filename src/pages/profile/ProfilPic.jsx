import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useMemo, useState } from "react";
import { profilePicValidator } from "@/joi-validators/profilePicValidator";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useValidationErrorToast } from "@/hooks/useValidationErrorToast";
import { Check, X } from "lucide-react";
import { updateProfilePic } from "@/store/thunks/userThunk";

export const ProfilPic = ({ user, uploaded, uploading }) => {
  const schema = useMemo(() => {
    return profilePicValidator()
  }, [])

  const { handleSubmit, control, watch, formState: { errors } } = useForm({ resolver: joiResolver(schema), reValidateMode: 'onSubmit' })
  const dispatch = useDispatch()
  useValidationErrorToast(errors)

  const selectedPic = watch('pic')
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!selectedPic) {
      return
    }

    const picUrl = URL.createObjectURL(selectedPic)
    setPreviewUrl(picUrl)


    return () => {
      URL.revokeObjectURL(picUrl)
    }

  }, [selectedPic, user.profilePic.url])

  useEffect(() => {
    if (uploaded) {
      setPreviewUrl(null)
    }
  }, [uploaded])

  const cancel = () => {
    setPreviewUrl(null)
  }
  return (
    <Avatar className="size-80 relative">
      <AvatarImage src={previewUrl || user.profilePic.url} alt="LR" />
      <AvatarFallback className="text-9xl font-bold">{user.name[0].toUpperCase()}</AvatarFallback>
      {previewUrl && !uploading ? <div className="absolute -right-12 bottom-0 flex gap-4 items-center text-foreground"  >
        <Button
          onClick={handleSubmit((data) => dispatch(updateProfilePic(data)))}
          variant="outline"
          className="button-bg cursor-pointer rounded-full size-10"
        >
          <Check className="size-5" />
        </Button>
        <Button
          onClick={cancel}
          variant="outline"
          className="button-bg cursor-pointer rounded-full size-10"
        >
          <X className="size-5" />
        </Button>
      </div> : !uploading ? <span className="absolute right-2 bottom-0"><ChooseFile control={control} /></span> : <span className="absolute -right-8 bottom-0 text-foreground text-xl">uploading...</span>}
    </Avatar>
  )
}

const ChooseFile = ({ control }) => {
  return (
    <>
      <label htmlFor="profilePic"
        className={cn(buttonVariants({ variant: 'outline', size: 'default', className: "button-bg cursor-pointer rounded-full size-10" }))}
      >
        <SquarePen className="size-5 text-foreground" />
      </label>
      <Controller
        name="pic"
        control={control}
        render={({ field }) => (
          <input
            id="profilePic"
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              field.onChange(file); // ← single File, not FileList
            }}
          />
        )}
      />
    </>
  );
};
