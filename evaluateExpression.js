evaluateExpression = (expression) => {
    // Validate the input expression using a regular expression
  const validExpressionRegex = /^[\d\.\+\-\*\/\(\)]+$/;
  if (!validExpressionRegex.test(expression)) {
    return 'NaN';
  }

  // Sanitize the input expression by removing any characters that are not digits, operators, or parentheses
  expression = expression.replace(/[^()\d\+\-\*\/\.]/g, "");

  // Evaluate the expression using eval()
  const result = eval(expression);

  // Check if the result is a number
  if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
    return 'NaN';
  }

  // Return the result
  return result;
}
export default evaluateExpression;