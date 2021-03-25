import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

const FormInput = ({ onChangeSize }) => {
  const initialValues = { size: 3 };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        size: Yup.number()
          .min(3, "ค่าต่ำสุดอยู่ที่ 3x3")
          .max(100, "ค่ามากสุดคือ 100x100")
          .required("เว้นว่างไม่ได้"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          onChangeSize(values.size);
          setSubmitting(false);
        }, 300);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="mb-3">
          <div>
            <label htmlFor="size">Custom</label>
            <input
              className="w-14 mx-2 p-2 border"
              type="number"
              id="size"
              name="size"
              value={values.size}
              onChange={handleChange}
            />
            <button type="submit" className="bg-black p-2 rounded text-white">
              Confirm Size
            </button>
          </div>
          <div>
            <p className="text-red-400">
              {touched.size && errors.size ? errors.size : null}
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

FormInput.propTypes = { onChangeSize: PropTypes.func.isRequired };

export default FormInput;
