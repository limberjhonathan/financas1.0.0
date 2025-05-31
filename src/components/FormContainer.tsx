import Form from "next/form";

interface FormContainerProps {
  children: React.ReactNode;
  form: (formData: FormData) => void;
}

export default function FormContainer({ children, form }: FormContainerProps) {
  return (
    <Form action={form} className="flex flex-col gap-3 mt-4 w-[350px] 2xl:gap-5 2xl:w-[400px]">
      {children}
    </Form>
  );
}
