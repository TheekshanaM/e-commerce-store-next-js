import { Formik, FormikProps, FormikValues } from "formik";
import { ReactNode } from "react";

interface IFormikWrapper<Values extends FormikValues> {
  initialValues: Values;
  enableReinitialize?: boolean;
  children: ReactNode | ((props: FormikProps<Values>) => ReactNode);
}

// Make FormikWrapper a generic component
export default function FormikWrapper<Values extends FormikValues>({
  initialValues,
  enableReinitialize,
  children,
}: IFormikWrapper<Values>) {
  return (
    <Formik<Values>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      {children}
    </Formik>
  );
}
