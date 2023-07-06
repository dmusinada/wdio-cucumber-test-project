Feature: Retirement Calculator
    @E2E @smoke
    Scenario Outline: Verify the User shoule be able to "<SubmitType>" the pre-retirment calculator
        Given I am on the landing home page
        When I look at the "pre-retirement" Calculator
          And I should "<SubmitType>" the form with "<FieldType>" on the Calculator and click on "submit"
        Then I should be able to see the success message displayed on the screen

        Examples:
            | SubmitType | FieldType                   |
            | fill       |  OnlyWithRequiredData       |
            | fill       |  SSNWithequiredData         |
            | update     |  DefaultCalculatorData      |