/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnyZodObject } from "zod";

import { Form } from "@/components/ui/form";
import { ReactNode, useEffect } from "react";

type TProps = {
  onSubmit: any;
  children: ReactNode;
  schema?: AnyZodObject;
  defaultValues?: Record<string, any>;
};

export const CustomForm = ({
  onSubmit,
  children,
  schema,
  defaultValues,
}: TProps) => {
  const formConfigure: Record<string, any> = {};
  if (schema) formConfigure["resolver"] = zodResolver(schema);
  if (defaultValues) formConfigure["defaultValues"] = defaultValues;

  const form = useForm({ ...formConfigure });
  const { handleSubmit, reset } = form;
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);
  const handleOnSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
        {children}
      </form>
    </Form>
  );
};
