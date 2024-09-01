import { Formik, FormikProps, FormikValues } from "formik";
import { ReactNode } from "react";

interface IFormikWrapper<Values extends FormikValues> {
  initialValues: Values;
  children: ReactNode | ((props: FormikProps<Values>) => ReactNode);
}

// Make FormikWrapper a generic component
export default function FormikWrapper<Values extends FormikValues>({
  initialValues,
  children,
}: IFormikWrapper<Values>) {
  return (
    <Formik<Values> initialValues={initialValues} onSubmit={() => {}}>
      {children}
    </Formik>
  );
}
