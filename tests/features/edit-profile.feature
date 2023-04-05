Feature: Edit Profile

    Scenario: Handles missing profiles
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/edit/missing"

        Then the h1 contains "Profile not found."
        And the router-view contains "Profile not found!"

    Scenario: Edits a bookmark
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/edit/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46"

        Then the h1 contains "Edit Profile: Default Profile"

        When I click the container "root > row:0 > column:0 > bookmark:gmail"
        And I select the option "Edit bookmark" from the Container Modal
        And I type in the fields
            | label            | value        | nth |
            | Label            | GOOGLE GMAIL | -1  |
            | Title (Optional) | EDITED       | 0   |
        And I click the "Confirm" button
        Then the router-view contains "GOOGLE GMAIL:EDITED"
        And the router-view contains "GOOGLE GMAIL:work"
