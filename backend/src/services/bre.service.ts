import isValidPAN from "../utils/panValidator";

interface BREInput {

  dateOfBirth: string;

  monthlySalary: number;

  employmentStatus: string;

  panNumber: string;
}

interface BREResponse {

  passed: boolean;

  reason?: string;
}

const runBRE = (
  data: BREInput
): BREResponse => {

  const {
    dateOfBirth,
    monthlySalary,
    employmentStatus,
    panNumber,
  } = data;

  // calculate age
  const dob = new Date(dateOfBirth);

  const ageDifMs =
    Date.now() - dob.getTime();

  const ageDate =
    new Date(ageDifMs);

  const age =
    Math.abs(
      ageDate.getUTCFullYear() - 1970
    );

  // AGE VALIDATION
  if (age < 23 || age > 50) {

    return {
      passed: false,
      reason:
        "Age must be between 23 and 50",
    };
  }

  // SALARY VALIDATION
  if (monthlySalary < 25000) {

    return {
      passed: false,
      reason:
        "Salary must be at least 25000",
    };
  }

  // EMPLOYMENT VALIDATION
  if (
    employmentStatus === "UNEMPLOYED"
  ) {

    return {
      passed: false,
      reason:
        "Unemployed applicants are not eligible",
    };
  }

  // PAN VALIDATION
  if (!isValidPAN(panNumber)) {

    return {
      passed: false,
      reason:
        "Invalid PAN number",
    };
  }

  return {
    passed: true,
  };
};

export default runBRE;