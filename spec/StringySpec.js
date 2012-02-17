describe("Stringy", function() {

  describe("capitalize", function() {
    it("should capitalize the stirng", function() {
      subject = ALT159("i am a stringy").capitalize();
      expect(subject).toEqual("I am a stringy");
    });
  });


  describe("numbers", function() {

    it("should return the numbers from the string", function() {
      subject = ALT159("12345").numbers();
      expect(subject).toEqual(12345);
    });

    it("should be able to handle decimals", function() {
      subject = ALT159("12345.6").numbers();
      expect(subject).toEqual(12345.6);
    });

    it("should remove random chars", function() {
      subject = ALT159("1rand2om3ch4ars5").numbers();
      expect(subject).toEqual(12345);
    });

  });

});
