describe("Stringy", function() {

  describe("capitalize", function() {
    beforeEach(function() {
      subject = ALT159("i am a stringy").capitalize()
    });

    it("should capitalize the stirng", function() {
      expect(subject).toEqual("I am a stringy");
    });

  });


});
