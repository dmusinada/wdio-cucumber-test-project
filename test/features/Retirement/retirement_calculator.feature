@E2E
Feature: Pre-Retirement Calculator
 Test Calculators: The Pre-Retirement Calculator on Securian.com
  As a user,
  I want to test the pre-retirement calculator.

###################################
#Application = securian
#Track = calc
#Feature = rc
##################################

    @E2E_001
    Scenario Outline: Verify the User should be able to "<SubmitType>" the pre-retirement calculator with different sets of data
      Given User is on the landing home page
      When User look at the "pre-retirement" Calculator
        And User should "<SubmitType>" the form with "<FieldType>" on the Calculator and click on "submit"
      Then User should be able to see the success message displayed on the screen
      
        Examples:
            | SubmitType | FieldType                  |
            | fill       |  OnlyWithRequiredData      |
            | fill       |  SSNWithRequiredData       |
            | update     |  DefaultCalculatorData     |


    @E2E_002
    Scenario Outline: Verify the User should be able to validate the error messages for "<InvalidDataType>" present on the calculator
      Given User is on the landing home page
      When User look at the "pre-retirement" Calculator
        And User should "<SubmitType>" the form with "<InvalidDataType>" on the Calculator and click on "submit"
      Then User should be able to see the error message displayed for "<InvalidDataType>" on the screen

        Examples:
            | SubmitType | InvalidDataType         | 
            | fill       |  InvalidCalculatorData  | 
            | fill       |  InvalidAgeGr100        |
            | fill       |  InvalidAge0            | 
            | fill       |  InvalidRetireAge       | 

    @E2E_003 @smoke
    Scenario: Verify the User should be able to toggle and untoggle the SSN benefits section present on the pre-retirment calculator
      Given User is on the landing home page
      When User look at the "pre-retirement" Calculator
        And User toggle the social security benefits to "Yes" on the calculator
      Then User should see the social security fields "present" on the calculator
        And User toggle the social security benefits to "No" on the calculator
        And User should see the social security fields "not present" on the calculator