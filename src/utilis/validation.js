export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateInquiryForm = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.projectDescription?.trim()) {
    errors.projectDescription = 'Project description is required';
  } else if (formData.projectDescription.trim().length < 10) {
    errors.projectDescription = 'Please provide more details (minimum 10 characters)';
  } else if (formData.projectDescription.trim().length > 2000) {
    errors.projectDescription = 'Description is too long (maximum 2000 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};