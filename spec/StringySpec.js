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


  describe("format", function() {

    it("past nothing should do nothing", function() {
      subject = ALT159("i am a string").format()
      expect(subject).toEqual("i am a string");
    });

    it("should replase {0} with first arg" , function() {
      subject = ALT159("i am a {0}").format("string")
      expect(subject).toEqual("i am a string");
    });

    it("should replase {0} and {1} with args" , function() {
      subject = ALT159("{1} am a {0}").format("string",'i')
      expect(subject).toEqual("i am a string");
    });

  });

  describe('underscore', function(){

    it('underscores camelcase', function() {
      subject = ALT159("CamelCase").underscore();
      expect(subject).toEqual('camel_case');
    });

    it('underscores sentences', function() {
      subject = ALT159("I am a sentence").underscore();
      expect(subject).toEqual('i_am_a_sentence');
    });

  });

  describe('humanize',function(){

    it('humanizes underscored', function(){
      subject = ALT159("snake_case").humanize();
      expect(subject).toEqual('Snake case')
    });

    it('humanizes camelcase', function(){
      subject = ALT159("CamelCase").humanize();
      expect(subject).toEqual('Camel Case');
    });

  });

});
