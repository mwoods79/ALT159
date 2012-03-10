describe("Lagniappe", function() {

  describe("extend prototypes",function(){

    beforeEach(function(){
      f().extendPrototypes();
    });
    
    it("should add capitalize to string", function(){
      subject = "string";
      expect(subject.capitalize() ).toEqual("String");
    });

  });

});
