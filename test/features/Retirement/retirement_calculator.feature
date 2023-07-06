Feature: Pre-Retirement Calculator
 Test Calculators: The Pre-Retirement Calculator on Securian.com
  As a user,
  I want to test the pre-retirement calculator.

###################################
#Application = securian
#Track = calc
#Feature = rc
##################################

    @E2E @smoke
    Scenario Outline: Verify the User shoule be able to "<SubmitType>" the pre-retirment calculator with different sets of data
        Given I am on the landing home page
        When I look at the "pre-retirement" Calculator
          And I should "<SubmitType>" the form with "<FieldType>" on the Calculator and click on "submit"
        Then I should be able to see the success message displayed on the screen

        Examples:
            | SubmitType | FieldType                  |
            | fill       |  OnlyWithRequiredData      |
            | fill       |  SSNWithequiredData        |
            | update     |  DefaultCalculatorData     |
  


 @E2E @smoke
    Scenario Outline: Verify the User shoule be able to validate the error messages for "<InvalidDataType>" present on the calculator
        Given I am on the landing home page
        When I look at the "pre-retirement" Calculator
          And I should "<SubmitType>" the form with "<Err_msg_type>" on the Calculator and click on "submit"
        Then I should be able to see the error message displayed for "<Err_msg_type>" on the screen

        Examples:
            | SubmitType | InvalidDataType         | 
            | fill       |  InvalidCalculatorData  | 
            | fill       |  InvalidAgeGr100        |
            | fill       |  InvalidAge0            | 
            | fill       |  InvalidRetireAge       | 


    @E2E @smoke
    Scenario: Verify the User shoule be able to toggle and untoggle the SSN benefits section present on the pre-retirment calculator
        Given I am on the landing home page
        When I look at the "pre-retirement" Calculator
          And I toggle the social security benefits to "Yes" on the calculator
        Then I should see the social security fields "present" on the calculator
          And I toggle the social security benefits to "No" on the calculator
          And I should see the social security fields "not present" on the calculator