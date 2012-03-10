describe("Number", function() {

  describe("odd even", function() {
    it("should not be odd ", function() {
      expect(ALT159(2).isOdd()).toBeFalsy()
    });
    it("should be odd ", function() {
      expect(ALT159(3).isOdd()).toBeTruthy()
    });
    it("should be even ", function() {
      expect(ALT159(2).isEven()).toBeTruthy()
    });
    it("should not be even ", function() {
      expect(ALT159(3).isEven()).toBeFalsy()
    });
  });

  describe("money", function(){
    it('should have good defaults', function(){
      expect(ALT159("1234567.89").money()).toEqual("$1,234,567.89");
    });

    it('should accept a different "symbol" option', function(){
      expect(ALT159("1234567.89").money({symbol: '#'})).toEqual("#1,234,567.89");
    });

    it('should accept a different "seperator" option', function(){
      expect(ALT159("1234567.89").money({seperator: '_'})).toEqual("$1_234_567.89");
    });

    it('should accept a different "dot" option', function(){
      expect(ALT159("1234567.89").money({dot: '*'})).toEqual("$1,234,567*89");
    });

    it('should accept a different "precision" option', function(){
      expect(ALT159("1234567.89").money({precision: 1})).toEqual("$1,234,567.9");
    });

    it('should accept a different all at the same time option', function(){
      var opts = {
        precision:  1,
        symbol:     '@',
        dot:        '*',
        seperator:  '_'
      }

      expect(ALT159("1234567.89").money(opts)).toEqual("@1_234_567*9");
    });
  });

  describe("number", function(){
    it('should have good defaults', function(){
      expect(ALT159("1234567.89").number()).toEqual("1,234,567.89");
    });

    it('should accept a different "seperator" option', function(){
      expect(ALT159("1234567.89").number({seperator: '_'})).toEqual("1_234_567.89");
    });

    it('should accept a different "dot" option', function(){
      expect(ALT159("1234567.89").number({dot: '*'})).toEqual("1,234,567*89");
    });

    it('should accept a different "precision" option', function(){
      expect(ALT159("1234567.89").number({precision: 1})).toEqual("1,234,567.9");
    });

    it('should accept a different all at the same time option', function(){
      var opts = {
        precision:  1,
        dot:        '*',
        seperator:  '_'
      }

      expect(ALT159("1234567.89").number(opts)).toEqual("1_234_567*9");
    });
  });

});
