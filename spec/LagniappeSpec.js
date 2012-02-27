describe("Lagniappe", function() {

  describe("extend prototypes",function(){

    beforeEach(function(){
      f().extendPrototypes();
    });
    
    it("should add capitalize to string", function(){
      subject = "string";
      expect(subject.capitalize() ).toEqual("String");
    });

    it("should work with arguments", function(){
      subject = "{0}";
      expect(subject.format("test") ).toEqual("test");
    });

  });

});
