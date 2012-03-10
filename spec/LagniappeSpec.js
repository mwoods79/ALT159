describe("Lagniappe", function() {

  //NOTE: must test before extending prototypes
  describe("Chain",function(){

    it("should equal the original", function(){
      subject = f().chain( "stringTest", f.types.Stringy )
      expect(subject === "stringTest").toBeTruthy();
    });

    it("should add functions", function(){
      subject = f().chain( "stringTest", f.types.Stringy )
      expect(subject.underscore !== void 0).toBeTruthy()
    });

    it("should not alter the prototypes", function(){
      subject = f().chain( "stringTest", f.types.Stringy )
      expect(String.prototype.underscore === void 0).toBeTruthy()
    });

    //it("strings should be chanable", function(){
    //  subject = "stringTest";
    //  expect(subject.capitalize().underscore() ).toEqual("string_test");
    //  var new_string = "Im a new String";
    //  expect(new_string.underscore === void 0).toBeTruthy()
    //});

  });


  //describe("extend prototypes",function(){

  //  beforeEach(function(){
  //    f().extendPrototypes();
  //  });
  //  
  //  it("should add capitalize to string", function(){
  //    subject = "string";
  //    expect(subject.capitalize() ).toEqual("String");
  //  });

  //  it("should work for numbery", function(){
  //    subject = 2;
  //    expect( subject.isEven() ).toBeTruthy();
  //  });

  //});

});
