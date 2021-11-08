import { FormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import { formikSyncContext } from "../state/formik-sync";

const FormikSyncProvider = ({ children }: any) => {
  const formik = useContext(FormikContext);
  const [state, setState] = useState(formik);
  useEffect(() => {
    setState(() => {
      return formik;
    })
  }, [formik])
  return (
    <formikSyncContext.Provider value={[state, setState]}>
      {children}
    </formikSyncContext.Provider>
  );
};

export default FormikSyncProvider