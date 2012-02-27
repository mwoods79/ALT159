describe("Number", function() {

  describe("odd even", function() {
    it("should not be odd ", function() {
      ALT159(2).isOdd().toEqual(false);
    });
    it("should be odd ", function() {
      ALT159(3).isOdd().toEqual(true);
    });
    it("should be even ", function() {
      ALT159(2).isEven().toEqual(true);
    });
    it("should not be even ", function() {
      ALT159(3).isEven().toEqual(false);
    });
  });

});
