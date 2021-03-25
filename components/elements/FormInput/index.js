import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

const FormInput = () => {
  const initialValues = { size: 0 };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.number()
          .positive()
          .integer("กรุณาใส่จำนวนเต็ม")
          .min(3, "ค่าต่ำสุดอยู่ที่ 3x3")
          .max(100, "ค่ามากสุดคือ 100x10"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
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
        <form onSubmit={handleSubmit}>
          <input
            type=""
            id="size"
            name="size"
            value={values.size}
            onChange={handleChange}
          />
        </form>
      )}
    </Formik>
  );
};

FormInput.propTypes = {};

export default FormInput;
