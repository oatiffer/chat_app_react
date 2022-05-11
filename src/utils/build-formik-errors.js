const buildFormikErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, errors]) => {
    acc[field] = errors[0];

    return acc;
  }, {});
}

export default buildFormikErrors;