describe("Stringy", function() {

  describe("capitalize", function() {

    it("should capitalize the stirng", function() {
      subject = ALT159("i am a stringy").capitalize();
      expect(subject).toEqual("I am a stringy");
    });

    it("should capitalize an empty stirng", function() {
      subject = ALT159("").capitalize();
      expect(subject).toEqual("");
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


  describe('camel', function(){

    it('CamelCase CamelCase', function() {
      subject = ALT159("CamelCase").camel();
      expect(subject).toEqual('CamelCase');
    });

    it('CamelCase underscore', function() {
      subject = ALT159("camel_case").camel();
      expect(subject).toEqual('CamelCase');
    });

    it('underscores sentences', function() {
      subject = ALT159("I am a sentence").camel();
      expect(subject).toEqual('IAmASentence');
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

  describe('pluralize',function(){

    it('pluralize normal word', function(){
      subject = ALT159("snake").pluralize();
      expect(subject).toEqual('snakes')
    });

    it('pluralize work ending in s', function(){
      subject = ALT159("class").pluralize();
      expect(subject).toEqual('classes');
    });

    it('pluralize irregular words', function(){
      subject = ALT159("cow").pluralize();
      expect(subject).toEqual('kine');
    });

    it('pluralize uncountable words', function(){
      subject = ALT159("rice").pluralize();
      expect(subject).toEqual('rice');
    });

  });



  describe('singularize',function(){

    it('singularize normal word', function(){
      subject = ALT159("snakes").singularize();
      expect(subject).toEqual('snake')
    });

    it('singularize work ending in s', function(){
      subject = ALT159("classes").singularize();
      expect(subject).toEqual('class');
    });

    it('singularize irregular words', function(){
      subject = ALT159("kine").singularize();
      expect(subject).toEqual('cow');
    });

    it('singularize uncountable words', function(){
      subject = ALT159("rice").singularize();
      expect(subject).toEqual('rice');
    });

  });



  describe('titleize',function(){

    it('should capitalize all the words', function(){
      subject = ALT159("all_the_words").titleize();
      expect(subject).toEqual('All The Words')
    });

    it('should capitalize all the words', function(){
      subject = ALT159("all the words").titleize();
      expect(subject).toEqual('All The Words')
    });

  });

  describe('truncate',function(){
    it('should chop of extra bits', function(){
      subject = ALT159("a long long string").truncate(7);
      expect(subject).toEqual('a long ...')
    });
    it('should allow for different (extras)', function(){
      subject = ALT159("a long long string").truncate(7, "");
      expect(subject).toEqual('a long ')
    });
  });


  describe('isBlank',function(){
    it('should return true if empty', function(){
      subject = ALT159("").isBlank();
      expect(subject).toEqual(true)
    });
    it('should return true if spaces', function(){
      subject = ALT159("  ").isBlank();
      expect(subject).toEqual(true);
    });
    it('should return false if contains something', function(){
      subject = ALT159(":P").isBlank();
      expect(subject).toEqual(false);
    });
  });

});
