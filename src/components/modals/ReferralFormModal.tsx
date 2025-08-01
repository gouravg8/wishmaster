import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import schema from "@/schema/inviteUserSchema";
import { useQuery } from "@tanstack/react-query";
import { createNewReferral, CreateNewReferralType } from "@/services/ReferalService";

interface ReferralFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralFormModal = ({ open, onOpenChange }: ReferralFormModalProps) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      model: "trueflex",
      phone: "",
      pan_number: "",
      aadhaar_number: "",
    }
  })

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["inviteUser"],
    queryFn: async () => await createNewReferral(form.getValues() as CreateNewReferralType),
    enabled: false
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    refetch();
  };

  useEffect(() => {
    if (!isError) {
      form.reset();
      onOpenChange(false);
    }
  }, [isError])

  const models = [
    {
      name: "TrueFlex",
      description: "Flexible working hours",
      value: "trueflex"
    },
    {
      name: "Kirana",
      description: "Local deliveries",
      value: "kirana"
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-md mx-auto max-h-[95vh] overflow-y-auto bg-white">
        <DialogHeader className="flex flex-col items-center pb-4">
          <DialogTitle className="text-xl font-semibold">Refer a Friend</DialogTitle>
          <p className="text-sm text-muted-foreground">Fill in the details to make a referral</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                  1
                </div>
                <h3 className="font-medium">Personal Information</h3>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mobile Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 10-digit mobile number"
                        {...field}
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Work Preference */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                  2
                </div>
                <h3 className="font-medium">Work Preference</h3>
              </div>

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select Model <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {models.map((item) => (
                          <Card
                            key={item.value}
                            className={`p-3 cursor-pointer transition-all ${field.value === item.value
                              ? "ring-2 ring-blue-600 bg-blue-50"
                              : "hover:bg-gray-50"
                              }`}
                            onClick={() => field.onChange(item.value)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Document Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                  3
                </div>
                <h3 className="font-medium">Document Details</h3>
              </div>

              <FormField
                control={form.control}
                name="pan_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      PAN Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDE1234F" maxLength={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaar_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Aadhaar Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="1234-5678-9012" maxLength={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button isLoading={isLoading} disabled={!form.formState.isValid} className="flex-1 bg-blue-600 hover:bg-blue-700" type="submit">
                Submit Referral
              </Button>
            </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
};

export default ReferralFormModal;