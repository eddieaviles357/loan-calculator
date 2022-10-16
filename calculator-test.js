
it('should calculate the monthly rate correctly', function () {
  let months = calculateMonthlyPayment({amount: 300000, years: 30, rate: 6});
  expect(months).toEqual(1798.65);
});


it("should return a result with 2 decimal places if not a whole number", function() {
  let months = twoDecimalPoints(13535.43);
  expect(months).toEqual(13535.43);
});

it("shoud return total amount to be paid at end of years", () => {
  let total = totalPrincipalAndInterest(18.87,5);
  expect(total).toEqual(1132.2);
})
/// etc
