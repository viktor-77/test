describe('Protractor App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should add 5 and 10', function() { //positive
    add(5,10);

    expect(latestResult.getText()).toEqual('15');
  });

  it('should add 5 and 10', function() { //negative
    add(5,10);

    expect(latestResult.getText()).toEqual('30');
  });

  it('should add 5 and -5', function() { //positive
    add(5,-5);
    let zero = '0';

    expect(latestResult.getText()).toEqual(zero);
  });

  it('should add 5 and -5', function() { //negative
    add(10,-5);
    let zero = '0';

    expect(latestResult.getText()).toEqual(zero);
  });

  it('should read the value from second input', function() { //positive
    secondNumber.sendKeys(20);

    expect(secondNumber.getAttribute('value')).toEqual('20');
  });

  it('should read the value from second input', function() { //negative
    secondNumber.sendKeys(20);
    
    expect(secondNumber.getAttribute('value')).toEqual('200');
  });

  it('should have a history', function() { //checking dynamic history results
    add(45, 55);
    add(1, 2);
    add(10, 20);

    expect(history.count()).toEqual(3); 

    add(5, 6);

    expect(history.count()).toEqual(4); 
  });

});
