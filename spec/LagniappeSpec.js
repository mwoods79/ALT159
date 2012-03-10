describe("Lagniappe", function() {


  describe("extend prototypes",function(){

    beforeEach(function(){
      f().extendPrototypes();
    });
    
    it("should add capitalize to string", function(){
      subject = "string";
      expect(subject.capitalize() ).toEqual("String");
    });

    it("should work with chains", function(){
      subject = "string";
      expect(subject.capitalize().underscore() ).toEqual("string");
    });

    it("should work for numbery", function(){
      subject = 2;
      expect( subject.isEven() ).toBeTruthy();
    });

  });

});
