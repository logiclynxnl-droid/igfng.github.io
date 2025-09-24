import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { RegistrationPayload, RegistrationResponse } from "@shared/api";
import { toast } from "sonner";
import { upcomingEvent } from "@/data/content";

const schema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email(),
    phone: z.string().optional(),
    organization: z.string().optional(),
    role: z.enum(
      ["student", "teacher", "parent", "volunteer", "partner", "other"],
      { required_error: "Select a role" },
    ),
    interest: z.enum(["event", "volunteer", "partner"]).optional(),
    student1Name: z.string().optional(),
    student1Email: z.string().email().optional(),
    student2Name: z.string().optional(),
    student2Email: z.string().email().optional(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isEvent = !data.interest || data.interest === "event";
    if (isEvent) {
      if (!data.student1Name || data.student1Name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["student1Name"],
          message: "Student 1 name is required",
        });
      }
      if (!data.student1Email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["student1Email"],
          message: "Student 1 email is required",
        });
      }
      if (!data.student2Name || data.student2Name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["student2Name"],
          message: "Student 2 name is required",
        });
      }
      if (!data.student2Email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["student2Email"],
          message: "Student 2 email is required",
        });
      }
    }
  });

export function RegistrationForm({
  interest,
}: {
  interest?: "event" | "volunteer" | "partner";
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      role: "other",
      interest,
      student1Name: "",
      student1Email: "",
      student2Name: "",
      student2Email: "",
      notes: "",
    },
  });

  const { isBeforeStart, isAfterEnd } = useMemo(() => {
    const now = new Date();
    const start = new Date(upcomingEvent.registrationStart);
    const end = new Date(upcomingEvent.registrationEnd);
    return {
      isBeforeStart: now < start,
      isAfterEnd: now > end,
    };
  }, []);

  async function onSubmit(values: z.infer<typeof schema>) {
    if (
      (isBeforeStart || isAfterEnd) &&
      (values.interest === "event" || !values.interest)
    ) {
      toast.warning(
        `Registration is only open from ${upcomingEvent.registrationWindow}.`,
      );
      return;
    }

    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    const subject =
      values.interest === "volunteer"
        ? "Volunteer Intake"
        : values.interest === "partner"
          ? "Strategy Partner Interest"
          : "IMT 2025 Registration";

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "Igiehon Foundation Website",
        reply_to: values.email,
        ...values,
      } satisfies Record<string, unknown>),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    if (data?.success) {
      toast.success("Thank you! Your submission was received.");
      form.reset();
    } else {
      toast.error(data?.message || "Submission failed");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+234..." {...field} />
              </FormControl>
              <FormDescription>
                WhatsApp preferred if available.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School / Organization</FormLabel>
              <FormControl>
                <Input placeholder="Your school or organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose interest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="event">IMT 2025 Event</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="partner">Strategy Partner</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Students (Event only) */}
        {(!form.getValues("interest") ||
          form.getValues("interest") === "event") && (
          <>
            <div className="md:col-span-2 mt-2">
              <h4 className="font-semibold">
                Students Representing the School
              </h4>
              <p className="text-sm text-muted-foreground">
                Provide names and emails of the two students.
              </p>
            </div>
            <FormField
              control={form.control}
              name="student1Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 1 Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student 1 full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="student1Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 1 Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="student1@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="student2Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 2 Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student 2 full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="student2Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 2 Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="student2@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Tell us more..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="md:col-span-2 flex items-center justify-between gap-4">
          {isBeforeStart || isAfterEnd ? (
            <p className="text-sm text-amber-600">
              Registration window: {upcomingEvent.registrationWindow}. You can
              still submit interest for volunteering or partnerships.
            </p>
          ) : (
            <div />
          )}
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
