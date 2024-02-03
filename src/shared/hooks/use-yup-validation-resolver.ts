// import React, { useCallback, useMemo } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { Schema } from "yup";

// export const useYupValidationResolver = <T extends FieldValues>(
//   validationSchema: Schema
// ) =>
//   useCallback(
//     async (data: T) => {
//       try {
//         const values = await validationSchema.validate(data, {
//           abortEarly: false,
//         });

//         return {
//           values,
//           errors: {},
//         };
//       } catch (errors) {
//         return {
//           values: {},
//           errors: errors.inner.reduce(
//             (allErrors, currentError) => ({
//               ...allErrors,
//               [currentError.path]: {
//                 type: currentError.type ?? "validation",
//                 message: currentError.message,
//               },
//             }),
//             {}
//           ),
//         };
//       }
//     },
//     [validationSchema]
//   );
