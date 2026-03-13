"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "It semms to short to be name ")
    .max(50, "It semms to long to be name"),
  lastName: z
    .string()
    .min(3, "It semms to short to be last name ")
    .max(50, "It semms to long to be last name"),
  emailAddress: z.email(),
  messageFromGuest: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(250, "Description must be at most 250 characters."),
});

export function ContactForm() {
  const formCardRef = React.useRef<HTMLDivElement | null>(null);
  const clearErrorsTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      messageFromGuest: "",
    },
    mode: "onSubmit",
  });

  const scheduleErrorsClear = React.useCallback(() => {
    if (clearErrorsTimeoutRef.current) {
      clearTimeout(clearErrorsTimeoutRef.current);
    }

    clearErrorsTimeoutRef.current = setTimeout(() => {
      form.clearErrors();
    }, 4000);
  }, [form]);

  React.useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      scheduleErrorsClear();
    }
  }, [form.formState.errors, scheduleErrorsClear]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const cardNode = formCardRef.current;

      if (!cardNode || cardNode.contains(event.target as Node)) {
        return;
      }

      if (clearErrorsTimeoutRef.current) {
        clearTimeout(clearErrorsTimeoutRef.current);
      }

      form.clearErrors();
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      if (clearErrorsTimeoutRef.current) {
        clearTimeout(clearErrorsTimeoutRef.current);
      }
    };
  }, [form]);

  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    toast("The form has been submitted successfully ", {
      description: " We will respond to you message soon , Thanks",
      position: "top-right",
    });

    form.reset();
  }

  return (
    // Classic shadcn card surface (token-driven colors)
    <Card
      ref={formCardRef}
      className=" ring-0 lg:w-full sm:max-w-md bg-card text-card-foreground shadow-none rounded-[0.2rem] gap-0 py-0"
    >
      <CardContent className="px-0">
        <form id="main-contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} >
                  <FieldLabel className="text-xs " htmlFor="form-first-name">
                    First Name
                  </FieldLabel>
                  <Input
                    className="  focus-visible:border-[0.01rem] focus-visible:ring-1     text-xs rounded-[0.2rem]  aria-invalid:border-2 aria-invalid:ring-0 "
                    {...field}
                    id="form-first-name"
                    aria-invalid={fieldState.invalid}
                    // More standard contact-form placeholder
                    placeholder="John"
                    autoComplete="off"
                  
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-last-name" className="text-xs ">
                    Last Name
                  </FieldLabel>
                  <Input
                    className="  focus-visible:border-[0.01rem] focus-visible:ring-1     text-xs rounded-[0.2rem] aria-invalid:border-2 aria-invalid:ring-0 "
                    {...field}
                    id="form-last-name"
                    aria-invalid={fieldState.invalid}
                    // More standard contact-form placeholder
                    placeholder="Doe"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="emailAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email-address" className="text-xs ">
                    Email Address
                  </FieldLabel>
                  <Input
                    className="  focus-visible:border-[0.01rem] focus-visible:ring-1     text-xs rounded-[0.2rem]  aria-invalid:border-2 aria-invalid:ring-0 "
                    {...field}
                    id="form-email-address"
                    // Keep native browser email affordances/styles
                    type="email"
                    aria-invalid={fieldState.invalid}
                    // More standard contact-form placeholder
                    placeholder="john@company.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="messageFromGuest"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-message-fromGuest"
                    className="text-xs "
                  >
                    Message
                  </FieldLabel>

                  <InputGroup className="  text-xs rounded-[0.2rem] has-[[data-slot=input-group-control]:focus-visible]:ring-1 ">
                    <InputGroupTextarea
                      {...field}
                      id="form-message-fromGuest"
                      // More standard contact-form copy
                      placeholder="Please tell us about your project..."
                      rows={14}
                      className="text-xs max-h-14 resize-none   focus-visible:ring-1 focus-visible:border-0 aria-invalid:border-0 aria-invalid:ring-0 "
                      aria-invalid={fieldState.invalid}
                    />
                                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError 
                      className="text-xs opacity-50 text-black "
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
     
      <CardFooter className=" gap-2 bg-card border-t-0 p-0 pt-4">
       
           <Button type="submit" variant="outline" form="main-contact-form"  className="text-xs p-2 rounded-[0.2rem]">
            Submit
          </Button>
       
      </CardFooter>
    </Card>
  );
}
