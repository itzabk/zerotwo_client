//START IMPORTS
import FormikInput from "../FormikInput/FormikInput";
import FormikSelect from "../FormikSelect/FormikSelect";
import FormikRadio from "../FormikRadio/FormikRadio";
import FormikCheckbox from "../FormikCheckbox/FormikCheckbox";
//STOP IMPORTS

//FORMIK MAIN CONTROL
const FormikControl = ({control, ...rest}) => {
  switch (control) {
    case "input": {
      return <FormikInput {...rest} />;
    }
    case "select": {
      return <FormikSelect {...rest} />;
    }
    case "radio": {
      return <FormikRadio {...rest} />;
    }
    case "checkbox": {
      return <FormikCheckbox {...rest} />;
    }
    default: {
      return null;
    }
  }
};

export default FormikControl;
