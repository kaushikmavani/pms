const messages = {
  // Something went wrong
  somethingWrong: "Something went wrong, please try again later.",

  // Error Handler
  unexpectedError: "An unexpected network error occurred, please try again later.",
  invalidEndpointOrMethod: "Please enter valid endpoint and method.",

  // Middlewares
  invalidToken: "You are not authorized to access associated web-services, Please enter valid token.",

  // Auth
  emailNotRegistered: "This email is not registered with us. Please use correct email address.",
  emailAlreadyRegistered: "This email is already registered with us. Please try another email.",
  registrationSuccessful:
    "Registration has been completed successfully. Please click on the confirmation link sent to your email to activate your account.\n Please check your spam folder too.",
  invalidPassword: "Your password is incorrect.",
  emailNotConfirmed: "Please click on confirmation link sent to your registered email.",
  loginSuccessful: "Login successful.",
  signupSuccessful: "Signup successful.",
  logoutSuccessful: "Logout successful.",

  // Project
  getAllProjectsSuccessful: "Get all projects successfully.",
  getProjectSuccessful: "Get project successfully.",
  invalidProjectId: "Please enter valid project ID.",
  projectCreatedSuccessful: "Project created successfully.",
  projectUpdatedSuccessful: "Project udpated successfully.",
  projectDeletedSuccessful: "Project deleted successfully.",

  // Task
  getAllTasksSuccessful: "Get all tasks successfully.",
  getTaskSuccessful: "Get task successfully.",
  invalidTaskId: "Please enter valid task ID.",
  taskCreatedSuccessful: "Task created successfully.",
  taskUpdatedSuccessful: "Task udpated successfully.",
  taskDeletedSuccessful: "Task deleted successfully.",

  // Validation Messages
  nameRequired: "Name is required.",
  descriptionRequired: "Description is required.",
  titleRequired: "Title is required.",
  proirityRequired: "Priority is required.",
  statusRequired: "Status is required.",
  emailRequired: "Email is required.",
  passwordRequired: "Password is required.",

  projectIdRequired: "Project ID is required.",
  taskIdRequired: "Task ID is required",

  invalidPriority: "Please enter valid priority.",
  invalidStatus: "Please enter valid status.",
  invalidPage: "Please enter valid page.",
  invalidLimit: "Please enter valid limit.",
  invalidEmail: "Please enter valid email address.",

  passwordMinSix: "Password must contain at least 6 character.",
}

export default messages
