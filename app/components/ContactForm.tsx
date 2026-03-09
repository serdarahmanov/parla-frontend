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

  function onSubmit(data: z.infer<typeof contactFormSchema>) {
    toast("The form has been submitted successfully ", {
      description: " We will respond to you message soon , Thanks",
      position: "top-right",
    });
  }

  return (
    // Classic shadcn card surface (token-driven colors)
    <Card className="ring-1 lg:w-full sm:max-w-md bg-card text-card-foreground  shadow-sm rounded-[0.2rem] ">
      <CardContent>
        <form id="main-contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
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
                    <FieldError errors={[fieldState.error]} />
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
                    <FieldError errors={[fieldState.error]} />
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
                    <FieldError errors={[fieldState.error]} />
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
                    <InputGroupAddon align="block-end">
                      <InputGroupText className=" text-xs">
                        {field.value.length}/250 characters
                      </InputGroupText>
                    </InputGroupAddon>
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
      {/* Classic shadcn footer actions with balanced spacing */}
      <CardFooter className="justify-end gap-2 bg-card border-t-0">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          {/* Filled primary action to match default shadcn style */}
          <Button type="submit" form="main-contact-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
